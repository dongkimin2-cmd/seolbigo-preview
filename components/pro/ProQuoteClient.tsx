'use client';
// 견적 작성 클라이언트 — lib/pro-data 의 표준 공정 항목·현장 변수 목록을 렌더.
// data-go → Link/router.push, data-toast → toast() 로 교체 (2026-08-04)
import Link from 'next/link';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { GO_ROUTES } from '../../lib/routes';
import { toast } from '../../lib/toast';
import { QUOTE_LINE_ITEMS, QUOTE_VARIATIONS } from '../../lib/pro-data';

// '80,000 ~ 120,000' → [80000, 120000]
const parseRange = (r: string): [number, number] => {
  const ns = r.replace(/[^0-9~]/g, '').split('~').map(Number);
  return [ns[0] || 0, ns[1] || ns[0] || 0];
};
const parseWon = (p: string) => Number(p.replace(/[^0-9]/g, '')) || 0;

// 기준가 컨텍스트 (데모 진단과 동일: 32~58만 · 적정 35~50만)
const P_MIN = 32, P_MAX = 58, FAIR_MIN = 35, FAIR_MAX = 50;

export default function ProQuoteClient() {
  const router = useRouter();
  const requestId = useSearchParams().get('req') ?? undefined;
  const [sending, setSending] = useState(false);
  const [note, setNote] = useState('');
  // E1-2 완성: 공정 단가 실입력 — 합계·수수료·기준가 위치·판정이 입력에 따라 실시간 계산
  const [items, setItems] = useState(() => QUOTE_LINE_ITEMS.map(i => ({
    name: i.name, range: i.range, min: parseRange(i.range)[0], max: parseRange(i.range)[1],
    won: parseWon(i.price),
  })));
  const setWon = (idx: number, v: string) =>
    setItems(prev => prev.map((it, i) => i === idx ? { ...it, won: Number(v.replace(/[^0-9]/g, '')) || 0 } : it));
  const removeItem = (idx: number) =>
    setItems(prev => prev.length > 1 ? prev.filter((_, i) => i !== idx) : prev);

  const total = items.reduce((s, it) => s + it.won, 0);
  const fee = Math.round(total * 0.08);
  const man = total / 10_000;
  const pct = Math.min(97, Math.max(3, (man - P_MIN) / (P_MAX - P_MIN) * 100));
  const verdict: 'low' | 'fair' | 'over' = man < FAIR_MIN ? 'low' : man > FAIR_MAX ? 'over' : 'fair';

  // E1-2: 견적 제출 — quotes 저장 후 소비자 /quotes 비교 목록에 나타납니다.
  // 금액은 데모 구성(공정 합계 410,000원) 고정 — 항목 입력 실동작은 후속 과제.
  const send = async () => {
    if (sending) return;
    setSending(true);
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId, priceWon: total, note,
          lineItems: items.map(i => ({ name: i.name, won: i.won })),
        }),
      });
      const out = await res.json().catch(() => ({ ok: false }));
      if (out.ok) {
        toast('견적을 보냈습니다 · 고객 견적 비교에 반영되었습니다');
        router.push(GO_ROUTES['pro-inbox']);
      } else {
        toast('견적 전송에 실패했습니다 · 잠시 후 다시 시도해주세요');
      }
    } finally { setSending(false); }
  };

  return (
    <div data-react>
      <div className="crumb" style={{ marginBottom: 6 }}><Link href={GO_ROUTES['pro-inbox']}>요청 인박스</Link><span>›</span><b>견적 작성</b></div>
      <h1 className="t-h24" style={{ margin: "0 0 4px" }}>안방 천장 누수 — 배관 이음부 추정</h1>
      <p className="t-b14 c-sec" style={{ margin: "0 0 20px" }}>청솔 103동 1204호 · 준공 1999년 · 중앙난방 · 요청번호 {requestId ?? 'Q-2611-0417'}</p>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 340px", gap: 16, alignItems: "start" }}>
        <div>
          <div className="panel" style={{ marginBottom: 16 }}>
            <h3 className="panel__t">표준 공정 DB에서 항목 추가</h3>
            <p className="t-b12 c-sec" style={{ margin: "-8px 0 14px" }}>플랫폼이 정의한 공정 항목으로만 견적을 구성합니다.
              다른 사업자와 1:1 비교되므로, 항목을 빠뜨리면 고객이 바로 알아챕니다.</p>
            <div className="row gap8" style={{ marginBottom: 16 }}>
              <div className="searchbar" style={{ flex: "1" }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth={1.8} /><path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" /></svg>
                <input placeholder="공정명 검색 (예: 누수 탐지)" style={{ height: 44 }} />
              </div>
              <button className="btn medium outlined" style={{ flex: "0 0 auto" }}
                onClick={() => toast('데모에서는 항목 추가가 생략됩니다')}>＋ 항목 추가</button>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <tbody><tr><th style={{ textAlign: "left", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>공정</th>
                <th style={{ textAlign: "left", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>표준 범위</th>
                <th style={{ textAlign: "right", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>내 단가</th>
                <th style={{ width: 36, borderBottom: "1px solid var(--sg-border-default)" }} /></tr>
              {items.map((item, idx) => {
                const inRange = item.won >= item.min && item.won <= item.max;
                return (
                <tr key={item.name}><td style={{ padding: "12px 0", borderBottom: "1px solid var(--sg-border-subtle)" }}>
                    <div className="t-b14 fw6">{item.name}</div></td>
                  <td style={{ borderBottom: "1px solid var(--sg-border-subtle)" }}>
                    <span className="t-b12 c-sec num">{item.range}</span></td>
                  <td style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>
                    <input className="inp num" inputMode="numeric" value={item.won.toLocaleString()}
                      onChange={e => setWon(idx, e.target.value)}
                      style={{ width: 120, height: 36, padding: "0 10px", textAlign: "right", display: "inline-flex" }} />
                    <div className={'badge ' + (inRange ? 'b-green' : 'b-orange')} style={{ marginTop: 2 }}>
                      {inRange ? '범위 내' : '범위 이탈'}</div></td>
                  <td style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)", color: "var(--sg-text-tertiary)" }}>
                    <button onClick={() => removeItem(idx)} aria-label="항목 삭제"
                      style={{ background: "none", border: 0, cursor: "pointer", color: "inherit", fontSize: 14 }}>✕</button></td></tr>
                );
              })}
            </tbody></table>

            <div className="callout" style={{ marginTop: 16 }}>
              <span className="c-ter" style={{ flex: "0 0 20px" }}>ⓘ</span>
              <p className="t-b12 c-sec" style={{ margin: "0" }}>표준 범위를 벗어난 단가도 입력할 수 있지만,
                고객 화면에 <b>사유와 함께 경고 표시</b>가 붙습니다. 정당한 사유가 있다면 아래에 적어주세요.</p>
            </div>
          </div>

          <div className="panel" style={{ marginBottom: 16 }}>
            <h3 className="panel__t">현장 변수 사전 고지 <span className="t-b12 c-ter fw5">(선택)</span></h3>
            <p className="t-b12 c-sec" style={{ margin: "-8px 0 14px" }}>방문 후 추가금이 발생할 가능성이 있다면 미리 알려주세요.
              사전 고지한 항목은 고객 승인률이 <b className="c-suc">2.4배</b> 높습니다.</p>
            <div style={{ marginTop: 4 }}>
              {QUOTE_VARIATIONS.map(v => v.checked ? (
                <div key={v.name} className="varow"><span className="chk">✓</span>
                  <div style={{ flex: "1" }}><div className="row between"><span className="t-b14 fw6">{v.name}</span>
                    <span className="t-b14 num">{v.range}</span></div>
                    <p className="t-b12 c-sec" style={{ margin: "2px 0 0" }}>{v.desc}</p></div></div>
              ) : (
                <div key={v.name} className="varow" style={{ opacity: ".5" }}><span className="chk" style={{ background: "var(--sg-bg-emphasis)", color: "var(--sg-text-disabled)" }}>＋</span>
                  <div style={{ flex: "1" }}><div className="row between"><span className="t-b14 fw6">{v.name}</span>
                    <span className="t-b14 num">{v.range}</span></div></div></div>
              ))}
            </div>
          </div>

          <div className="panel" style={{ marginBottom: "0" }}>
            <h3 className="panel__t">고객에게 전하는 말</h3>
            <textarea className="inp" style={{ minHeight: 88 }} defaultValue="오늘 오후 바로 방문 가능합니다. 열화상 장비로 정확한 위치를 잡은 뒤 절개 범위를 최소화해 시공합니다. 천장 복구까지 당일 마무리 가능합니다." />
          </div>
        </div>

        <div className="col gap12" style={{ position: "sticky", top: 88 }}>
          <div className="panel">
            <h3 className="panel__t">기준가 대비 내 견적</h3>
            <div className="range" style={{ paddingTop: 32 }}>
              <div className="range__bar">
                <div className="range__fair" style={{
                  left: ((FAIR_MIN - P_MIN) / (P_MAX - P_MIN) * 100) + '%',
                  right: ((P_MAX - FAIR_MAX) / (P_MAX - P_MIN) * 100) + '%' }} />
                <div className="range__mark" style={{ left: pct + '%' }} />
                <div className="range__cap" style={{ left: pct + '%' }}>내 견적 {Math.round(man)}만</div>
              </div>
              <div className="range__lbl"><span className="num">{P_MIN}만</span><span className="num">{P_MAX}만</span></div>
            </div>
            {verdict === 'fair' && (
            <div className="callout" style={{ marginTop: 18, padding: 12, background: "var(--sg-bg-success-subtle)" }}>
              <span className="c-suc" style={{ flex: "0 0 20px" }}>✓</span>
              <p className="t-b12" style={{ margin: "0" }}><b>적정 구간입니다.</b> 이 위치의 견적은 평균 채택률이
                <b className="num">38%</b>로 가장 높습니다.</p>
            </div>
            )}
            {verdict === 'over' && (
            <div className="callout warn" style={{ marginTop: 18, padding: 12 }}>
              <span className="c-dan" style={{ flex: "0 0 20px" }}>!</span>
              <p className="t-b12" style={{ margin: "0" }}><b>적정 구간({FAIR_MIN}~{FAIR_MAX}만원)을 웃돕니다.</b> 고객
                화면에 경고가 표시됩니다 — 아래에 사유를 적어주세요.</p>
            </div>
            )}
            {verdict === 'low' && (
            <div className="callout" style={{ marginTop: 18, padding: 12 }}>
              <span className="c-ter" style={{ flex: "0 0 20px" }}>ⓘ</span>
              <p className="t-b12" style={{ margin: "0" }}><b>적정 구간보다 낮습니다.</b> 빠뜨린 공정이 없는지
                확인하세요 — 저가 견적 후 현장 추가금은 승인률이 낮습니다.</p>
            </div>
            )}
            {verdict === 'over' && (
              <textarea className="inp" style={{ minHeight: 56, marginTop: 10, fontSize: 13 }}
                placeholder="이탈 사유 (예: 매립관 절개 2개소 포함)" value={note} onChange={e => setNote(e.target.value)} />
            )}
            <hr className="hair" style={{ margin: "16px 0" }} />
            <div className="col gap8" style={{ marginBottom: 14 }}>
              <div className="row between"><span className="t-b14 c-sec">공정 합계</span><span className="t-b14 num">{total.toLocaleString()}</span></div>
              <div className="row between"><span className="t-b14 c-sec">중개 수수료 8%</span><span className="t-b14 num c-sec">−{fee.toLocaleString()}</span></div>
            </div>
            <hr className="hair" style={{ margin: "0 0 14px" }} />
            <div className="row between" style={{ marginBottom: 16 }}>
              <span className="t-h16">예상 수령액</span><span className="t-h20 num c-brand">{(total - fee).toLocaleString()}원</span></div>
            <button className="btn large primary block" disabled={sending}
              onClick={send}>{sending ? '보내는 중…' : '견적 보내기'}</button>
            <button className="btn medium ghost block" style={{ marginTop: 8 }}
              onClick={() => toast('임시 저장되었습니다')}>임시 저장</button>
          </div>

          <div className="panel">
            <h3 className="panel__t">경쟁 견적</h3>
            <div className="col gap8">
              <div className="row between"><span className="t-b14 c-sec">현재 제출된 견적</span><span className="t-b14 fw6">1건</span></div>
              <div className="row between"><span className="t-b14 c-sec">최저 견적</span><span className="t-b14 fw6 num">360,000원</span></div>
              <div className="row between"><span className="t-b14 c-sec">마감까지</span><span className="t-b14 fw6" style={{ color: "var(--sg-text-danger)" }}>6시간</span></div>
            </div>
            <p className="t-b12 c-sec" style={{ margin: "12px 0 0" }}>금액만으로 이기려 하지 마세요.
              필모그래피 84건과 재시공률 1.2%가 이미 노출되고 있습니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
