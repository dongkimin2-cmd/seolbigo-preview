'use client';
// 입상관 계통도 (목업 _p9 riserGrid 이식) — 20층 × 4라인, 이력 셀 클릭 선택
// 가상 제원 유지 (2026.08.03 결정 — 특정 단지 영업용은 그 단지 제원으로 별도 제작)
import { useState } from 'react';

const HIST: Record<string, [keyof typeof COL, string]> = {
  '12-3': ['repeat', '2회'], '12-1': ['leak', '누수'], '9-3': ['leak', '누수'],
  '5-2': ['clean', '세정'], '5-3': ['clean', '세정'], '5-1': ['clean', '세정'], '5-4': ['clean', '세정'],
  '3-4': ['swap', '교체'], '15-2': ['leak', '누수'], '7-1': ['clean', '세정'], '18-3': ['leak', '누수'],
};
const COL = {
  leak: ['#F1EEFF', '#5400D7'], clean: ['#E7F4FF', '#0060B8'],
  swap: ['#E7FCEF', '#00733F'], repeat: ['#FDEBEC', '#C11C26'],
} as const;

export default function RiserGrid() {
  const [sel, setSel] = useState('12-3');
  const rows = [];
  for (let f = 20; f >= 1; f--) {
    rows.push(<div key={`fl-${f}`} className="fl">{f}F</div>);
    for (let l = 1; l <= 4; l++) {
      const k = `${f}-${l}`;
      const d = HIST[k];
      rows.push(
        <div key={k} className={'cell' + (sel === k ? ' sel' : '')}
          onClick={() => setSel(k)}
          style={d ? { background: COL[d[0]][0], color: COL[d[0]][1] } : undefined}>
          {d ? d[1] : ''}
        </div>
      );
    }
  }
  return <div className="risergrid" id="riserGrid">{rows}</div>;
}
