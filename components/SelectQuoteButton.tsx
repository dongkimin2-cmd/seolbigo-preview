'use client';
// 견적 카드의 "이 견적 선택" — 선택을 저장한 뒤 예약 화면으로 이동
import { useRouter } from 'next/navigation';
import { saveSelectedQuote } from '../lib/quote-store';

export default function SelectQuoteButton({ quoteId, primary }: { quoteId: string; primary?: boolean }) {
  const router = useRouter();
  return (
    <button className={'btn medium ' + (primary ? 'primary' : 'solid')} style={{ minWidth: 150 }}
      onClick={() => { saveSelectedQuote(quoteId); router.push('/booking'); }}>
      이 견적 선택
    </button>
  );
}
