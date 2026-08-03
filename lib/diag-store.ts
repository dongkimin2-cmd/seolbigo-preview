'use client';
// 진단 요청/응답을 페이지 간에 전달하는 클라이언트 저장소.
// 실제 서비스에서는 서버 세션·DB 로 대체될 지점입니다.
import type { DiagnosisInput, DiagnosisResult } from './mock-data';

const KEY = 'seolbigo:diagnosis';

export interface DiagnosisSession {
  input: DiagnosisInput;
  result: DiagnosisResult;
}

export function saveDiagnosis(s: DiagnosisSession) {
  try { sessionStorage.setItem(KEY, JSON.stringify(s)); } catch { /* 무시 */ }
}

export function loadDiagnosis(): DiagnosisSession | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? JSON.parse(raw) as DiagnosisSession : null;
  } catch { return null; }
}
