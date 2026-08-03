// POST /api/diagnose — 사진 진단 요청 (mock)
// 실제 구현 시: 업로드 → AI 분류 → 전문가 검수 큐 적재.
import { NextResponse } from 'next/server';
import { DEMO_DIAGNOSIS } from '../../../lib/mock-data';

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  // 데모: 어떤 입력이든 표준 결과 반환 (지연 연출)
  await new Promise(r => setTimeout(r, 400));
  return NextResponse.json({
    ok: true,
    input: { symptoms: body.symptoms ?? [], address: body.address ?? null },
    result: DEMO_DIAGNOSIS,
  });
}
