import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const errs = [];
const pg = await b.newPage({ viewport: { width: 1440, height: 900 } });
pg.on('pageerror', e => errs.push(e.message.slice(0, 120)));
const R = {};

// 전 라우트 스모크 (200 + 렌더)
const routes = ['/', '/diagnose', '/diagnose/result', '/cases', '/cases/1', '/quotes', '/pro/1',
  '/booking', '/variation', '/tracking', '/warranty', '/insurance', '/history', '/groupbuy',
  '/services', '/services/survey', '/services/scope', '/services/area', '/services/drone', '/services/instant'];
let smoke = 0;
for (const r of routes) {
  const resp = await pg.goto('http://localhost:3100' + r);
  if (resp.status() === 200 && await pg.locator('section.page.on').count() === 1) smoke++;
}
R.smoke = smoke + '/' + routes.length;

// 홈: 카탈로그 8종 + 사례 6건 + 공동구매 수치
await pg.goto('http://localhost:3100/');
R.homeCats = await pg.locator('.cats .cat').count();
R.homeCases = await pg.locator('.casecard').count();
R.homeGb = (await pg.locator('#p-home').textContent()).includes('18세대');

// instant: 플랜 변경 + 애드온 → 금액 재계산
await pg.goto('http://localhost:3100/services/instant');
await pg.waitForTimeout(400);
await pg.locator('.opt', { hasText: '난방배관' }).click();
await pg.locator('.varow', { hasText: '수전 필터' }).click();
R.instantTotal = await pg.locator('.side .t-h24').textContent();  // 220,000+40,000=260,000원

// area: 면적 변경 → 물량표·기준가 재계산
await pg.goto('http://localhost:3100/services/area');
await pg.waitForTimeout(400);
const man0 = await pg.locator('.side .t-h24').textContent();
await pg.locator('input[type="number"]').first().fill('120');
await pg.waitForTimeout(300);
const man1 = await pg.locator('.side .t-h24').textContent();
R.areaRecalc = man0 + ' → ' + man1;

// groupbuy: 참여 → 세대수 증가 + 게이지
await pg.goto('http://localhost:3100/groupbuy');
await pg.waitForTimeout(400);
const [gres] = await Promise.all([
  pg.waitForResponse(r => r.url().includes('/api/groupbuy')),
  pg.click('text=공동구매 참여'),
]);
await pg.waitForTimeout(400);
const gb = await pg.locator('#p-groupbuy').textContent();
R.gbJoined = gres.status() === 200 && gb.includes('19세대') && gb.includes('✓ 참여 접수됨');

// warranty/insurance/history: 한빛배관 선택 흐름 반영 (36만+3만=39만)
await pg.goto('http://localhost:3100/quotes');
await pg.waitForTimeout(400);
await pg.locator('text=이 견적 선택').nth(1).click();
await pg.waitForURL('**/booking');
await pg.goto('http://localhost:3100/variation'); await pg.waitForTimeout(300);
await pg.locator('.varow', { hasText: '매립관' }).click();
await pg.locator('.side .btn.primary').click();
await pg.waitForURL('**/tracking');
await pg.goto('http://localhost:3100/warranty'); await pg.waitForTimeout(300);
const w = await pg.locator('#p-warranty').textContent();
R.warranty = w.includes('390,000원') && w.includes('한빛배관');
await pg.goto('http://localhost:3100/insurance'); await pg.waitForTimeout(300);
const ins = await pg.locator('#p-insurance').textContent();
R.insurance = ins.includes('390,000') && ins.includes('190,000원'); // 자기부담 20만 차감
await pg.goto('http://localhost:3100/history'); await pg.waitForTimeout(300);
const h = await pg.locator('#p-history').textContent();
R.history = h.includes('390,000원') && h.includes('한빛배관') && h.includes('3건');

// services: 그룹 6개 · 카드 8개
await pg.goto('http://localhost:3100/services');
R.svcGroups = await pg.locator('#p-services .block').count();
R.svcCards = await pg.locator('#p-services .svc').count();

// scope/drone/survey: 예약 접수 상태 전이
await pg.goto('http://localhost:3100/services/survey'); await pg.waitForTimeout(300);
await pg.click('text=무료 실측 예약');
await pg.waitForTimeout(300);
R.surveyDone = (await pg.locator('.side .btn.primary').textContent()).includes('✓');

// 모바일 오버플로
const m = await b.newPage({ viewport: { width: 390, height: 844 } });
let ovMax = 0;
for (const r of ['/', '/groupbuy', '/services/instant', '/services/area', '/history']) {
  await m.goto('http://localhost:3100' + r); await m.waitForTimeout(300);
  ovMax = Math.max(ovMax, await m.evaluate(() =>
    document.documentElement.scrollWidth - document.documentElement.clientWidth));
}
R.mobOverflow = ovMax;
R.errs = errs;
console.log(JSON.stringify(R, null, 1));
await b.close();
