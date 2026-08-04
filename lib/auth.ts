// Auth 계층 (Phase 2 스캐폴드, 2026-08-04) — ⚠️ 아직 실환경 미검증
// 키가 없으면 완전히 비활성: hasAuth=false 면 미들웨어·로그인 화면이 안내만 하고 기존 데모 동작 무변화.
// 활성 조건: NEXT_PUBLIC_SUPABASE_URL + 공개 키(NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY 또는
// NEXT_PUBLIC_SUPABASE_ANON_KEY — 신형 sb_publishable_ 키를 넣으면 됨).
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const authUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const authKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const hasAuth = Boolean(authUrl && authKey);

// 서버 컴포넌트/라우트 핸들러용 클라이언트 (쿠키 세션)
export async function supabaseServer() {
  const cookieStore = await cookies();
  return createServerClient(authUrl!, authKey!, {
    cookies: {
      getAll() { return cookieStore.getAll(); },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch { /* 서버 컴포넌트에서 호출 시 무시 — 미들웨어가 갱신 담당 */ }
      },
    },
  });
}

export type Role = 'consumer' | 'pro' | 'manager' | 'insurer';

// 현재 로그인 사용자 + 역할 (미로그인/비활성 시 null)
export async function currentUser(): Promise<{ id: string; email?: string; role: Role } | null> {
  if (!hasAuth) return null;
  try {
    const sb = await supabaseServer();
    const { data: { user } } = await sb.auth.getUser();
    if (!user) return null;
    const { data: profile } = await sb.from('profiles').select('role').eq('id', user.id).single();
    return { id: user.id, email: user.email ?? undefined, role: (profile?.role ?? 'consumer') as Role };
  } catch { return null; }
}
