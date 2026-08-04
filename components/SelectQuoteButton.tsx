'use client';
// 견적 카드의 "이 견적 선택" — 선택한 견적 전체를 저장한 뒤 예약 화면으로 이동
// (DB 전환: id 대신 객체 전달 — DB uuid 견적도 예약 화면이 그대로 사용)
import { useRouter } from 'next/navigation';
import { saveSelectedQuote } from '../lib/quote-store';
import type { Quote } from '../lib/mock-data';

export default function SelectQuoteButton({ quote, primary }: { quote: Quote; primary?: boolean }) {
  const router = useRouter();
  return (
    <button className={'btn medium ' + (primary ? 'primary' : 'solid')} style={{ minWidth: 150 }}
      onClick={() => { saveSelectedQuote(quote); router.push('/booking'); }}>
      이 견적 선택
    </button>
  );
}
