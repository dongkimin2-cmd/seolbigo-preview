'use client';
// 승인된 현장 변수 추가금을 시공 추적 화면으로 전달하는 클라이언트 저장소
const KEY = 'seolbigo:variation';

export interface VariationDecision {
  approvedIds: string[];
  extraWon: number;
}

export function saveVariation(v: VariationDecision) {
  try { sessionStorage.setItem(KEY, JSON.stringify(v)); } catch { /* 무시 */ }
}

export function loadVariation(): VariationDecision | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? JSON.parse(raw) as VariationDecision : null;
  } catch { return null; }
}
