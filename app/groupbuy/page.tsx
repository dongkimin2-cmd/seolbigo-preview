// p-groupbuy — DB 기반으로 전환 (2026-08-04): 서버에서 fetchGroupbuy() 로
// open 캠페인 + 실참여 수를 조회해 클라이언트에 전달. 키 없으면 mock 폴백.
import { fetchGroupbuy } from '../../lib/db';
import GroupbuyClient from '../../components/GroupbuyClient';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const gb = await fetchGroupbuy();
  return <GroupbuyClient gb={gb} />;
}
