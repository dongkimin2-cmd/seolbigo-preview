// 로그인 (Phase 2 스캐폴드, 2026-08-04) — ⚠️ 아직 실환경 미검증
// Auth 키가 없으면 안내 패널만 표시 (데모 모드). 키가 있으면 이메일+비밀번호 가입/로그인 동작.
// 카카오 OAuth 는 Supabase 대시보드에서 프로바이더 설정 후 활성화 예정 (버튼은 자리만).
import { hasAuth } from '../../lib/auth';
import LoginClient from '../../components/LoginClient';

export const dynamic = 'force-dynamic';

export default function Page() {
  return <LoginClient enabled={hasAuth} />;
}
