// GET /api/quotes — 진단 건에 대한 견적 목록 (mock)
import { NextResponse } from 'next/server';
import { DEMO_QUOTES } from '../../../lib/mock-data';

export async function GET() {
  await new Promise(r => setTimeout(r, 200));
  return NextResponse.json({ ok: true, quotes: DEMO_QUOTES });
}
