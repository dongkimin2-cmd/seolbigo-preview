// POST /api/diagnose — 사진 진단 요청
// DB 모드: requests 행 생성 (AI 파이프라인 연결 전까지 결과는 표준 데모 진단)
// 실제 구현 시: 업로드(Storage) → AI 분류(비전모델 API + 규칙 하이브리드) → 전문가 검수 큐.
import { NextResponse } from 'next/server';
import { DEMO_DIAGNOSIS } from '../../../lib/mock-data';
import { insertRequest } from '../../../lib/db';

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const input = {
    symptoms: Array.isArray(body.symptoms) ? body.symptoms : [],
    address: typeof body.address === 'string' ? body.address : '',
  };
  const request = await insertRequest(input);
  await new Promise(r => setTimeout(r, 400));   // 분석 지연 연출
  return NextResponse.json({
    ok: true,
    requestId: request.id,
    input,
    result: DEMO_DIAGNOSIS,
  });
}
