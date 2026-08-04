// 자동 이식된 목업 화면 p-pro-inbox — 원본: seolbigo-preview/index.html (백오피스)
// 헤더·내브는 BackofficeShell 공용 (실제 <Link> 라우팅) — 2026-08-04
// 데이터 기반 전환 (2026-08-04) — 요청 목록은 lib/pro-data, 필터·정렬·수락은 ProInboxClient
import BackofficeShell from '../../../components/BackofficeShell';
import ProInboxClient from '../../../components/pro/ProInboxClient';

export default function Page() {
  return (
    <BackofficeShell persona="pro" id="p-pro-inbox">
      <ProInboxClient />
    </BackofficeShell>
  );
}
