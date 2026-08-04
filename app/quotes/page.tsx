// p-quotes — DB 기반으로 전환 완료 (2026-08-04): fetchQuotes() 가 Supabase 조회,
// 키 없거나 조회 실패 시 mock-data 폴백 (lib/db.ts 어댑터). 요청 시점 조회를 위해 dynamic.
import { DEMO_DIAGNOSIS, type Quote } from '../../lib/mock-data';
import { fetchQuotes } from '../../lib/db';
import SelectQuoteButton from '../../components/SelectQuoteButton';

export const dynamic = 'force-dynamic';

const D = DEMO_DIAGNOSIS;
const span = D.priceMax - D.priceMin;
const pctOf = (won: number) => ((won / 10_000 - D.priceMin) / span * 100).toFixed(1) + '%';
const MARK_COLORS = ['var(--sg-brand-secondary)', 'var(--sg-brand-primary)', 'var(--sg-text-warning)'];

function deltaLabel(q: Quote) {
  const delta = Math.round((q.priceWon / 10_000 - D.priceMid) / D.priceMid * 100);
  if (delta === 0) return <div className="t-b12 c-suc fw6">중앙값과 동일</div>;
  if (delta < 0) return <div className="t-b12 c-sec">중앙값 대비 −{-delta}%</div>;
  return <div className="t-b12 fw6" style={{ color: 'var(--sg-text-warning)' }}>중앙값 대비 +{delta}%</div>;
}

function QuoteCard({ q }: { q: Quote }) {
  const over = q.priceWon / 10_000 > D.fairMax;
  return (
    <div className="card" style={{ padding: 22, position: 'relative',
      ...(q.recommended ? { boxShadow: '0 0 0 2px var(--sg-brand-primary) inset' } : {}) }}>
      {q.recommended && (
        <span className="badge b-brands b12" style={{ position: 'absolute', top: -11, left: 22 }}>기준가 적합 · 추천</span>
      )}
      <div className="row gap16" style={q.recommended ? { marginTop: 4 } : undefined}>
        <div className="avatar sq" style={{ width: 60, height: 60, fontSize: 20 }}>{q.initial}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="row gap6"><span className="t-h18">{q.proName}</span>
            {q.recommended && <span className="badge b-brand">설비고 인증</span>}</div>
          <div className="t-b14 c-sec">★ {q.rating} ({q.reviews}) · 필모그래피 {q.filmCount}건 · 재시공률 {q.redoRate}% · 평균 응답 {q.responseTime}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="t-h24 num">{q.priceWon.toLocaleString()}원</div>
          {deltaLabel(q)}
        </div>
      </div>
      <div className="posbar" style={{ margin: '18px 0 14px' }}>
        <span style={{ left: pctOf(q.priceWon),
          ...(over ? { boxShadow: '0 0 0 3px var(--sg-text-warning) inset,var(--sg-shadow-up-1)' } : {}) }} />
      </div>
      {q.warning && (
        <div className="callout warn" style={{ marginBottom: 16 }}>
          <span className="c-dan" style={{ flex: '0 0 20px' }}>!</span>
          <p className="t-b14" style={{ margin: 0 }}>{q.warning}</p>
        </div>
      )}
      <div className="row gap6" style={{ flexWrap: 'wrap', marginBottom: 16 }}>
        {q.badges.map(b => <span key={b.label} className={'badge b12 b-' + b.tone}>{b.label}</span>)}
      </div>
      <div className="row gap8" style={{ justifyContent: 'flex-end' }}>
        <button className="btn medium outlined" data-go="pro">필모그래피 {q.filmCount}건 보기</button>
        <SelectQuoteButton quote={q} primary={q.recommended} />
      </div>
    </div>
  );
}

export default async function Page() {
  const quotes = await fetchQuotes();
  const sorted = [...quotes].sort((a, b) => a.priceWon - b.priceWon);
  return (
    <section className="page on" id="p-quotes">
      <div className="phead"><div className="phead__in">
        <div className="crumb"><a data-go="home">홈</a><span>›</span><a data-go="diag3">진단 결과</a><span>›</span><b>견적 비교</b></div>
        <h1>{quotes.length}곳에서 견적이 도착했습니다</h1>
        <p className="sub">기준가 분포 위에 각 견적의 위치를 표시했습니다. 금액만이 아니라 포함 공정을 함께 보세요.</p>
      </div></div>

      <div className="flow">
        <div>
          <div className="block">
            <h2 className="block__t">기준가 대비 위치</h2>
            <p className="block__d">강남구 · 준공 27년차 · {D.type} {D.matchedCases}건 분포</p>
            <div className="range" style={{ paddingTop: 8 }}>
              <div className="range__bar">
                <div className="range__fair" style={{
                  left: ((D.fairMin - D.priceMin) / span * 100).toFixed(1) + '%',
                  right: ((D.priceMax - D.fairMax) / span * 100).toFixed(1) + '%' }} />
                {sorted.map((q, i) => (
                  <div key={q.id} className="range__mark" style={{ left: pctOf(q.priceWon), background: MARK_COLORS[i] }} />
                ))}
              </div>
              <div className="range__lbl">
                <span className="num">{D.priceMin}만원</span>
                <span className="c-suc fw6">적정 구간 {D.fairMin}~{D.fairMax}만원</span>
                <span className="num">{D.priceMax}만원</span>
              </div>
            </div>
            <div className="row gap16" style={{ marginTop: 16, flexWrap: 'wrap' }}>
              {sorted.map((q, i) => (
                <span key={q.id} className="t-b14 c-sec">
                  <i style={{ display: 'inline-block', width: 9, height: 9, borderRadius: 2, background: MARK_COLORS[i], marginRight: 6 }} />
                  {q.proName} {Math.round(q.priceWon / 10_000)}만원
                </span>
              ))}
            </div>
          </div>

          <div className="col gap16">
            {quotes.map(q => <QuoteCard key={q.id} q={q} />)}
          </div>
        </div>

        <aside className="side">
          <div className="panel">
            <h3 className="panel__t">내 요청</h3>
            <div className="col gap10" style={{ gap: 10 }}>
              <div className="row between"><span className="t-b14 c-sec">진단</span><span className="t-b14 fw6">{D.type}</span></div>
              <div className="row between"><span className="t-b14 c-sec">긴급도</span><span className="t-b14 fw6" style={{ color: 'var(--sg-text-warning)' }}>주의</span></div>
              <div className="row between"><span className="t-b14 c-sec">위치</span><span className="t-b14 fw6">청솔 103동 1204호</span></div>
              <div className="row between"><span className="t-b14 c-sec">희망 일정</span><span className="t-b14 fw6">이번 주 중</span></div>
            </div>
            <hr className="hair" style={{ margin: '16px 0' }} />
            <div className="t-b12 c-sec">견적은 방문 전 참고 금액입니다. 현장 확인 후 달라지는 금액은
              항목별 승인을 거쳐야만 청구됩니다.</div>
          </div>
          <div className="panel">
            <h3 className="panel__t">이렇게 비교하세요</h3>
            <div className="col gap10" style={{ gap: 10 }}>
              <div className="row gap8"><span className="c-brand">1</span><span className="t-b14">천장 복구가 포함인지 별도인지</span></div>
              <div className="row gap8"><span className="c-brand">2</span><span className="t-b14">재시공률 — 낮을수록 한 번에 잡습니다</span></div>
              <div className="row gap8"><span className="c-brand">3</span><span className="t-b14">필모그래피 건수 — 이 유형 경험치</span></div>
              <div className="row gap8"><span className="c-brand">4</span><span className="t-b14">적정 구간을 벗어난 견적은 사유 확인</span></div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
