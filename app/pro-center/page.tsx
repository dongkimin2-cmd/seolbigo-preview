// 자동 이식된 목업 화면 p-pro-home — 원본: seolbigo-preview/index.html (백오피스)
// 헤더·내브는 BackofficeShell 공용 (실제 <Link> 라우팅) — 2026-08-04
// 데이터 기반 전환 (2026-08-04) — KPI·일정·요청 데이터는 lib/pro-data, 렌더는 ProDashboardClient
// E1-4 (2026-08-10) — 실제 예약(fetchLatestBooking)이 오늘 일정 위에 노출, 상태 전이 버튼 제공
import BackofficeShell from '../../components/BackofficeShell';
import ProDashboardClient from '../../components/pro/ProDashboardClient';
import { fetchLatestBooking } from '../../lib/db';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const liveBooking = await fetchLatestBooking();
  return (
    <BackofficeShell persona="pro" id="p-pro-home">
      <ProDashboardClient liveBooking={liveBooking} />
    </BackofficeShell>
  );
}
