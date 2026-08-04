// 사업자 센터(pro-center) 데이터 단일 소스 — 실제 백엔드 연결 시 이 모듈만 API 호출로 교체합니다.
// ⚠️ 수치·문구는 목업과 동일한 데모/연출 값입니다 (프로젝트 문서 '숫자 대조표' 참고).
//    표시 문자열은 목업 원문 그대로 보존해야 하므로 포맷팅 없이 문자열로 저장합니다.

/* ---------- 공용 ---------- */

// 사진 플레이스홀더 톤 ('' = 톤 없는 기본 ph)
export type PhTone = '' | 'wet' | 'pipe' | 'clean';

// KPI 스탯 카드 (대시보드 · 정산 상단 공용)
export interface StatCard {
  label: string;
  value: string;          // 표기 원문 그대로 (예: '8,420,000원')
  valueClass: string;     // 값 전체 클래스 (예: 't-h24 num c-brand')
  sub: string;
  subClass: string;       // 보조문 전체 클래스 (예: 't-b12 c-suc fw6')
  brandPanel?: boolean;   // 브랜드 배경 패널 (background + boxShadow:none)
}

/* ---------- 대시보드 ---------- */

export const PRO_KPIS: StatCard[] = [
  { label: '이번 달 수주액', value: '8,420,000원', valueClass: 't-h24 num',
    sub: '지난달 대비 +18%', subClass: 't-b12 c-suc fw6' },
  { label: '절감한 광고비', value: '1,200,000원', valueClass: 't-h24 num c-brand',
    sub: '포털 광고 · 매칭앱 크레딧 기준', subClass: 't-b12 c-sec', brandPanel: true },
  { label: '검증 필모그래피', value: '84건', valueClass: 't-h24 num',
    sub: '이번 달 +6건 자동 생성', subClass: 't-b12 c-sec' },
  { label: '재시공률', value: '1.2%', valueClass: 't-h24 num c-suc',
    sub: '업계 평균 4.8%', subClass: 't-b12 c-sec' },
];

// 오늘 일정
export interface TodayJob {
  time: string;
  timeBadge: 'b-brands' | 'b-gray';
  title: string;
  meta: string;
  status: string;
  statusBadge: 'b-orange' | 'b-gline';
}

export const TODAY_JOBS: TodayJob[] = [
  { time: '14:00', timeBadge: 'b-brands', title: '배관 이음부 보수 + 천장 복구',
    meta: '청솔 103동 1204호 · 490,000원 (추가금 승인 완료)', status: '시공중', statusBadge: 'b-orange' },
  { time: '17:30', timeBadge: 'b-gray', title: '난방배관 클리닝',
    meta: '개포늘푸른 5동 902호 · 220,000원', status: '예정', statusBadge: 'b-gline' },
];

// 새로 들어온 요청 (대시보드 요약 카드)
export interface DashRequest {
  id: string;
  tone: PhTone;
  badges: { label: string; cls: string }[];   // badge 뒤에 붙는 톤 클래스
  title: string;
  meta: string;
  action:
    | { kind: 'quote'; label: string }                                   // 견적 작성 → pro-quote 이동
    | { kind: 'accept'; label: string; done: string; toast: string };    // 수락 → done 상태 전이
}

export const DASH_REQUESTS: DashRequest[] = [
  { id: 'dr1', tone: 'wet',
    badges: [{ label: '긴급', cls: 'b-red' }, { label: '청솔 · 1999년', cls: 'b-gline' }],
    title: '안방 천장 누수 — AI 진단 완료',
    meta: '기준가 32~58만원 · 경쟁 견적 1건 · 마감 6시간 전',
    action: { kind: 'quote', label: '견적 작성' } },
  { id: 'dr2', tone: 'clean',
    badges: [{ label: '즉시 견적', cls: 'b-brand' }, { label: '34평', cls: 'b-gline' }],
    title: '수도배관 클리닝 — 확정가 상품',
    meta: '180,000원 · 수락만 하면 배정됩니다',
    action: { kind: 'accept', label: '수락', done: '✓ 수락됨',
      toast: '요청을 수락했습니다 · 일정이 배정되었습니다' } },
];

// 이번 주 정산 (대시보드 우측 패널 행)
export interface DashSettleRow { label: string; value: string; valueClass: string }

export const DASH_WEEK_SETTLE: DashSettleRow[] = [
  { label: '완료 거래액', value: '2,140,000', valueClass: 't-b14 num' },
  { label: '중개 수수료 8%', value: '−171,200', valueClass: 't-b14 num c-sec' },
  { label: 'SaaS 구독료', value: '−49,000', valueClass: 't-b14 num c-sec' },
];

/* ---------- 요청 인박스 ---------- */

export type InboxKind = 'photo' | 'instant' | 'survey';

// 필터 칩 — 라벨의 건수는 목업 연출 값 그대로 (칩 문구 변경 금지)
export const INBOX_FILTERS = [
  { id: 'all', label: '전체 4' },
  { id: 'photo', label: '사진 진단 2' },
  { id: 'instant', label: '즉시 견적 1' },
  { id: 'survey', label: '실측 요청 1' },
] as const;

export type InboxFilterId = (typeof INBOX_FILTERS)[number]['id'];

export const INBOX_SORTS = ['마감 임박순', '금액 높은순', '거리순'] as const;
export type InboxSort = (typeof INBOX_SORTS)[number];

export interface InboxRequest {
  id: string;
  kind: InboxKind;
  tone: PhTone;
  headBadges: { label: string; cls: string }[];
  deadline: string;           // 우측 상단 표기 (예: '마감 6시간 전')
  deadlineDanger?: boolean;   // 위험 색상 표기 여부
  title: string;
  desc: string;
  tags: { label: string; cls: string }[];
  wrapTags?: boolean;         // 태그 행 flexWrap 적용 여부 (첫 카드만)
  priceLabel: string;         // '플랫폼 기준가' / '확정 금액' / '유사 단지 실적'
  price: string;
  priceSub: string;
  action:
    | { kind: 'quote'; label: string; secondary: string }                // 견적 작성 + 숨기기
    | { kind: 'accept'; label: string; done: string; toast: string };    // 수락/신청 → done 전이
  // ↓ 정렬용 데모 값 (화면에 표시되지 않음)
  deadlineHours: number;      // 마감 임박순
  priceWon: number;           // 금액 높은순 (기준가 중앙값 기준)
  distanceKm: number;         // 거리순
}

export const INBOX_REQUESTS: InboxRequest[] = [
  { id: 'in1', kind: 'photo', tone: 'wet',
    headBadges: [
      { label: '긴급', cls: 'b-red' },
      { label: '사진 진단 완료', cls: 'b-brand' },
      { label: '청솔 103동 · 1999년 · 12층', cls: 'b-gline' },
    ],
    deadline: '마감 6시간 전', deadlineDanger: true,
    title: '안방 천장 누수 — 배관 이음부 추정',
    desc: 'AI 분류 신뢰도 87% · 전문가 검수 완료 · 윗집 배수관 슬래브 관통부 의심',
    tags: [
      { label: '누수탐지 필요', cls: 'b-gline b12' },
      { label: '천장복구 포함 희망', cls: 'b-gline b12' },
      { label: '보험 처리 예정', cls: 'b-blue b12' },
      { label: '오늘~금요일 방문 희망', cls: 'b-gline b12' },
    ],
    wrapTags: true,
    priceLabel: '플랫폼 기준가', price: '32~58만원', priceSub: '중앙값 41만원 · 경쟁 견적 1건',
    action: { kind: 'quote', label: '견적 작성', secondary: '이 요청 숨기기' },
    deadlineHours: 6, priceWon: 410_000, distanceKm: 0.8 },
  { id: 'in2', kind: 'instant', tone: 'clean',
    headBadges: [
      { label: '즉시 견적', cls: 'b-brands' },
      { label: '개포늘푸른 5동 · 34평', cls: 'b-gline' },
    ],
    deadline: '수락 선착순',
    title: '수도배관 클리닝 — 확정가 상품',
    desc: '규격 상품이라 견적 작성이 없습니다. 수락하면 바로 배정되고 금액이 확정됩니다.',
    tags: [
      { label: '화장실 2개', cls: 'b-gline b12' },
      { label: '중앙난방', cls: 'b-gline b12' },
      { label: '11/22 토 13:00', cls: 'b-gline b12' },
    ],
    priceLabel: '확정 금액', price: '180,000원', priceSub: '수수료 차감 후 165,600원',
    action: { kind: 'accept', label: '수락하기', done: '✓ 수락됨',
      toast: '요청을 수락했습니다 · 11/22 (토) 13:00 일정이 확정되었습니다' },
    deadlineHours: 24, priceWon: 180_000, distanceKm: 2.4 },
  { id: 'in3', kind: 'survey', tone: 'pipe',
    headBadges: [
      { label: '실측 요청', cls: 'b-blue' },
      { label: '역삼청솔 · 1997년 · 34평', cls: 'b-gline' },
    ],
    deadline: '마감 2일 전',
    title: '세대 내 배관 전체 교체 — 무료 실측',
    desc: '거주 중 · 도면 첨부됨 · 실측 후 3영업일 내 설계 견적 제출',
    tags: [
      { label: '중앙난방', cls: 'b-gline b12' },
      { label: '강관(백관)', cls: 'b-gline b12' },
      { label: '도면 있음', cls: 'b-green b12' },
    ],
    priceLabel: '유사 단지 실적', price: '180~420만원', priceSub: '실측 후 확정',
    action: { kind: 'accept', label: '실측 방문 신청', done: '✓ 신청 완료',
      toast: '실측 방문을 신청했습니다 · 고객 확인 후 일정이 확정됩니다' },
    deadlineHours: 48, priceWon: 3_000_000, distanceKm: 1.6 },
];

/* ---------- 견적 작성 ---------- */

// 표준 공정 DB 견적 항목 (모두 '범위 내')
export interface QuoteLineItem {
  name: string;     // 공정명
  range: string;    // 표준 범위 표기
  price: string;    // 내 단가 표기
}

export const QUOTE_LINE_ITEMS: QuoteLineItem[] = [
  { name: '누수 탐지 (청음 + 열화상)', range: '80,000 ~ 120,000', price: '100,000' },
  { name: '배관 이음부 실링·보수 (2개소)', range: '150,000 ~ 280,000', price: '210,000' },
  { name: '천장 마감 복구 (석고 + 도배)', range: '90,000 ~ 180,000', price: '100,000' },
];

// 현장 변수 사전 고지
export interface QuoteVariation {
  name: string;
  range: string;      // 추가금 표기 (예: '+25,000 ~ 35,000')
  desc?: string;      // 설명 (체크된 항목만)
  checked: boolean;   // false = 흐리게(＋) 표시
}

export const QUOTE_VARIATIONS: QuoteVariation[] = [
  { name: '준공 25년 초과 노후 배관', range: '+25,000 ~ 35,000',
    desc: '인접 구간 보강이 필요할 수 있습니다', checked: true },
  { name: '매립관 절개 필요', range: '+40,000 ~ 60,000',
    desc: '벽체 절개·복구 공정이 추가됩니다', checked: true },
  { name: '야간 작업', range: '+40,000', checked: false },
];

/* ---------- 필모그래피 ---------- */

// 검증 대기 항목
export interface FilmPending {
  id: string;
  tone: PhTone;
  title: string;
  meta: string;
  verified: string[];                     // '✓ 시각 일치' 등 통과 표시
  badge: { label: string; cls: string };  // 검수중 / 위치 불일치
  appeal?: boolean;                       // 소명하기 버튼 표시
}

export const FILM_PENDING: FilmPending[] = [
  { id: 'fp1', tone: 'wet', title: '배관 이음부 보수 + 천장 복구 · 청솔 1204호',
    meta: 'Before 2매 · After 2매 · 2026.11.19 촬영',
    verified: ['✓ 시각 일치', '✓ 위치 일치'], badge: { label: '검수중', cls: 'b-orange' } },
  { id: 'fp2', tone: 'clean', title: '난방배관 클리닝 · 개포늘푸른 902호',
    meta: 'Before 1매 · After 1매 · 2026.11.18 촬영',
    verified: ['✓ 시각 일치'], badge: { label: '위치 불일치', cls: 'b-red' }, appeal: true },
];

// 공개 포트폴리오 필터 칩 — 라벨의 건수는 목업 연출 값 그대로
export const FILM_FILTERS = [
  { id: 'all', label: '전체' },
  { id: 'leak', label: '누수 41' },
  { id: 'jet', label: '세정 22' },
  { id: 'clean', label: '클리닝 21' },
] as const;

export type FilmFilterId = (typeof FILM_FILTERS)[number]['id'];

// Before/After 타일 (미리보기 4건)
export interface FilmTile {
  id: string;
  cat: Exclude<FilmFilterId, 'all'>;   // 필터 매칭용 분류
  left: PhTone;                        // Before 사진 톤
  right: PhTone;                       // After 사진 톤
}

export const FILM_TILES: FilmTile[] = [
  { id: 'ft1', cat: 'leak', left: 'wet', right: 'clean' },
  { id: 'ft2', cat: 'jet', left: 'pipe', right: 'clean' },
  { id: 'ft3', cat: 'leak', left: 'wet', right: 'clean' },
  { id: 'ft4', cat: 'clean', left: 'clean', right: 'pipe' },
];

/* ---------- 신용등급 ---------- */

// 점수 구성 지표
export interface GradeMetric {
  name: string;       // 지표명
  maxLabel: string;   // '· 30점 만점' 표기
  score: string;      // '28 / 30' 표기
  width: string;      // 게이지 채움 폭 (%)
  note: string;       // 하단 근거 문구
  warn?: boolean;     // 경고색(주황) 표시 여부
}

export const GRADE_METRICS: GradeMetric[] = [
  { name: '검증 필모그래피', maxLabel: '· 30점 만점', score: '28 / 30', width: '93%',
    note: '84건 검증 · 위치·시각 메타데이터 100% 통과' },
  { name: '재시공률', maxLabel: '· 25점 만점', score: '24 / 25', width: '96%',
    note: '1.2% · 업계 평균 4.8%' },
  { name: '고객 평점', maxLabel: '· 20점 만점', score: '19 / 20', width: '95%',
    note: '★ 4.9 · 후기 126건' },
  { name: '응답 속도', maxLabel: '· 15점 만점', score: '11 / 15', width: '73%',
    note: '평균 28분 · 15분 이내면 만점입니다', warn: true },
  { name: '기준가 준수율', maxLabel: '· 10점 만점', score: '10 / 10', width: '100%',
    note: '적정 구간 이탈 0건 · 승인 없는 추가금 0건' },
];

// 등급별 혜택 표
export interface GradeTier {
  name: string;
  score: string;
  expose: string;     // 노출
  assign: string;     // 요청 배정
  current?: boolean;  // 현재 등급 행 (하이라이트 + 현재 배지 + 굵게)
}

export const GRADE_TIERS: GradeTier[] = [
  { name: '플래티넘', score: '85점 이상', expose: '검색 1순위', assign: '우선 배정', current: true },
  { name: '골드', score: '70~84점', expose: '2순위', assign: '일반' },
  { name: '실버', score: '50~69점', expose: '3순위', assign: '일반' },
  { name: '신규', score: '50점 미만', expose: '지역 한정', assign: '지역 배정' },
];

/* ---------- 자재 · 장비 구매 ---------- */

export const STORE_FILTERS = ['전체', '배관 부속', '수전', '세정 약품', '장비', '소모품'] as const;
export type StoreFilter = (typeof STORE_FILTERS)[number];

export interface StoreProduct {
  id: string;
  tone: PhTone;       // 상품 사진 톤 ('' = 기본 ph)
  category: string;   // 카드 표기 + 필터 매칭
  name: string;
  listPrice: string;  // 정가 (취소선)
  salePrice: string;  // 도매가 표기
  discount: string;   // 할인율 배지 (예: '30%↓')
}

export const STORE_PRODUCTS: StoreProduct[] = [
  { id: 'sp1', tone: 'pipe', category: '배관 부속', name: '동관 이음쇠 22mm (10개입)',
    listPrice: '18,000', salePrice: '12,600원', discount: '30%↓' },
  { id: 'sp2', tone: 'clean', category: '세정 약품', name: '난방배관 순환 세정제 20L',
    listPrice: '96,000', salePrice: '68,000원', discount: '29%↓' },
  { id: 'sp3', tone: '', category: '장비', name: '고압세정 노즐 세트 (4종)',
    listPrice: '340,000', salePrice: '248,000원', discount: '27%↓' },
  { id: 'sp4', tone: 'pipe', category: '수전', name: '주방 싱크 수전 (스텐)',
    listPrice: '72,000', salePrice: '54,000원', discount: '25%↓' },
];

/* ---------- 정산 ---------- */

export const SETTLE_KPIS: StatCard[] = [
  { label: '이번 주 지급 예정', value: '1,919,800원', valueClass: 't-h24 num c-brand',
    sub: '11.22 (금) 입금', subClass: 't-b12 c-sec', brandPanel: true },
  { label: '에스크로 보관중', value: '690,000원', valueClass: 't-h24 num',
    sub: '완료 승인 대기 2건', subClass: 't-b12 c-sec' },
  { label: '이번 달 누적 지급', value: '7,748,400원', valueClass: 't-h24 num',
    sub: '지난달 대비 +18%', subClass: 't-b12 c-suc fw6' },
  { label: '보증기금 적립', value: '168,400원', valueClass: 't-h24 num',
    sub: '거래액의 2% 적립', subClass: 't-b12 c-sec' },
];

export const SETTLE_MONTHS = ['2026년 11월', '2026년 10월'] as const;
export type SettleMonth = (typeof SETTLE_MONTHS)[number];

export interface SettleRow {
  id: string;
  month: SettleMonth;   // 월 필터용
  date: string;
  work: string;
  amount: string;       // 거래액
  fee: string;          // 수수료 (−)
  fund: string;         // 보증기금 (−)
  payout: string;       // 지급액
  status: { label: string; cls: string };
}

export const SETTLE_ROWS: SettleRow[] = [
  { id: 'st1', month: '2026년 11월', date: '11.19', work: '배관 이음부 보수 · 청솔 1204호',
    amount: '490,000', fee: '−39,200', fund: '−9,800', payout: '441,000',
    status: { label: '승인 대기', cls: 'b-orange' } },
  { id: 'st2', month: '2026년 11월', date: '11.16', work: '난방배관 클리닝 · 개포늘푸른 902호',
    amount: '220,000', fee: '−17,600', fund: '−4,400', payout: '198,000',
    status: { label: '지급 예정', cls: 'b-green' } },
  { id: 'st3', month: '2026년 11월', date: '11.14', work: '공용 입상관 고압세정 · 역삼청솔 3동',
    amount: '1,430,000', fee: '−114,400', fund: '−28,600', payout: '1,287,000',
    status: { label: '지급 완료', cls: 'b-gray' } },
  { id: 'st4', month: '2026년 11월', date: '11.09', work: '수도배관 클리닝 · 청솔 806호',
    amount: '180,000', fee: '−14,400', fund: '−3,600', payout: '162,000',
    status: { label: '지급 완료', cls: 'b-gray' } },
];
