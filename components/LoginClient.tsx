'use client';
// 로그인 클라이언트 (Phase 2 스캐폴드) — ⚠️ 아직 실환경 미검증
// enabled=false (Auth 키 없음): 안내 패널만. enabled=true: 이메일+비밀번호 가입/로그인.
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { toast } from '../lib/toast';

function client() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)!,
  );
}

export default function LoginClient({ enabled }: { enabled: boolean }) {
  const router = useRouter();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (!email || !pw) { toast('이메일과 비밀번호를 입력해주세요.', 'warn'); return; }
    setBusy(true);
    try {
      const sb = client();
      const { error } = mode === 'signin'
        ? await sb.auth.signInWithPassword({ email, password: pw })
        : await sb.auth.signUp({ email, password: pw });
      if (error) throw error;
      toast(mode === 'signin' ? '로그인되었습니다' : '가입이 완료되었습니다');
      router.push('/');
      router.refresh();
    } catch (e) {
      toast(e instanceof Error ? e.message : '처리에 실패했어요. 잠시 후 다시 시도해주세요.', 'warn');
      setBusy(false);
    }
  }

  return (
    <section className="page on" id="p-login" data-react>
      <div className="phead"><div className="phead__in">
        <div className="crumb"><a data-go="home">홈</a><span>›</span><b>로그인</b></div>
        <h1>로그인</h1>
        <p className="sub">진단 이력·예약·보증을 내 계정으로 관리하세요.</p>
      </div></div>

      <div className="flow solo" style={{ justifyItems: "center" }}>
        <div style={{ maxWidth: 420, width: '100%' }}>
          {!enabled && (
            <div className="callout" style={{ marginBottom: 16 }}>
              <span style={{ flex: '0 0 20px' }}>ℹ️</span>
              <p className="t-b14" style={{ margin: 0 }}>
                데모 모드에서는 로그인 없이 모든 화면을 볼 수 있습니다.
                로그인 기능은 Auth 환경변수 설정 후 활성화됩니다.
              </p>
            </div>
          )}
          <div className="panel">
            <div className="row gap6" style={{ marginBottom: 16 }}>
              <button className="chip sm" aria-pressed={mode === 'signin'} onClick={() => setMode('signin')}>로그인</button>
              <button className="chip sm" aria-pressed={mode === 'signup'} onClick={() => setMode('signup')}>회원가입</button>
            </div>
            <div className="col gap10">
              <input className="inp" type="email" placeholder="이메일" value={email}
                onChange={e => setEmail(e.target.value)} disabled={!enabled} />
              <input className="inp" type="password" placeholder="비밀번호 (6자 이상)" value={pw}
                onChange={e => setPw(e.target.value)} disabled={!enabled} />
              <button className="btn large primary block" disabled={!enabled || busy} onClick={submit}>
                {busy ? '처리 중…' : mode === 'signin' ? '이메일로 로그인' : '이메일로 가입'}
              </button>
              <button className="btn large block" style={{ background: '#FEE500', color: '#191919' }}
                onClick={() => toast('카카오 로그인은 프로바이더 설정 후 활성화됩니다')}>
                카카오로 계속하기
              </button>
            </div>
            <p className="t-b12 c-ter" style={{ margin: '14px 0 0', textAlign: 'center' }}>
              사업자·관리사무소 계정은 가입 후 심사를 거쳐 전환됩니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
