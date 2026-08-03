import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const errs = [];
const pg = await b.newPage({ viewport: { width: 1440, height: 900 } });
pg.on('pageerror', e => errs.push(e.message.slice(0, 150)));

// 1) 견적 선택 → 예약 화면에 해당 견적 반영 (q2 한빛배관 선택)
await pg.goto('http://localhost:3100/quotes');
await pg.waitForTimeout(600);
await pg.locator('text=이 견적 선택').nth(1).click();   // 두 번째 카드 = 한빛배관
await pg.waitForURL('**/booking');
await pg.waitForTimeout(500);
const bBody = await pg.locator('#p-booking').textContent();
const quoteOk = bBody.includes('한빛배관') && bBody.includes('360,000원') && bBody.includes('누수 탐지');

// 2) 날짜/시간 해제 불가(단일선택) → 다른 날짜 클릭 → 요약 동기화
await pg.locator('#bookDays .chip', { hasText: '11/21' }).click();
await pg.locator('#bookTimes .chip', { hasText: '09:00' }).click();
const when = await pg.locator('#bookWhen').textContent();

// 3) 결제 → API → 토스트 → /variation 이동
const [resp] = await Promise.all([
  pg.waitForResponse(r => r.url().includes('/api/bookings')),
  pg.click('text=결제하고 예약 확정'),
]);
const api = await resp.json();
await pg.waitForURL('**/variation', { timeout: 5000 });
const toastSeen = await pg.locator('.toast').count();

// 4) 사례 필터·정렬 동작
await pg.goto('http://localhost:3100/cases');
await pg.waitForTimeout(500);
const count0 = await pg.locator('#p-cases .card[data-go]').count();
await pg.locator('.chip', { hasText: '같은 아파트' }).click();
await pg.waitForTimeout(200);
const count1 = await pg.locator('#p-cases .card[data-go]').count();
await pg.locator('.chip', { hasText: '보험 처리 건만' }).click();
await pg.waitForTimeout(200);
const count2 = await pg.locator('#p-cases .card[data-go]').count();
const summary = await pg.locator('.side .panel').first().textContent();
await pg.selectOption('#p-cases select', 'priceAsc');
await pg.waitForTimeout(200);
const firstPrice = await pg.locator('#p-cases .card[data-go] .t-h20').first().textContent();
await pg.screenshot({ path: 'e2e_cases.png' });

console.log(JSON.stringify({ quoteOk, when, apiOk: api.ok, bookingId: api.booking?.id,
  amount: api.booking?.amountWon, toastSeen, count0, count1, count2,
  summaryHas: summary.includes(count2 + '건 요약'), firstPrice, errs }, null, 1));
await b.close();
