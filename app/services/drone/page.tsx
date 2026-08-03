'use client';
// p-drone — 상태 기반으로 전환 완료: 점검 대상 단일 선택 + 증상 칩 + 예약 접수 상태
import { useState } from 'react';
import { toast } from '../../../lib/toast';

const TARGETS = [
  { k: '외벽 전면 (동 단위)', d: '4개 면 전체 · 균열·박리 검출' },
  { k: '옥상 · 지붕', d: '방수층 상태 · 배수구 막힘' },
  { k: '창호 · 코킹 라인', d: '실리콘 노후 · 누수 경로 추적' },
  { k: '균열 의심 구간', d: '이미 발견한 부위 정밀 촬영' },
];
const SYMPTOM_CHIPS = ['외벽 균열 목격', '백화 · 얼룩', '창호 주변 누수', '타일 들뜸 · 탈락', '해당 없음 · 정기 점검'];

export default function Page() {
  const [target, setTarget] = useState(0);
  const [chips, setChips] = useState<Set<string>>(() => new Set([SYMPTOM_CHIPS[0]]));
  const [booked, setBooked] = useState(false);

  const toggleChip = (c: string) => setChips(prev => {
    const next = new Set(prev);
    if (c === '해당 없음 · 정기 점검') return next.has(c) ? new Set<string>() : new Set([c]);
    next.delete('해당 없음 · 정기 점검');
    if (next.has(c)) next.delete(c); else next.add(c);
    return next;
  });

  return (
    <section className="page on" id="p-drone" data-react>
      <div className="phead"><div className="phead__in">
        <div className="crumb"><a data-go="home">홈</a><span>›</span><a data-go="services">전체 서비스</a><span>›</span><b>드론 외벽 점검</b></div>
        <h1>드론으로 외벽을 훑고, 균열 리포트를 드립니다</h1>
        <p className="sub">로프·곤돌라 없이 고해상 촬영과 열화상으로 균열·박리·백화를 검출합니다.
          결과는 좌표 단위 리포트로 남고, 보수가 필요하면 방수·도장 견적으로 이어집니다.</p>
      </div></div>

      <div className="flow">
        <div>
          <div className="steps">
            <div className="on">1. 대상 · 현황</div><div>2. 드론 촬영</div><div>3. 균열 리포트</div>
          </div>

          <div className="block">
            <h2 className="block__t">점검 대상</h2>
            <p className="block__d">어느 부위를 점검할까요?</p>
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
            <h2 className="block__t">건물 현황</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 14 }}>
              <div className="field" style={{ gridColumn: '1/-1' }}><span className="lb">건물 · 주소 <span className="rq">*</span></span>
                <input className="inp" defaultValue="서울 강남구 청솔아파트 103동" /></div>
              <div className="field"><span className="lb">층수</span>
                <select className="inp" defaultValue="20층"><option>20층</option><option>15층</option><option>25층 이상</option></select></div>
              <div className="field"><span className="lb">외벽 마감</span>
                <select className="inp" defaultValue="수성페인트"><option>수성페인트</option><option>타일</option><option>석재</option><option>모름</option></select></div>
              <div className="field"><span className="lb">준공연도</span>
                <select className="inp" defaultValue="1999년 (27년차)"><option>1999년 (27년차)</option><option>2005년</option></select></div>
              <div className="field"><span className="lb">최근 외벽 보수 시점</span>
                <select className="inp" defaultValue="기억나지 않음 / 기록 없음"><option>기억나지 않음 / 기록 없음</option><option>3년 이내</option><option>5년 이상</option></select></div>
            </div>
            <hr className="hair" style={{ margin: '20px 0 16px' }} />
            <div className="t-b14 fw6" style={{ marginBottom: 10 }}>최근 증상 <span className="t-b12 c-ter fw5">(해당 없으면 정기 점검으로 진행됩니다)</span></div>
            <div className="row gap6" style={{ flexWrap: 'wrap' }}>
              {SYMPTOM_CHIPS.map(c => (
                <button key={c} className="chip sm" aria-pressed={chips.has(c)}
                  onClick={() => toggleChip(c)}>{c}</button>
              ))}
            </div>
          </div>

          <div className="block" style={{ marginBottom: 0 }}>
            <h2 className="block__t">점검 결과로 무엇을 받게 되나요</h2>
            <p className="block__d">촬영 후 이런 리포트가 나옵니다. 입주자대표회의 보고와 장기수선계획 근거 자료로 그대로 쓸 수 있습니다.</p>
            <div className="panel" style={{ background: 'var(--sg-bg-subtle)', boxShadow: 'none', marginTop: 14 }}>
              <div className="row gap24" style={{ gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
                <div className="ring">
                  <svg width="96" height="96"><circle cx="48" cy="48" r="40" fill="none" stroke="#E0E5EB" strokeWidth={12} />
                    <circle cx="48" cy="48" r="40" fill="none" stroke="#FF7C11" strokeWidth={12} strokeLinecap="round" strokeDasharray="251" strokeDashoffset={95} /></svg>
                  <div className="ring__t"><div className="t-h20 num">62</div><div className="t-b11 c-sec">외벽 상태</div></div>
                </div>
                <div style={{ flex: 1, minWidth: 260 }}>
                  <div className="row gap6" style={{ marginBottom: 8 }}>
                    <span className="urg caution"><i />주의 — 보수 계획 권장</span></div>
                  <div className="t-b14 c-sec" style={{ marginBottom: 12 }}>폭 0.3mm 이상 균열 <b>12개소</b>,
                    열화상 박리 의심 <b>3개소</b>가 검출된 예시입니다. 균열마다 좌표·폭·길이가 기록됩니다.</div>
                  <div className="tier on"><div><div className="t-b14 fw7">우선 보수 권장 구간</div>
                    <div className="t-b12 c-sec">남측면 9~12층 창호 라인</div></div>
                    <span className="t-b16 fw7 c-brand">3개소</span></div>
                </div>
              </div>
              <div className="grid g4" style={{ gap: 8, marginTop: 16 }}>
                <div className="ph wet" style={{ aspectRatio: '4/3', borderRadius: 8 }} />
                <div className="ph pipe" style={{ aspectRatio: '4/3', borderRadius: 8 }} />
                <div className="ph wet" style={{ aspectRatio: '4/3', borderRadius: 8 }} />
                <div className="ph clean" style={{ aspectRatio: '4/3', borderRadius: 8 }} />
              </div>
              <div className="t-b12 c-ter" style={{ marginTop: 8 }}>※ 예시 화면입니다. 실제 리포트는 촬영 후 생성됩니다.</div>
            </div>
            <div className="callout" style={{ marginTop: 16 }}>
              <span className="c-ter" style={{ flex: '0 0 20px' }}>⚖️</span>
              <p className="t-b12 c-sec" style={{ margin: 0 }}>본 점검은 <b>참고용 상태 조사</b>이며, 시설물안전법상
                정밀안전점검·정밀안전진단을 대체하지 않습니다. 드론 비행 승인·항공촬영 신고는 설비고가 일괄 대행합니다.</p>
            </div>
          </div>
        </div>

        <aside className="side">
          <div className="panel">
            <h3 className="panel__t">드론 점검 예약</h3>
            <div className="col gap10" style={{ gap: 10, marginBottom: 14 }}>
              <div className="row between"><span className="t-b14 c-sec">점검 비용 (1개동)</span>
                <span className="t-b14 fw6">350,000원</span></div>
              <div className="row between"><span className="t-b14 c-sec">보수 계약 시</span>
                <span className="t-b14 fw7 c-suc">50% 차감</span></div>
              <div className="row between"><span className="t-b14 c-sec">촬영 소요</span><span className="t-b14 fw6">약 2시간</span></div>
              <div className="row between"><span className="t-b14 c-sec">리포트</span><span className="t-b14 fw6">3일 내 발급</span></div>
            </div>
            <hr className="hair" style={{ margin: '0 0 14px' }} />
            <div className="field" style={{ marginBottom: 12 }}><span className="lb">희망 점검일</span>
              <select className="inp" style={{ height: 44, fontSize: 15 }} defaultValue="11/24 (월) 오전"><option>11/24 (월) 오전</option>
                <option>11/25 (화) 오전</option><option>11/27 (목) 오후</option></select></div>
            <button className={'btn large primary block' + (booked ? ' done' : '')} disabled={booked}
              onClick={() => { setBooked(true);
                toast('드론 점검 예약이 접수되었습니다 · 기상 조건에 따라 일정이 조정될 수 있습니다'); }}>
              {booked ? '✓ 예약 접수됨' : '드론 점검 예약'}</button>
            <div className="t-b12 c-ter" style={{ marginTop: 10, textAlign: 'center' }}>우천·강풍 시 무료로 일정이 변경됩니다</div>
          </div>
          <div className="panel" style={{ background: 'var(--sg-bg-info-subtle)', boxShadow: 'none' }}>
            <div className="t-b14 fw7" style={{ marginBottom: 6 }}>보수까지 한 번에</div>
            <p className="t-b12 c-sec" style={{ margin: '0 0 12px' }}>리포트의 균열 좌표와 면적이 그대로 방수·도장 견적의
              물량 산출에 들어갑니다. 다시 잴 필요가 없습니다.</p>
            <button className="btn small outlined block" data-go="area">방수·도장 기준가 보기</button>
          </div>
          <div className="panel">
            <h3 className="panel__t">관리사무소라면</h3>
            <p className="t-b12 c-sec" style={{ margin: 0 }}>점검 결과가 단지 <b>디지털 이력 지도</b>에 자동 저장되어
              입주자대표회의 보고자료와 장기수선계획 근거로 쓸 수 있습니다.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
