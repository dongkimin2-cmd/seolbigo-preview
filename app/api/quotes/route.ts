// GET /api/quotes — 진단 건에 대한 견적 목록
// Supabase 키가 있으면 실DB, 없으면 mock (lib/db.ts 가 판단)
import { NextResponse } from 'next/server';
import { fetchQuotes } from '../../../lib/db';

export async function GET() {
  const quotes = await fetchQuotes();
  return NextResponse.json({ ok: true, quotes });
}
