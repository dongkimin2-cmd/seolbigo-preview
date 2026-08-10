// 자동 이식된 목업 화면 p-pro-inbox — 원본: seolbigo-preview/index.html (백오피스)
// 헤더·내브는 BackofficeShell 공용 (실제 <Link> 라우팅) — 2026-08-04
// 데이터 기반 전환 (2026-08-04) — 요청 목록은 lib/pro-data, 필터·정렬·수락은 ProInboxClient
// E1-1 (2026-08-10) — 소비자가 실제 제출한 요청(fetchOpenRequests)이 데모 목록 위에 실노출
import BackofficeShell from '../../../components/BackofficeShell';
import ProInboxClient from '../../../components/pro/ProInboxClient';
import { fetchOpenRequests } from '../../../lib/db';
import { signedPhotoUrls } from '../../../lib/storage';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const live = await fetchOpenRequests();
  // 첫 사진만 썸네일로 (서명 URL 1시간) — mock 경로는 null → 플레이스홀더 폴백
  const thumbs = await signedPhotoUrls(live.map(r => r.photos[0]).filter(Boolean) as string[]);
  const thumbByReq: Record<string, string | null> = {};
  let ti = 0;
  for (const r of live) thumbByReq[r.id] = r.photos[0] ? thumbs[ti++] ?? null : null;
  return (
    <BackofficeShell persona="pro" id="p-pro-inbox">
      <ProInboxClient live={live} thumbs={thumbByReq} />
    </BackofficeShell>
  );
}
