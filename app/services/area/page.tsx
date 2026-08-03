'use client';
// p-area — 상태 기반으로 전환 완료: 면적·둘레 입력 → 공법·물량 표와 기준가가 실시간 재계산됩니다.
import { useMemo, useState } from 'react';

const PARTS = [
  { k: '옥상 · 지붕', d: '우레탄 도막 · 시트 방수' },
  { k: '베란다 · 발코니', d: '누수 재발 구간 재시공' },
  { k: '욕실 · 화장실', d: '방수층 철거 후 재방수' },
  { k: '외벽 · 창호 주변', d: '코킹·크랙 보수 + 도장' },
];

// ㎡·m 단가 (플랫폼 표준 공정 DB — 데모 값)
const UNIT = { wash: 4_000, demol: 9_000, coat: 18_000, parapet: 11_000, protect: 6_000 };
const DEMOL_RATIO = 0.25;   // 들뜸 구간 철거 비율 (AI 판정 — 데모)

export default function Page() {
  const [part, setPart] = useState(0);
  const [area, setArea] = useState(86);
  const [perim, setPerim] = useState(38);

  const calc = useMemo(() => {
    const demolArea = Math.round(area * DEMOL_RATIO);
    const rows = [
      { name: '고압 세척 · 바탕 정리', qty: `${area}㎡`, unit: UNIT.wash, sub: area * UNIT.wash },
      { name: '들뜸 구간 부분 철거', qty: `${demolArea}㎡`, unit: UNIT.demol, sub: demolArea * UNIT.demol },
      { name: '우레탄 도막 2회 도포', qty: `${area}㎡`, unit: UNIT.coat, sub: area * UNIT.coat },
      { name: '파라펫 입상 마감', qty: `${perim}m`, unit: UNIT.parapet, sub: perim * UNIT.parapet, perM: true },
      { name: '보호 도장 (탑코트)', qty: `${area}㎡`, unit: UNIT.protect, sub: area * UNIT.protect },
    ];
    const total = rows.reduce((s, r) => s + r.sub, 0);
    return {
      rows, total,
      man: Math.round(total / 10_000),
      min: Math.round(total * 0.82 / 10_000),
      max: Math.round(total * 1.24 / 10_000),
      perSqm: area > 0 ? Math.round(total / area / 1000) * 1000 : 0,
    };
  }, [area, perim]);

  const pct = calc.max > calc.min
    ? (((calc.man - calc.min) / (calc.max - calc.min)) * 100).toFixed(1) + '%' : '50%';

  return (
    <section className="page on" id="p-area" data-react>
      <div className="phead"><div className="phead__in">
        <div className="crumb"><a data-go="home">홈</a><span>›</span><a data-go="services">전체 서비스</a><span>›</span><b>방수·도장</b></div>
        <h1>사진으로 상태를 보고, 면적으로 물량을 냅니다</h1>
        <p className="sub"><span className="badge b-brand b12" style={{ marginRight: 6 }}>사진 진단</span>
          <span className="badge b-blue b12" style={{ marginRight: 6 }}>면적 산출</span>
          방수는 하자 상태와 시공 면적이 함께 있어야 금액이 나옵니다. 둘 다 입력하면 ㎡ 단가 기준으로 기준가를 계산합니다.</p>
      </div></div>

      <div className="flow">
        <div>
          <div className="steps">
            <div className="on">1. 상태 · 면적</div><div>2. 공법 산정</div><div>3. 기준가 · 견적</div>
          </div>

          <div className="block">
            <h2 className="block__t">시공 부위</h2>
            <div className="grid g2" style={{ gap: 12, marginTop: 14 }}>
              {PARTS.map((p, i) => (
                <button key={p.k} className={'opt' + (part === i ? ' on' : '')} onClick={() => setPart(i)}>
                  <span className="opt__k">{p.k}</span>
                  <span className="opt__d">{p.d}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="block">
            <h2 className="block__t">현장 사진 <span className="c-dan">*</span></h2>
            <p className="block__d">들뜸·균열·백화 상태가 보이면 AI가 방수층 손상 정도와 철거 필요 여부를 판정합니다.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
              <div className="ph wet" style={{ aspectRatio: '1/1', borderRadius: 10, position: 'relative' }}>
                <span className="badge b-dim" style={{ position: 'absolute', top: 8, left: 8 }}>1</span></div>
              <div className="ph pipe" style={{ aspectRatio: '1/1', borderRadius: 10, position: 'relative' }}>
                <span className="badge b-dim" style={{ position: 'absolute', top: 8, left: 8 }}>2</span></div>
              <div style={{ aspectRatio: '1/1', borderRadius: 10, border: '1px dashed var(--sg-border-strong)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer', color: 'var(--sg-text-tertiary)' }}>
                <span style={{ fontSize: 26 }}>＋</span><span className="t-b12">사진 추가</span></div>
              <div style={{ aspectRatio: '1/1', borderRadius: 10, background: 'var(--sg-bg-subtle)', padding: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <span className="t-b12 c-sec">전체가 한 컷에<br />들어간 사진 1장을<br />꼭 넣어주세요</span></div>
            </div>
            <div className="callout" style={{ marginTop: 16 }}>
              <span className="c-suc" style={{ flex: '0 0 20px' }}>✓</span>
              <div><p className="t-b14 fw6" style={{ margin: '0 0 2px' }}>AI 1차 판정 — 방수층 부분 손상 (신뢰도 82%)</p>
                <p className="t-b14 c-sec" style={{ margin: 0 }}>도막 들뜸이 국부적으로 관찰됩니다. 전면 철거 없이
                  <b> 부분 보수 + 상부 재도포</b>로 처리 가능한 상태로 보입니다.</p></div>
            </div>
          </div>

          <div className="block">
            <h2 className="block__t">시공 면적 <span className="c-dan">*</span></h2>
            <p className="block__d">아는 값으로 입력하세요. 값을 바꾸면 아래 물량과 기준가가 바로 다시 계산됩니다.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 14 }}>
              <div className="field"><span className="lb">면적 직접 입력</span>
                <div className="row gap8"><input className="inp" type="number" value={area} min={10} max={500}
                  onChange={e => setArea(Math.max(0, Number(e.target.value)))} style={{ textAlign: 'right' }} />
                  <span className="t-b16 c-sec" style={{ flex: '0 0 auto' }}>㎡</span></div>
                <span className="help">약 {Math.round(area / 3.3)}평</span></div>
              <div className="field"><span className="lb">또는 평형으로 선택</span>
                <select className="inp" value="direct" onChange={e => {
                  const v = e.target.value; if (v !== 'direct') setArea(Number(v));
                }}>
                  <option value="direct">직접 입력함 ({area}㎡)</option>
                  <option value="83">25평형 옥상</option>
                  <option value="112">34평형 옥상</option>
                  <option value="149">45평형 옥상</option></select></div>
              <div className="field"><span className="lb">파라펫 · 입상 구간 길이</span>
                <div className="row gap8"><input className="inp" type="number" value={perim} min={0} max={300}
                  onChange={e => setPerim(Math.max(0, Number(e.target.value)))} style={{ textAlign: 'right' }} />
                  <span className="t-b16 c-sec" style={{ flex: '0 0 auto' }}>m</span></div>
                <span className="help">벽면으로 올라가는 구간 — 단가가 다릅니다</span></div>
              <div className="field"><span className="lb">건물 층수</span>
                <select className="inp" defaultValue="5층 이하"><option>5층 이하</option><option>6~10층</option><option>11층 이상 (장비 필요)</option></select></div>
              <div className="field" style={{ gridColumn: '1/-1' }}><span className="lb">기존 방수층</span>
                <select className="inp" defaultValue="우레탄 도막 (재시공 이력 있음)"><option>우레탄 도막 (재시공 이력 있음)</option><option>시트 방수</option>
                  <option>없음 · 콘크리트 노출</option><option>모름</option></select></div>
            </div>
          </div>

          <div className="block" style={{ marginBottom: 0 }}>
            <h2 className="block__t">공법 · 물량 산출</h2>
            <p className="block__d">AI 판정 상태와 입력 면적을 곱해 자동 산출된 물량입니다. 실제 시공 전 사업자가 검증합니다.</p>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, marginTop: 14 }}>
              <tbody>
                <tr>
                  <th style={{ textAlign: 'left', padding: '9px 0', borderBottom: '1px solid var(--sg-border-default)', color: 'var(--sg-text-secondary)', fontWeight: 600 }}>공정</th>
                  <th style={{ textAlign: 'right', padding: '9px 0', borderBottom: '1px solid var(--sg-border-default)', color: 'var(--sg-text-secondary)', fontWeight: 600 }}>물량</th>
                  <th style={{ textAlign: 'right', padding: '9px 0', borderBottom: '1px solid var(--sg-border-default)', color: 'var(--sg-text-secondary)', fontWeight: 600 }}>단가</th>
                  <th style={{ textAlign: 'right', padding: '9px 0', borderBottom: '1px solid var(--sg-border-default)', color: 'var(--sg-text-secondary)', fontWeight: 600 }}>소계</th>
                </tr>
                {calc.rows.map((r, i) => {
                  const last = i === calc.rows.length - 1;
                  const bd = last ? undefined : '1px solid var(--sg-border-subtle)';
                  return (
                    <tr key={r.name}>
                      <td style={{ padding: '11px 0', borderBottom: bd }}>{r.name}</td>
                      <td className="num" style={{ textAlign: 'right', borderBottom: bd }}>{r.qty}</td>
                      <td className="num c-sec" style={{ textAlign: 'right', borderBottom: bd }}>{r.unit.toLocaleString()}{r.perM ? '/m' : ''}</td>
                      <td className="num" style={{ textAlign: 'right', borderBottom: bd }}>{r.sub.toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="side">
          <div className="panel">
            <h3 className="panel__t">산출된 기준가</h3>
            <div className="range" style={{ paddingTop: 32 }}>
              <div className="range__bar">
                <div className="range__fair" style={{ left: '20%', right: '24%' }} />
                <div className="range__mark" style={{ left: pct }} />
                <div className="range__cap" style={{ left: pct }}>{calc.man}만원</div>
              </div>
              <div className="range__lbl"><span className="num">{calc.min}만</span><span className="num">{calc.max}만</span></div>
            </div>
            <hr className="hair" style={{ margin: '20px 0 14px' }} />
            <div className="col gap8" style={{ marginBottom: 14 }}>
              <div className="row between"><span className="t-b14 c-sec">시공 면적</span><span className="t-b14 fw6 num">{area}㎡</span></div>
              <div className="row between"><span className="t-b14 c-sec">㎡당 평균</span><span className="t-b14 fw6 num">{calc.perSqm.toLocaleString()}원</span></div>
              <div className="row between"><span className="t-b14 c-sec">유사 시공 사례</span><span className="t-b14 fw6 num">31건</span></div>
            </div>
            <hr className="hair" style={{ margin: '0 0 14px' }} />
            <div className="row between" style={{ marginBottom: 14 }}>
              <span className="t-h16">기준가 중앙값</span><span className="t-h24 num c-brand">{calc.man}만원</span></div>
            <button className="btn large primary block" data-go="quotes">견적 3곳 받기</button>
            <div className="t-b12 c-ter" style={{ marginTop: 10, textAlign: 'center' }}>
              면적 실측 결과에 따라 ±10% 조정될 수 있습니다</div>
          </div>

          <div className="panel" style={{ background: 'var(--sg-bg-info-subtle)', boxShadow: 'none' }}>
            <div className="t-b14 fw7" style={{ marginBottom: 6 }}>왜 사진만으로는 안 되나요?</div>
            <p className="t-b12 c-sec" style={{ margin: 0 }}>누수는 <b>원인 하나</b>를 찾으면 되지만, 방수는
              <b> 면적 전체</b>에 재료를 바르는 일입니다. 같은 들뜸 사진이어도 20㎡와 120㎡의 금액은 여섯 배 차이납니다.
              그래서 상태(사진)와 물량(면적)을 함께 받습니다.</p>
          </div>

          <div className="panel">
            <h3 className="panel__t">면적을 모르시나요?</h3>
            <p className="t-b12 c-sec" style={{ margin: '0 0 12px' }}>무료 실측 방문을 신청하면 사업자가 직접 재고
              도면 기반으로 물량을 확정합니다.</p>
            <button className="btn medium outlined block" data-go="survey">무료 실측 신청</button>
          </div>
        </aside>
      </div>
    </section>
  );
}
