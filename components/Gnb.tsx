'use client';
// GNB — 목업 마크업을 유지하되 실제 <Link> 라우팅 사용
import { useState } from 'react';
import Link from 'next/link';
import { MOCKUP_URL } from '../lib/routes';

const NAV = [
  { href: '/services', label: '전체 서비스' },
  { href: '/cases', label: '시공 사례' },
  { href: '/groupbuy', label: '공동구매' },
  { href: '/history', label: '우리집 이력' },
  { href: '/insurance', label: '보험 청구' },
];

export default function Gnb() {
  const [open, setOpen] = useState(false);
  return (
    <header className="gnb">
      <div className="gnb__in">
        <Link href="/" className="logo" style={{ textDecoration: 'none' }}>설비고</Link>
        <nav className="gnb__nav">
          {NAV.map(n => <Link key={n.href} href={n.href}>{n.label}</Link>)}
        </nav>
        <div className="gnb__sp" />
        <div className="gnb__right">
          <a className="lk" href={MOCKUP_URL} target="_blank" rel="noreferrer">관리사무소</a>
          <a className="lk" href={MOCKUP_URL} target="_blank" rel="noreferrer">보험사</a>
          <span className="lk">로그인 / 회원가입</span>
          <a className="btn small primary" href={MOCKUP_URL} target="_blank" rel="noreferrer">사업자 센터</a>
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
        <a href={MOCKUP_URL} target="_blank" rel="noreferrer">사업자 센터</a>
        <a href={MOCKUP_URL} target="_blank" rel="noreferrer">관리사무소</a>
        <a href={MOCKUP_URL} target="_blank" rel="noreferrer">보험사</a>
      </div>
    </header>
  );
}
