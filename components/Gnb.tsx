'use client';
// GNB — 목업 마크업을 유지하되 실제 <Link> 라우팅 사용
// 백오피스 라우트(/pro-center /manager /insurer)에서는 자체 상단바(prognb)가 있으므로 렌더하지 않음
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/services', label: '전체 서비스' },
  { href: '/cases', label: '시공 사례' },
  { href: '/groupbuy', label: '공동구매' },
  { href: '/history', label: '우리집 이력' },
  { href: '/insurance', label: '보험 청구' },
];

const BACKOFFICE_PREFIXES = ['/pro-center', '/manager', '/insurer'];

export default function Gnb() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
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
          <Link className="lk" href="/login">로그인 / 회원가입</Link>
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
