// 자동 이식된 목업 화면 p-pro-film — 원본: seolbigo-preview/index.html (백오피스)
// 헤더·내브는 BackofficeShell 공용 (실제 <Link> 라우팅) — 2026-08-04
// 데이터 기반 전환 (2026-08-04) — 검증 대기·포트폴리오 타일은 lib/pro-data, 필터·슬라이더는 ProFilmClient
import BackofficeShell from '../../../components/BackofficeShell';
import ProFilmClient from '../../../components/pro/ProFilmClient';

export default function Page() {
  return (
    <BackofficeShell persona="pro" id="p-pro-film">
      <ProFilmClient />
    </BackofficeShell>
  );
}
