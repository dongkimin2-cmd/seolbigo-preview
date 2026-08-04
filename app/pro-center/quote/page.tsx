// 자동 이식된 목업 화면 p-pro-quote — 원본: seolbigo-preview/index.html (백오피스)
// 헤더·내브는 BackofficeShell 공용 (실제 <Link> 라우팅) — 2026-08-04
// 데이터 기반 전환 (2026-08-04) — 공정 항목·현장 변수는 lib/pro-data, 렌더·토스트는 ProQuoteClient
import BackofficeShell from '../../../components/BackofficeShell';
import ProQuoteClient from '../../../components/pro/ProQuoteClient';

export default function Page() {
  return (
    <BackofficeShell persona="pro" id="p-pro-quote">
      <ProQuoteClient />
    </BackofficeShell>
  );
}
