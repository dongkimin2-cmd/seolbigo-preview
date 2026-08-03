// 데모 데이터 단일 소스 — 실제 백엔드 연결 시 이 모듈만 API 호출로 교체합니다.
// ⚠️ 수치는 목업과 동일한 데모/연출 값입니다 (프로젝트 문서 '숫자 대조표' 참고).

export type Urgency = 'normal' | 'watch' | 'caution' | 'urgent';

/* ---------- 진단 ---------- */

export const SYMPTOMS = [
  '천장에서 물이 떨어져요',
  '벽지가 젖었어요',
  '물이 잘 안 내려가요',
  '온수가 미지근해요',
  '수압이 약해요',
  '녹물이 나와요',
  '냄새가 올라와요',
  '배관에서 소리가 나요',
] as const;

export interface DiagnosisInput {
  symptoms: string[];
  address: string;
}

export interface DiagnosisResult {
  id: string;
  caseNo: string;
  title: string;              // 결과 헤드라인
  type: string;               // 하자 유형 (요약 라벨)
  description: string;        // 진단 소견
  urgency: Urgency;
  urgencyLabel: string;
  meta: string;               // 건물 요약
  confidence: { label: string; pct: number; main?: boolean }[];
  priceMin: number;           // 만원
  fairMin: number;
  fairMax: number;
  priceMid: number;
  priceMax: number;
  matchedCases: number;
  priceItems: { name: string; range: string }[];
}

export const DEMO_DIAGNOSIS: DiagnosisResult = {
  id: 'diag-demo-1',
  caseNo: 'D-2611-0417',
  title: '배관 이음부 누수로 보입니다',
  type: '배관 이음부 누수',
  description:
    '윗집 화장실 배수관과 연결된 슬래브 관통부에서 물이 스며든 형태입니다. ' +
    '벽지 얼룩의 경계가 뚜렷하고 아래로 번진 방향이 일정합니다.',
  urgency: 'caution',
  urgencyLabel: '주의 — 48시간 내 점검 권장',
  meta: '서울 강남구 청솔아파트 · 준공 1999년 · 12층 · 중앙난방',
  confidence: [
    { label: '배관 이음부 누수', pct: 87, main: true },
    { label: '방수층 손상', pct: 9 },
    { label: '결로', pct: 4 },
  ],
  priceMin: 32, fairMin: 35, fairMax: 50, priceMid: 41, priceMax: 58,
  matchedCases: 12,
  priceItems: [
    { name: '누수 탐지 (청음 · 열화상)', range: '80,000 ~ 120,000' },
    { name: '배관 이음부 보수', range: '150,000 ~ 280,000' },
    { name: '천장 마감 복구', range: '90,000 ~ 180,000' },
  ],
};

/* ---------- 견적 ---------- */

export interface Quote {
  id: string;
  proId: string;
  proName: string;
  initial: string;            // 아바타 이니셜
  rating: number;
  reviews: number;
  filmCount: number;          // 필모그래피 건수
  redoRate: number;           // 재시공률 %
  responseTime: string;
  priceWon: number;           // 원 단위
  badges: { label: string; tone: 'gline' | 'green' | 'blue' | 'orange' }[];
  recommended?: boolean;      // 기준가 적합 · 추천
  warning?: string;           // 적정 구간 이탈 사유
}

export const DEMO_QUOTES: Quote[] = [
  {
    id: 'q1', proId: '1', proName: '김남한집설비', initial: '김',
    rating: 4.9, reviews: 126, filmCount: 84, redoRate: 1.2, responseTime: '28분',
    priceWon: 410_000, recommended: true,
    badges: [
      { label: '누수탐지 포함', tone: 'gline' },
      { label: '천장복구 포함', tone: 'gline' },
      { label: '오늘 오후 방문 가능', tone: 'green' },
      { label: '보험 서류 대행', tone: 'blue' },
      { label: '1년 보증', tone: 'gline' },
    ],
  },
  {
    id: 'q2', proId: '2', proName: '한빛배관', initial: '한',
    rating: 4.8, reviews: 89, filmCount: 51, redoRate: 2.0, responseTime: '1시간',
    priceWon: 360_000,
    badges: [
      { label: '누수탐지 포함', tone: 'gline' },
      { label: '천장복구 별도', tone: 'orange' },
      { label: '모레 방문', tone: 'gline' },
      { label: '1년 보증', tone: 'gline' },
    ],
  },
  {
    id: 'q3', proId: '3', proName: '대성설비', initial: '대',
    rating: 4.6, reviews: 34, filmCount: 12, redoRate: 4.1, responseTime: '3시간',
    priceWon: 520_000,
    warning:
      '적정 구간을 벗어났습니다. 사업자가 밝힌 사유는 "배관 전체 교체 필요 판단"입니다. ' +
      '현장 확인 전 판단이므로 방문 후 재견적을 요청하는 것을 권합니다.',
    badges: [
      { label: '누수탐지 포함', tone: 'gline' },
      { label: '천장복구 별도', tone: 'orange' },
      { label: '1년 보증', tone: 'gline' },
    ],
  },
];

/* ---------- 시공 사례 ---------- */

export interface CaseItem {
  id: string;
  title: string;
  work: string;
  price: number;              // 만원
  tone: 'wet' | 'pipe' | 'clean';
}

export const DEMO_CASES: CaseItem[] = [
  { id: '1', title: '안방 천장 누수', work: '윗집 배관 이음부 · 보수', price: 38, tone: 'wet' },
  { id: '2', title: '주방 배수관 역류', work: '고압세정', price: 22, tone: 'pipe' },
  { id: '3', title: '온수 수압 저하', work: '난방배관 클리닝', price: 34, tone: 'clean' },
  { id: '4', title: '화장실 바닥 누수', work: '방수 재시공', price: 96, tone: 'wet' },
  { id: '5', title: '세면대 하부 누수', work: '배수 트랩 교체', price: 9, tone: 'pipe' },
  { id: '6', title: '난방 온도 편차', work: '분배기 점검', price: 15, tone: 'clean' },
];
