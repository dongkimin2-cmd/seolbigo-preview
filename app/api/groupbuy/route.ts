// POST /api/groupbuy — 공동구매 참여 접수
// DB 모드: groupbuy_participants 행 생성 후 실제 참여 수 반환
import { NextResponse } from 'next/server';
import { GROUPBUY } from '../../../lib/mock-data';
import { joinGroupbuy } from '../../../lib/db';
import { notify } from '../../../lib/notify';

export async function POST() {
  const current = await joinGroupbuy();
  void notify({ type: 'groupbuy_joined', to: '01000000000',
    complex: GROUPBUY.complex, current, goal: GROUPBUY.goal });
  return NextResponse.json({ ok: true, joined: true, current });
}
