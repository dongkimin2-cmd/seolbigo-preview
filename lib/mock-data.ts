// 데모 데이터 단일 소스 — 실제 백엔드 연결 시 이 모듈만 API 호출로 교체합니다.
// ⚠️ 수치는 목업과 동일한 데모/연출 값입니다 (프로젝트 문서 '숫자 대조표' 참고).

export type Urgency = 'normal' | 'watch' | 'caution' | 'urgent';

export interface DiagnosisResult {
  id: string;
  type: string;          // 하자 유형
  urgency: Urgency;
  priceMin: number;      // 기준가 범위 (만원)
  priceMax: number;
  matchedCases: number;
}

export interface Quote {
  id: string;
  proId: string;
  proName: string;
  grade: string;
  price: number;         // 만원
  warrantyMonths: number;
  cases: number;
  message: string;
}

export interface CaseItem {
  id: string;
  title: string;
  work: string;
  price: number;         // 만원
  tone: 'wet' | 'pipe' | 'clean';
}

export const DEMO_DIAGNOSIS: DiagnosisResult = {
  id: 'diag-demo-1',
  type: '천장 누수 (윗집 온수배관 이음부 추정)',
  urgency: 'caution',
  priceMin: 32,
  priceMax: 41,
  matchedCases: 12,
};

export const DEMO_QUOTES: Quote[] = [
  { id: 'q1', proId: '1', proName: '한빛설비', grade: 'A', price: 38, warrantyMonths: 12, cases: 214, message: '이음부 교체 + 석고 복구 포함가입니다.' },
  { id: 'q2', proId: '2', proName: '청솔종합설비', grade: 'A', price: 35, warrantyMonths: 12, cases: 178, message: '동일 단지 시공 이력 9건 보유.' },
  { id: 'q3', proId: '3', proName: '강남배관테크', grade: 'B', price: 41, warrantyMonths: 12, cases: 96, message: '탐지 장비 무상 재점검 포함.' },
];

export const DEMO_CASES: CaseItem[] = [
  { id: '1', title: '안방 천장 누수', work: '윗집 배관 이음부 · 보수', price: 38, tone: 'wet' },
  { id: '2', title: '주방 배수관 역류', work: '고압세정', price: 22, tone: 'pipe' },
  { id: '3', title: '온수 수압 저하', work: '난방배관 클리닝', price: 34, tone: 'clean' },
  { id: '4', title: '화장실 바닥 누수', work: '방수 재시공', price: 96, tone: 'wet' },
  { id: '5', title: '세면대 하부 누수', work: '배수 트랩 교체', price: 9, tone: 'pipe' },
  { id: '6', title: '난방 온도 편차', work: '분배기 점검', price: 15, tone: 'clean' },
];
