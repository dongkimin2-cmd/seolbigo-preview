'use client';
// 청구 심사 인박스 클라이언트 — lib/ins-data 의 청구 목록을 받아
// 필터 칩(aria-pressed)·정렬을 수행. CasesClient 의 useMemo 패턴을 따름.
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { INS_HOME_KPIS, INS_CLAIMS, type InsClaim } from '../../lib/ins-data';
import { GO_ROUTES } from '../../lib/routes';
import { toast } from '../../lib/toast';

// 칩 라벨의 건수(218/186/…)는 전체 모수 기준 연출 값 — 데모 목록 5건과는 별개
const FILTERS = [
  { id: 'linked', label: '설비고 연계 218', test: (_c: InsClaim) => true },
  { id: 'inRange', label: '표준 범위 내 186', test: (c: InsClaim) => c.band === 'in' },
  { id: 'review', label: '검토 필요 24', test: (c: InsClaim) => c.band === 'review' },
  { id: 'outlier', label: '이상치 8', test: (c: InsClaim) => c.band === 'outlier' },
  { id: 'docs', label: '서류 미비 12', test: (c: InsClaim) => !!c.docsMissing },
] as const;

type SortKey = 'latest' | 'amountDesc' | 'outlierFirst';

// 이상치 우선 정렬용 순위 (이상치 → 검토 필요 → 범위 내)
const BAND_RANK: Record<InsClaim['band'], number> = { outlier: 0, review: 1, in: 2 };

export default function InsInboxClient() {
  const [active, setActive] = useState<Set<string>>(() => new Set(['linked']));
  const [sort, setSort] = useState<SortKey>('latest');

  const toggle = (id: string) => setActive(prev => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });

  const list = useMemo(() => {
    let out = INS_CLAIMS.filter(c =>
      FILTERS.every(f => !active.has(f.id) || f.test(c)));
    if (sort === 'amountDesc') out = [...out].sort((a, b) => b.amountWon - a.amountWon);
    else if (sort === 'outlierFirst') out = [...out].sort((a, b) => BAND_RANK[a.band] - BAND_RANK[b.band]);
    return out; // 'latest' 는 접수번호 역순인 원본 순서 유지
  }, [active, sort]);

  return (
    <>
      <div className="row between" style={{ marginBottom: 20, alignItems: "flex-start" }}>
        <div><h1 className="t-h24" style={{ margin: "0" }}>누수 청구 심사</h1>
          <p className="t-b14 c-sec" style={{ margin: "4px 0 0" }}>설비고 연계 건은 표준 공정 DB 대조 결과가 함께 들어옵니다. 판단은 손해사정이 합니다.</p></div>
        <button className="btn medium outlined" onClick={() => toast('데모에서는 다운로드가 생략됩니다')}>엑셀 내려받기</button>
      </div>

      <div className="grid g4" style={{ gap: 12, marginBottom: 16 }}>
        {INS_HOME_KPIS.map(k => (
          <div key={k.label} className="panel"
            style={k.subtleBg ? { background: `var(--sg-bg-${k.subtleBg}-subtle)`, boxShadow: "none" } : undefined}>
            <div className="t-b12 c-sec">{k.label}</div>
            <div className={'t-h24 num' + (k.valueClass ? ' ' + k.valueClass : '')} style={{ margin: "4px 0 2px" }}>{k.value}</div>
            <div className="t-b12 c-sec">{k.sub}</div>
          </div>
        ))}
      </div>

      {/* data-react: 칩 상태는 React 가 관리 — MockupBridge 개입 금지 */}
      <div className="panel" style={{ padding: "14px 18px", marginBottom: 16 }} data-react>
        <div className="row gap6" style={{ flexWrap: "wrap" }}>
          {FILTERS.map(f => (
            <button key={f.id} className="chip sm" aria-pressed={active.has(f.id)}
              onClick={() => toggle(f.id)}>{f.label}</button>
          ))}
          <div style={{ flex: "1" }} />
          <select className="inp" value={sort} onChange={e => setSort(e.target.value as SortKey)}
            style={{ width: "auto", height: 34, padding: "0 34px 0 12px", fontSize: 13 }}>
            <option value="latest">접수 최신순</option>
            <option value="amountDesc">금액 높은순</option>
            <option value="outlierFirst">이상치 우선</option></select>
        </div>
      </div>

      <div className="panel">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <tbody><tr><th style={{ textAlign: "left", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>접수번호</th>
            <th style={{ textAlign: "left", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>사고</th>
            <th style={{ textAlign: "left", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>피보험자</th>
            <th style={{ textAlign: "right", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>청구액</th>
            <th style={{ textAlign: "left", padding: "9px 0 9px 16px", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>표준 분포 대조</th>
            <th style={{ textAlign: "right", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>상태</th>
            <th style={{ width: 90, borderBottom: "1px solid var(--sg-border-default)" }} /></tr>

          {list.map((c, i) => {
            // 마지막 행은 하단 경계선 없음 (원본 목업과 동일한 규칙)
            const bd = i < list.length - 1 ? { borderBottom: "1px solid var(--sg-border-subtle)" } : {};
            const markShadow = c.band === 'outlier'
              ? '0 0 0 3px var(--sg-bg-danger) inset,var(--sg-shadow-up-1)'
              : c.band === 'review'
                ? '0 0 0 3px var(--sg-bg-warning) inset,var(--sg-shadow-up-1)'
                : undefined;
            return (
              <tr key={c.no}><td className="num" style={{ padding: "13px 0", ...bd }}>{c.no}</td>
                <td style={{ ...bd }}>{c.incident}</td>
                <td style={{ ...bd }}>{c.insured}</td>
                <td className="num fw7" style={{ textAlign: "right", ...bd }}>{c.amountWon.toLocaleString()}</td>
                <td style={{ paddingLeft: 16, ...bd, ...(i === 0 ? { width: 180 } : {}) }}>
                  <div className="posbar"><span style={markShadow ? { left: c.posLeft, boxShadow: markShadow } : { left: c.posLeft }} /></div>
                  {c.band === 'in'
                    ? <div className="t-b12 c-suc fw6" style={{ marginTop: 4 }}>{c.verdict}</div>
                    : <div className="t-b12 fw6" style={{ marginTop: 4, color: c.band === 'outlier' ? "var(--sg-text-danger)" : "var(--sg-text-warning)" }}>{c.verdict}</div>}</td>
                <td style={{ textAlign: "right", ...bd }}><span className={'badge b-' + c.statusTone}>{c.status}</span></td>
                <td style={{ textAlign: "right", ...bd }}>
                  <Link href={GO_ROUTES['ins-case']} className={'btn tiny ' + c.openBtn}>열기</Link></td></tr>
            );
          })}
        </tbody></table>
      </div>
    </>
  );
}
