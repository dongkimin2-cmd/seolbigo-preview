'use client';
// 정산 클라이언트 — lib/pro-data 의 KPI·정산 내역을 렌더, 월 select 로 내역 필터링 실동작 (2026-08-04)
import { useMemo, useState } from 'react';
import {
  SETTLE_KPIS, SETTLE_MONTHS, SETTLE_ROWS, type SettleMonth,
} from '../../lib/pro-data';
import type { SettledBooking } from '../../lib/db';

export default function ProSettleClient({ settled = [] }: { settled?: SettledBooking[] }) {
  const liveTotal = settled.reduce((t, b) => t + b.payoutWon, 0);
  const [month, setMonth] = useState<SettleMonth>(SETTLE_MONTHS[0]);

  const rows = useMemo(() => SETTLE_ROWS.filter(r => r.month === month), [month]);

  return (
    <div data-react>
      <h1 className="t-h24" style={{ margin: "0 0 4px" }}>정산</h1>
      <p className="t-b14 c-sec" style={{ margin: "0 0 20px" }}>고객이 완료 승인한 건은 매주 금요일에 지급됩니다.</p>

      <div className="grid g4" style={{ gap: 12, marginBottom: 16 }}>
        {SETTLE_KPIS.map(k => (
          <div key={k.label} className="panel"
            style={k.brandPanel ? { background: "var(--sg-bg-brand-subtle)", boxShadow: "none" } : undefined}>
            <div className="t-b12 c-sec">{k.label}</div>
            <div className={k.valueClass} style={{ margin: "4px 0 2px" }}>{k.value}</div>
            <div className={k.subClass}>{k.sub}</div></div>
        ))}
      </div>

      {settled.length > 0 && (
        <div className="callout" style={{ marginBottom: 16, background: "var(--sg-bg-brand-subtle)" }}>
          <span className="c-brand" style={{ flex: "0 0 20px" }}>✓</span>
          <p className="t-b14" style={{ margin: 0 }}><b>실거래 {settled.length}건 완료 승인</b> — 지급 예정
            합계 <b className="num">{liveTotal.toLocaleString()}원</b> (거래액의 90% = 수수료 8%·보증기금 2% 차감)</p>
        </div>
      )}
      <div className="panel" style={{ marginBottom: 16 }}>
        <div className="row between" style={{ marginBottom: 14 }}>
          <h3 className="panel__t" style={{ margin: "0" }}>정산 내역</h3>
          <select className="inp" value={month} onChange={e => setMonth(e.target.value as SettleMonth)}
            style={{ width: "auto", height: 34, padding: "0 34px 0 12px", fontSize: 13 }}>
            {SETTLE_MONTHS.map(m => <option key={m}>{m}</option>)}</select></div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <tbody><tr><th style={{ textAlign: "left", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>완료일</th>
            <th style={{ textAlign: "left", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>시공</th>
            <th style={{ textAlign: "right", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>거래액</th>
            <th style={{ textAlign: "right", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>수수료</th>
            <th style={{ textAlign: "right", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>보증기금</th>
            <th style={{ textAlign: "right", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>지급액</th>
            <th style={{ textAlign: "right", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>상태</th></tr>
          {settled.map(b => (
            <tr key={b.id}><td className="num" style={{ padding: "12px 0", borderBottom: "1px solid var(--sg-border-subtle)" }}>{b.day || '—'}</td>
              <td style={{ borderBottom: "1px solid var(--sg-border-subtle)" }}>배관 이음부 보수 · 실거래 <span className="badge b-brand b12">실시간</span></td>
              <td className="num" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>{b.amountWon.toLocaleString()}</td>
              <td className="num c-sec" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>−{b.feeWon.toLocaleString()}</td>
              <td className="num c-sec" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>−{b.fundWon.toLocaleString()}</td>
              <td className="num fw7" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>{b.payoutWon.toLocaleString()}</td>
              <td style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}><span className="badge b-green">지급 예정</span></td></tr>
          ))}
          {rows.map((r, i) => {
            // 마지막 행은 하단 경계선 없음 (목업과 동일)
            const bb = i < rows.length - 1 ? "1px solid var(--sg-border-subtle)" : undefined;
            return (
              <tr key={r.id}><td className="num" style={{ padding: "12px 0", borderBottom: bb }}>{r.date}</td>
                <td style={{ borderBottom: bb }}>{r.work}</td>
                <td className="num" style={{ textAlign: "right", borderBottom: bb }}>{r.amount}</td>
                <td className="num c-sec" style={{ textAlign: "right", borderBottom: bb }}>{r.fee}</td>
                <td className="num c-sec" style={{ textAlign: "right", borderBottom: bb }}>{r.fund}</td>
                <td className="num fw7" style={{ textAlign: "right", borderBottom: bb }}>{r.payout}</td>
                <td style={{ textAlign: "right", borderBottom: bb }}><span className={'badge ' + r.status.cls}>{r.status.label}</span></td></tr>
            );
          })}
        </tbody></table>
      </div>

      <div className="grid g2" style={{ gap: 16 }}>
        <div className="panel">
          <h3 className="panel__t">SaaS 구독</h3>
          <div className="row between" style={{ marginBottom: 8 }}>
            <span className="t-b14 c-sec">플랜</span><span className="t-b14 fw6">프로 (필모그래피 무제한)</span></div>
          <div className="row between" style={{ marginBottom: 8 }}>
            <span className="t-b14 c-sec">월 이용료</span><span className="t-b14 fw6 num">49,000원</span></div>
          <div className="row between"><span className="t-b14 c-sec">다음 결제일</span><span className="t-b14 fw6">2026.12.01</span></div>
          <hr className="hair" style={{ margin: "14px 0" }} />
          <p className="t-b12 c-sec" style={{ margin: "0" }}>견적·일정 도구, 필모그래피 호스팅, 세무 연계 리포트가 포함됩니다.</p>
        </div>
        <div className="panel">
          <h3 className="panel__t">세무 리포트</h3>
          <p className="t-b12 c-sec" style={{ margin: "-8px 0 14px" }}>플랫폼 거래 내역을 부가세 신고 양식으로 내려받을 수 있습니다.</p>
          <div className="col gap8">
            <button className="btn medium outlined block">2026년 2기 예정신고 자료</button>
            <button className="btn medium ghost block">전체 거래내역 엑셀 내려받기</button>
          </div>
        </div>
      </div>
    </div>
  );
}
