// 알림 추상 계층 — Solapi 키가 있으면 실발송, 없으면 콘솔 로그.
// 발송사가 바뀌어도 notify() 시그니처만 유지하면 호출부(API 라우트)는 무사합니다.
//
// 필요한 환경변수 (.env.local):
//   SOLAPI_API_KEY=... / SOLAPI_API_SECRET=... / SOLAPI_SENDER=0161234567 (등록된 발신번호)
// ⚠️ Solapi 는 발신번호 등록 + (알림톡의 경우) 템플릿 사전 심사가 필요합니다.
//    아래 드라이버는 SMS 기준 스텁이며, 실사용 전 https://developers.solapi.com 문서로 검증하세요.
import { createHmac, randomBytes } from 'node:crypto';

export type NotifyEvent =
  | { type: 'booking_confirmed'; to: string; pro: string; day: string; time: string; amountWon: number }
  | { type: 'variation_requested'; to: string; count: number; extraWon: number }
  | { type: 'variation_approved'; to: string; extraWon: number }
  | { type: 'groupbuy_joined'; to: string; complex: string; current: number; goal: number }
  | { type: 'work_done'; to: string; pro: string };

function message(e: NotifyEvent): string {
  switch (e.type) {
    case 'booking_confirmed':
      return `[설비고] 예약 확정 — ${e.pro} · ${e.day} ${e.time} 방문. ${e.amountWon.toLocaleString()}원이 에스크로에 보관되었습니다.`;
    case 'variation_requested':
      return `[설비고] 현장 변수 ${e.count}건(+${e.extraWon.toLocaleString()}원) 승인 요청이 도착했습니다. 앱에서 확인해주세요.`;
    case 'variation_approved':
      return `[설비고] 추가금 ${e.extraWon.toLocaleString()}원이 승인되어 시공이 계속 진행됩니다.`;
    case 'groupbuy_joined':
      return `[설비고] ${e.complex} 공동구매 참여 접수 (${e.current}/${e.goal}세대). 목표 달성 시 확정 안내를 드립니다.`;
    case 'work_done':
      return `[설비고] ${e.pro} 시공이 완료되었습니다. Before/After 확인 후 완료 승인해주세요.`;
  }
}

const apiKey = process.env.SOLAPI_API_KEY;
const apiSecret = process.env.SOLAPI_API_SECRET;
const sender = process.env.SOLAPI_SENDER;
export const hasSolapi = Boolean(apiKey && apiSecret && sender);

/** Solapi HMAC-SHA256 인증 헤더 (developers.solapi.com 인증 방식) */
function solapiAuth(): string {
  const date = new Date().toISOString();
  const salt = randomBytes(16).toString('hex');
  const signature = createHmac('sha256', apiSecret!).update(date + salt).digest('hex');
  return `HMAC-SHA256 apiKey=${apiKey}, date=${date}, salt=${salt}, signature=${signature}`;
}

async function sendSolapi(to: string, text: string) {
  const res = await fetch('https://api.solapi.com/messages/v4/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: solapiAuth() },
    body: JSON.stringify({ message: { to, from: sender, text } }),
  });
  if (!res.ok) throw new Error(`Solapi ${res.status}: ${await res.text()}`);
}

/** 이벤트 알림 발송 — 실패해도 호출부 흐름을 막지 않습니다 (fire-and-forget 권장) */
export async function notify(e: NotifyEvent): Promise<void> {
  const text = message(e);
  if (!hasSolapi) {
    console.log(`[notify:mock] to=${e.to} :: ${text}`);
    return;
  }
  try {
    await sendSolapi(e.to, text);
  } catch (err) {
    console.error('[notify:solapi] 발송 실패', err);
  }
}
