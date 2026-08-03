// POST /api/bookings — 예약·결제 요청
// DB 모드: bookings 행 생성 / 알림: notify 계층 (Solapi 키 있으면 실발송)
// 실제 구현 시: PG 결제창 → 에스크로 예치 → 예약 확정 · 사업자 알림.
import { NextResponse } from 'next/server';
import { DEMO_QUOTES } from '../../../lib/mock-data';
import { insertBooking } from '../../../lib/db';
import { notify } from '../../../lib/notify';

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const quote = DEMO_QUOTES.find(q => q.id === body.quoteId);
  if (!quote || !body.day || !body.time) {
    return NextResponse.json({ ok: false, error: 'quoteId · day · time 은 필수입니다.' }, { status: 400 });
  }
  const saved = await insertBooking({
    quoteId: quote.id, day: body.day, time: body.time,
    method: body.method ?? 'card', amountWon: quote.priceWon,
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
