'use client';
// p-variation — 상태 기반으로 전환 완료 (MockupBridge 비의존)
// 추가금 항목이 VariationItem[] 데이터에서 렌더되고, 항목별 승인 토글 → 합계·기준가 판정 재계산.
// 승인 시 POST /api/variations → 결정을 저장하고 시공 추적 화면으로 이동.
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DEMO_DIAGNOSIS, DEMO_QUOTES, DEMO_VARIATIONS, type Quote } from '../../lib/mock-data';
import { loadSelectedQuote } from '../../lib/quote-store';
import { saveVariation } from '../../lib/variation-store';
import { toast } from '../../lib/toast';

export default function Page() {
  const router = useRouter();
  const [quote, setQuote] = useState<Quote>(DEMO_QUOTES[0]);
  const [approved, setApproved] = useState<Set<string>>(
    () => new Set(DEMO_VARIATIONS.filter(v => v.applicable).map(v => v.id)));
  const [busy, setBusy] = useState(false);

  useEffect(() => { setQuote(loadSelectedQuote()); }, []);

  const toggle = (id: string) => setApproved(prev => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });

  const extra = useMemo(() =>
    DEMO_VARIATIONS.filter(v => v.applicable && approved.has(v.id))
      .reduce((s, v) => s + v.won, 0), [approved]);
  const total = quote.priceWon + extra;
  const D = DEMO_DIAGNOSIS;
  const inRange = total <= D.priceMax * 10_000;

  async function approve() {
    setBusy(true);
    try {
      const res = await fetch('/api/variations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approvedIds: [...approved] }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error();
      saveVariation({ approvedIds: data.approved, extraWon: data.approvedWon });
      toast(data.approvedWon > 0
        ? `추가금 ${data.approvedWon.toLocaleString()}원이 승인되었습니다 · 시공이 계속 진행됩니다`
        : '추가금 없이 기존 견적으로 시공이 진행됩니다');
      router.push('/tracking');
    } catch {
      toast('승인 처리에 실패했어요. 잠시 후 다시 시도해주세요.', 'warn');
      setBusy(false);
    }
  }

  return (
    <section className="page on" id="p-variation" data-react>
      <div className="phead"><div className="phead__in">
        <div className="crumb"><a data-go="tracking">시공 진행</a><span>›</span><b>추가금 승인 요청</b></div>
        <h1>현장 확인 후 추가금 승인 요청이 도착했습니다</h1>
        <p className="sub">사업자는 자유 기재가 아니라 사전 정의된 항목에서만 선택할 수 있습니다. 승인하지 않으면 시공은 진행되지 않습니다.</p>
      </div></div>

      <div className="flow">
        <div>
          <div className="block">
            <h2 className="block__t">사업자가 촬영한 현장</h2>
            <p className="block__d">추가금 요청 시 근거 사진 첨부가 의무입니다.</p>
            <div className="grid g3" style={{ gap: 12 }}>
              <div><div className="ph pipe" style={{ aspectRatio: '4/3', borderRadius: 10 }} />
                <div className="t-b12 c-sec" style={{ marginTop: 6 }}>배관 노출 · 14:12</div></div>
              <div><div className="ph wet" style={{ aspectRatio: '4/3', borderRadius: 10 }} />
                <div className="t-b12 c-sec" style={{ marginTop: 6 }}>매립관 절개면 · 14:26</div></div>
              <div><div className="ph pipe" style={{ aspectRatio: '4/3', borderRadius: 10 }} />
                <div className="t-b12 c-sec" style={{ marginTop: 6 }}>관 부식 상태 · 14:28</div></div>
            </div>
          </div>

          <div className="block">
            <h2 className="block__t">요청된 현장 변수</h2>
            <p className="block__d">설비고가 미리 정의한 항목과 단가입니다. 항목을 눌러 개별 승인 여부를 정하세요.</p>
            <div style={{ marginTop: 8 }}>
              {DEMO_VARIATIONS.map(v => {
                const on = v.applicable && approved.has(v.id);
                return (
                  <div key={v.id} className="varow"
                    onClick={v.applicable ? () => toggle(v.id) : undefined}
                    style={{ opacity: v.applicable ? 1 : 0.45, cursor: v.applicable ? 'pointer' : undefined }}>
                    <span className="chk" style={on ? undefined
                      : { background: 'var(--sg-bg-emphasis)', color: 'var(--sg-text-disabled)' }}>
                      {on ? '✓' : '–'}</span>
                    <div style={{ flex: 1 }}>
                      <div className="row between">
                        <span className="t-b16 fw6">{v.name}</span>
                        <span className="t-h18 num">+{v.won.toLocaleString()}원</span></div>
                      <p className="t-b14 c-sec" style={{ margin: '4px 0 0' }}>
                        {v.applicable
                          ? <>{v.reason} 이 항목의 플랫폼 표준 단가는 {v.standardRange}입니다.
                              {!on && <b style={{ color: 'var(--sg-text-warning)' }}> — 승인 보류 중</b>}</>
                          : v.note}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="block" style={{ marginBottom: 0 }}>
            <h2 className="block__t">거절하면 어떻게 되나요</h2>
            <div className="callout" style={{ marginTop: 12 }}>
              <span className="c-ter" style={{ flex: '0 0 20px' }}>ⓘ</span>
              <p className="t-b14 c-sec" style={{ margin: 0 }}>기존 견적 범위 내에서 가능한 시공만 진행하거나,
                <b> 위약금 없이 예약을 취소하고 전액 환불</b>받을 수 있습니다.
                에스크로에 보관된 금액은 아직 사업자에게 지급되지 않았습니다.</p>
            </div>
          </div>
        </div>

        <aside className="side">
          <div className="panel">
            <h3 className="panel__t">금액 변경 내역</h3>
            <div className="col gap8">
              <div className="row between"><span className="t-b14 c-sec">기존 견적 ({quote.proName})</span>
                <span className="t-b14 num">{quote.priceWon.toLocaleString()}</span></div>
              {DEMO_VARIATIONS.filter(v => v.applicable).map(v => (
                <div key={v.id} className="row between">
                  <span className="t-b14 c-sec">{v.name.split(' (')[0].slice(0, 10)}</span>
                  {approved.has(v.id)
                    ? <span className="t-b14 num" style={{ color: 'var(--sg-text-warning)' }}>+{v.won.toLocaleString()}</span>
                    : <span className="t-b12 c-sec">보류</span>}
                </div>
              ))}
            </div>
            <hr className="hair" style={{ margin: '14px 0' }} />
            <div className="row between" style={{ marginBottom: 10 }}>
              <span className="t-h16">최종 금액</span>
              <span className="t-h24 num c-brand">{total.toLocaleString()}원</span></div>
            <div className="callout" style={{ padding: 12, marginBottom: 16 }}>
              <p className="t-b12 c-sec" style={{ margin: 0 }}>기준가 범위 <b className="num">{D.priceMin}~{D.priceMax}만원</b>
                {inRange
                  ? <> 안에 있습니다 <span className="badge b-green" style={{ marginLeft: 4 }}>적정</span></>
                  : <> 를 벗어납니다 <span className="badge b-orange" style={{ marginLeft: 4 }}>확인 필요</span></>}
              </p>
            </div>
            <button className="btn large primary block" onClick={approve} disabled={busy}>
              {busy ? '승인 처리 중…'
                : extra > 0 ? `${extra.toLocaleString()}원 추가 승인` : '추가금 없이 진행'}</button>
            <button className="btn medium solid block" style={{ marginTop: 8 }}
              data-toast="거절 시 기존 견적 범위 내 시공 또는 위약금 없는 전액 환불이 가능합니다">거절하고 협의</button>
          </div>
        </aside>
      </div>
    </section>
  );
}
