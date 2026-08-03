'use client';
// p-instant — 상태 기반으로 전환 완료: 서비스 선택·추가 옵션·일정이 상태이고 결제 금액이 재계산됩니다.
import { useMemo, useState } from 'react';
import { toast } from '../../../lib/toast';

const PLANS = [
  { k: '수도배관 클리닝', d: <>녹물·침전물 제거<br />수압 회복</>, won: 180_000 },
  { k: '난방배관 클리닝', d: <>스케일 제거<br />난방효율 개선</>, won: 220_000 },
  { k: '수도 + 난방 세트', d: <>같은 날 일괄 시공<br /><b className="c-brand">14% 할인</b></>, won: 340_000 },
];
const ADDONS = [
  { k: '수전 필터 일괄 교체', won: 40_000, d: '주방·욕실 수전 필터를 새것으로 교체합니다.' },
  { k: '온수 분배기 청소', won: 60_000, d: '난방 온도 편차가 있는 집에 권장합니다.' },
  { k: '시공 전후 수질 검사', won: 30_000, d: '탁도·철분 수치를 측정해 우리집 이력에 기록합니다.' },
];
const DAYS = ['11/21 (금)', '11/22 (토)', '11/25 (화)', '11/26 (수)'];
const TIMES = ['09:00', '13:00', '15:00'];

export default function Page() {
  const [plan, setPlan] = useState(0);
  const [addons, setAddons] = useState<Set<number>>(new Set());
  const [day, setDay] = useState(DAYS[1]);
  const [time, setTime] = useState('13:00');
  const [booked, setBooked] = useState(false);

  const addonWon = useMemo(() =>
    [...addons].reduce((s, i) => s + ADDONS[i].won, 0), [addons]);
  const total = PLANS[plan].won + addonWon;

  const toggleAddon = (i: number) => setAddons(prev => {
    const next = new Set(prev);
    if (next.has(i)) next.delete(i); else next.add(i);
    return next;
  });

  return (
    <section className="page on" id="p-instant" data-react>
      <div className="phead"><div className="phead__in">
        <div className="crumb"><a data-go="home">홈</a><span>›</span><a data-go="services">전체 서비스</a><span>›</span><b id="instTitle">{PLANS[plan].k}</b></div>
        <h1>평형만 고르면 가격이 바로 나옵니다</h1>
        <p className="sub">규격이 정해진 상품이라 진단이나 방문 견적이 필요 없습니다. 현장에서 금액이 달라지지 않습니다.</p>
      </div></div>

      <div className="flow">
        <div>
          <div className="block">
            <h2 className="block__t">서비스 선택</h2>
            <div className="grid g3" style={{ gap: 12, marginTop: 14 }}>
              {PLANS.map((p, i) => (
                <button key={p.k} className={'opt' + (plan === i ? ' on' : '')} onClick={() => setPlan(i)}>
                  <span className="opt__k">{p.k}</span>
                  <span className="opt__d">{p.d}</span>
                  <span className="opt__p num">{p.won.toLocaleString()}원</span>
                </button>
              ))}
            </div>
          </div>

          <div className="block">
            <h2 className="block__t">우리집 조건</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 14 }}>
              <div className="field" style={{ gridColumn: '1/-1' }}><span className="lb">주소 <span className="rq">*</span></span>
                <input className="inp" defaultValue="서울 강남구 청솔아파트 103동 1204호" /></div>
              <div className="field"><span className="lb">전용 면적</span>
                <select className="inp" defaultValue="84㎡ (34평)"><option>84㎡ (34평)</option><option>59㎡ (25평)</option><option>114㎡ (45평)</option></select></div>
              <div className="field"><span className="lb">난방 방식</span>
                <select className="inp" defaultValue="중앙난방"><option>중앙난방</option><option>개별난방</option><option>지역난방</option></select></div>
              <div className="field"><span className="lb">화장실 개수</span>
                <select className="inp" defaultValue="2개"><option>2개</option><option>1개</option><option>3개 이상</option></select></div>
              <div className="field"><span className="lb">거주 여부</span>
                <select className="inp" defaultValue="거주 중"><option>거주 중</option><option>공실</option></select></div>
            </div>
            <div className="callout" style={{ marginTop: 16 }}>
              <span className="c-ter" style={{ flex: '0 0 20px' }}>ⓘ</span>
              <p className="t-b12 c-sec" style={{ margin: 0 }}>평형과 화장실 개수에 따라 순환 시간이 달라져 가격이 조정됩니다.
                <b>현장에서 추가금이 붙지 않는 확정가</b>이며, 시공 불가 판정 시 전액 환불됩니다.</p>
            </div>
          </div>

          <div className="block">
            <h2 className="block__t">추가 옵션 <span className="t-b14 c-ter fw5">(선택)</span></h2>
            <div style={{ marginTop: 8 }}>
              {ADDONS.map((a, i) => {
                const on = addons.has(i);
                return (
                  <div key={a.k} className="varow" onClick={() => toggleAddon(i)} style={{ cursor: 'pointer' }}>
                    <span className="chk" style={on ? undefined
                      : { background: 'var(--sg-bg-emphasis)', color: 'var(--sg-text-disabled)' }}>{on ? '✓' : '＋'}</span>
                    <div style={{ flex: 1 }}>
                      <div className="row between"><span className="t-b16 fw6">{a.k}</span>
                        <span className="t-b16 num">+{a.won.toLocaleString()}원</span></div>
                      <p className="t-b14 c-sec" style={{ margin: '4px 0 0' }}>{a.d}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="block" style={{ marginBottom: 0 }}>
            <h2 className="block__t">시공일 선택</h2>
            <div className="row gap8" style={{ margin: '14px 0 12px', flexWrap: 'wrap' }}>
              {DAYS.map(d => (
                <button key={d} className="chip" aria-pressed={day === d} onClick={() => setDay(d)}>{d}</button>
              ))}
            </div>
            <div className="row gap8" style={{ flexWrap: 'wrap' }}>
              {TIMES.map(t => (
                <button key={t} className="chip sm" aria-pressed={time === t} onClick={() => setTime(t)}>{t}</button>
              ))}
            </div>
            <div className="t-b12 c-sec" style={{ marginTop: 12 }}>세대당 소요 2~3시간 · 시공 중 단수됩니다</div>
          </div>
        </div>

        <aside className="side">
          <div className="panel">
            <h3 className="panel__t">확정 견적</h3>
            <div className="col gap8" style={{ marginBottom: 14 }}>
              <div className="row between"><span className="t-b14 c-sec">{PLANS[plan].k} · 34평</span>
                <span className="t-b14 num">{PLANS[plan].won.toLocaleString()}</span></div>
              <div className="row between"><span className="t-b14 c-sec">화장실 2개</span><span className="t-b14 num">포함</span></div>
              <div className="row between"><span className="t-b14 c-sec">추가 옵션 {addons.size > 0 ? `${addons.size}개` : ''}</span>
                {addonWon > 0
                  ? <span className="t-b14 num">+{addonWon.toLocaleString()}</span>
                  : <span className="t-b14 c-sec">선택 없음</span>}</div>
            </div>
            <hr className="hair" style={{ margin: '14px 0' }} />
            <div className="row between" style={{ marginBottom: 14 }}>
              <span className="t-h16">결제 금액</span><span className="t-h24 num c-brand">{total.toLocaleString()}원</span></div>
            <button className={'btn large primary block' + (booked ? ' done' : '')} disabled={booked}
              onClick={() => { setBooked(true);
                toast(`${day} ${time} 예약이 확정되었습니다 · 확정가라 현장 추가금이 없습니다`); }}>
              {booked ? '✓ 예약 확정됨' : '바로 예약하기'}</button>
            <div className="t-b12 c-ter" style={{ marginTop: 10, textAlign: 'center' }}>현장 추가금 없는 확정가</div>
          </div>

          <div className="panel" style={{ background: 'var(--sg-bg-brand-subtle)', boxShadow: 'none' }}>
            <div className="row between" style={{ marginBottom: 8 }}>
              <span className="t-b14 fw7">공동구매로 더 싸게</span>
              <span className="badge b-brands">진행중</span></div>
            <p className="t-b12 c-sec" style={{ margin: '0 0 10px' }}>우리 동 103동에서 <b>18세대</b>가 모였습니다.
              같은 라인을 묶어 시공하면 단가가 내려갑니다.</p>
            <div className="gauge" style={{ marginBottom: 10 }}><i style={{ width: '75%' }} /></div>
            <div className="row between" style={{ marginBottom: 12 }}>
              <span className="t-b12 c-sec">현재 단가</span>
              <span className="t-b16 fw7 num c-brand">140,000원</span></div>
            <button className="btn medium outlined block" data-go="groupbuy">공동구매 보기</button>
          </div>
        </aside>
      </div>
    </section>
  );
}
