import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const errs = [];
const pg = await b.newPage({ viewport: { width: 1440, height: 900 } });
pg.on('pageerror', e => errs.push(e.message.slice(0, 150)));

// 견적 q2(한빛배관 36만) 선택 상태로 변경 승인 진입
await pg.goto('http://localhost:3100/quotes');
await pg.waitForTimeout(600);
await pg.locator('text=이 견적 선택').nth(1).click();
await pg.waitForURL('**/booking');
await pg.goto('http://localhost:3100/variation');
await pg.waitForTimeout(500);

// 초기: 2개 항목 승인 → 360,000 + 80,000 = 440,000
const t0 = await pg.locator('.side .t-h24').textContent();

// 매립관 절개(v2, 50,000) 보류 → 390,000 + 버튼 라벨 30,000원
await pg.locator('.varow', { hasText: '매립관' }).click();
await pg.waitForTimeout(200);
const t1 = await pg.locator('.side .t-h24').textContent();
const btn1 = await pg.locator('.side .btn.primary').textContent();
const held = await pg.locator('.side >> text=보류').count();

// 해당 없음 항목은 클릭해도 무반응
await pg.locator('.varow', { hasText: '야간 작업' }).click();
await pg.waitForTimeout(200);
const t2 = await pg.locator('.side .t-h24').textContent();

// 승인 → API → 토스트 → /tracking 반영 확인
const [resp] = await Promise.all([
  pg.waitForResponse(r => r.url().includes('/api/variations')),
  pg.locator('.side .btn.primary').click(),
]);
const api = await resp.json();
await pg.waitForURL('**/tracking', { timeout: 5000 });
await pg.waitForTimeout(500);
const tr = await pg.locator('#p-tracking').textContent();
const trOk = tr.includes('한빛배관') && tr.includes('1개 항목 30,000원 승인')
  && tr.includes('390,000원') && tr.includes('배관 이음부 보수 + 누수 탐지');
await pg.screenshot({ path: 'e2e_tracking.png' });

// 모든 항목 보류 → "추가금 없이 진행"
await pg.goto('http://localhost:3100/variation');
await pg.waitForTimeout(400);
await pg.locator('.varow', { hasText: '노후 배관' }).click();
await pg.locator('.varow', { hasText: '매립관' }).click();
await pg.waitForTimeout(200);
const btnZero = await pg.locator('.side .btn.primary').textContent();

console.log(JSON.stringify({ t0, t1, btn1, held, t2, apiWon: api.approvedWon,
  trOk, btnZero, errs }, null, 1));
await b.close();
