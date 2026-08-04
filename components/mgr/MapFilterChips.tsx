'use client';
// 이력 지도 필터 칩 — 단일 선택 aria-pressed 상태 (CasesClient 칩 패턴, 2026-08-04)
// RiserGrid 는 수정 금지 대상이라 셀 필터링 대신 선택 상태만 관리합니다.
// data-react: MockupBridge 의 칩 위임 토글과 충돌하지 않도록 표시.
import { useState } from 'react';
import { MGR_MAP_FILTERS } from '../../lib/mgr-data';

export default function MapFilterChips() {
  const [active, setActive] = useState<string>(MGR_MAP_FILTERS[0]);
  return (
    <div className="row gap6" style={{ marginBottom: 16, flexWrap: "wrap" }} data-react>
      {MGR_MAP_FILTERS.map(f => (
        <button key={f} className="chip sm" aria-pressed={active === f}
          onClick={() => setActive(f)}>{f}</button>
      ))}
    </div>
  );
}
