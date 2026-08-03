import { htmlToJsx } from 'html-to-jsx-transform';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

// 소비자 플로우 라우트 매핑 (page id → app 라우트 경로)
const ROUTES = {
  home: 'app/page.tsx',
  diag1: 'app/diagnose/page.tsx',
  diag2: 'app/diagnose/analyzing/page.tsx',
  diag3: 'app/diagnose/result/page.tsx',
  cases: 'app/cases/page.tsx',
  'case-detail': 'app/cases/[id]/page.tsx',
  quotes: 'app/quotes/page.tsx',
  pro: 'app/pro/[id]/page.tsx',
  booking: 'app/booking/page.tsx',
  variation: 'app/variation/page.tsx',
  tracking: 'app/tracking/page.tsx',
  warranty: 'app/warranty/page.tsx',
  insurance: 'app/insurance/page.tsx',
  history: 'app/history/page.tsx',
  groupbuy: 'app/groupbuy/page.tsx',
  services: 'app/services/page.tsx',
  survey: 'app/services/survey/page.tsx',
  scope: 'app/services/scope/page.tsx',
  area: 'app/services/area/page.tsx',
  drone: 'app/services/drone/page.tsx',
  instant: 'app/services/instant/page.tsx',
};

let fail = 0;
for (const [id, route] of Object.entries(ROUTES)) {
  let html = readFileSync(`scripts/pages/${id}.html`, 'utf8');
  // 홈 섹션 안 GNB용 마크업은 없음. 변환.
  let jsx;
  try {
    jsx = htmlToJsx(html);
  } catch (e) {
    console.error('FAIL', id, e.message); fail++; continue;
  }
  const isClient = id === 'diag2';
  const body = `${isClient ? "'use client';\nimport { useDiagAnimation } from '@/components/useDiagAnimation';\n" : ''}
// 자동 이식된 목업 화면 p-${id} — 원본: seolbigo-preview/index.html
// 인터랙션(토스트·검증·칩 등)은 components/MockupBridge 가 위임 처리합니다.
export default function Page() {
  ${isClient ? 'useDiagAnimation();' : ''}
  return (
    <section className="page on" id="p-${id}">
      ${jsx.split('\n').join('\n      ')}
    </section>
  );
}
`;
  mkdirSync(dirname(route), { recursive: true });
  writeFileSync(route, body);
  console.log('OK', id, '→', route);
}
process.exit(fail ? 1 : 0);
