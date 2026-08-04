// 라우트 스모크 — 서버 기동 대기 후 주요 라우트 200 + 마커 텍스트 확인 (mock 모드)
const BASE = 'http://localhost:3100';
const ROUTES = [
  ['/', '설비고'],
  ['/services', '전체 서비스'],
  ['/diagnose', '증상'],
  ['/quotes', '견적이 도착했습니다'],
  ['/booking', '예약'],
  ['/cases', '유사'],
  ['/groupbuy', '공동구매'],
  ['/history', '이력'],
  ['/pro-center', ''],
  ['/manager', ''],
  ['/insurer', ''],
];
const wait = ms => new Promise(r => setTimeout(r, ms));
async function up() {
  for (let i = 0; i < 30; i++) {
    try { const r = await fetch(BASE + '/'); if (r.ok) return; } catch {}
    await wait(1000);
  }
  throw new Error('server did not start');
}
await up();
let fail = 0;
for (const [path, marker] of ROUTES) {
  const res = await fetch(BASE + path);
  const html = await res.text();
  const ok = res.status === 200 && (!marker || html.includes(marker));
  if (!ok) { fail++; console.error(`FAIL ${path} status=${res.status} marker=${marker}`); }
  else console.log(`ok   ${path}`);
}
// 쓰기 API 스모크 (mock 모드 — no-op 이지만 계약 확인)
const diag = await (await fetch(BASE + '/api/diagnose', { method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ symptoms: ['천장 얼룩'], address: '테스트' }) })).json();
if (!diag.ok) { fail++; console.error('FAIL /api/diagnose', diag); } else console.log('ok   /api/diagnose');
if (fail) { console.error(`${fail} failures`); process.exit(1); }
console.log('smoke passed');
