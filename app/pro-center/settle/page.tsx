// 자동 이식된 목업 화면 p-pro-settle — 원본: seolbigo-preview/index.html (백오피스)
// 헤더·내브는 BackofficeShell 공용 (실제 <Link> 라우팅) — 2026-08-04
// 데이터 기반 전환 (2026-08-04) — KPI·정산 내역은 lib/pro-data, 월 필터는 ProSettleClient
import BackofficeShell from '../../../components/BackofficeShell';
import { fetchSettledBookings } from '../../../lib/db';
import ProSettleClient from '../../../components/pro/ProSettleClient';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const settled = await fetchSettledBookings();
  return (
    <BackofficeShell persona="pro" id="p-pro-settle">
      <ProSettleClient settled={settled} />
    </BackofficeShell>
  );
}
