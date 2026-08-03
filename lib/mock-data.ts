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
  lineItems: { name: string; won: number }[];   // 결제 금액 구성
  recommended?: boolean;      // 기준가 적합 · 추천
  warning?: string;           // 적정 구간 이탈 사유
}

export const DEMO_QUOTES: Quote[] = [
  {
    id: 'q1', proId: '1', proName: '김남한집설비', initial: '김',
    rating: 4.9, reviews: 126, filmCount: 84, redoRate: 1.2, responseTime: '28분',
    priceWon: 410_000, recommended: true,
    lineItems: [
      { name: '배관 이음부 보수', won: 310_000 },
      { name: '천장 마감 복구', won: 100_000 },
    ],
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
    lineItems: [
      { name: '배관 이음부 보수', won: 310_000 },
      { name: '누수 탐지', won: 50_000 },
    ],
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
    lineItems: [
      { name: '배관 전체 교체 (견적)', won: 470_000 },
      { name: '누수 탐지', won: 50_000 },
    ],
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

/* ---------- 예약 ---------- */

export const BOOKING_DAYS = ['11/18 (화)', '11/19 (수)', '11/20 (목)', '11/21 (금)', '11/22 (토)'];
export const BOOKING_TIMES: { t: string; soldOut?: boolean }[] = [
  { t: '09:00' }, { t: '11:00' }, { t: '14:00' }, { t: '16:00' }, { t: '18:00', soldOut: true },
];

/* ---------- 유사 시공 사례 (사례 목록 화면) ---------- */

export interface SimilarCase {
  id: string;
  tone: 'wet' | 'pipe' | 'clean';
  badges: { label: string; tone: 'brand' | 'gline' | 'green' | 'orange' }[];
  title: string;
  process: string;            // 공정 요약 · 소요
  proName: string;
  proMeta: string;            // ★ 평점 (리뷰)
  priceWon: number;
  sameApt: boolean;           // 같은 아파트(청솔)
  year: number;               // 준공연도
  floorBand: boolean;         // 같은 층수대 (10~14층)
  sameSymptom: boolean;
  insurance: boolean;         // 보험 처리 건
  restore: boolean;           // 천장/마감 복구 포함
  similarity: number;         // 유사도 (정렬용)
}

export const DEMO_SIMILAR_CASES: SimilarCase[] = [
  { id: 's1', tone: 'wet',
    badges: [{ label: '같은 아파트', tone: 'brand' }, { label: '1999년', tone: 'gline' }, { label: '12층', tone: 'gline' }, { label: '중앙난방', tone: 'gline' }],
    title: '배관 이음부 보수 + 천장 마감 복구',
    process: '누수 탐지 → 이음부 실링 → 석고 보수 → 도배 · 총 4시간',
    proName: '김남한집설비', proMeta: '★ 4.9 (126)', priceWon: 380_000,
    sameApt: true, year: 1999, floorBand: true, sameSymptom: true, insurance: false, restore: true, similarity: 98 },
  { id: 's2', tone: 'wet',
    badges: [{ label: '같은 아파트', tone: 'brand' }, { label: '1999년', tone: 'gline' }, { label: '9층', tone: 'gline' }],
    title: '이음부 보수 + 부분 도배',
    process: '탐지 생략(노출 배관) → 실링 → 부분 도배 · 총 3.5시간',
    proName: '김남한집설비', proMeta: '★ 4.9 (126)', priceWon: 350_000,
    sameApt: true, year: 1999, floorBand: false, sameSymptom: true, insurance: true, restore: true, similarity: 95 },
  { id: 's3', tone: 'pipe',
    badges: [{ label: '개포늘푸른', tone: 'gline' }, { label: '2001년', tone: 'gline' }, { label: '야간작업', tone: 'orange' }],
    title: '누수 탐지 + 이음부 전체 교체',
    process: '매립관 동관 · 야간 추가금 40,000원 포함 · 총 6시간',
    proName: '한빛배관', proMeta: '★ 4.8 (89)', priceWon: 450_000,
    sameApt: false, year: 2001, floorBand: false, sameSymptom: true, insurance: false, restore: false, similarity: 91 },
  { id: 's4', tone: 'clean',
    badges: [{ label: '역삼청솔', tone: 'gline' }, { label: '1997년', tone: 'gline' }, { label: '보험 전액 처리', tone: 'green' }],
    title: '이음부 보수 (마감 복구 없음)',
    process: '윗집 일상생활배상책임보험으로 전액 처리 · 총 3시간',
    proName: '우성설비', proMeta: '★ 4.7 (52)', priceWon: 330_000,
    sameApt: false, year: 1997, floorBand: false, sameSymptom: true, insurance: true, restore: false, similarity: 89 },
  { id: 's5', tone: 'pipe',
    badges: [{ label: '잠실동백', tone: 'gline' }, { label: '2003년', tone: 'gline' }, { label: '11층', tone: 'gline' }],
    title: '슬래브 관통부 방수 + 이음부 보수',
    process: '방수층 보강 포함 · 총 7시간',
    proName: '대성설비', proMeta: '★ 4.6 (34)', priceWon: 520_000,
    sameApt: false, year: 2003, floorBand: true, sameSymptom: false, insurance: false, restore: true, similarity: 84 },
  { id: 's6', tone: 'clean',
    badges: [{ label: '신도림한내', tone: 'gline' }, { label: '1996년', tone: 'gline' }, { label: '3층', tone: 'gline' }],
    title: '이음부 보수',
    process: '단순 실링 · 총 2.5시간',
    proName: '우성설비', proMeta: '★ 4.7 (52)', priceWon: 310_000,
    sameApt: false, year: 1996, floorBand: false, sameSymptom: true, insurance: true, restore: false, similarity: 82 },
];

/* ---------- 현장 변수 추가금 (변경 승인 화면) ---------- */

export interface VariationItem {
  id: string;
  name: string;
  won: number;                // 추가금 (원)
  reason: string;             // 근거 설명
  standardRange?: string;     // 플랫폼 표준 단가
  applicable: boolean;        // false = 이번 현장 해당 없음
  note?: string;              // 해당 없음 사유
}

export const DEMO_VARIATIONS: VariationItem[] = [
  { id: 'v1', name: '준공 25년 초과 노후 배관', won: 30_000, applicable: true,
    reason: '관 재질이 삭아 인접 구간까지 함께 보강해야 합니다.',
    standardRange: '25,000~35,000원' },
  { id: 'v2', name: '매립관 (동관) 절개 필요', won: 50_000, applicable: true,
    reason: '노출 배관이 아니라 벽체 절개·복구 공정이 추가됩니다.',
    standardRange: '40,000~60,000원' },
  { id: 'v3', name: '야간 작업 (18시 이후)', won: 40_000, applicable: false,
    reason: '', note: '해당 없음 — 주간 시공' },
  { id: 'v4', name: '접근성 제약 (고층 · 협소)', won: 20_000, applicable: false,
    reason: '', note: '해당 없음' },
];
