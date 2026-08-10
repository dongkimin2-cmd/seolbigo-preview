// /api/quotes — 진단 건에 대한 견적 목록 조회(GET) + 사업자 견적 제출(POST, E1-2)
// Supabase 키가 있으면 실DB, 없으면 mock (lib/db.ts 가 판단)
import { NextResponse } from 'next/server';
import { fetchQuotes, insertQuote } from '../../../lib/db';

export async function GET() {
  const quotes = await fetchQuotes();
  return NextResponse.json({ ok: true, quotes });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const priceWon = Number(body.priceWon);
  if (!Number.isFinite(priceWon) || priceWon <= 0) {
    return NextResponse.json({ ok: false, error: 'priceWon 이 필요합니다' }, { status: 400 });
  }
  const result = await insertQuote({
    requestId: typeof body.requestId === 'string' ? body.requestId : undefined,
    priceWon,
    note: typeof body.note === 'string' ? body.note : undefined,
    lineItems: Array.isArray(body.lineItems) ? body.lineItems : undefined,
  });
  return NextResponse.json(result, { status: result.ok ? 200 : 500 });
}
