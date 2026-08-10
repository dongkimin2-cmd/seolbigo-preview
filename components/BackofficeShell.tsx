'use client';
// 백오피스 공용 셸 — 상단바(prognb) + 사이드내브(pronav) + 본문(probody).
// 17개 화면에 중복돼 있던 헤더·내브를 한곳으로 모으고, data-go 대신 실제 <Link> 라우팅 사용.
// (2026-08-04 백오피스 데이터 전환의 1단계)
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { CSSProperties, ReactNode } from 'react';

export type Persona = 'pro' | 'mgr' | 'ins';

interface NavItem { href: string; label: string; n?: number }

const CONFIG: Record<Persona, {
  tag: string; tagStyle?: CSSProperties; right: ReactNode; nav: NavItem[];
}> = {
  pro: {
    tag: '사업자 센터',
    right: (
      <div className="row gap12">
        <span className="badge b-brand b12">플래티넘 등급</span>
        <div className="row gap8">
          <div className="avatar sq" style={{ width: 32, height: 32, fontSize: 13 }}>깨</div>
          <span className="t-b14 fw6">깨끗한집설비</span>
        </div>
      </div>
    ),
    nav: [
      { href: '/pro-center', label: '🏠 대시보드' },
      { href: '/pro-center/inbox', label: '📥 요청 인박스', n: 4 },
      { href: '/pro-center/quote', label: '📝 견적 작성' },
      { href: '/pro-center/film', label: '📷 필모그래피' },
      { href: '/pro-center/grade', label: '🏅 신용등급' },
      { href: '/pro-center/store', label: '📦 자재 구매' },
      { href: '/pro-center/settle', label: '💳 정산' },
    ],
  },
  mgr: {
    tag: '관리사무소',
    tagStyle: { background: 'var(--sg-bg-success)' },
    right: (
      <div className="row gap12">
        <span className="badge b-green b12">청솔아파트 · 21개동 1,240세대</span>
        <div className="row gap8">
          <div className="avatar ci" style={{ width: 32, height: 32, fontSize: 13 }}>소</div>
          <span className="t-b14 fw6">김관리 소장</span>
        </div>
      </div>
    ),
    nav: [
      { href: '/manager', label: '🏢 단지 현황' },
      { href: '/manager/map', label: '🗺 디지털 이력 지도' },
      { href: '/manager/report', label: '🎥 오염도 리포트' },
      { href: '/manager/contract', label: '📅 정기 세정 계약' },
      { href: '/manager/bid', label: '📋 입찰 대응' },
      { href: '/manager/brief', label: '📊 입대의 보고자료' },
    ],
  },
  ins: {
    tag: '보험사',
    tagStyle: { background: 'var(--sb-role-insurer)' },
    right: (
      <div className="row gap12">
        <span className="badge b-navy b12">○○화재해상보험 · 일상생활배상책임</span>
        <div className="row gap8">
          <div className="avatar ci" style={{ width: 32, height: 32, fontSize: 13 }}>보</div>
          <span className="t-b14 fw6">보상팀 이심사</span>
        </div>
      </div>
    ),
    nav: [
      { href: '/insurer', label: '📥 청구 심사' },
      { href: '/insurer/case', label: '📄 사실자료 상세' },
      { href: '/insurer/analytics', label: '📈 손해율 대시보드' },
      { href: '/insurer/campaign', label: '🎟 예방 캠페인' },
    ],
  },
};

export default function BackofficeShell({ persona, id, children }: {
  persona: Persona; id: string; children: ReactNode;
}) {
  const pathname = usePathname();
  const c = CONFIG[persona];
  return (
    <section className="page on pro" id={id}>
      <header className="prognb"><div className="prognb__in">
        <Link href="/" className="logo" style={{ fontSize: 19 }}>
          설비고<span className="prognb__tag" style={c.tagStyle}>{c.tag}</span>
        </Link>
        <div className="gnb__sp" />
        {c.right}
      </div></header>
      <div className="prowrap">
        <nav className="pronav">
          {c.nav.map(item => (
            <Link key={item.href} href={item.href} className={pathname === item.href ? 'on' : undefined}>
              {item.label}{item.n != null && <> <span className="pronav__n">{item.n}</span></>}
            </Link>
          ))}
          <hr className="hair" style={{ margin: '12px 8px' }} />
          <Link href="/">↩ 고객 화면으로</Link>
        </nav>
        <div className="probody">{children}</div>
      </div>
    </section>
  );
}
