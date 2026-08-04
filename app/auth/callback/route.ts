// OAuth·매직링크 콜백 (Phase 2 스캐폴드) — ⚠️ 아직 실환경 미검증
// Supabase 대시보드 Redirect URL 에 `<사이트>/auth/callback` 등록 필요.
import { NextResponse } from 'next/server';
import { hasAuth, supabaseServer } from '../../../lib/auth';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  if (hasAuth && code) {
    try {
      const sb = await supabaseServer();
      await sb.auth.exchangeCodeForSession(code);
    } catch { /* 실패 시 홈으로 — 화면에서 재시도 */ }
  }
  return NextResponse.redirect(origin + (searchParams.get('next') ?? '/'));
}
