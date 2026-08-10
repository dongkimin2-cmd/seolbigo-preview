'use client';
import { Ic } from '../../components/icons';
// p-tracking — 데이터 기반으로 전환 완료: 선택 견적 + 승인된 추가금이 타임라인·주문 요약에 반영됩니다.
import { useEffect, useState } from 'react';
import { DEMO_QUOTES, DEMO_VARIATIONS, type Quote } from '../../lib/mock-data';
import { loadSelectedQuote } from '../../lib/quote-store';
import { loadVariation } from '../../lib/variation-store';
import type { LiveBooking } from '../../lib/db';

// E1-4: 실예약 상태 → 화면 단계 매핑 (사업자 대시보드와 같은 원본을 봅니다)
const STAGE: Record<string, { headline: string; badge: string; badgeCls: string; step: number }> = {
  escrow: { headline: '예약 확정 · 방문 대기', badge: '방문 대기', badgeCls: 'b-blue', step: 1 },
  in_progress: { headline: '시공 진행중', badge: '시공 진행중', badgeCls: 'b-brands', step: 3 },
  await_approval: { headline: '시공 완료 · 확인 대기', badge: '확인 대기', badgeCls: 'b-orange', step: 4 },
  paid_out: { headline: '거래 완료', badge: '완료', badgeCls: 'b-green', step: 5 },
};

export default function Page() {
  const [quote, setQuote] = useState<Quote>(DEMO_QUOTES[0]);
  const [extra, setExtra] = useState(80_000);
  const [nItems, setNItems] = useState(2);
  const [live, setLive] = useState<LiveBooking | null>(null);

  useEffect(() => {
    setQuote(loadSelectedQuote());
    const v = loadVariation();
    if (v) { setExtra(v.extraWon); setNItems(v.approvedIds.length); }
    // E1-4: 실예약이 있으면 그 상태를 우선 표시 (10초 폴링 — 사업자가 상태를 바꾸면 따라옴)
    let alive = true;
    const pull = () => fetch('/api/bookings').then(r => r.json())
      .then(d => { if (alive && d?.booking) setLive(d.booking); }).catch(() => {});
    pull();
    const t = setInterval(pull, 10_000);
    return () => { alive = false; clearInterval(t); };
  }, []);

  const stage = live ? (STAGE[live.status] ?? STAGE.escrow) : null;
  const step = stage?.step ?? 3;   // 실예약 없으면 기존 데모 연출(시공 진행중) 유지

  const total = quote.priceWon + extra;
  const workTitle = quote.lineItems.map(li => li.name).join(' + ');

  return (
    <section className="page on" id="p-tracking" data-react>
      <div className="phead"><div className="phead__in">
        <div className="crumb"><a data-go="home">홈</a><span>›</span><b>시공 진행 상황</b></div>
        <div className="row between" style={{ alignItems: 'flex-start' }}>
          <div>
            <h1>{workTitle}</h1>
            <p className="sub">{quote.proName} · {live ? `${live.day} ${live.time}` : '2026.11.19 14:00'} · 주문번호 {live ? live.id : 'SB-2611-0417'}</p>
          </div>
          <span className={'badge b12 ' + (stage ? stage.badgeCls : 'b-brands')}
            style={{ height: 30, padding: '0 14px', borderRadius: 999 }}>{stage ? stage.badge : '시공 진행중'}</span>
        </div>
      </div></div>

      <div className="flow">
        <div>
          <div className="block">
            <h2 className="block__t">진행 단계</h2>
            <div className="tl" style={{ marginTop: 20 }}>
              <div className="tl__i done">
                <div className="t-b16 fw7">예약 접수</div>
                <div className="t-b14 c-sec">11.17 21:04 · 에스크로 {quote.priceWon.toLocaleString()}원 예치 완료</div>
              </div>
              <div className={'tl__i' + (step >= 3 ? ' done' : '')}>
                <div className={'t-b16 fw7' + (step < 3 ? ' c-ter' : '')}>방문 · 현장 확인</div>
                <div className={step >= 3 ? 't-b14 c-sec' : 't-b14 c-ter'}>{step >= 3 ? '기사 도착 알림 발송' : '방문 시간에 맞춰 도착 알림이 발송됩니다'}</div>
              </div>
              <div className={'tl__i' + (step >= 3 ? ' done' : '')}>
                <div className={'t-b16 fw7' + (step < 3 ? ' c-ter' : '')}>추가금 승인</div>
                <div className="t-b14 c-sec">11.19 14:31 · {extra > 0
                  ? <>{nItems}개 항목 {extra.toLocaleString()}원 승인</>
                  : '추가금 없음 — 기존 견적으로 진행'}
                  <span className="more" data-go="variation" style={{ marginLeft: 6 }}>내역 보기 ›</span></div>
              </div>
              <div className={'tl__i' + (step === 3 ? ' now' : step > 3 ? ' done' : '')}>
                <div className="row gap6"><span className={'t-b16 fw7' + (step < 3 ? ' c-ter' : '')}>시공 진행중</span>{step === 3 && <span className="badge b-brand">현재</span>}</div>
                <div className="t-b14 c-sec" style={{ margin: '2px 0 12px' }}>11.19 14:40 ~ · 예상 완료 18:00</div>
                <div className="row gap8">
                  <div className="ph pipe" style={{ width: 104, height: 78, borderRadius: 10 }} />
                  <div className="ph wet" style={{ width: 104, height: 78, borderRadius: 10 }} />
                  <div className="ph" style={{ width: 104, height: 78, borderRadius: 10, backgroundImage: 'none', background: 'var(--sg-bg-subtle)', color: 'var(--sg-text-tertiary)', fontSize: 12 }}>작업중</div>
                </div>
              </div>
              <div className={'tl__i' + (step === 4 ? ' now' : step > 4 ? ' done' : '')}>
                <div className="row gap6"><span className={'t-b16 fw7' + (step < 4 ? ' c-ter' : '')}>완료 · 결과 확인</span>{step === 4 && <span className="badge b-brand">현재</span>}</div>
                <div className={step >= 4 ? 't-b14 c-sec' : 't-b14 c-ter'}>Before/After를 확인하고 승인하면 대금이 지급됩니다</div>
              </div>
              <div className="tl__i">
                <div className="t-b16 fw7 c-ter">디지털 보증서 발급</div>
                <div className="t-b14 c-ter">1년 무상 A/S 보증 · 플랫폼 공식 내역서</div>
              </div>
            </div>
          </div>

          <div className="block" style={{ marginBottom: 0 }}>
            <h2 className="block__t">기사님과 연락</h2>
            <div className="callout info" style={{ marginTop: 12 }}>
              <span className="c-inf" style={{ flex: '0 0 20px' }}><Ic id="phone" /></span>
              <p className="t-b14 c-sec" style={{ margin: 0 }}>안심번호로 통화할 수 있습니다. 양쪽의 실제 번호는 공개되지 않으며,
                통화 내역은 분쟁 발생 시 증빙으로 사용됩니다.</p>
            </div>
          </div>
        </div>

        <aside className="side">
          <div className="panel">
            <h3 className="panel__t">주문 요약</h3>
            <div className="col gap8">
              <div className="row between"><span className="t-b14 c-sec">시공 견적 ({quote.proName})</span>
                <span className="t-b14 num">{quote.priceWon.toLocaleString()}</span></div>
              <div className="row between"><span className="t-b14 c-sec">승인된 추가금</span>
                <span className="t-b14 num">{extra.toLocaleString()}</span></div>
            </div>
            <hr className="hair" style={{ margin: '14px 0' }} />
            <div className="row between" style={{ marginBottom: 6 }}>
              <span className="t-h16">최종 금액</span><span className="t-h20 num">{total.toLocaleString()}원</span></div>
            <div className="t-b12 c-sec" style={{ marginBottom: 16 }}>에스크로 보관중 · 완료 승인 시 지급</div>
            <button className="btn large primary block" data-go="warranty">시공 완료 확인 (데모)</button>
            <button className="btn medium ghost block" style={{ marginTop: 8 }}
              data-toast="안심번호로 연결됩니다 · 데모에서는 통화가 생략됩니다">문의하기</button>
          </div>
        </aside>
      </div>
    </section>
  );
}
