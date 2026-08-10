// E1-3: 기준가 자동 판정 규칙 엔진 (서버측) — 2026-08-10
// 모델이 아니라 규칙이 가격을 판정합니다 (설명 가능성 원칙 — 백로그 E3).
// ⚠️ 표준 범위·적정 구간은 데모 값 — 실단가표 입수 시 공정 DB 로 교체 (숫자 대조표 참고).

export interface LineItem { name: string; won: number }

// 표준 공정 단가 범위 (데모: 누수피해복구 계열) — pro-data QUOTE_LINE_ITEMS 와 동일 원본
const STANDARD_RANGES: Record<string, [number, number]> = {
  '누수 탐지 (청음 + 열화상)': [80_000, 120_000],
  '배관 이음부 실링·보수 (2개소)': [150_000, 280_000],
  '천장 마감 복구 (석고 + 도배)': [90_000, 180_000],
};

// 총액 기준 (데모 진단과 동일: 분포 32~58만 · 적정 35~50만)
export const FAIR = { minMan: 35, maxMan: 50, distMinMan: 32, distMaxMan: 58 };

export type Verdict = 'fair' | 'low' | 'over';

export interface Assessment {
  verdict: Verdict;
  warning?: string;          // 소비자 화면 경고문 (없으면 표시 안 함)
  outOfRangeItems: string[]; // 표준 범위 이탈 공정명
}

export function assessQuote(lineItems: LineItem[], totalWon: number, proNote?: string): Assessment {
  const out: string[] = [];
  for (const li of lineItems) {
    const r = STANDARD_RANGES[li.name];
    if (r && (li.won < r[0] || li.won > r[1])) out.push(li.name);
  }
  const man = totalWon / 10_000;
  const verdict: Verdict = man < FAIR.minMan ? 'low' : man > FAIR.maxMan ? 'over' : 'fair';

  const parts: string[] = [];
  if (verdict === 'over') {
    parts.push(`적정 구간(${FAIR.minMan}~${FAIR.maxMan}만원)을 웃도는 금액입니다.`);
  } else if (verdict === 'low') {
    parts.push(`적정 구간(${FAIR.minMan}~${FAIR.maxMan}만원)보다 낮은 금액입니다. 빠진 공정이 없는지 확인하세요.`);
  }
  if (out.length) {
    parts.push(`표준 단가 범위를 벗어난 공정: ${out.join(', ')}.`);
  }
  if (parts.length && verdict === 'over') {
    parts.push(proNote?.trim() ? `사업자 사유: ${proNote.trim()}` : '포함 공정을 확인하세요.');
  }
  return { verdict, warning: parts.length ? parts.join(' ') : undefined, outOfRangeItems: out };
}
