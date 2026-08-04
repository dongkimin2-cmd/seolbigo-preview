// 자동 이식된 목업 화면 p-ins-home — 원본: seolbigo-preview/index.html (백오피스)
// 헤더·내브는 BackofficeShell 공용 (실제 <Link> 라우팅) — 2026-08-04
// 데이터 기반 전환 (2026-08-04) — 청구 목록·KPI 를 lib/ins-data 로 추출, 필터·정렬은 InsInboxClient
import BackofficeShell from '../../components/BackofficeShell';
import InsInboxClient from '../../components/ins/InsInboxClient';

export default function Page() {
  return (
    <BackofficeShell persona="ins" id="p-ins-home">
      <InsInboxClient />
    </BackofficeShell>
  );
}
