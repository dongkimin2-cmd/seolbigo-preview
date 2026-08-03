'use client';
// 선택한 견적을 예약 화면으로 전달하는 클라이언트 저장소
import { DEMO_QUOTES, type Quote } from './mock-data';

const KEY = 'seolbigo:selected-quote';

export function saveSelectedQuote(id: string) {
  try { sessionStorage.setItem(KEY, id); } catch { /* 무시 */ }
}

export function loadSelectedQuote(): Quote {
  try {
    const id = sessionStorage.getItem(KEY);
    return DEMO_QUOTES.find(q => q.id === id)
      ?? DEMO_QUOTES.find(q => q.recommended)
      ?? DEMO_QUOTES[0];
  } catch {
    return DEMO_QUOTES[0];
  }
}
