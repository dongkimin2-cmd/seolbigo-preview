'use client';
// 단지 동별 위험도 그리드 (목업 _p9 dongGrid 이식) — 클릭 시 동 선택
import { useState } from 'react';

const RISK = [3, 1, 0, 2, 1, 0, 1, 0, 2, 1, 0, 3, 1, 0, 1, 0, 1, 2, 0, 1, 0];
const BG = ['#E7FCEF', '#FFF7F0', '#FFE0CC', '#FDEBEC'];
const FG = ['#00A163', '#C46000', '#B4520A', '#D0212E'];
const LABEL = ['양호', '관찰', '주의', '조치'];

export default function DongGrid() {
  const [sel, setSel] = useState<number | null>(null);
  return (
    <div className="donggrid" id="dongGrid">
      {RISK.map((r, i) => (
        <div key={i} className="dong" onClick={() => setSel(i)}
          style={{ background: BG[r], color: FG[r],
            outline: sel === i ? '2px solid var(--sg-gray-900)' : undefined, outlineOffset: -2 }}>
          {101 + i * 2}동<em>{LABEL[r]}</em>
        </div>
      ))}
    </div>
  );
}
