import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const errs = [];
const pg = await b.newPage({ viewport: { width: 1440, height: 900 } });
pg.on('pageerror', e => errs.push(e.message.slice(0, 120)));
const R = {};

// 전 37개 화면 스모크
const routes = ['/', '/diagnose', '/diagnose/result', '/cases', '/cases/1', '/quotes', '/pro/1',
  '/booking', '/variation', '/tracking', '/warranty', '/insurance', '/history', '/groupbuy',
  '/services', '/services/survey', '/services/scope', '/services/area', '/services/drone', '/services/instant',
  '/pro-center', '/pro-center/inbox', '/pro-center/quote', '/pro-center/film', '/pro-center/grade',
  '/pro-center/store', '/pro-center/settle',
  '/manager', '/manager/map', '/manager/report', '/manager/contract', '/manager/bid', '/manager/brief',
  '/insurer', '/insurer/case', '/insurer/analytics', '/insurer/campaign'];
let smoke = 0;
for (const r of routes) {
  const resp = await pg.goto('http://localhost:3100' + r);
  if (resp.status() === 200 && await pg.locator('section.page.on').count() === 1) smoke++;
  else errs.push('smoke-fail: ' + r);
}
R.smoke = smoke + '/' + routes.length;

// 백오피스: 소비자 GNB 숨김 + 자체 상단바 존재
await pg.goto('http://localhost:3100/pro-center');
await pg.waitForTimeout(400);
R.proGnbHidden = await pg.locator('header.gnb').count() === 0;
R.proNbShown = await pg.locator('.prognb').count() === 1;

// 사이드내브로 화면 간 이동 (data-go 라우팅)
await pg.click('.pronav >> text=요청 인박스');
await pg.waitForURL('**/pro-center/inbox');
R.proNav = true;

// 동별 위험도: 21개 동 렌더 + 클릭 선택
await pg.goto('http://localhost:3100/manager');
await pg.waitForTimeout(400);
R.dongs = await pg.locator('#dongGrid .dong').count();
await pg.locator('#dongGrid .dong').nth(3).click();

// 입상관 계통도: 20층×4라인 = 80셀 + 이력 11 + 셀 선택
await pg.goto('http://localhost:3100/manager/map');
await pg.waitForTimeout(400);
R.riserCells = await pg.locator('#riserGrid .cell').count();
R.riserHist = await pg.locator('#riserGrid .cell', { hasText: /누수|세정|교체|2회/ }).count();
await pg.locator('#riserGrid .cell', { hasText: '교체' }).click();
R.riserSel = await pg.locator('#riserGrid .cell.sel').textContent();

// 홈 → 사업자 센터 링크 (실제 Link)
await pg.goto('http://localhost:3100/');
await pg.click('text=사업자 센터');
await pg.waitForURL('**/pro-center');
R.gnbLink = true;

// 백오피스 → 고객 화면으로 복귀
await pg.click('.pronav >> text=고객 화면으로');
await pg.waitForURL(u => u.pathname === '/');
R.backHome = true;

R.errs = errs;
console.log(JSON.stringify(R, null, 1));
await b.close();
