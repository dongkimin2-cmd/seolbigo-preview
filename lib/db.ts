// 데이터 접근 계층 — Supabase 키가 있으면 실DB, 없으면 mock-data 로 자동 폴백.
// 스택이 바뀌어도 이 파일의 함수 시그니처(=데이터 계약)만 유지하면 화면·API는 무사합니다.
//
// 필요한 환경변수 (.env.local):
//   NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
//   SUPABASE_SERVICE_ROLE_KEY=...   (서버 라우트 전용 — 클라이언트에 노출 금지)
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import {
  DEMO_DIAGNOSIS, DEMO_QUOTES, DEMO_SIMILAR_CASES, GROUPBUY, SERVICES,
  type Quote, type SimilarCase,
} from './mock-data';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const hasSupabase = Boolean(url && serviceKey);

let client: SupabaseClient | null = null;
export function supabase(): SupabaseClient {
  if (!hasSupabase) throw new Error('Supabase 환경변수가 없습니다 (mock 모드)');
  if (!client) client = createClient(url!, serviceKey!, { auth: { persistSession: false } });
  return client;
}

/* ---------- mock 인메모리 스토어 (키 없는 데모 모드 전용) ----------
   next start 단일 프로세스에서만 유지됩니다. 서버리스(Vercel)에서는 인스턴스별로 초기화되므로
   실플로우 검증은 DB 모드에서 하세요. HMR 을 견디도록 globalThis 에 보관. */
type MockStore = {
  requests: LiveRequest[];
  quotes: Quote[];
};
const g = globalThis as unknown as { __seolbigoMock?: MockStore };
function mockStore(): MockStore {
  if (!g.__seolbigoMock) g.__seolbigoMock = { requests: [], quotes: [] };
  return g.__seolbigoMock;
}

// 소비자 요청 → 사업자 인박스로 흐르는 실요청 (E1-1)
export interface LiveRequest {
  id: string;
  symptoms: string[];
  address: string;
  createdAt: string;   // ISO
  status: string;
  quoteCount: number;  // 이 요청에 제출된 견적 수
}

/* ---------- 조회 ---------- */

export async function fetchQuotes(): Promise<Quote[]> {
  if (!hasSupabase) return [...mockStore().quotes, ...DEMO_QUOTES];
  try {
    const { data, error } = await supabase()
      .from('quotes')
      .select('id, pro_id, price_won, line_items, badges, recommended, warning, pros(name, rating, review_count, film_count, redo_rate, response_time_min)')
      .order('created_at', { ascending: true });
    if (error || !data?.length) return DEMO_QUOTES;
    return data.map((q: Record<string, unknown>) => {
      const pro = (q.pros ?? {}) as Record<string, unknown>;
      const name = String(pro.name ?? '사업자');
      return {
        id: String(q.id), proId: String(q.pro_id), proName: name, initial: name[0] ?? '설',
        rating: Number(pro.rating ?? 0), reviews: Number(pro.review_count ?? 0),
        filmCount: Number(pro.film_count ?? 0), redoRate: Number(pro.redo_rate ?? 0),
        responseTime: `${pro.response_time_min ?? '?'}분`,
        priceWon: Number(q.price_won),
        lineItems: (q.line_items ?? []) as Quote['lineItems'],
        badges: (q.badges ?? []) as Quote['badges'],
        recommended: Boolean(q.recommended),
        warning: (q.warning ?? undefined) as string | undefined,
      } satisfies Quote;
    });
  } catch { return DEMO_QUOTES; }
}

export async function fetchSimilarCases(): Promise<SimilarCase[]> {
  if (!hasSupabase) return DEMO_SIMILAR_CASES;
  try {
    const { data, error } = await supabase().from('similar_cases').select('*, pros(name, rating, review_count)');
    if (error || !data?.length) return DEMO_SIMILAR_CASES;
    // 화면 필터 속성으로 변환 (기준: 청솔 1999년 12층 사용자 — 실서비스에서는 요청 컨텍스트 기준)
    return data.map((c: Record<string, unknown>, i: number) => ({
      id: String(c.id ?? i),
      tone: (c.tone ?? 'wet') as SimilarCase['tone'],
      badges: [
        { label: c.complex_name === '청솔아파트' ? '같은 아파트' : String(c.complex_name ?? ''), tone: c.complex_name === '청솔아파트' ? 'brand' : 'gline' },
        { label: `${c.built_year}년`, tone: 'gline' },
      ] as SimilarCase['badges'],
      title: String(c.title), process: String(c.process_summary ?? ''),
      proName: String(((c.pros ?? {}) as Record<string, unknown>).name ?? ''),
      proMeta: `★ ${((c.pros ?? {}) as Record<string, unknown>).rating ?? '-'} (${((c.pros ?? {}) as Record<string, unknown>).review_count ?? 0})`,
      priceWon: Number(c.price_won),
      sameApt: c.complex_name === '청솔아파트',
      year: Number(c.built_year ?? 0),
      floorBand: Number(c.floor ?? 0) >= 10 && Number(c.floor ?? 0) <= 14,
      sameSymptom: c.defect_type === '배관 이음부 누수',
      insurance: Boolean(c.insurance), restore: Boolean(c.restore_included),
      similarity: 90 - i,
    }));
  } catch { return DEMO_SIMILAR_CASES; }
}

/* ---------- 쓰기 (mock 모드에서는 no-op) ---------- */

export async function insertRequest(input: { symptoms: string[]; address: string }) {
  if (!hasSupabase) {
    const st = mockStore();
    const id = 'R-' + Date.now().toString(36).toUpperCase();
    st.requests.unshift({ id, symptoms: input.symptoms, address: input.address,
      createdAt: new Date().toISOString(), status: 'diagnosed', quoteCount: 0 });
    return { id };
  }
  try {
    const { data } = await supabase().from('requests')
      .insert({ symptoms: input.symptoms, address: input.address, service_id: 'leak-repair' })
      .select('id').single();
    if (data?.id) void insertDiagnosis(String(data.id));   // 진단 결과 기록 (best-effort)
    return data ?? { id: 'mock-request' };
  } catch { return { id: 'mock-request' }; }
}

// 진단 결과 저장 — AI 파이프라인 연결 전까지 표준 데모 진단(DEMO_DIAGNOSIS)을 요청에 귀속시켜 기록.
// case_no 는 unique 제약이 있어 요청별로 생성.
async function insertDiagnosis(requestId: string) {
  try {
    const d = DEMO_DIAGNOSIS;
    await supabase().from('diagnoses').insert({
      request_id: requestId,
      case_no: `D-${Date.now().toString(36).toUpperCase()}-${requestId.slice(0, 4)}`,
      title: d.title, defect_type: d.type, description: d.description,
      urgency: d.urgency, urgency_label: d.urgencyLabel,
      confidence: d.confidence,
      price_min_man: d.priceMin, fair_min_man: d.fairMin, fair_max_man: d.fairMax,
      price_mid_man: d.priceMid, price_max_man: d.priceMax,
      matched_cases: d.matchedCases,
    });
  } catch { /* best-effort */ }
}

export async function insertBooking(b: { quoteId: string; day: string; time: string; method: string; amountWon: number; userId?: string }) {
  if (!hasSupabase) return { id: 'B-2611-0342' };
  try {
    const { data } = await supabase().from('bookings')
      .insert({ quote_id: b.quoteId, visit_day: b.day, visit_time: b.time, method: b.method,
        amount_won: b.amountWon, user_id: b.userId ?? null })
      .select('id').single();
    return data ?? { id: 'B-2611-0342' };
  } catch { return { id: 'B-2611-0342' }; }
}

export type GroupbuyInfo = typeof GROUPBUY;

// 공동구매 현황 조회 — open 캠페인 1건 + 참여 수. current = 데모 베이스(18) + 실참여 (joinGroupbuy 와 동일 규약)
export async function fetchGroupbuy(): Promise<GroupbuyInfo> {
  if (!hasSupabase) return GROUPBUY;
  try {
    const sb = supabase();
    const { data: camp } = await sb.from('groupbuy_campaigns')
      .select('id, complex_name, goal_households, indiv_price_won, tiers, deadline')
      .eq('status', 'open').limit(1).single();
    if (!camp) return GROUPBUY;
    const { count } = await sb.from('groupbuy_participants')
      .select('id', { count: 'exact', head: true }).eq('campaign_id', camp.id);
    const deadlineMs = new Date(String(camp.deadline)).getTime();
    const deadlineDays = Number.isFinite(deadlineMs)
      ? Math.max(0, Math.ceil((deadlineMs - Date.now()) / 86_400_000))
      : GROUPBUY.deadlineDays;
    const tiers = (typeof camp.tiers === 'string' ? JSON.parse(camp.tiers) : camp.tiers) as GroupbuyInfo['tiers'];
    return {
      ...GROUPBUY,
      complex: String(camp.complex_name ?? GROUPBUY.complex),
      goal: Number(camp.goal_households ?? GROUPBUY.goal),
      indivWon: Number(camp.indiv_price_won ?? GROUPBUY.indivWon),
      tiers: Array.isArray(tiers) && tiers.length ? tiers : GROUPBUY.tiers,
      current: GROUPBUY.current + (count ?? 0),
      deadlineDays,
    };
  } catch { return GROUPBUY; }
}

export async function joinGroupbuy(): Promise<number> {
  if (!hasSupabase) return GROUPBUY.current + 1;
  try {
    const sb = supabase();
    const { data: camp } = await sb.from('groupbuy_campaigns')
      .select('id').eq('status', 'open').limit(1).single();
    if (!camp) return GROUPBUY.current + 1;
    await sb.from('groupbuy_participants').insert({ campaign_id: camp.id });
    const { count } = await sb.from('groupbuy_participants')
      .select('id', { count: 'exact', head: true }).eq('campaign_id', camp.id);
    return GROUPBUY.current + (count ?? 1);   // 시드 18세대 + 실참여
  } catch { return GROUPBUY.current + 1; }
}

/* ---------- 참고 ---------- */
// services 카탈로그는 정적 성격이 강해 당분간 SERVICES(코드) 유지 — DB 이관 시 이 함수만 추가
export function fetchServices() { return SERVICES; }


/* ---------- E1 양방향 실플로우 (2026-08-10) ---------- */

// E1-1: 열린 요청 목록 — 사업자 인박스가 서버에서 조회
export async function fetchOpenRequests(): Promise<LiveRequest[]> {
  if (!hasSupabase) return mockStore().requests;
  try {
    const { data, error } = await supabase().from('requests')
      .select('id, symptoms, address, status, created_at, quotes(id)')
      .in('status', ['submitted', 'analyzing', 'diagnosed', 'quoted'])
      .order('created_at', { ascending: false }).limit(20);
    if (error || !data) return [];
    return data.map((r: Record<string, unknown>) => ({
      id: String(r.id),
      symptoms: (r.symptoms ?? []) as string[],
      address: String(r.address ?? ''),
      createdAt: String(r.created_at ?? ''),
      status: String(r.status ?? 'submitted'),
      quoteCount: Array.isArray(r.quotes) ? r.quotes.length : 0,
    }));
  } catch { return []; }
}

// E1-2: 사업자 견적 제출 — quotes 저장 (소비자 /quotes 비교 목록에 반영)
export async function insertQuote(q: {
  requestId?: string; priceWon: number; note?: string;
  lineItems?: { name: string; won: number }[];
}): Promise<{ ok: boolean; id?: string }> {
  const FAIR_MIN = DEMO_DIAGNOSIS.fairMin * 10_000, FAIR_MAX = DEMO_DIAGNOSIS.fairMax * 10_000;
  const warning = q.priceWon > FAIR_MAX
    ? `적정 구간(${DEMO_DIAGNOSIS.fairMin}~${DEMO_DIAGNOSIS.fairMax}만원)을 웃도는 금액입니다. 포함 공정을 확인하세요.`
    : undefined;
  if (!hasSupabase) {
    const st = mockStore();
    const id = 'Q-' + Date.now().toString(36).toUpperCase();
    st.quotes.unshift({
      id, proId: 'pro-live', proName: '깨끗한집설비', initial: '깨',
      rating: 4.9, reviews: 128, filmCount: 84, redoRate: 1.2, responseTime: '9분',
      priceWon: q.priceWon,
      lineItems: q.lineItems ?? [{ name: '견적 금액', won: q.priceWon }],
      badges: [{ label: '방금 도착', tone: 'blue' }, { label: '사업자 직접 입력', tone: 'gline' }],
      recommended: false, warning,
    });
    const req = st.requests.find(r => r.id === q.requestId);
    if (req) { req.quoteCount += 1; req.status = 'quoted'; }
    return { ok: true, id };
  }
  try {
    const sb = supabase();
    // 요청 id 확보 — 전달받은 uuid 가 유효하지 않으면 최신 요청에 귀속
    let requestId = q.requestId && /^[0-9a-f-]{36}$/i.test(q.requestId) ? q.requestId : null;
    if (!requestId) {
      const { data: latest } = await sb.from('requests').select('id')
        .order('created_at', { ascending: false }).limit(1).single();
      requestId = latest?.id ? String(latest.id) : null;
    }
    if (!requestId) return { ok: false };
    // 데모 사업자(첫 pros 행)에 귀속 — 사업자 계정 연동(E2-1) 전까지의 규약
    const { data: pro } = await sb.from('pros').select('id').limit(1).single();
    if (!pro?.id) return { ok: false };
    const { data, error } = await sb.from('quotes').insert({
      request_id: requestId, pro_id: pro.id, price_won: q.priceWon,
      line_items: q.lineItems ?? [{ name: '견적 금액', won: q.priceWon }],
      badges: [{ label: '방금 도착', tone: 'blue' }, { label: '사업자 직접 입력', tone: 'gline' }],
      recommended: false, warning: warning ?? null,
    }).select('id').single();
    if (error) return { ok: false };
    await sb.from('requests').update({ status: 'quoted' }).eq('id', requestId);
    return { ok: true, id: String(data?.id) };
  } catch { return { ok: false }; }
}
