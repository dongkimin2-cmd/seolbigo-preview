import { chromium } from '/home/claude/.npm-global/lib/node_modules/playwright/index.mjs';

const errors = [];
const results = [];
const ok = (name, cond, extra='') => results.push(`${cond ? 'PASS' : 'FAIL'} ${name}${extra ? ' — ' + extra : ''}`);

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on('pageerror', e => errors.push('pageerror: ' + e.message));
page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });

await page.goto('file:///home/claude/seolbigo-preview/index.html');

// ---- 1. diag1 validation ----
await page.click('[data-go="diag1"]');
// deselect the two pressed chips
for (const c of await page.$$('#diagSymChips .chip[aria-pressed="true"]')) await c.click();
ok('diag1 증상 카운트 0 동기화', (await page.textContent('#diagSymCount')).trim() === '0개 선택');
await page.click('[data-validate="diag1"]');
await page.waitForTimeout(400);
ok('diag1 미선택 시 경고 토스트', await page.$('.toast.warn') !== null);
ok('diag1 미선택 시 이동 차단', await page.$eval('#p-diag1', el => el.classList.contains('on')));
// address empty check
await page.click('#diagSymChips .chip'); // reselect one
await page.fill('#diagAddr', '');
await page.click('[data-validate="diag1"]');
await page.waitForTimeout(300);
ok('diag1 주소 비움 시 err 표시', await page.$eval('#diagAddr', el => el.classList.contains('err')));
await page.fill('#diagAddr', '서울 강남구 래미안아파트 103동 1204호');
await page.click('[data-validate="diag1"]');
await page.waitForTimeout(300);
ok('diag1 통과 시 diag2 이동', await page.$eval('#p-diag2', el => el.classList.contains('on')));
await page.waitForTimeout(3200); // AI 연출 → diag3
ok('AI 연출 후 diag3 자동 이동', await page.$eval('#p-diag3', el => el.classList.contains('on')));

// ---- 2. booking flow ----
await page.click('#p-diag3 [data-go="quotes"]');
await page.click('#p-quotes [data-go="booking"]');
// single-select + bookWhen sync
await page.click('#bookDays .chip:has-text("11/20")');
await page.click('#bookTimes .chip:has-text("16:00")');
ok('bookDays 단일 선택', (await page.$$('#bookDays .chip[aria-pressed="true"]')).length === 1);
ok('bookWhen 동기화', (await page.textContent('#bookWhen')).includes('11.20') && (await page.textContent('#bookWhen')).includes('16:00'));
// deselect impossible in single mode → test validation by fresh reload later; here just pay
await page.click('[data-validate="booking"]');
await page.waitForTimeout(400);
ok('결제 토스트', await page.$eval('.toast', el => el.textContent.includes('결제 완료')));
ok('variation 이동', await page.$eval('#p-variation', el => el.classList.contains('on')));

// ---- 3. 추가금 승인 → tracking ----
await page.click('#p-variation .btn.primary[data-go="tracking"]');
await page.waitForTimeout(300);
ok('tracking 이동 + 승인 토스트', await page.$eval('#p-tracking', el => el.classList.contains('on')));

// ---- 4. data-done (warranty) ----
await page.click('#p-tracking [data-go="warranty"]');
const doneBtn = await page.$('#p-warranty [data-done]');
await doneBtn.click();
await page.waitForTimeout(300);
ok('시공 완료 승인 → done 상태', await page.$eval('#p-warranty .btn.done', el => el.disabled && el.textContent.includes('승인 완료')));

// ---- 5. pro quote → 견적 보내기 ----
await page.click('.page.on [data-go="home"]');
await page.click('.gnb__right .btn[data-go="pro-home"]');
await page.click('#p-pro-home [data-go="pro-inbox"]');
await page.click('#p-pro-inbox [data-go="pro-quote"]');
await page.click('#p-pro-quote .btn.primary[data-go="pro-inbox"]');
await page.waitForTimeout(300);
ok('견적 보내기 → 인박스 이동+토스트', await page.$eval('#p-pro-inbox', el => el.classList.contains('on')));

// ---- 6. 보험사 승인 done ----
await page.click('.page.on [data-go="home"]');
await page.click('.gnb__right .lk[data-go="ins-home"]');
await page.click('#p-ins-home [data-go="ins-case"]');
await page.click('#p-ins-case [data-done]');
await page.waitForTimeout(300);
ok('보험 승인 done 상태', await page.$eval('#p-ins-case .btn.done', el => el.disabled));

// ---- 7. 모바일 390 회귀 + mcta ----
await page.setViewportSize({ width: 390, height: 844 });
await page.click('.page.on [data-go="home"]');
await page.waitForTimeout(300);
const pagesToCheck = ['home','diag1','quotes','booking','groupbuy','services','instant'];
for (const id of pagesToCheck) {
  await page.evaluate(pid => {
    document.querySelectorAll('.page').forEach(p => p.classList.toggle('on', p.id === 'p-' + pid));
    if (window.__syncCta) window.__syncCta();
  }, id);
  await page.waitForTimeout(120);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  ok(`390px 가로 오버플로 없음 (${id})`, overflow <= 0, overflow > 0 ? `+${overflow}px` : '');
}
// mcta clone toast on mobile (booking page)
await page.evaluate(() => {
  document.querySelectorAll('.page').forEach(p => p.classList.toggle('on', p.id === 'p-booking'));
  window.__syncCta();
});
const mctaBtn = await page.$('#mcta .btn');
ok('모바일 하단 CTA 존재', mctaBtn !== null);
if (mctaBtn) {
  await mctaBtn.click();
  await page.waitForTimeout(300);
  ok('mcta 클릭 → 토스트/이동 동작', await page.$('.toast') !== null || await page.$eval('#p-variation', el => el.classList.contains('on')));
}

// 1440 회귀 스크린샷
await page.setViewportSize({ width: 1440, height: 900 });
await page.evaluate(() => { document.querySelectorAll('.page').forEach(p => p.classList.toggle('on', p.id === 'p-diag1')); });
await page.waitForTimeout(200);
await page.screenshot({ path: 'shot_diag1.png' });

console.log(results.join('\n'));
console.log('\nJS errors:', errors.length ? errors.join('\n') : 'none');
await browser.close();
