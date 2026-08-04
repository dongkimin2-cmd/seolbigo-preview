// 데이터 접근 계층 — Supabase 키가 있으면 실DB, 없으면 mock-data 로 자동 폴백.
// 스택이 바뀌어도 이 파일의 함수 시그니처(=데이터 계약)만 유지하면 화면·API는 무사합니다.
//
// 필요한 환경변수 (.env.local):
//   NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
//   SUPABASE_SERVICE_ROLE_KEY=...   (서버 라우트 전용 — 클라이언트에 노출 금지)
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import {
  DEMO_QUOTES, DEMO_SIMILAR_CASES, GROUPBUY, SERVICES,
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

/* ---------- 조회 ---------- */

export async function fetchQuotes(): Promise<Quote[]> {
  if (!hasSupabase) return DEMO_QUOTES;
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
    const { data, error } = await supabase().from('similar_cases').select('*');
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
      proName: '', proMeta: '', priceWon: Number(c.price_won),
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
  if (!hasSupabase) return { id: 'mock-request' };
  try {
    const { data } = await supabase().from('requests')
      .insert({ symptoms: input.symptoms, address: input.address, service_id: 'leak-repair' })
      .select('id').single();
    return data ?? { id: 'mock-request' };
  } catch { return { id: 'mock-request' }; }
}

// 데모 견적 id(q1~q3) → seed.sql 의 고정 uuid 매핑.
// /quotes 화면이 mock 단일 소스(DEMO_QUOTES)로 렌더되는 동안, 'q2' 같은 문자열이
// uuid 컬럼(bookings.quote_id)에 들어가며 조용히 실패하는 것을 막는 다리.
// 견적 화면을 fetchQuotes() 기반으로 전환하면 이 매핑은 제거.
const SEED_QUOTE_IDS: Record<string, string> = {
  q1: '20000000-0000-0000-0000-000000000001',
  q2: '20000000-0000-0000-0000-000000000002',
  q3: '20000000-0000-0000-0000-000000000003',
};

export async function insertBooking(b: { quoteId: string; day: string; time: string; method: string; amountWon: number }) {
  if (!hasSupabase) return { id: 'B-2611-0342' };
  try {
    const { data } = await supabase().from('bookings')
      .insert({ quote_id: SEED_QUOTE_IDS[b.quoteId] ?? b.quoteId, visit_day: b.day, visit_time: b.time, method: b.method, amount_won: b.amountWon })
      .select('id').single();
    return data ?? { id: 'B-2611-0342' };
  } catch { return { id: 'B-2611-0342' }; }
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
