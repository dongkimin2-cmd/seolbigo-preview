// POST /api/groupbuy — 공동구매 참여 접수 (mock)
// 실제 구현 시: 세대 인증 → 참여 등록 → 달성 시 일정 확정 알림.
import { NextResponse } from 'next/server';
import { GROUPBUY } from '../../../lib/mock-data';

export async function POST() {
  await new Promise(r => setTimeout(r, 300));
  return NextResponse.json({ ok: true, joined: true, current: GROUPBUY.current + 1 });
}
