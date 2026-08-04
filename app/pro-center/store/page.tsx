// 자동 이식된 목업 화면 p-pro-store — 원본: seolbigo-preview/index.html (백오피스)
// 헤더·내브는 BackofficeShell 공용 (실제 <Link> 라우팅) — 2026-08-04
// 데이터 기반 전환 (2026-08-04) — 상품 목록은 lib/pro-data, 카테고리 필터는 ProStoreClient
import BackofficeShell from '../../../components/BackofficeShell';
import ProStoreClient from '../../../components/pro/ProStoreClient';

export default function Page() {
  return (
    <BackofficeShell persona="pro" id="p-pro-store">
      <ProStoreClient />
    </BackofficeShell>
  );
}
