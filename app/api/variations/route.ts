// POST /api/variations — 현장 변수 추가금 승인 (mock)
// 실제 구현 시: 승인 내역 저장 → 에스크로 증액 → 사업자 알림.
import { NextResponse } from 'next/server';
import { DEMO_VARIATIONS } from '../../../lib/mock-data';

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const ids: string[] = Array.isArray(body.approvedIds) ? body.approvedIds : [];
  const items = DEMO_VARIATIONS.filter(v => v.applicable && ids.includes(v.id));
  await new Promise(r => setTimeout(r, 300));
  const approvedWon = items.reduce((s, v) => s + v.won, 0);
  return NextResponse.json({
    ok: true,
    approved: items.map(v => v.id),
    approvedWon,
    count: items.length,
  });
}
