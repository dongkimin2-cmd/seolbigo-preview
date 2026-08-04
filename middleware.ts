// 세션 갱신 미들웨어 (Phase 2 스캐폴드, 2026-08-04) — ⚠️ 아직 실환경 미검증
// Auth 키가 없으면 아무것도 하지 않음(기존 데모 동작 무변화).
// 키가 있으면 만료된 세션 토큰을 갱신해 서버 컴포넌트가 항상 유효한 세션을 보게 함.
// 강제 로그인(라우트 보호)은 아직 하지 않음 — 역할별 보호는 Auth 실검증 후 단계적으로.
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function middleware(request: NextRequest) {
  if (!url || !key) return NextResponse.next();
  let response = NextResponse.next({ request });
  try {
    const supabase = createServerClient(url, key, {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    });
    await supabase.auth.getUser();   // 토큰 갱신 트리거
  } catch { /* Auth 불통 시에도 화면은 정상 서빙 */ }
  return response;
}

export const config = {
  // 정적 자원·이미지는 제외
  matcher: ['/((?!_next/static|_next/image|favicon.ico|fonts/|.*\\.(?:png|jpg|svg|woff2)$).*)'],
};
