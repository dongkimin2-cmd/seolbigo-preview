// POST /api/variations — 현장 변수 추가금 승인
// 실제 구현 시: variation_items 승인 갱신 → 에스크로 증액 → 사업자 알림.
import { NextResponse } from 'next/server';
import { DEMO_VARIATIONS } from '../../../lib/mock-data';
import { notify } from '../../../lib/notify';

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const ids: string[] = Array.isArray(body.approvedIds) ? body.approvedIds : [];
  const items = DEMO_VARIATIONS.filter(v => v.applicable && ids.includes(v.id));
  await new Promise(r => setTimeout(r, 300));
  const approvedWon = items.reduce((s, v) => s + v.won, 0);
  void notify({ type: 'variation_approved', to: '01000000000', extraWon: approvedWon });
  return NextResponse.json({
    ok: true,
    approved: items.map(v => v.id),
    approvedWon,
    count: items.length,
  });
}
