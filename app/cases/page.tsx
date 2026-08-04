// p-cases — DB 기반으로 전환 (2026-08-04): 서버에서 fetchSimilarCases() 조회 후
// 클라이언트(필터·정렬)에 전달. 키 없으면 mock 폴백.
import { fetchSimilarCases } from '../../lib/db';
import CasesClient from '../../components/CasesClient';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const cases = await fetchSimilarCases();
  return <CasesClient cases={cases} />;
}
