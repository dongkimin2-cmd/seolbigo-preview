// POST /api/diagnose — 사진 진단 요청
// DB 모드: requests 행 생성 + 사진 Storage 업로드 (E1-5) / AI 파이프라인 연결 전까지 결과는 표준 데모 진단
// 요청 형식: JSON(사진 없음) 또는 multipart FormData(photos[] 포함) 둘 다 지원.
// 실제 구현 시: 업로드(Storage) → AI 분류(비전모델 API + 규칙 하이브리드) → 전문가 검수 큐.
import { NextResponse } from 'next/server';
import { DEMO_DIAGNOSIS } from '../../../lib/mock-data';
import { insertRequest } from '../../../lib/db';
import { uploadDiagnosisPhotos } from '../../../lib/storage';

export async function POST(req: Request) {
  let symptoms: string[] = [];
  let address = '';
  let photos: string[] = [];

  const ctype = req.headers.get('content-type') ?? '';
  if (ctype.includes('multipart/form-data')) {
    const fd = await req.formData().catch(() => null);
    if (fd) {
      symptoms = fd.getAll('symptoms').map(String).filter(Boolean);
      address = String(fd.get('address') ?? '');
      const files = fd.getAll('photos').filter((v): v is File => v instanceof File);
      photos = await uploadDiagnosisPhotos(files);
    }
  } else {
    const body = await req.json().catch(() => ({}));
    symptoms = Array.isArray(body.symptoms) ? body.symptoms : [];
    address = typeof body.address === 'string' ? body.address : '';
  }

  const input = { symptoms, address };
  const request = await insertRequest({ ...input, photos });
  await new Promise(r => setTimeout(r, 400));   // 분석 지연 연출
  return NextResponse.json({
    ok: true,
    requestId: request.id,
    photoCount: photos.length,
    input,
    result: DEMO_DIAGNOSIS,
  });
}
