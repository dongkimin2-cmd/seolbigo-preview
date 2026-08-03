'use client';
// p-scope — 상태 기반으로 전환 완료: 조사 대상 단일 선택 + 증상 칩 + 예약 접수 상태
import { useState } from 'react';
import { toast } from '../../../lib/toast';

const TARGETS = [
  { k: '공용 입상관 · 오수관', d: '동 단위 · 저층 역류 예방' },
  { k: '세대 내 배수관', d: '주방·욕실 배수 불량' },
  { k: '상가 그리스트랩', d: '음식점 라인 · 6개월 주기 권장' },
  { k: '단지 전체 하수관', d: '관리사무소 발주 · 준설 포함' },
];
const SYMPTOM_CHIPS = ['저층 세대 역류', '배수가 느림', '하수구 냄새', '배관 소음', '해당 없음 · 예방 점검'];

export default function Page() {
  const [target, setTarget] = useState(0);
  const [chips, setChips] = useState<Set<string>>(() => new Set([SYMPTOM_CHIPS[0]]));
  const [booked, setBooked] = useState(false);

  const toggleChip = (c: string) => setChips(prev => {
    const next = new Set(prev);
    if (c === '해당 없음 · 예방 점검') return next.has(c) ? new Set<string>() : new Set([c]);
    next.delete('해당 없음 · 예방 점검');
    if (next.has(c)) next.delete(c); else next.add(c);
    return next;
  });

  return (
    <section className="page on" id="p-scope" data-react>
      <div className="phead"><div className="phead__in">
        <div className="crumb"><a data-go="home">홈</a><span>›</span><a data-go="services">전체 서비스</a><span>›</span><b>고압세정·준설</b></div>
        <h1>관 속을 촬영해보고, 세정 주기를 계산합니다</h1>
        <p className="sub">내시경으로 촬영한 오염도를 수치화해 지금 세정이 필요한지 판단하고, 다음 시점을 이 건물의 데이터로 산출합니다.</p>
      </div></div>

      <div className="flow">
        <div>
          <div className="steps">
            <div className="on">1. 대상 · 현황</div><div>2. 내시경 조사</div><div>3. 오염도 리포트</div>
          </div>

          <div className="block">
            <h2 className="block__t">조사 대상</h2>
            <p className="block__d">어느 관로를 조사할까요?</p>
            <div className="grid g2" style={{ gap: 12 }}>
              {TARGETS.map((t, i) => (
                <button key={t.k} className={'opt' + (target === i ? ' on' : '')} onClick={() => setTarget(i)}>
                  <span className="opt__k">{t.k}</span>
                  <span className="opt__d">{t.d}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="block">
            <h2 className="block__t">현황</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 14 }}>
              <div className="field" style={{ gridColumn: '1/-1' }}><span className="lb">건물 · 주소 <span className="rq">*</span></span>
                <input className="inp" defaultValue="서울 강남구 청솔아파트 103동" /></div>
              <div className="field"><span className="lb">건물 용도</span>
                <select className="inp" defaultValue="공동주택"><option>공동주택</option><option>오피스텔</option><option>상가</option><option>사무용</option></select></div>
              <div className="field"><span className="lb">층수 · 세대수</span>
                <select className="inp" defaultValue="20층 · 80세대"><option>20층 · 80세대</option><option>15층 · 60세대</option></select></div>
              <div className="field"><span className="lb">마지막 세정 시점</span>
                <select className="inp" defaultValue="기억나지 않음 / 기록 없음"><option>기억나지 않음 / 기록 없음</option><option>1년 이내</option><option>2~3년 전</option><option>5년 이상</option></select></div>
              <div className="field"><span className="lb">음식점 입점 여부</span>
                <select className="inp" defaultValue="없음"><option>없음</option><option>1~2곳</option><option>3곳 이상</option></select></div>
            </div>
            <hr className="hair" style={{ margin: '20px 0 16px' }} />
            <div className="t-b14 fw6" style={{ marginBottom: 10 }}>최근 증상 <span className="t-b12 c-ter fw5">(해당 없으면 예방 점검으로 진행됩니다)</span></div>
            <div className="row gap6" style={{ flexWrap: 'wrap' }}>
              {SYMPTOM_CHIPS.map(c => (
                <button key={c} className="chip sm" aria-pressed={chips.has(c)}
                  onClick={() => toggleChip(c)}>{c}</button>
              ))}
            </div>
          </div>

          <div className="block" style={{ marginBottom: 0 }}>
            <h2 className="block__t">조사 결과로 무엇을 받게 되나요</h2>
            <p className="block__d">조사 후 이런 리포트가 나옵니다. 관리사무소 보고와 입주자대표회의 설명 자료로 그대로 쓸 수 있습니다.</p>
            <div className="panel" style={{ background: 'var(--sg-bg-subtle)', boxShadow: 'none', marginTop: 14 }}>
              <div className="row gap24" style={{ gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
                <div className="ring">
                  <svg width="96" height="96"><circle cx="48" cy="48" r="40" fill="none" stroke="#E0E5EB" strokeWidth={12} />
                    <circle cx="48" cy="48" r="40" fill="none" stroke="#FF3541" strokeWidth={12} strokeLinecap="round" strokeDasharray="251" strokeDashoffset={48} /></svg>
                  <div className="ring__t"><div className="t-h20 num">81</div><div className="t-b11 c-sec">오염도</div></div>
                </div>
                <div style={{ flex: 1, minWidth: 260 }}>
                  <div className="row gap6" style={{ marginBottom: 8 }}>
                    <span className="urg urgent"><i />즉시 세정 권장</span></div>
                  <div className="t-b14 c-sec" style={{ marginBottom: 12 }}>관경의 약 <b>42%</b>가 기름때와 침전물로 좁아진 상태입니다.
                    동일 조건 건물 대비 상위 12% 수준입니다.</div>
                  <div className="tier on"><div><div className="t-b14 fw7">다음 세정 권장 시점</div>
                    <div className="t-b12 c-sec">이 건물의 오염 축적 속도로 산출</div></div>
                    <span className="t-b16 fw7 c-brand">10개월 후</span></div>
                </div>
              </div>
              <div className="grid g4" style={{ gap: 8, marginTop: 16 }}>
                <div className="ph pipe" style={{ aspectRatio: '4/3', borderRadius: 8 }} />
                <div className="ph pipe" style={{ aspectRatio: '4/3', borderRadius: 8 }} />
                <div className="ph clean" style={{ aspectRatio: '4/3', borderRadius: 8 }} />
                <div className="ph clean" style={{ aspectRatio: '4/3', borderRadius: 8 }} />
              </div>
              <div className="t-b12 c-ter" style={{ marginTop: 8 }}>※ 예시 화면입니다. 실제 리포트는 조사 후 생성됩니다.</div>
            </div>
          </div>
        </div>

        <aside className="side">
          <div className="panel">
            <h3 className="panel__t">관로 조사 예약</h3>
            <div className="col gap10" style={{ gap: 10, marginBottom: 14 }}>
              <div className="row between"><span className="t-b14 c-sec">조사 비용</span>
                <span className="t-b14 fw6">80,000원</span></div>
              <div className="row between"><span className="t-b14 c-sec">세정 계약 시</span>
                <span className="t-b14 fw7 c-suc">전액 차감</span></div>
              <div className="row between"><span className="t-b14 c-sec">소요 시간</span><span className="t-b14 fw6">약 1시간</span></div>
              <div className="row between"><span className="t-b14 c-sec">리포트</span><span className="t-b14 fw6">당일 발급</span></div>
            </div>
            <hr className="hair" style={{ margin: '0 0 14px' }} />
            <div className="field" style={{ marginBottom: 12 }}><span className="lb">희망 조사일</span>
              <select className="inp" style={{ height: 44, fontSize: 15 }} defaultValue="11/21 (금) 오전"><option>11/21 (금) 오전</option>
                <option>11/22 (토) 오전</option><option>11/25 (화) 오후</option></select></div>
            <button className={'btn large primary block' + (booked ? ' done' : '')} disabled={booked}
              onClick={() => { setBooked(true);
                toast('관로 조사 예약이 접수되었습니다 · 조사 당일 리포트가 발급됩니다'); }}>
              {booked ? '✓ 예약 접수됨' : '관로 조사 예약'}</button>
          </div>
          <div className="panel" style={{ background: 'var(--sg-bg-success-subtle)', boxShadow: 'none' }}>
            <div className="t-b14 fw7" style={{ marginBottom: 6 }}>정기 계약으로 전환하면</div>
            <p className="t-b12 c-sec" style={{ margin: '0 0 10px' }}>일본은 배수설비 청소를 6개월마다 법으로 의무화했지만
              국내에는 법정 주기가 없습니다. 설비고는 건물별 오염 속도로 주기를 정해 자동 배정합니다.</p>
            <div className="col gap6">
              <div className="row between"><span className="t-b12 c-sec">음식점 라인</span><span className="t-b12 fw6">6개월</span></div>
              <div className="row between"><span className="t-b12 c-sec">노후 단지</span><span className="t-b12 fw6">1년</span></div>
              <div className="row between"><span className="t-b12 c-sec">일반 단지</span><span className="t-b12 fw6">2년</span></div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
