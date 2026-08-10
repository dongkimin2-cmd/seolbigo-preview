// 데이터 접근 계층 — Supabase 키가 있으면 실DB, 없으면 mock-data 로 자동 폴백.
// 스택이 바뀌어도 이 파일의 함수 시그니처(=데이터 계약)만 유지하면 화면·API는 무사합니다.
//
// 필요한 환경변수 (.env.local):
//   NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
//   SUPABASE_SERVICE_ROLE_KEY=...   (서버 라우트 전용 — 클라이언트에 노출 금지)
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { assessQuote } from './pricing';
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
  bookings: LiveBooking[];
};
const g = globalThis as unknown as { __seolbigoMock?: MockStore };
function mockStore(): MockStore {
  if (!g.__seolbigoMock) g.__seolbigoMock = { requests: [], quotes: [], bookings: [] };
  return g.__seolbigoMock;
}

// 예약 상태 실전이 (E1-4) — 사업자·소비자 화면이 공유
export type BookingStatus = 'escrow' | 'in_progress' | 'await_approval' | 'paid_out' | 'refunded' | 'cancelled';
export interface LiveBooking {
  id: string;
  status: BookingStatus;
  day: string;
  time: string;
  amountWon: number;
  createdAt: string;
}

// 소비자 요청 → 사업자 인박스로 흐르는 실요청 (E1-1)
export interface LiveRequest {
  id: string;
  symptoms: string[];
  address: string;
  createdAt: string;   // ISO
  status: string;
  quoteCount: number;  // 이 요청에 제출된 견적 수
  photoCount: number;  // 첨부 사진 수 (E1-5)
  photos: string[];    // Storage 경로 (서명 URL 발급용)
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

export async function insertRequest(input: { symptoms: string[]; address: string; photos?: string[] }) {
  if (!hasSupabase) {
    const st = mockStore();
    const id = 'R-' + Date.now().toString(36).toUpperCase();
    st.requests.unshift({ id, symptoms: input.symptoms, address: input.address,
      createdAt: new Date().toISOString(), status: 'diagnosed', quoteCount: 0,
      photoCount: input.photos?.length ?? 0, photos: input.photos ?? [] });
    return { id };
  }
  try {
    const { data } = await supabase().from('requests')
      .insert({ symptoms: input.symptoms, address: input.address, service_id: 'leak-repair', photos: input.photos ?? [] })
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
  if (!hasSupabase) {
    const st = mockStore();
    const id = 'B-' + Date.now().toString(36).toUpperCase();
    st.bookings.unshift({ id, status: 'escrow', day: b.day, time: b.time,
      amountWon: b.amountWon, createdAt: new Date().toISOString() });
    return { id };
  }
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
      .select('id, symptoms, address, status, created_at, photos, quotes(id)')
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
      photoCount: Array.isArray(r.photos) ? r.photos.length : 0,
      photos: (r.photos ?? []) as string[],
    }));
  } catch { return []; }
}

// E1-2: 사업자 견적 제출 — quotes 저장 (소비자 /quotes 비교 목록에 반영)
export async function insertQuote(q: {
  requestId?: string; priceWon: number; note?: string;
  lineItems?: { name: string; won: number }[];
}): Promise<{ ok: boolean; id?: string }> {
  // E1-3: 규칙 기반 자동 판정 — 항목별 표준 범위 + 총액 적정 구간 (lib/pricing.ts)
  const { warning } = assessQuote(q.lineItems ?? [], q.priceWon, q.note);
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


/* ---------- E1-4 시공 상태 실전이 (2026-08-10) ---------- */

const STATUS_FLOW: BookingStatus[] = ['escrow', 'in_progress', 'await_approval', 'paid_out'];

export function nextBookingStatus(cur: BookingStatus): BookingStatus | null {
  const i = STATUS_FLOW.indexOf(cur);
  return i >= 0 && i < STATUS_FLOW.length - 1 ? STATUS_FLOW[i + 1] : null;
}

// 최신 예약 1건 — 사업자 대시보드·소비자 추적이 같은 원본을 봅니다
export async function fetchLatestBooking(): Promise<LiveBooking | null> {
  if (!hasSupabase) return mockStore().bookings[0] ?? null;
  try {
    const { data, error } = await supabase().from('bookings')
      .select('id, status, visit_day, visit_time, amount_won, created_at')
      .order('created_at', { ascending: false }).limit(1).single();
    if (error || !data) return null;
    return {
      id: String(data.id), status: (data.status ?? 'escrow') as BookingStatus,
      day: String(data.visit_day ?? ''), time: String(data.visit_time ?? ''),
      amountWon: Number(data.amount_won ?? 0), createdAt: String(data.created_at ?? ''),
    };
  } catch { return null; }
}

// 상태 전이 — 정해진 순서(escrow→in_progress→await_approval→paid_out)만 허용
export async function updateBookingStatus(id: string, to: BookingStatus): Promise<{ ok: boolean; status?: BookingStatus }> {
  if (!hasSupabase) {
    const b = mockStore().bookings.find(x => x.id === id);
    if (!b || nextBookingStatus(b.status) !== to) return { ok: false };
    b.status = to;
    return { ok: true, status: to };
  }
  try {
    const sb = supabase();
    const { data: cur } = await sb.from('bookings').select('status').eq('id', id).single();
    if (!cur || nextBookingStatus((cur.status ?? 'escrow') as BookingStatus) !== to) return { ok: false };
    const { error } = await sb.from('bookings').update({ status: to }).eq('id', id);
    if (error) return { ok: false };
    return { ok: true, status: to };
  } catch { return { ok: false }; }
}


// E1-6: 정산 실데이터 — 완료 승인(paid_out)된 예약 집계 (수수료 8% · 보증기금 2%)
export interface SettledBooking {
  id: string;
  day: string;
  amountWon: number;
  feeWon: number;    // 중개 수수료 8%
  fundWon: number;   // 보증기금 2%
  payoutWon: number; // 지급액
}
export async function fetchSettledBookings(): Promise<SettledBooking[]> {
  const toRow = (b: { id: string; day: string; amountWon: number }): SettledBooking => {
    const fee = Math.round(b.amountWon * 0.08), fund = Math.round(b.amountWon * 0.02);
    return { id: b.id, day: b.day, amountWon: b.amountWon, feeWon: fee, fundWon: fund,
      payoutWon: b.amountWon - fee - fund };
  };
  if (!hasSupabase) return mockStore().bookings.filter(b => b.status === 'paid_out').map(toRow);
  try {
    const { data, error } = await supabase().from('bookings')
      .select('id, visit_day, amount_won')
      .eq('status', 'paid_out').order('created_at', { ascending: false }).limit(20);
    if (error || !data) return [];
    return data.map(r => toRow({ id: String(r.id), day: String(r.visit_day ?? ''), amountWon: Number(r.amount_won ?? 0) }));
  } catch { return []; }
}
