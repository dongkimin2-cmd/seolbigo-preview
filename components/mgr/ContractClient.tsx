'use client';
// 동별 계약 · 일정 패널 — 칩 필터(단일 선택)로 표 행을 실제 필터링 (CasesClient 패턴, 2026-08-04)
// 행 데이터는 lib/mgr-data.ts 의 MGR_CONTRACT_ROWS 단일 소스.
// data-react: MockupBridge 의 칩 위임 토글과 충돌하지 않도록 표시.
import { useMemo, useState } from 'react';
import { MGR_CONTRACT_ROWS, type ContractRow } from '../../lib/mgr-data';

// 칩 라벨의 21·14·6은 단지 전체(21개동) 기준 데모 수치 — 표는 대표 5개동 샘플만 노출
const FILTERS = [
  { id: 'all', label: '전체 21', test: (_r: ContractRow) => true },
  { id: 'contracted', label: '계약중 14', test: (r: ContractRow) => r.contracted },
  { id: 'overdue', label: '주기 초과 6', test: (r: ContractRow) => r.overdue },
] as const;

type FilterId = (typeof FILTERS)[number]['id'];

export default function ContractClient() {
  const [filter, setFilter] = useState<FilterId>('all');

  const list = useMemo(() => {
    const f = FILTERS.find(x => x.id === filter) ?? FILTERS[0];
    return MGR_CONTRACT_ROWS.filter(f.test);
  }, [filter]);

  return (
    <div className="panel" data-react>
      <div className="row between" style={{ marginBottom: 14 }}>
        <h3 className="panel__t" style={{ margin: "0" }}>동별 계약 · 일정</h3>
        <div className="row gap6">
          {FILTERS.map(f => (
            <button key={f.id} className="chip sm" aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}>{f.label}</button>
          ))}
        </div></div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
        <tbody><tr><th style={{ textAlign: "left", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>동</th>
          <th style={{ textAlign: "left", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>대상</th>
          <th style={{ textAlign: "left", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>직전 시공</th>
          <th style={{ textAlign: "left", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>산출 주기</th>
          <th style={{ textAlign: "left", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>다음 예정</th>
          <th style={{ textAlign: "right", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>상태</th></tr>
        {list.map((r, i) => {
          // 마지막 행만 구분선 없음 (원본 표기와 동일 — 위치 기준)
          const last = i === list.length - 1;
          const bb = last ? undefined : { borderBottom: "1px solid var(--sg-border-subtle)" };
          return (
            <tr key={r.dong}><td style={last ? { padding: "12px 0" } : { padding: "12px 0", borderBottom: "1px solid var(--sg-border-subtle)" }}><b>{r.dong}</b></td>
              <td style={bb}>{r.target}</td>
              <td className="num c-sec" style={bb}>{r.last}</td>
              <td style={bb}>{r.measured ? <b className="c-brand">{r.cycle}</b> : r.cycle} <span className="t-b12 c-sec">{r.cycleNote}</span></td>
              <td className="num" style={bb}>{r.next}</td>
              <td style={last ? { textAlign: "right" } : { textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}><span className={'badge b-' + r.badge.tone}>{r.badge.label}</span></td></tr>
          );
        })}
      </tbody></table>
    </div>
  );
}
