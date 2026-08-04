'use client';
// 선택한 견적을 예약 화면으로 전달하는 클라이언트 저장소
// DB 전환(2026-08-04): id 만 저장하면 DB uuid 를 mock 목록에서 못 찾으므로 견적 객체 전체를 저장.
// (서버 세션/DB 로 교체되는 지점 — Auth 도입 시 재설계)
import { DEMO_QUOTES, type Quote } from './mock-data';

const KEY = 'seolbigo:selected-quote';

export function saveSelectedQuote(q: Quote) {
  try { sessionStorage.setItem(KEY, JSON.stringify(q)); } catch { /* 무시 */ }
}

export function loadSelectedQuote(): Quote {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (raw) {
      if (raw.startsWith('{')) return JSON.parse(raw) as Quote;
      // 구버전 호환: id 문자열만 저장돼 있던 세션
      const found = DEMO_QUOTES.find(q => q.id === raw);
      if (found) return found;
    }
  } catch { /* 무시 */ }
  return DEMO_QUOTES.find(q => q.recommended) ?? DEMO_QUOTES[0];
}
