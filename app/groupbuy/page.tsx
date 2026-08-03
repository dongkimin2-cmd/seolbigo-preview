'use client';
// p-groupbuy — 데이터 기반으로 전환 완료: 모집 현황·구간 단가가 GROUPBUY 데이터에서 계산되고,
// 참여 시 POST /api/groupbuy → 참여 세대 수가 실제로 올라가며 게이지·구간이 재계산됩니다.
import { useMemo, useState } from 'react';
import { GROUPBUY, tierFor } from '../../lib/mock-data';
import { toast } from '../../lib/toast';

export default function Page() {
  const [current, setCurrent] = useState(GROUPBUY.current);
  const [joined, setJoined] = useState(false);
  const [busy, setBusy] = useState(false);

  const pct = Math.min(100, Math.round(current / GROUPBUY.goal * 100));
  const nowTier = useMemo(() => tierFor(current), [current]);
  const finalTier = GROUPBUY.tiers[GROUPBUY.tiers.length - 1];
  const remain = Math.max(0, GROUPBUY.goal - current);

  async function join() {
    setBusy(true);
    try {
      const res = await fetch('/api/groupbuy', { method: 'POST' });
      const data = await res.json();
      if (!data.ok) throw new Error();
      setCurrent(data.current);
      setJoined(true);
      toast('공동구매 참여가 접수되었습니다 · 최소 세대가 모이면 확정 안내를 드립니다');
    } catch {
      toast('참여 접수에 실패했어요. 잠시 후 다시 시도해주세요.', 'warn');
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="page on" id="p-groupbuy" data-react>
      <div className="phead"><div className="phead__in">
        <div className="crumb"><a data-go="home">홈</a><span>›</span><b>수도·난방배관 클리닝 공동구매</b></div>
        <h1>같은 라인을 묶으면 값이 내려갑니다</h1>
        <p className="sub">{GROUPBUY.complex} · 모집 마감 {GROUPBUY.deadlineDays}일 전 · 시공 예정일 2026.12.03</p>
      </div></div>

      <div className="flow">
        <div>
          <div className="block">
            <h2 className="block__t">모집 현황</h2>
            <div className="row between" style={{ margin: '16px 0 10px' }}>
              <span className="t-b16">현재 <b className="c-brand num">{current}세대</b> 참여 · {GROUPBUY.goal}세대 달성 시 최저가</span>
              <span className="t-h20 num">{pct}%</span>
            </div>
            <div className="gauge"><i style={{ width: pct + '%' }} /></div>
            <div className="row between" style={{ marginTop: 10 }}>
              <span className="t-b12 c-sec">{remain > 0
                ? <>{remain}세대만 더 모이면 1세대당 <b className="c-brand num">{(finalTier.won / 10_000).toFixed(1)}만원</b></>
                : <>목표 달성! 최저가 <b className="c-brand num">{(finalTier.won / 10_000).toFixed(1)}만원</b> 적용</>}</span>
              <span className="t-b12 c-sec">마감까지 <b className="num">{GROUPBUY.deadlineDays}일</b></span>
            </div>

            <hr className="hair" style={{ margin: '24px 0' }} />

            <h3 className="t-h16" style={{ margin: '0 0 12px' }}>참여 세대 수에 따른 단가</h3>
            <div className="col gap8">
              {GROUPBUY.tiers.map(t => {
                const isNow = t === nowTier;
                return (
                  <div key={t.from} className={'tier' + (isNow ? ' on' : '')}>
                    <div><b className="t-b14">{t.to === null ? `${t.from}세대 이상` : `${t.from}~${t.to}세대`}</b>{' '}
                      {isNow
                        ? <span className="badge b-brands" style={{ marginLeft: 4 }}>현재</span>
                        : t.label && <span className="t-b12 c-sec">{t.label}</span>}</div>
                    <span className={isNow ? 't-b16 num fw7 c-brand'
                      : 't-b14 num ' + (t.to === null ? 'fw7' : 'c-sec')}>{t.won.toLocaleString()}원</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="block">
            <h2 className="block__t">배관 클리닝이란</h2>
            <p className="block__d">세대 내 수도·난방 배관에 쌓인 스케일과 녹물 침전물을 순환 약품으로 제거하는 시공입니다.</p>
            <div className="grid g3" style={{ gap: 16, marginTop: 8 }}>
              <div className="panel" style={{ boxShadow: 'none', background: 'var(--sg-bg-subtle)' }}>
                <div className="t-h24 num c-brand">약 2%</div>
                <div className="t-b14 fw6" style={{ margin: '2px 0 4px' }}>스케일 1mm당 손실</div>
                <div className="t-b12 c-sec">한국에너지공단 EG-TIPS</div></div>
              <div className="panel" style={{ boxShadow: 'none', background: 'var(--sg-bg-subtle)' }}>
                <div className="t-h24 num c-brand">5% ↑</div>
                <div className="t-b14 fw6" style={{ margin: '2px 0 4px' }}>클리닝 후 난방효율 개선</div>
                <div className="t-b12 c-sec">한국에너지공단 제시 기준</div></div>
              <div className="panel" style={{ boxShadow: 'none', background: 'var(--sg-bg-subtle)' }}>
                <div className="t-h24 num c-brand">최대 25%</div>
                <div className="t-b14 fw6" style={{ margin: '2px 0 4px' }}>방치 시 연료 소비 증가</div>
                <div className="t-b12 c-sec">미국 에너지부(DOE) 실측</div></div>
            </div>
            <div className="grid g2" style={{ gap: 16, marginTop: 20 }}>
              <div><div className="t-b12 c-sec" style={{ marginBottom: 6 }}>시공 전 — 관 내부 스케일</div>
                <div className="ph pipe" style={{ aspectRatio: '4/3', borderRadius: 10 }} /></div>
              <div><div className="t-b12 c-sec" style={{ marginBottom: 6 }}>시공 후 — 순환 클리닝 완료</div>
                <div className="ph clean" style={{ aspectRatio: '4/3', borderRadius: 10 }} /></div>
            </div>
          </div>

          <div className="block" style={{ marginBottom: 0 }}>
            <h2 className="block__t">진행 순서</h2>
            <div className="grid g4" style={{ gap: 16, marginTop: 14 }}>
              <div><span className="badge b-brand">1</span>
                <div className="t-b14 fw7" style={{ margin: '8px 0 2px' }}>신청 · 모집</div>
                <div className="t-b12 c-sec">관리사무소 공지와 앱 알림으로 같은 동 세대를 모읍니다.</div></div>
              <div><span className="badge b-brand">2</span>
                <div className="t-b14 fw7" style={{ margin: '8px 0 2px' }}>일정 확정</div>
                <div className="t-b12 c-sec">마감 후 라인별 시공 순서와 시간대를 배정합니다.</div></div>
              <div><span className="badge b-brand">3</span>
                <div className="t-b14 fw7" style={{ margin: '8px 0 2px' }}>당일 시공</div>
                <div className="t-b12 c-sec">세대당 2~3시간. 같은 라인을 연속으로 처리합니다.</div></div>
              <div><span className="badge b-brand">4</span>
                <div className="t-b14 fw7" style={{ margin: '8px 0 2px' }}>결과 기록</div>
                <div className="t-b12 c-sec">배출수 상태 촬영본이 우리집 이력에 자동 저장됩니다.</div></div>
            </div>
          </div>
        </div>

        <aside className="side">
          <div className="panel">
            <h3 className="panel__t">참여하기</h3>
            <div className="col gap8" style={{ marginBottom: 14 }}>
              <div className="row between"><span className="t-b14 c-sec">개별 시공가</span>
                <span className="t-b14 num c-sec" style={{ textDecoration: 'line-through' }}>{GROUPBUY.indivWon.toLocaleString()}원</span></div>
              <div className="row between"><span className="t-b14 c-sec">현재 공동구매가</span>
                <span className="t-b14 num fw6">{nowTier.won.toLocaleString()}원</span></div>
              <div className="row between"><span className="t-b14 c-sec">{GROUPBUY.goal}세대 달성 시</span>
                <span className="t-b14 num fw7 c-brand">{finalTier.won.toLocaleString()}원</span></div>
            </div>
            <hr className="hair" style={{ margin: '14px 0' }} />
            <div className="row between" style={{ marginBottom: 16 }}>
              <span className="t-h16">지금 결제</span><span className="t-h24 num c-brand">{nowTier.won.toLocaleString()}원</span></div>
            <button className={'btn large primary block' + (joined ? ' done' : '')} disabled={joined || busy}
              onClick={join}>{joined ? '✓ 참여 접수됨' : busy ? '접수 중…' : '공동구매 참여'}</button>
            <div className="t-b12 c-ter" style={{ marginTop: 10, textAlign: 'center' }}>
              더 많은 세대가 모이면 차액은 자동 환불됩니다</div>
          </div>
          <div className="panel">
            <h3 className="panel__t">우리 동 참여 현황</h3>
            <div className="col gap8">
              {GROUPBUY.floors.map(f => (
                <div key={f.band} className="row between">
                  <span className="t-b14 c-sec">{f.band}</span>
                  <span className={'t-b14 fw6' + (f.mine ? ' c-brand' : '')}>
                    {f.n + (f.mine && joined ? 1 : 0)}세대{f.mine ? ' (우리 층)' : ''}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
