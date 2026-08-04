// 보험사(손해보험사) 백오피스 데모 데이터 단일 소스 — 실제 백엔드 연결 시 이 모듈만 API 호출로 교체합니다.
// ⚠️ 수치·문구는 목업과 동일한 데모/연출 값입니다 (프로젝트 문서 '숫자 대조표'와 정합 — 임의 변경 금지).

/* ---------- 공통: KPI 카드 ---------- */

export interface InsKpi {
  label: string;                    // 카드 라벨
  value: string;                    // 큰 숫자 (표시 문자열)
  sub: string;                      // 보조 설명
  valueClass?: string;              // 값 색상 추가 클래스 ('c-inf' | 'c-suc' 등)
  subtleBg?: 'info' | 'success';    // 강조 배경 패널 (var(--sg-bg-{}-subtle))
}

/* ---------- 청구 심사 인박스 (p-ins-home) ---------- */

export const INS_HOME_KPIS: InsKpi[] = [
  { label: '이번 달 누수 접수', value: '1,284건', sub: '전체 청구의 52.7%' },
  { label: '설비고 연계 건', value: '218건', sub: '17.0% · 전월 대비 +4.2%p', valueClass: 'c-inf', subtleBg: 'info' },
  { label: '평균 정산 소요', value: '2.4일', sub: '비연계 건 11.6일' },
  { label: '현장조사 생략률', value: '71%', sub: '연계 건 기준 · 건당 18만원 절감', valueClass: 'c-suc' },
];

/** 표준 분포 대조 판정 구간 — in: 범위 내 / review: 검토 필요 / outlier: 이상치 */
export type DistBand = 'in' | 'review' | 'outlier';

export interface InsClaim {
  no: string;                       // 접수번호
  incident: string;                 // 사고 요약 (유형 · 단지 호수)
  insured: string;                  // 피보험자
  amountWon: number;                // 청구액 (원)
  posLeft: string;                  // 표준 분포 마커 위치 (%)
  band: DistBand;                   // 대조 판정 구간
  verdict: string;                  // 대조 결과 문구
  status: string;                   // 상태 라벨
  statusTone: 'orange' | 'red' | 'green';   // 상태 뱃지 색 (badge b-*)
  openBtn: 'primary' | 'outlined' | 'ghost'; // '열기' 버튼 변형
  docsMissing?: boolean;            // 서류 미비 여부 (필터용)
}

export const INS_CLAIMS: InsClaim[] = [
  {
    no: '2026-114-88213', incident: '배관 이음부 누수 · 청솔 1204호', insured: '1304호 (상층)',
    amountWon: 490_000, posLeft: '47%', band: 'in', verdict: '범위 내 · 중앙값 근접',
    status: '심사 대기', statusTone: 'orange', openBtn: 'primary',
  },
  {
    no: '2026-114-88207', incident: '화장실 바닥 누수 · 개포늘푸른 902호', insured: '1002호 (상층)',
    amountWon: 2_840_000, posLeft: '94%', band: 'outlier', verdict: '상위 6% · 이상치',
    status: '조사 배정', statusTone: 'red', openBtn: 'outlined',
  },
  {
    no: '2026-114-88198', incident: '주방 배수관 누수 · 역삼청솔 508호', insured: '608호 (상층)',
    amountWon: 330_000, posLeft: '28%', band: 'in', verdict: '범위 내',
    status: '지급 완료', statusTone: 'green', openBtn: 'ghost',
  },
  {
    no: '2026-114-88176', incident: '천장 누수 · 신도림한내 1801호', insured: '1901호 (상층)',
    amountWon: 1_120_000, posLeft: '72%', band: 'review', verdict: '상위 28% · 검토 필요',
    status: '심사 대기', statusTone: 'orange', openBtn: 'outlined',
  },
  {
    no: '2026-114-88154', incident: '세면대 하부 누수 · 잠실동백 704호', insured: '804호 (상층)',
    amountWon: 180_000, posLeft: '38%', band: 'in', verdict: '범위 내',
    status: '지급 완료', statusTone: 'green', openBtn: 'ghost',
  },
];

/* ---------- 사실자료 상세 (p-ins-case) ---------- */

export interface CaseProcessRow {
  name: string;                     // 공정명
  claim: string;                    // 청구액 (표시 문자열)
  range: string;                    // 표준 분포 구간
  posLeft: string;                  // 분포 마커 위치 (%)
}

/** 가격 구성 — 표준 분포 대조 (판정은 전 공정 '적정') */
export const CASE_PROCESS_ROWS: CaseProcessRow[] = [
  { name: '누수 탐지 (청음+열화상)', claim: '100,000', range: '80,000~120,000', posLeft: '50%' },
  { name: '배관 이음부 보수 (2개소)', claim: '210,000', range: '150,000~280,000', posLeft: '46%' },
  { name: '천장 마감 복구 (3.3㎡)', claim: '100,000', range: '90,000~180,000', posLeft: '16%' },
  { name: '현장 변수 (고객 승인 완료)', claim: '80,000', range: '65,000~95,000', posLeft: '50%' },
];

/** 합계 행 (판정 '범위 내') */
export const CASE_PROCESS_TOTAL = { claim: '490,000', range: '320,000~580,000', posLeft: '47%' };

export interface CaseEvidence {
  tone: 'wet' | 'pipe' | 'clean';   // 플레이스홀더 사진 톤 (ph *)
  caption: string;                  // 촬영 시점 설명
}

export const CASE_EVIDENCE: CaseEvidence[] = [
  { tone: 'wet', caption: '피해 부위 · 11.17 21:02' },
  { tone: 'pipe', caption: '원인 부위 · 11.19 14:26' },
  { tone: 'pipe', caption: '열화상 판독 · 11.19 14:12' },
  { tone: 'clean', caption: '복구 완료 · 11.19 17:48' },
];

/** 검증 완료 항목 뱃지 */
export const CASE_VERIFIED: string[] = [
  '✓ 촬영 시각 검증',
  '✓ 위치 좌표 검증',
  '✓ 시공 일정과 일치',
  '✓ 에스크로 결제 확인',
  '✓ 사업자 배상책임보험 유효',
];

/** 지급 결정 패널 — 금액 요약 · 버튼 라벨/토스트 */
export const CASE_DECISION = {
  rows: [
    { label: '청구 금액', value: '490,000', valueClass: 't-b14 num' },
    { label: '자기부담금', value: '−200,000', valueClass: 't-b14 num c-sec' },
    { label: '보상 한도', value: '1억원', valueClass: 't-b14 num' },
  ],
  payout: '290,000원',              // 지급 예정액
  approveLabel: '현장조사 없이 승인',
  approveDone: '✓ 승인 완료',
  approveToast: '지급 승인 처리되었습니다 · 290,000원이 지급 예정입니다',
  assignLabel: '손해사정 배정',
  assignToast: '등록 손해사정법인에 배정되었습니다 · 데모 연출입니다',
  requestLabel: '추가 자료 요청',
  requestToast: '추가 자료 요청이 접수되었습니다 · 데모 연출입니다',
} as const;

/* ---------- 손해율 대시보드 (p-ins-analytics) ---------- */

export interface InsCompareMetric {
  title: string;                    // 지표명
  linked: string;                   // 연계 값 (표시 문자열)
  unlinked: string;                 // 비연계 값
  linkedWidth: string;              // 연계 막대 너비 (%)
  unlinkedWidth: string;            // 비연계 막대 너비 (%)
  delta: string;                    // 차이 (연계 기준 절감)
}

/** 연계 건 vs 비연계 건 — 2026년 1~11월 누적 */
export const INS_COMPARE_METRICS: InsCompareMetric[] = [
  { title: '건당 평균 지급액', linked: '438,000원', unlinked: '571,000원', linkedWidth: '77%', unlinkedWidth: '100%', delta: '−23.3%' },
  { title: '현장조사 실시율', linked: '29%', unlinked: '86%', linkedWidth: '29%', unlinkedWidth: '86%', delta: '−57%p' },
  { title: '정산 소요일', linked: '2.4일', unlinked: '11.6일', linkedWidth: '21%', unlinkedWidth: '100%', delta: '−79%' },
  { title: '1년 내 동일 부위 재청구율', linked: '2.1%', unlinked: '7.8%', linkedWidth: '27%', unlinkedWidth: '100%', delta: '−73%' },
];

export interface InsSavingRow {
  item: string;                     // 절감 항목
  count: string;                    // 건수
  per: string;                      // 건당 금액
  total: string;                    // 누적 절감액
}

/** 절감 효과 산출 표 */
export const INS_SAVING_ROWS: InsSavingRow[] = [
  { item: '현장조사 생략', count: '1,412', per: '180,000', total: '254,160,000' },
  { item: '과다 청구 사전 차단', count: '86', per: '412,000', total: '35,432,000' },
  { item: '재청구 감소', count: '108', per: '571,000', total: '61,668,000' },
  { item: 'CS 응대 · 분쟁 처리', count: '1,946', per: '24,000', total: '46,704,000' },
];

/** 2026년 누적 절감액 합계 */
export const INS_SAVING_TOTAL = '3억 9,796만원';

export interface InsDataScope {
  label: string;                    // 데이터 상품명
  badge: string;                    // 상태 라벨
  badgeTone: 'b-green' | 'b-orange' | 'b-gline';
}

/** 데이터 제공 범위 */
export const INS_DATA_SCOPE: InsDataScope[] = [
  { label: '사실자료 리포트', badge: '제공중', badgeTone: 'b-green' },
  { label: '표준 분포 대조', badge: '제공중', badgeTone: 'b-green' },
  { label: '단지 이력 조회 API', badge: '협의중', badgeTone: 'b-orange' },
  { label: '위험 예측 스코어', badge: '2027 예정', badgeTone: 'b-gline' },
];

/** 기간 선택 옵션 */
export const INS_PERIOD_OPTIONS: string[] = ['2026년 누적', '최근 6개월', '이번 달'];

/* ---------- 예방 캠페인 (p-ins-campaign) ---------- */

export const CAMP_KPIS: InsKpi[] = [
  { label: '배포한 쿠폰', value: '4,280장', sub: '3개 캠페인 누적' },
  { label: '사용률', value: '38.2%', sub: '1,636장 사용' },
  { label: '예방 추정 사고', value: '62건', sub: '대조군 대비 청구율 차이', valueClass: 'c-suc' },
  { label: '캠페인 ROI', value: '164%', sub: '투입 2.1억 · 회수 5.5억', valueClass: 'c-suc', subtleBg: 'success' },
];

export interface RiskSegment {
  label: string;                    // 세그먼트 조건
  subscribers: string;              // 가입자 수
  rate: string;                     // 연 청구율
  rateTone?: 'danger' | 'warning';  // 청구율 글자색 (없으면 기본)
  barWidth: string;                 // 위험도 막대 너비 (%)
  barBg: 'danger' | 'warning' | 'success';  // 위험도 막대 색 (var(--sg-bg-*))
  action: string;                   // 권장 조치 라벨
  actionTone: 'b-red' | 'b-orange' | 'b-gline';
}

/** 고위험 세그먼트 표 */
export const CAMP_SEGMENTS: RiskSegment[] = [
  {
    label: '준공 30년↑ · 중앙난방 · 강관', subscribers: '18,420', rate: '4.8%', rateTone: 'danger',
    barWidth: '88%', barBg: 'danger', action: '배관 클리닝', actionTone: 'b-red',
  },
  {
    label: '준공 25~29년 · 과거 청구 이력', subscribers: '9,860', rate: '3.2%', rateTone: 'warning',
    barWidth: '62%', barBg: 'warning', action: '무료 점검', actionTone: 'b-orange',
  },
  {
    label: '준공 20~24년 · 개별난방', subscribers: '24,180', rate: '1.4%',
    barWidth: '26%', barBg: 'success', action: '알림만', actionTone: 'b-gline',
  },
];

export interface CampaignStat {
  label: string;                    // 지표 라벨 (배포/사용/예방 추정/ROI)
  value: string;                    // 표시 값
  suc?: boolean;                    // 성공 색상(c-suc) 강조 여부
}

export interface Campaign {
  emoji: string;                    // 캠페인 아이콘
  title: string;                    // 캠페인명
  badge: string;                    // 상태 라벨
  badgeTone: 'b-brand' | 'b-gray';
  desc: string;                     // 대상 · 기간
  stats: CampaignStat[];            // 성과 지표
  btn: 'outlined' | 'ghost';        // '리포트' 버튼 변형
  ended?: boolean;                  // 종료 캠페인 (흐리게 표시)
}

/** 진행 중인 캠페인 목록 */
export const CAMP_CAMPAIGNS: Campaign[] = [
  {
    emoji: '🚿', title: '노후 단지 배관 클리닝 50% 지원', badge: '진행중', badgeTone: 'b-brand',
    desc: '준공 30년↑ 중앙난방 가입자 대상 · 2026.09.01 ~ 2026.12.31',
    stats: [
      { label: '배포', value: '2,400장' },
      { label: '사용', value: '1,012장 (42%)' },
      { label: '예방 추정', value: '41건', suc: true },
      { label: 'ROI', value: '187%', suc: true },
    ],
    btn: 'outlined',
  },
  {
    emoji: '🔍', title: '재청구 이력 가입자 무료 점검', badge: '진행중', badgeTone: 'b-brand',
    desc: '1년 내 청구 이력 가입자 대상 · 2026.10.01 ~ 2027.03.31',
    stats: [
      { label: '배포', value: '1,280장' },
      { label: '사용', value: '418장 (33%)' },
      { label: '예방 추정', value: '14건', suc: true },
      { label: 'ROI', value: '142%', suc: true },
    ],
    btn: 'outlined',
  },
  {
    emoji: '🌀', title: '상가 그리스트랩 정기 관리 제휴', badge: '종료', badgeTone: 'b-gray',
    desc: '음식점 영업배상 가입자 대상 · 2026.03 ~ 2026.08',
    stats: [
      { label: '배포', value: '600장' },
      { label: '사용', value: '206장 (34%)' },
      { label: '예방 추정', value: '7건' },
      { label: 'ROI', value: '118%' },
    ],
    btn: 'ghost', ended: true,
  },
];

export interface CouponPrice {
  label: string;                    // 쿠폰 종류
  price: string;                    // 단가
}

/** 쿠폰 단가 */
export const CAMP_COUPONS: CouponPrice[] = [
  { label: '배관 클리닝 50% 지원', price: '90,000원' },
  { label: '무료 배관 점검', price: '40,000원' },
  { label: '그리스트랩 관리', price: '120,000원' },
];
