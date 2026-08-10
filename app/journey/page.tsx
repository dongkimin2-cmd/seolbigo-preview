'use client';
// 내 진행 현황 허브 (2026-08-10) — 진단→견적→예약→추가금→시공→보증의 각 단계로 상시 재진입.
// 단계 상태: sessionStorage 스토어(diag/quote/variation) + 실예약(/api/bookings)으로 판정.
// 데이터가 없어도 각 화면은 데모 폴백으로 열리므로 링크는 항상 살아 있고, 상태 배지만 다르게 표시.
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { loadDiagnosis, type DiagnosisSession } from '../../lib/diag-store';
import { loadVariation } from '../../lib/variation-store';
import type { LiveBooking } from '../../lib/db';
import { Ic } from '../../components/icons';

const BOOKING_LABEL: Record<string, { label: string; cls: string }> = {
  escrow: { label: '예약 확정 · 방문 대기', cls: 'b-blue' },
  in_progress: { label: '시공 진행중', cls: 'b-brands' },
  await_approval: { label: '완료 확인 대기 — 승인해 주세요', cls: 'b-orange' },
  paid_out: { label: '거래 완료 · 보증 시작', cls: 'b-green' },
};

interface Step {
  icon: string;
  title: string;
  desc: string;
  href: string;
  badge?: { label: string; cls: string };
  cta: string;
  highlight?: boolean;
}

export default function Page() {
  const [diag, setDiag] = useState<DiagnosisSession | null>(null);
  const [extra, setExtra] = useState<number | null>(null);
  const [live, setLive] = useState<LiveBooking | null>(null);

  useEffect(() => {
    setDiag(loadDiagnosis());
    const v = loadVariation();
    if (v) setExtra(v.extraWon);
    fetch('/api/bookings').then(r => r.json())
      .then(d => { if (d?.booking) setLive(d.booking); }).catch(() => {});
  }, []);

  const bk = live ? BOOKING_LABEL[live.status] : undefined;

  const steps: Step[] = [
    {
      icon: 'photo-ai', title: '사진 진단 · 진단 결과',
      desc: diag
        ? `${diag.result.type} · 기준가 ${diag.result.priceMin}~${diag.result.priceMax}만원 (이번 세션 진단)`
        : '아직 이번 세션의 진단이 없습니다 — 데모 결과를 보거나 새 진단을 시작하세요.',
      href: '/diagnose/result',
      badge: diag ? { label: '진단 완료', cls: 'b-green' } : { label: '데모 보기', cls: 'b-gline' },
      cta: diag ? '결과 다시 보기' : '진단 결과(데모)',
    },
    {
      icon: 'scale', title: '견적 비교',
      desc: '기준가 분포 위에서 도착한 견적들을 비교하고 선택합니다.',
      href: '/quotes',
      cta: '견적 비교 열기',
    },
    {
      icon: 'calendar-event', title: '예약 · 결제',
      desc: '선택한 견적으로 방문 일정을 잡고 에스크로에 예치합니다.',
      href: '/booking',
      cta: '예약 화면 열기',
    },
    {
      icon: 'clipboard-list', title: '추가금 승인',
      desc: extra != null
        ? `이번 세션 승인: ${extra.toLocaleString()}원 — 내역을 다시 볼 수 있습니다.`
        : '현장에서 변수가 나오면 항목별로 보고 승인하는 화면입니다.',
      href: '/variation',
      badge: extra != null ? { label: '승인 완료', cls: 'b-green' } : undefined,
      cta: '승인 내역 열기',
    },
    {
      icon: 'chart-line', title: '시공 진행 상황',
      desc: live
        ? `${live.day} ${live.time} · ${live.amountWon.toLocaleString()}원 · 실예약이 진행 중입니다.`
        : '예약이 확정되면 여기서 단계별 진행을 추적합니다.',
      href: '/tracking',
      badge: bk,
      cta: '진행 상황 보기',
      highlight: live?.status === 'await_approval',
    },
    {
      icon: 'shield-check', title: '보증서 · 보험 청구',
      desc: '완료 승인 후 디지털 보증서가 발급되고, 보험 청구용 내역서를 내려받을 수 있습니다.',
      href: '/warranty',
      cta: '보증서 보기',
    },
  ];

  return (
    <section className="page on" id="p-journey" data-react>
      <div className="phead"><div className="phead__in">
        <div className="crumb"><Link href="/">홈</Link><span>›</span><b>내 진행 현황</b></div>
        <h1>내 진행 현황</h1>
        <p className="sub">진단부터 보증까지 — 어느 단계든 여기서 다시 들어갈 수 있습니다.
          {!diag && ' 진단·견적 데이터는 브라우저 세션 기준이라, 새 창에서는 데모 데이터로 표시됩니다.'}</p>
      </div></div>

      <div className="flow solo">
        <div className="col gap12" style={{ maxWidth: 860 }}>
          {steps.map(s => (
            <Link key={s.href} href={s.href} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="panel row gap16" style={{ padding: '18px 22px', cursor: 'pointer', alignItems: 'center',
                ...(s.highlight ? { boxShadow: '0 0 0 2px var(--sg-text-warning) inset' } : {}) }}>
                <span style={{ flex: '0 0 44px', height: 44, borderRadius: 12, background: 'var(--sg-bg-brand-subtle)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: 'var(--sg-brand-primary)' }}>
                  <Ic id={s.icon} /></span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="row gap8" style={{ marginBottom: 2 }}>
                    <span className="t-h16">{s.title}</span>
                    {s.badge && <span className={'badge b12 ' + s.badge.cls}>{s.badge.label}</span>}
                  </div>
                  <div className="t-b14 c-sec">{s.desc}</div>
                </div>
                <span className="t-b14 c-brand fw6" style={{ flex: '0 0 auto' }}>{s.cta} ›</span>
              </div>
            </Link>
          ))}
          <div className="callout" style={{ marginTop: 4 }}>
            <span className="c-ter" style={{ flex: '0 0 20px' }}>ⓘ</span>
            <p className="t-b12 c-sec" style={{ margin: 0 }}>새 진단을 시작하려면 <Link href="/diagnose" className="c-brand fw6">사진 진단</Link>으로,
              지난 시공 기록은 <Link href="/history" className="c-brand fw6">우리집 이력</Link>에서 볼 수 있습니다.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
