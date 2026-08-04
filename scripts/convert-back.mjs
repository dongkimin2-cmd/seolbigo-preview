import { htmlToJsx } from 'html-to-jsx-transform';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const ROUTES = {
  'pro-home': 'app/pro-center/page.tsx',
  'pro-inbox': 'app/pro-center/inbox/page.tsx',
  'pro-quote': 'app/pro-center/quote/page.tsx',
  'pro-film': 'app/pro-center/film/page.tsx',
  'pro-grade': 'app/pro-center/grade/page.tsx',
  'pro-store': 'app/pro-center/store/page.tsx',
  'pro-settle': 'app/pro-center/settle/page.tsx',
  'mgr-home': 'app/manager/page.tsx',
  'mgr-map': 'app/manager/map/page.tsx',
  'mgr-report': 'app/manager/report/page.tsx',
  'mgr-contract': 'app/manager/contract/page.tsx',
  'mgr-bid': 'app/manager/bid/page.tsx',
  'mgr-brief': 'app/manager/brief/page.tsx',
  'ins-home': 'app/insurer/page.tsx',
  'ins-case': 'app/insurer/case/page.tsx',
  'ins-analytics': 'app/insurer/analytics/page.tsx',
  'ins-campaign': 'app/insurer/campaign/page.tsx',
};

for (const [id, route] of Object.entries(ROUTES)) {
  const html = readFileSync(`scripts/pages/${id}.html`, 'utf8');
  const cls = readFileSync(`scripts/pages/${id}.cls`, 'utf8').trim().replace('page', 'page on');
  const jsx = htmlToJsx(html);
  const body = `
// 자동 이식된 목업 화면 p-${id} — 원본: seolbigo-preview/index.html (백오피스)
// 라우팅(data-go)은 MockupBridge 가 처리합니다.
export default function Page() {
  return (
    <section className="${cls}" id="p-${id}">
      ${jsx.split('\n').join('\n      ')}
    </section>
  );
}
`;
  mkdirSync(dirname(route), { recursive: true });
  writeFileSync(route, body);
  console.log('OK', id, '→', route);
}
