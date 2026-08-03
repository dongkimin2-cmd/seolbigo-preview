'use client';
// p-booking — 상태 기반으로 전환 완료 (MockupBridge 비의존)
// 선택한 견적(quote-store)이 요약·금액을 채우고, 날짜·시간·결제수단은 React 상태.
// 제출 시 POST /api/bookings → 예약 확정 후 변경 승인 화면으로 이동.
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BOOKING_DAYS, BOOKING_TIMES, DEMO_QUOTES, type Quote } from '../../lib/mock-data';
import { loadSelectedQuote } from '../../lib/quote-store';
import { toast } from '../../lib/toast';

const METHODS = [
  { id: 'card', label: '신용 / 체크카드' },
  { id: 'transfer', label: '계좌 간편결제' },
  { id: 'insurance', label: '보험금 수령 후 결제', badge: '일배책 연계' },
] as const;

export default function Page() {
  const router = useRouter();
  const [quote, setQuote] = useState<Quote>(DEMO_QUOTES[0]);
  const [day, setDay] = useState<string | null>(BOOKING_DAYS[1]);
  const [time, setTime] = useState<string | null>('14:00');
  const [method, setMethod] = useState<string>('card');
  const [busy, setBusy] = useState(false);

  useEffect(() => { setQuote(loadSelectedQuote()); }, []);

  const when = useMemo(() =>
    day && time ? `${day.replace('/', '.')} ${time} 방문` : '방문 일정을 선택해주세요',
    [day, time]);

  async function submit() {
    if (!day) { toast('방문 날짜를 선택해주세요.', 'warn'); return; }
    if (!time) { toast('방문 시간을 선택해주세요.', 'warn'); return; }
    setBusy(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quoteId: quote.id, day, time, method }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
      toast(`${data.booking.amountWon.toLocaleString()}원 결제 완료 · 예약이 확정되었습니다`);
      router.push('/variation');
    } catch {
      toast('결제 처리에 실패했어요. 잠시 후 다시 시도해주세요.', 'warn');
      setBusy(false);
    }
  }

  return (
    <section className="page on" id="p-booking" data-react>
      <div className="phead"><div className="phead__in">
        <div className="crumb"><a data-go="home">홈</a><span>›</span><a data-go="quotes">견적 비교</a><span>›</span><b>예약 · 결제</b></div>
        <h1>방문 일정을 정하고 결제하세요</h1>
        <p className="sub">결제 금액은 에스크로에 보관되며, 시공 완료를 확인하신 뒤 사업자에게 지급됩니다.</p>
      </div></div>

      <div className="flow">
        <div>
          <div className="block">
            <h2 className="block__t">방문 일정</h2>
            <p className="block__d">{quote.proName}의 예약 가능 시간입니다.</p>
            <div className="row gap8" id="bookDays" style={{ marginBottom: 16, flexWrap: 'wrap' }}>
              {BOOKING_DAYS.map(d => (
                <button key={d} className="chip" aria-pressed={day === d}
                  onClick={() => setDay(d)}>{d}</button>
              ))}
            </div>
            <div className="row gap8" id="bookTimes" style={{ flexWrap: 'wrap' }}>
              {BOOKING_TIMES.map(s => (
                <button key={s.t} className="chip sm" aria-pressed={time === s.t}
                  disabled={s.soldOut} style={s.soldOut ? { opacity: 0.4 } : undefined}
                  onClick={() => setTime(s.t)}>{s.soldOut ? `${s.t} (마감)` : s.t}</button>
              ))}
            </div>
          </div>

          <div className="block">
            <h2 className="block__t">현장 정보</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 14 }}>
              <div className="field" style={{ gridColumn: '1/-1' }}><span className="lb">주소</span>
                <input className="inp" defaultValue="서울 강남구 청솔아파트 103동 1204호" /></div>
              <div className="field"><span className="lb">연락처</span>
                <input className="inp" value="010-****-1234" disabled readOnly
                  style={{ background: 'var(--sg-bg-subtle)', color: 'var(--sg-text-disabled)' }} /></div>
              <div className="field"><span className="lb">주차 가능 여부</span>
                <select className="inp" defaultValue="지하주차장 가능"><option>지하주차장 가능</option><option>불가</option></select></div>
              <div className="field" style={{ gridColumn: '1/-1' }}><span className="lb">기사님께 전할 말</span>
                <textarea className="inp" placeholder="예: 낮에는 집에 사람이 없어 경비실에 연락 부탁드립니다." /></div>
            </div>
            <div className="callout info" style={{ marginTop: 16 }}>
              <span className="c-inf" style={{ flex: '0 0 20px' }}>☎</span>
              <p className="t-b14 c-sec" style={{ margin: 0 }}>연락처는 <b>안심번호</b>로 연결되어 실제 번호가 사업자에게 공개되지 않습니다.</p>
            </div>
          </div>

          <div className="block" style={{ marginBottom: 0 }}>
            <h2 className="block__t">결제 수단</h2>
            <div style={{ marginTop: 14 }}>
              {METHODS.map((m, i) => (
                <label key={m.id} className="row between" onClick={() => setMethod(m.id)}
                  style={{ padding: '16px 0', cursor: 'pointer',
                    borderBottom: i < METHODS.length - 1 ? '1px solid var(--sg-border-subtle)' : undefined }}>
                  <span className="t-b16">{m.label}
                    {'badge' in m && m.badge && <span className="badge b-blue" style={{ marginLeft: 4 }}>{m.badge}</span>}</span>
                  <span style={{ width: 22, height: 22, borderRadius: '50%',
                    border: method === m.id ? '7px solid var(--sg-brand-primary)' : '1.5px solid var(--sg-border-strong)' }} />
                </label>
              ))}
            </div>
            <p className="t-b12 c-ter" style={{ margin: '16px 0 0' }}>설비고는 통신판매중개자이며 통신판매의 당사자가 아닙니다.
              결제는 등록 PG사의 지급대행·예치 서비스를 통해 처리됩니다.</p>
          </div>
        </div>

        <aside className="side">
          <div className="panel">
            <div className="row gap12" style={{ marginBottom: 16 }}>
              <div className="avatar sq" style={{ width: 44, height: 44 }}>{quote.initial}</div>
              <div style={{ flex: 1 }}><div className="t-b16 fw7">{quote.proName}</div>
                <div className="t-b12 c-sec" id="bookWhen">{when}</div></div>
            </div>
            <hr className="hair" style={{ margin: '0 0 14px' }} />
            <h3 className="panel__t">결제 금액</h3>
            <div className="col gap8">
              {quote.lineItems.map(li => (
                <div key={li.name} className="row between">
                  <span className="t-b14 c-sec">{li.name}</span>
                  <span className="t-b14 num">{li.won.toLocaleString()}</span>
                </div>
              ))}
              <div className="row between"><span className="t-b14 c-sec">현장 변수 추가금</span><span className="t-b12 c-sec">승인 후 청구</span></div>
            </div>
            <hr className="hair" style={{ margin: '14px 0' }} />
            <div className="row between" style={{ marginBottom: 16 }}>
              <span className="t-h16">지금 결제</span>
              <span className="t-h24 num c-brand">{quote.priceWon.toLocaleString()}원</span></div>
            <button className="btn large primary block" onClick={submit} disabled={busy}>
              {busy ? '결제 처리 중…' : '결제하고 예약 확정'}</button>
          </div>
          <div className="panel" style={{ background: 'var(--sg-bg-info-subtle)', boxShadow: 'none' }}>
            <div className="t-b14 fw7" style={{ marginBottom: 6 }}>🔒 에스크로로 보관됩니다</div>
            <p className="t-b12 c-sec" style={{ margin: 0 }}>시공 완료를 확인하고 승인하시면 그때 사업자에게 지급됩니다.
              중개 수수료 8%는 지급 시 공제되며, 고객이 따로 부담하는 금액은 없습니다.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
