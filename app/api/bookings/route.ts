// POST /api/bookings — 예약·결제 요청
// DB 모드: bookings 행 생성 / 알림: notify 계층 (Solapi 키 있으면 실발송)
// 실제 구현 시: PG 결제창 → 에스크로 예치 → 예약 확정 · 사업자 알림.
import { NextResponse } from 'next/server';
import { fetchQuotes, insertBooking } from '../../../lib/db';
import { currentUser } from '../../../lib/auth';
import { notify } from '../../../lib/notify';

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  // DB 모드면 실제 견적 목록(uuid id), 아니면 mock 폴백 — 화면과 같은 소스로 검증
  const quotes = await fetchQuotes();
  const quote = quotes.find(q => q.id === body.quoteId);
  if (!quote || !body.day || !body.time) {
    return NextResponse.json({ ok: false, error: 'quoteId · day · time 은 필수입니다.' }, { status: 400 });
  }
  const user = await currentUser();                    // 로그인 상태면 예약을 내 계정에 귀속
  const saved = await insertBooking({
    quoteId: quote.id, day: body.day, time: body.time,
    method: body.method ?? 'card', amountWon: quote.priceWon,
    userId: user?.id,
  });
  void notify({ type: 'booking_confirmed', to: '01000000000',
    pro: quote.proName, day: body.day, time: body.time, amountWon: quote.priceWon });
  await new Promise(r => setTimeout(r, 300));
  return NextResponse.json({
    ok: true,
    booking: {
      id: saved.id ?? 'B-2611-0342',
      quoteId: quote.id,
      proName: quote.proName,
      amountWon: quote.priceWon,
      day: body.day,
      time: body.time,
      method: body.method ?? 'card',
      escrow: true,
    },
  });
}
