'use client';
// GNB — 목업 마크업을 유지하되 실제 <Link> 라우팅 사용
// 백오피스 라우트(/pro-center /manager /insurer)에서는 자체 상단바(prognb)가 있으므로 렌더하지 않음
// 로그인 상태 표시 (2026-08-04): Auth 키가 있으면 클라이언트에서 세션을 읽어 이메일·로그아웃 노출.
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

const AUTH_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const AUTH_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const authOn = Boolean(AUTH_URL && AUTH_KEY);

const NAV = [
  { href: '/services', label: '전체 서비스' },
  { href: '/cases', label: '시공 사례' },
  { href: '/groupbuy', label: '공동구매' },
  { href: '/journey', label: '내 진행 현황' },
  { href: '/history', label: '우리집 이력' },
  { href: '/insurance', label: '보험 청구' },
];

const BACKOFFICE_PREFIXES = ['/pro-center', '/manager', '/insurer'];

export default function Gnb() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!authOn) return;
    const sb = createBrowserClient(AUTH_URL!, AUTH_KEY!);
    sb.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
    const { data: sub } = sb.auth.onAuthStateChange((_e, session) =>
      setEmail(session?.user?.email ?? null));
    return () => sub.subscription.unsubscribe();
  }, []);

  async function logout() {
    try {
      await createBrowserClient(AUTH_URL!, AUTH_KEY!).auth.signOut();
      setEmail(null);
      router.refresh();
    } catch { /* 무시 */ }
  }

  if (BACKOFFICE_PREFIXES.some(p => pathname.startsWith(p))) return null;

  return (
    <header className="gnb">
      <div className="gnb__in">
        <Link href="/" className="logo" style={{ textDecoration: 'none' }}>설비고</Link>
        <nav className="gnb__nav">
          {NAV.map(n => <Link key={n.href} href={n.href}>{n.label}</Link>)}
        </nav>
        <div className="gnb__sp" />
        <div className="gnb__right">
          <Link className="lk" href="/manager">관리사무소</Link>
          <Link className="lk" href="/insurer">보험사</Link>
          {email
            ? <>
                <span className="lk" style={{ cursor: 'default' }}>{email.split('@')[0]}님</span>
                <button className="lk" style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', font: 'inherit' }}
                  onClick={logout}>로그아웃</button>
              </>
            : <Link className="lk" href="/login">로그인 / 회원가입</Link>}
          <Link className="btn small primary" href="/pro-center" style={{ textDecoration: 'none' }}>사업자 센터</Link>
        </div>
        <button className="mbtn" aria-label="메뉴" onClick={() => setOpen(v => !v)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <div className={'mnav' + (open ? ' open' : '')} onClick={() => setOpen(false)}>
        {NAV.map(n => <Link key={n.href} href={n.href}>{n.label}</Link>)}
        <hr className="hair" style={{ margin: '8px 0' }} />
        <Link href="/pro-center">사업자 센터</Link>
        <Link href="/manager">관리사무소</Link>
        <Link href="/insurer">보험사</Link>
      </div>
    </header>
  );
}
