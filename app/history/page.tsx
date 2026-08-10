'use client';
import { Ic } from '../../components/icons';
// p-history — 데이터 기반으로 전환 완료: 이력 목록이 HistoryItem[] + 이번 세션의 시공(선택 견적·추가금)으로 구성됩니다.
import { useEffect, useState } from 'react';
import { DEMO_QUOTES, HISTORY_OLD, type HistoryItem, type Quote } from '../../lib/mock-data';
import Link from 'next/link';
import { loadSelectedQuote } from '../../lib/quote-store';
import { loadVariation } from '../../lib/variation-store';
import type { LiveBooking } from '../../lib/db';

const LIVE_LABEL: Record<string, { label: string; cls: string }> = {
  escrow: { label: '예약 확정 · 방문 대기', cls: 'b-blue' },
  in_progress: { label: '시공 진행중', cls: 'b-brands' },
  await_approval: { label: '완료 확인 대기', cls: 'b-orange' },
  paid_out: { label: '거래 완료', cls: 'b-green' },
};

export default function Page() {
  const [quote, setQuote] = useState<Quote>(DEMO_QUOTES[0]);
  const [extra, setExtra] = useState(80_000);
  const [live, setLive] = useState<LiveBooking | null>(null);

  useEffect(() => {
    setQuote(loadSelectedQuote());
    const v = loadVariation();
    if (v) setExtra(v.extraWon);
    fetch('/api/bookings').then(r => r.json())
      .then(d => { if (d?.booking) setLive(d.booking); }).catch(() => {});
  }, []);

  const latest: HistoryItem = {
    title: quote.lineItems.map(li => li.name).join(' + '),
    won: quote.priceWon + extra,
    date: '2026.11.19',
    pro: quote.proName,
    warranty: '2027.11.18',
    badges: [
      { label: '보험 처리', tone: 'green' },
      { label: '안방 천장', tone: 'gline' },
      { label: '보증중', tone: 'brand' },
    ],
  };
  const items = [latest, ...HISTORY_OLD];

  return (
    <section className="page on" id="p-history" data-react>
      <div className="phead"><div className="phead__in">
        <div className="crumb"><a data-go="home">홈</a><span>›</span><b>우리집 배관 이력</b></div>
        <h1>청솔아파트 103동 1204호</h1>
        <p className="sub">준공 1999년 · 27년차 · 중앙난방 · 배관 재질 강관(백관) 추정</p>
      </div></div>

      <div className="flow">
        <div>
          <div className="block">
            <h2 className="block__t">배관 상태 진단</h2>
            <p className="block__d">시공 이력과 전국 동일 연식 단지 데이터를 대조한 결과입니다.</p>
            <div className="row gap24" style={{ gap: 24, alignItems: 'center', marginTop: 18, flexWrap: 'wrap' }}>
              <div className="ring">
                <svg width="96" height="96"><circle cx="48" cy="48" r="40" fill="none" stroke="#EFF1F5" strokeWidth={12} />
                  <circle cx="48" cy="48" r="40" fill="none" stroke="#FF7C11" strokeWidth={12} strokeLinecap="round" strokeDasharray="251" strokeDashoffset={88} /></svg>
                <div className="ring__t"><div className="t-h20 num">65</div><div className="t-b11 c-sec">주의</div></div>
              </div>
              <div style={{ flex: 1, minWidth: 260 }}>
                <div className="col gap12">
                  <div><div className="row between t-b14"><span>배관 노후도</span><span className="fw6" style={{ color: 'var(--sg-text-warning)' }}>27년차 · 상위 32%</span></div>
                    <div className="posbar" style={{ marginTop: 6 }}><i style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '72%', borderRadius: 999, background: 'var(--sg-text-warning)' }} /></div></div>
                  <div><div className="row between t-b14"><span>최근 하자 발생</span><span className="fw6">최근 12개월 1건</span></div>
                    <div className="posbar" style={{ marginTop: 6 }}><i style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '35%', borderRadius: 999, background: 'var(--sg-brand-secondary)' }} /></div></div>
                  <div><div className="row between t-b14"><span>스케일 축적 추정</span><span className="fw6" style={{ color: 'var(--sg-text-warning)' }}>중간</span></div>
                    <div className="posbar" style={{ marginTop: 6 }}><i style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '58%', borderRadius: 999, background: 'var(--sg-text-warning)' }} /></div></div>
                </div>
              </div>
            </div>
            <div className="callout" style={{ marginTop: 20, background: 'var(--sg-bg-warning-subtle)' }}>
              <span style={{ flex: '0 0 20px', color: 'var(--sg-text-warning)' }}><Ic id="alert-triangle" /></span>
              <div><p className="t-b14 fw6" style={{ margin: '0 0 2px' }}>수도·난방배관 클리닝을 권장합니다</p>
                <p className="t-b12 c-sec" style={{ margin: 0 }}>준공 25년을 넘긴 중앙난방 세대는 스케일 1mm만 쌓여도 약 2%의 에너지가 손실됩니다.
                  같은 조건 세대의 시공 후 난방비는 평균 18% 줄었습니다.</p></div>
            </div>
          </div>

          <div className="block" style={{ marginBottom: 0 }}>
            <h2 className="block__t">시공 이력 <span className="c-brand num">{items.length}건</span></h2>
            {live && LIVE_LABEL[live.status] && (
              <Link href="/tracking" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <div className="panel row between" style={{ padding: '14px 18px', marginBottom: 12,
                  boxShadow: '0 0 0 1.5px var(--sg-brand-primary) inset', cursor: 'pointer' }}>
                  <div className="row gap10">
                    <span className={'badge ' + LIVE_LABEL[live.status].cls}>{LIVE_LABEL[live.status].label}</span>
                    <span className="t-b14 fw6">진행 중인 시공 · {live.day} {live.time} · {live.amountWon.toLocaleString()}원</span>
                  </div>
                  <span className="t-b14 c-brand fw6">진행 상황 보기 ›</span>
                </div>
              </Link>
            )}
            <div className="tl" style={{ marginTop: 20 }}>
              {items.map(it => (
                <div key={it.title + it.date} className="tl__i done">
                  <div className="row between"><div className="t-b16 fw7">{it.title}</div>
                    <span className="t-b14 num">{it.won.toLocaleString()}원</span></div>
                  <div className="t-b14 c-sec">{it.date} · {it.pro}{it.warranty ? ` · 보증 유효 (${it.warranty}까지)` : ''}</div>
                  {it.badges.length > 0 && (
                    <div className="row gap4" style={{ marginTop: 6 }}>
                      {it.badges.map(b => <span key={b.label} className={'badge b-' + b.tone}>{b.label}</span>)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="side">
          <div className="panel">
            <h3 className="panel__t">다음 권장 시점</h3>
            <div className="col gap12">
              <div className="tier on">
                <div><div className="t-b14 fw7">수도·난방배관 클리닝</div>
                  <div className="t-b12 c-sec">지금 권장 · 마지막 시공 없음</div></div>
                <span className="badge b-brands">추천</span>
              </div>
              <div className="tier">
                <div><div className="t-b14 fw7">주방 배수관 세정</div>
                  <div className="t-b12 c-sec">2027.04 예정 · 2년 주기</div></div>
                <span className="t-b12 c-sec num">D-160</span>
              </div>
              <div className="tier">
                <div><div className="t-b14 fw7">공용 입상관 세정</div>
                  <div className="t-b12 c-sec">단지 관리사무소 일정</div></div>
                <span className="t-b12 c-sec">미정</span>
              </div>
            </div>
            <button className="btn large primary block" data-go="groupbuy" style={{ marginTop: 16 }}>클리닝 공동구매 참여</button>
          </div>
          <div className="panel" style={{ background: 'var(--sg-bg-brand-subtle)', boxShadow: 'none' }}>
            <div className="t-b14 fw7" style={{ marginBottom: 6 }}>이사를 가도 이력은 남습니다</div>
            <p className="t-b12 c-sec" style={{ margin: 0 }}>이 집의 배관 이력은 주소 단위로 보관됩니다.
              매매·전세 시 다음 거주자에게 이전할 수 있고, 건물 관리사무소의 공용부 이력과도 연결됩니다.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
