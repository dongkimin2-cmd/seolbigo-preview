// E1-5: 진단 사진 업로드 — Supabase Storage 어댑터 (2026-08-10)
// 키가 있으면 'photos' 버킷(비공개)에 업로드, 없으면 mock 경로 반환 (데모 무변화).
// 선행 작업(사용자, Supabase 대시보드): Storage → New bucket → 이름 'photos', Public OFF.
//   서버는 service role 로 접근하므로 별도 Storage 정책 없이 동작합니다.
//   소비자 화면에 사진을 다시 보여줄 때는 createSignedUrl 로 발급 (후속 과제).
import { hasSupabase, supabase } from './db';

const BUCKET = 'photos';
const MAX_FILES = 5;
const MAX_BYTES = 50 * 1024 * 1024;
const OK_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4'];

// FormData 의 File 들을 업로드하고 저장 경로 목록을 반환 (best-effort — 실패한 파일은 건너뜀)
export async function uploadDiagnosisPhotos(files: File[]): Promise<string[]> {
  const targets = files
    .filter(f => f.size > 0 && f.size <= MAX_BYTES && OK_TYPES.includes(f.type))
    .slice(0, MAX_FILES);
  if (!targets.length) return [];
  if (!hasSupabase) {
    // mock 모드: 실제 저장 없이 경로만 기록 (인박스 '사진 n장' 표시용)
    return targets.map((f, i) => `mock://diagnose/${Date.now().toString(36)}-${i}-${f.name}`);
  }
  const out: string[] = [];
  const stamp = Date.now().toString(36);
  for (let i = 0; i < targets.length; i++) {
    const f = targets[i];
    const ext = (f.name.split('.').pop() ?? 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
    const path = `diagnose/${stamp}-${i}.${ext}`;
    try {
      const { error } = await supabase().storage.from(BUCKET)
        .upload(path, Buffer.from(await f.arrayBuffer()), { contentType: f.type, upsert: false });
      if (!error) out.push(path);
    } catch { /* best-effort */ }
  }
  return out;
}
