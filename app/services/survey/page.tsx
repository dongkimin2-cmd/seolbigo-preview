'use client';
import { Ic } from '../../../components/icons';
// p-survey — 상태 기반으로 전환 완료: 공사 범위 다중 선택 + 예약 접수 상태
import { useState } from 'react';
import { toast } from '../../../lib/toast';

const SCOPES = [
  { k: '세대 내 전체 교체', d: '수도·난방 배관 전면 교체' },
  { k: '세대 내 부분 교체', d: '노후 구간·누수 구간만' },
  { k: '공용 입상관 교체', d: '동 단위 · 장기수선계획 연동' },
  { k: '신설 배관 설계', d: '구조 변경·증축에 따른 신규 설계' },
];

export default function Page() {
  const [scopes, setScopes] = useState<Set<number>>(() => new Set([0]));
  const [booked, setBooked] = useState(false);

  const toggle = (i: number) => setScopes(prev => {
    const next = new Set(prev);
    if (next.has(i)) next.delete(i); else next.add(i);
    return next;
  });

  return (
    <section className="page on" id="p-survey" data-react>
      <div className="phead"><div className="phead__in">
        <div className="crumb"><a data-go="home">홈</a><span>›</span><a data-go="services">전체 서비스</a><span>›</span><b>배관 설계·교체</b></div>
        <h1>먼저 무료로 실측하고, 도면으로 견적을 냅니다</h1>
        <p className="sub">배관 교체는 관로 길이·재질·접근성에 따라 금액이 크게 달라집니다. 사진 견적 대신 실측 후 설계 견적을 드립니다.</p>
      </div></div>

      <div className="flow">
        <div>
          <div className="steps">
            <div className="on">1. 공사 정보</div><div>2. 실측 방문</div><div>3. 설계 견적</div>
          </div>

          <div className="callout info" style={{ marginBottom: 16 }}>
            <span className="c-inf" style={{ flex: '0 0 20px' }}><Ic id="ruler" /></span>
            <div><p className="t-b14 fw6" style={{ margin: '0 0 2px' }}>왜 사진으로 견적을 내지 않나요?</p>
              <p className="t-b14 c-sec" style={{ margin: 0 }}>같은 34평이어도 매립 구간이 3m인 집과 12m인 집의 공사비는 세 배 이상 차이납니다.
                설비고는 근거 없는 숫자를 먼저 던지지 않습니다.</p></div>
          </div>

          <div className="block">
            <h2 className="block__t">공사 범위</h2>
            <p className="block__d">해당하는 범위를 선택하세요. 여러 개 선택할 수 있습니다.</p>
            <div className="grid g2" style={{ gap: 12 }}>
              {SCOPES.map((s, i) => (
                <button key={s.k} className={'opt' + (scopes.has(i) ? ' on' : '')} onClick={() => toggle(i)}>
                  <span className="opt__k">{s.k}</span>
                  <span className="opt__d">{s.d}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="block">
            <h2 className="block__t">건물 정보</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 14 }}>
              <div className="field" style={{ gridColumn: '1/-1' }}><span className="lb">아파트 · 주소 <span className="rq">*</span></span>
                <input className="inp" defaultValue="서울 강남구 청솔아파트 103동 1204호" /></div>
              <div className="field"><span className="lb">준공연도</span>
                <select className="inp" defaultValue="1999년 (27년차)"><option>1999년 (27년차)</option><option>2005년</option></select></div>
              <div className="field"><span className="lb">전용 면적</span>
                <select className="inp" defaultValue="84㎡ (34평)"><option>84㎡ (34평)</option><option>59㎡ (25평)</option><option>114㎡ (45평)</option></select></div>
              <div className="field"><span className="lb">난방 방식</span>
                <select className="inp" defaultValue="중앙난방"><option>중앙난방</option><option>개별난방</option><option>지역난방</option></select></div>
              <div className="field"><span className="lb">현재 배관 재질 (아는 경우)</span>
                <select className="inp" defaultValue="모름"><option>모름</option><option>강관(백관)</option><option>동관</option><option>PB·XL</option></select></div>
              <div className="field" style={{ gridColumn: '1/-1' }}><span className="lb">거주 여부</span>
                <select className="inp" defaultValue="거주 중 (부분 공사 필요)"><option>거주 중 (부분 공사 필요)</option><option>공실 (전면 공사 가능)</option></select></div>
            </div>
          </div>

          <div className="block" style={{ marginBottom: 0 }}>
            <h2 className="block__t">도면 · 참고 자료 <span className="t-b14 c-ter fw5">(선택)</span></h2>
            <p className="block__d">관리사무소에서 받은 평면도나 배관도가 있으면 실측 시간이 절반으로 줄어듭니다.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
              <div style={{ aspectRatio: '1/1', borderRadius: 10, border: '1px dashed var(--sg-border-strong)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer', color: 'var(--sg-text-tertiary)' }}>
                <span style={{ fontSize: 26 }}>＋</span><span className="t-b12">도면 첨부</span></div>
            </div>
          </div>
        </div>

        <aside className="side">
          <div className="panel">
            <h3 className="panel__t">실측 방문 예약</h3>
            <div className="col gap10" style={{ gap: 10, marginBottom: 14 }}>
              <div className="row between"><span className="t-b14 c-sec">실측 비용</span><span className="t-b14 fw7 c-suc">무료</span></div>
              <div className="row between"><span className="t-b14 c-sec">소요 시간</span><span className="t-b14 fw6">약 40분</span></div>
              <div className="row between"><span className="t-b14 c-sec">견적 회신</span><span className="t-b14 fw6">3영업일 이내</span></div>
              <div className="row between"><span className="t-b14 c-sec">선택 범위</span><span className="t-b14 fw6 c-brand">{scopes.size}개</span></div>
            </div>
            <hr className="hair" style={{ margin: '0 0 14px' }} />
            <div className="field" style={{ marginBottom: 12 }}><span className="lb">희망 방문일</span>
              <select className="inp" style={{ height: 44, fontSize: 15 }} defaultValue="11/20 (목) 오전"><option>11/20 (목) 오전</option>
                <option>11/20 (목) 오후</option><option>11/21 (금) 오전</option></select></div>
            <button className={'btn large primary block' + (booked ? ' done' : '')} disabled={booked}
              onClick={() => {
                if (!scopes.size) { toast('공사 범위를 1개 이상 선택해주세요.', 'warn'); return; }
                setBooked(true);
                toast('실측 예약이 접수되었습니다 · 방문 전날 알림을 드립니다');
              }}>{booked ? '✓ 예약 접수됨' : '무료 실측 예약'}</button>
            <div className="t-b12 c-ter" style={{ marginTop: 10, textAlign: 'center' }}>예약 후에도 위약금 없이 취소할 수 있어요</div>
          </div>

          <div className="panel">
            <h3 className="panel__t">참고 — 유사 단지 실적</h3>
            <p className="t-b12 c-sec" style={{ margin: '0 0 12px' }}>같은 연식·평형의 실제 시공 금액 분포입니다.
              범위가 넓은 것이 실측이 필요한 이유입니다.</p>
            <div className="range" style={{ paddingTop: 8 }}>
              <div className="range__bar">
                <div className="range__fair" style={{ left: '18%', right: '26%' }} />
              </div>
              <div className="range__lbl"><span className="num">180만원</span><span className="num">420만원</span></div>
            </div>
            <div className="t-b12 c-sec" style={{ marginTop: 12 }}>세대 전체 교체 · 34평 · 27년차 기준 <b className="num">28건</b></div>
          </div>
        </aside>
      </div>
    </section>
  );
}
