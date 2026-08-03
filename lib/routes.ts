// data-go 값 → 실제 라우트 매핑
// 목업의 클릭 라우터를 Next.js 라우팅으로 연결하는 단일 소스입니다.
export const GO_ROUTES: Record<string, string> = {
  home: '/',
  diag1: '/diagnose',
  diag2: '/diagnose/analyzing',
  diag3: '/diagnose/result',
  cases: '/cases',
  'case-detail': '/cases/1',
  quotes: '/quotes',
  pro: '/pro/1',
  booking: '/booking',
  variation: '/variation',
  tracking: '/tracking',
  warranty: '/warranty',
  insurance: '/insurance',
  history: '/history',
  groupbuy: '/groupbuy',
  services: '/services',
  survey: '/services/survey',
  scope: '/services/scope',
  area: '/services/area',
  drone: '/services/drone',
  instant: '/services/instant',
};

// 백오피스(사업자·관리사무소·보험사)는 이번 스켈레톤 범위 밖 — 정적 목업으로 연결
export const MOCKUP_URL = 'https://dongkimin2-cmd.github.io/seolbigo-preview/';
export const BACKOFFICE_IDS = new Set([
  'pro-home', 'pro-inbox', 'pro-quote', 'pro-film', 'pro-grade', 'pro-store', 'pro-settle',
  'mgr-home', 'mgr-map', 'mgr-report', 'mgr-contract', 'mgr-bid', 'mgr-brief',
  'ins-home', 'ins-case', 'ins-analytics', 'ins-campaign',
]);
