// 관리사무소(백오피스) 화면 데이터 단일 소스 — 실제 백엔드 연결 시 이 모듈만 API 호출로 교체합니다.
// ⚠️ 수치·문구는 목업과 동일한 데모/연출 값입니다 (프로젝트 문서 '숫자 대조표' 참고). 값 변경 금지.
// 데이터 기반 전환 (2026-08-04)

/* ---------- 공통 ---------- */

/** 배지 톤 (mockup.css 의 .badge b-* 클래스 접미사) */
export type BadgeTone = 'red' | 'orange' | 'gray' | 'brand' | 'brands' | 'gline' | 'green' | 'blue';

/** 라벨 · 값 한 줄 (사이드 패널 통계 등) */
export interface StatRow {
  label: string;
  value: string;
  num?: boolean;              // 값에 num(tabular-nums) 클래스 적용 여부
  danger?: boolean;           // 값을 위험 색상으로 표시
}

/** 색상 범례 한 칸 */
export interface LegendItem {
  label: string;
  color: string;              // 스와치 배경색
}

/* ---------- 단지 현황 (p-mgr-home) ---------- */

/** 상단 KPI 패널 (단지 현황 · 정기 세정 계약 공용 형태) */
export interface MgrKpi {
  label: string;
  value: string;
  sub: string;
  warn?: boolean;             // 경고 패널 (warning-subtle 배경 + warning 값 색상)
  valueBrand?: boolean;       // 값에 c-brand 클래스
  subSuccess?: boolean;       // 보조 문구에 c-suc fw6 클래스
}

export const MGR_HOME_KPIS: MgrKpi[] = [
  { label: '누적 기록된 이력', value: '318건', sub: '2019년~ · 좌표 단위 기록' },
  { label: '세정 주기 초과 라인', value: '6개', sub: '103·107·112동 오수관', warn: true },
  { label: '올해 하자 발생', value: '14건', sub: '작년 대비 −38%', subSuccess: true },
  { label: '절감한 유지보수비', value: '2,840만원', sub: '예방 세정 도입 후 2년', valueBrand: true },
];

/** 동별 위험도 범례 */
export const MGR_DONG_LEGEND: LegendItem[] = [
  { label: '양호', color: '#E7FCEF' },
  { label: '관찰', color: '#FFF7F0' },
  { label: '주의', color: '#FFE0CC' },
  { label: '즉시 조치', color: '#FDEBEC' },
];

/** 조치가 필요한 항목 */
export interface MgrActionItem {
  badge: { label: string; tone: BadgeTone };
  title: string;
  desc: string;
  action: {
    label: string;
    kind: 'primary' | 'outlined' | 'ghost';   // btn small 뒤에 붙는 클래스
    go?: string;                              // GO_ROUTES 키 — 없으면 이동 없는 버튼
  };
}

export const MGR_ACTIONS: MgrActionItem[] = [
  { badge: { label: '즉시', tone: 'red' },
    title: '103동 오수관 — 오염도 81점',
    desc: '관경 42% 협착 · 저층 역류 위험 · 마지막 세정 기록 없음',
    action: { label: '세정 발주', kind: 'primary', go: 'mgr-contract' } },
  { badge: { label: '주의', tone: 'orange' },
    title: '107동 입상관 — 세정 주기 8개월 초과',
    desc: '직전 세정 2024.03 · 권장 주기 1년 (노후 단지)',
    action: { label: '일정 잡기', kind: 'outlined', go: 'mgr-contract' } },
  { badge: { label: '예정', tone: 'gray' },
    title: '112동 상가 그리스트랩 — 6개월 주기 도래',
    desc: '음식점 4곳 · 2027.01 예정',
    action: { label: '자동 배정됨', kind: 'ghost' } },
];

/** 이번 달 일정 */
export interface MgrScheduleItem {
  title: string;
  badge: { label: string; tone: BadgeTone };
}

export const MGR_MONTH_SCHEDULE: MgrScheduleItem[] = [
  { title: '103동 오수관 세정', badge: { label: '발주 대기', tone: 'orange' } },
  { title: '105동 세대 클리닝 공동구매', badge: { label: '모집중 18/24', tone: 'brand' } },
  { title: '장기수선충당금 집행 보고', badge: { label: '11.28', tone: 'gline' } },
];

/* ---------- 디지털 이력 지도 (p-mgr-map) ---------- */

/** 동 선택 옵션 */
export const MGR_MAP_DONGS = ['103동', '105동', '107동'] as const;

/** 이력 필터 칩 (첫 항목이 기본 선택) */
export const MGR_MAP_FILTERS = ['전체 이력', '누수 보수', '고압세정', '배관 교체', '최근 1년'] as const;

/** 이력 지도 범례 */
export const MGR_MAP_LEGEND: LegendItem[] = [
  { label: '이력 없음', color: '#F6F7F9' },
  { label: '세정', color: '#E7F4FF' },
  { label: '누수 보수', color: '#F1EEFF' },
  { label: '배관 교체', color: '#E7FCEF' },
  { label: '반복 하자', color: '#FDEBEC' },
];

/** 선택 세대(1204호) 타임라인 이력 */
export interface MapTimelineItem {
  title: string;
  meta: string;               // 날짜 · 시공자 · 금액 등
  badges?: { label: string; tone: BadgeTone }[];
}

export const MGR_MAP_TIMELINE: MapTimelineItem[] = [
  { title: '배관 이음부 보수 + 천장 복구', meta: '2026.11.19 · 깨끗한집설비 · 490,000원',
    badges: [{ label: '보험 처리', tone: 'green' }, { label: '보증중', tone: 'brand' }] },
  { title: '동일 부위 누수 (1차)', meta: '2024.07.02 · 외부 업체 · 기록만 존재' },
  { title: '입상관 고압세정', meta: '2023.05.18 · 단지 일괄 시공' },
];

/** 103동 통계 */
export const MGR_DONG103_STATS: StatRow[] = [
  { label: '누적 이력', value: '42건', num: true },
  { label: '반복 하자 세대', value: '3세대', danger: true },
  { label: '최근 세정', value: '2023.05' },
  { label: '누적 집행액', value: '1,840만원', num: true },
];

/* ---------- 오염도 리포트 (p-mgr-report) ---------- */

/** 라인별 오염도 (점수 = 게이지 너비 %) */
export interface LineScore {
  name: string;
  score: number;
  tone: 'danger' | 'warning' | 'success';   // 점수 색 · 게이지 색 토큰
}

export const MGR_REPORT_LINES: LineScore[] = [
  { name: '3라인 (저층 역류 발생 구간)', score: 92, tone: 'danger' },
  { name: '4라인', score: 78, tone: 'warning' },
  { name: '2라인', score: 74, tone: 'warning' },
  { name: '1라인', score: 61, tone: 'success' },
];

/** 내시경 촬영 기록 (ph 톤 + 캡션) */
export interface ScopePhoto {
  tone: 'pipe' | 'clean';
  caption: string;
}

export const MGR_REPORT_PHOTOS: ScopePhoto[] = [
  { tone: 'pipe', caption: '3라인 B1 · 오염도 92' },
  { tone: 'pipe', caption: '3라인 5F · 오염도 88' },
  { tone: 'clean', caption: '1라인 B1 · 오염도 61' },
  { tone: 'clean', caption: '1라인 10F · 오염도 58' },
];

/** 권장 조치 요약 */
export const MGR_REPORT_ACTIONS: StatRow[] = [
  { label: '세정 범위', value: '전 라인 (4개)' },
  { label: '예상 공사비', value: '1,430,000원', num: true },
  { label: '소요 기간', value: '1일' },
  { label: '집행 계정', value: '수선유지비' },
];

/* ---------- 정기 세정 계약 (p-mgr-contract) ---------- */

export const MGR_CONTRACT_KPIS: MgrKpi[] = [
  { label: '계약중인 동', value: '14 / 21', sub: '미계약 7개동' },
  { label: '연간 계약금액', value: '1,860만원', sub: '수선유지비 집행' },
  { label: '주기 초과', value: '6개 라인', sub: '발주 필요', warn: true },
  { label: '다음 시공', value: 'D-9', sub: '105동 · 11.28' },
];

/** 기준 주기 티어 */
export interface CycleTier {
  title: string;
  desc: string;
  cycle: string;
  on?: boolean;               // 우리 단지 적용중 (tier on + c-brand)
}

export const MGR_CYCLE_TIERS: CycleTier[] = [
  { title: '음식점 라인', desc: '그리스트랩 포함', cycle: '6개월' },
  { title: '노후 단지 (25년↑)', desc: '우리 단지 적용중', cycle: '1년', on: true },
  { title: '일반 단지', desc: '준공 25년 미만', cycle: '2년' },
];

/** 동별 계약 · 일정 표 한 행 */
export interface ContractRow {
  dong: string;               // 동
  target: string;             // 대상
  last: string;               // 직전 시공
  cycle: string;              // 산출 주기 값
  cycleNote: string;          // (실측) | (표준)
  measured?: boolean;         // 실측 주기 → c-brand 굵게
  next: string;               // 다음 예정
  badge: { label: string; tone: BadgeTone };
  contracted: boolean;        // '계약중' 필터 대상
  overdue: boolean;           // '주기 초과' 필터 대상
}

export const MGR_CONTRACT_ROWS: ContractRow[] = [
  { dong: '103동', target: '오수관 4라인', last: '기록 없음',
    cycle: '10개월', cycleNote: '(실측)', measured: true, next: '즉시',
    badge: { label: '발주 필요', tone: 'red' }, contracted: false, overdue: true },
  { dong: '105동', target: '입상관 4라인', last: '2025.11.28',
    cycle: '1년', cycleNote: '(표준)', next: '2026.11.28',
    badge: { label: 'D-9', tone: 'brand' }, contracted: true, overdue: false },
  { dong: '107동', target: '입상관 4라인', last: '2024.03.12',
    cycle: '1년', cycleNote: '(표준)', next: '2025.03 초과',
    badge: { label: '8개월 초과', tone: 'orange' }, contracted: true, overdue: true },
  { dong: '112동', target: '그리스트랩 (음식점 4)', last: '2026.07.05',
    cycle: '6개월', cycleNote: '(표준)', next: '2027.01.05',
    badge: { label: '자동 배정', tone: 'green' }, contracted: true, overdue: false },
  { dong: '115동', target: '입상관 4라인', last: '2026.09.02',
    cycle: '1년', cycleNote: '(표준)', next: '2027.09.02',
    badge: { label: '정상', tone: 'green' }, contracted: true, overdue: false },
];

/* ---------- 입찰 대응 (p-mgr-bid) ---------- */

/** 자동 생성 서류 */
export interface BidDoc {
  icon: string;
  title: string;
  desc: string;
  ready: boolean;             // true = 생성 완료(내려받기), false = 생성중(대기)
}

export const MGR_BID_DOCS: BidDoc[] = [
  { icon: '📄', title: '입찰공고문 · 과업 사양서 (표준안)',
    desc: '세정 범위·공법·검수 기준·하자보증 조건 — K-apt 게시용 12페이지', ready: true },
  { icon: '📊', title: '입찰가격 상한 산출 근거',
    desc: '동일 규모 단지 42건의 실제 계약금액 분포 · 공고문에 상한 명시 시 첨부', ready: true },
  { icon: '📋', title: '적격심사 평가표',
    desc: '선정지침 [별표 6] 용역 사업자 표준평가표 기준 · 배점 자동 반영', ready: true },
  { icon: '🗂', title: '현장설명회 자료',
    desc: '이력 지도 · 오염도 리포트 발췌본', ready: false },
];

/** 입찰가격 상한 산출 표 한 행 */
export interface BidPriceRow {
  item: string;
  qty: string;
  unit: string;               // 표준 단가
  amount: string;             // 금액
}

export const MGR_BID_PRICE_ROWS: BidPriceRow[] = [
  { item: '입상관 고압세정', qty: '84라인', unit: '280,000', amount: '23,520,000' },
  { item: '내시경 조사 · 리포트', qty: '21개동', unit: '180,000', amount: '3,780,000' },
  { item: '폐수 처리 · 정리', qty: '1식', unit: '2,100,000', amount: '2,100,000' },
];

/** 입찰 진행 상황 타임라인 */
export interface BidStep {
  title: string;
  meta?: string;
  state: 'done' | 'now' | 'todo';
}

export const MGR_BID_STEPS: BidStep[] = [
  { title: '서류 자동 생성', meta: '11.19 · 4종 중 3종 완료', state: 'done' },
  { title: '입대의 심의', meta: '11.28 정기회의 상정 예정', state: 'now' },
  { title: 'K-apt 전자입찰 공고', meta: '마감일 전일 기준 10일 전 공고 (지침 제15조 · 긴급/재공고 5일)', state: 'todo' },
  { title: '개찰 · 적격심사', state: 'todo' },
];

/** 집행 근거 */
export const MGR_BID_BASIS: StatRow[] = [
  { label: '집행 계정', value: '수선유지비' },
  { label: '상품 분류', value: '청소 용역' },
  { label: '낙찰 방법', value: '적격심사제 (지침 제7조)' },
];

/* ---------- 입대의 보고자료 (p-mgr-brief) ---------- */

/** 업체 선정 비교 표 한 행 */
export interface VendorRow {
  name: string;
  selected?: boolean;         // 선정 업체 — 굵게 + '선정' 배지 + 견적 굵게
  credit: string;             // 신용등급
  films: string;              // 필모그래피
  redo: string;               // 재시공률
  redoGood?: boolean;         // 재시공률에 c-suc 클래스
  price: string;              // 견적
}

export const MGR_BRIEF_VENDORS: VendorRow[] = [
  { name: '깨끗한집설비', selected: true, credit: '플래티넘 86점',
    films: '84건', redo: '1.2%', redoGood: true, price: '1,430,000' },
  { name: '한빛배관', credit: '골드 74점', films: '51건', redo: '2.0%', price: '1,380,000' },
  { name: '대성설비', credit: '실버 61점', films: '12건', redo: '4.1%', price: '1,620,000' },
];

/** 집행 계정 요약 (4. 집행 계정) */
export const MGR_BRIEF_ACCOUNT: { label: string; value: string }[] = [
  { label: '집행 계정', value: '수선유지비' },
  { label: '상품 분류', value: '청소 용역' },
  { label: '계약 방식', value: '수의계약 (부가세 제외 500만원 이하)' },
  { label: '근거', value: '선정지침 제4조제3항 · [별표 2]' },
];

/** 포함된 근거 체크리스트 */
export const MGR_BRIEF_EVIDENCE: string[] = [
  '내시경 조사 원본 영상',
  '42개 단지 실거래 분포',
  '3개사 견적 비교표',
  '업체 신용등급 산정 근거',
  '집행 계정 질의회신',
];

/** 이전 보고자료 */
export interface BriefHistoryItem {
  title: string;
  result: string;             // 의결 결과 배지 라벨
}

export const MGR_BRIEF_HISTORY: BriefHistoryItem[] = [
  { title: '2026.08 · 105동 세정', result: '가결' },
  { title: '2026.05 · 112동 그리스트랩', result: '가결' },
  { title: '2026.02 · 이력 지도 도입', result: '가결' },
];
