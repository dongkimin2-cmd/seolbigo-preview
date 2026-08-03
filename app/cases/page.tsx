'use client';
// p-cases — 데이터 기반으로 전환 완료: 필터·정렬이 실제로 동작합니다.
// SimilarCase[] (lib/mock-data) 를 필터링·정렬해 렌더하고, 요약 패널 수치도 결과에서 계산.
import { useMemo, useState } from 'react';
import { DEMO_DIAGNOSIS, DEMO_SIMILAR_CASES, type SimilarCase } from '../../lib/mock-data';

const FILTERS = [
  { id: 'sameApt', label: '같은 아파트', test: (c: SimilarCase) => c.sameApt },
  { id: 'year', label: '같은 연식 ±3년', test: (c: SimilarCase) => Math.abs(c.year - 1999) <= 3 },
  { id: 'sameSymptom', label: '같은 증상', test: (c: SimilarCase) => c.sameSymptom },
  { id: 'floorBand', label: '같은 층수대', test: (c: SimilarCase) => c.floorBand },
  { id: 'insurance', label: '보험 처리 건만', test: (c: SimilarCase) => c.insurance },
] as const;

type SortKey = 'similarity' | 'priceAsc' | 'latest';

export default function Page() {
  const [active, setActive] = useState<Set<string>>(() => new Set(['sameSymptom']));
  const [sort, setSort] = useState<SortKey>('similarity');

  const toggle = (id: string) => setActive(prev => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });

  const list = useMemo(() => {
    let out = DEMO_SIMILAR_CASES.filter(c =>
      FILTERS.every(f => !active.has(f.id) || f.test(c)));
    if (sort === 'priceAsc') out = [...out].sort((a, b) => a.priceWon - b.priceWon);
    else if (sort === 'similarity') out = [...out].sort((a, b) => b.similarity - a.similarity);
    return out;
  }, [active, sort]);

  const avgMan = list.length
    ? (list.reduce((s, c) => s + c.priceWon, 0) / list.length / 10_000).toFixed(1)
    : '0';
  const nRestore = list.filter(c => c.restore).length;
  const nInsurance = list.filter(c => c.insurance).length;
  const D = DEMO_DIAGNOSIS;

  return (
    <section className="page on" id="p-cases" data-react>
      <div className="phead"><div className="phead__in">
        <div className="crumb"><a data-go="home">홈</a><span>›</span><a data-go="diag3">진단 결과</a><span>›</span><b>유사 시공 사례</b></div>
        <h1>같은 집, 같은 증상은 어떻게 고쳤을까요</h1>
        <p className="sub">판례를 찾아보듯 조건이 같은 실제 시공을 확인하세요. 모두 플랫폼 결제·검증을 거친 사례입니다.</p>
      </div></div>

      <div className="flow">
        <div>
          <div className="panel" style={{ marginBottom: 16, padding: '16px 20px' }}>
            <div className="row between gap12" style={{ flexWrap: 'wrap' }}>
              <div className="row gap6" style={{ flexWrap: 'wrap' }}>
                {FILTERS.map(f => (
                  <button key={f.id} className="chip sm" aria-pressed={active.has(f.id)}
                    onClick={() => toggle(f.id)}>{f.label}</button>
                ))}
              </div>
              <select className="inp" value={sort} onChange={e => setSort(e.target.value as SortKey)}
                style={{ width: 'auto', height: 38, padding: '0 36px 0 12px', fontSize: 14 }}>
                <option value="similarity">유사도순</option>
                <option value="priceAsc">금액 낮은순</option>
                <option value="latest">최신순</option>
              </select>
            </div>
          </div>

          <div className="row between" style={{ margin: '0 4px 12px' }}>
            <span className="t-b14 c-sec">총 <b className="c-brand num">{list.length}</b>건</span>
            <span className="t-b14 c-sec">평균 <b className="num">{avgMan}만원</b> · 평균 소요 <b className="num">4시간</b></span>
          </div>

          <div className="col gap12">
            {list.map(c => (
              <div key={c.id} className="card" data-go="case-detail"
                style={{ padding: 18, display: 'flex', gap: 18, cursor: 'pointer' }}>
                <div className={'ph ' + c.tone} style={{ width: 150, height: 112, flex: '0 0 150px', borderRadius: 10 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="row gap4" style={{ marginBottom: 6, flexWrap: 'wrap' }}>
                    {c.badges.map(b => <span key={b.label} className={'badge b-' + b.tone}>{b.label}</span>)}
                  </div>
                  <div className="t-h18">{c.title}</div>
                  <div className="t-b14 c-sec" style={{ margin: '4px 0 10px' }}>{c.process}</div>
                  <div className="row between">
                    <span className="t-b14 c-sec">{c.proName} · {c.proMeta}</span>
                    <span className="t-h20 num">{c.priceWon.toLocaleString()}원</span></div>
                </div>
              </div>
            ))}
            {!list.length && (
              <div className="panel" style={{ textAlign: 'center', padding: 40 }}>
                <div className="t-b16 fw6" style={{ marginBottom: 6 }}>조건에 맞는 사례가 없습니다</div>
                <p className="t-b14 c-sec" style={{ margin: 0 }}>필터를 줄여서 다시 시도해보세요.</p>
              </div>
            )}
          </div>
        </div>

        <aside className="side">
          <div className="panel">
            <h3 className="panel__t">{list.length}건 요약</h3>
            <div className="range" style={{ paddingTop: 30 }}>
              <div className="range__bar">
                <div className="range__fair" style={{ left: '22%', right: '22%' }} />
                <div className="range__mark" style={{ left: '50%' }} />
                <div className="range__cap" style={{ left: '50%' }}>중앙값 {D.priceMid}만</div>
              </div>
              <div className="range__lbl"><span className="num">{D.priceMin}만</span><span className="num">{D.priceMax}만</span></div>
            </div>
            <hr className="hair" style={{ margin: '18px 0' }} />
            <div className="col gap8">
              <div className="row between"><span className="t-b14 c-sec">천장 복구 포함</span><span className="t-b14 fw6">{nRestore}건</span></div>
              <div className="row between"><span className="t-b14 c-sec">보험 처리</span><span className="t-b14 fw6">{nInsurance}건</span></div>
              <div className="row between"><span className="t-b14 c-sec">재시공 발생</span><span className="t-b14 fw6 c-suc">0건</span></div>
            </div>
            <button className="btn large primary block" data-go="quotes" style={{ marginTop: 18 }}>이 조건으로 견적 받기</button>
          </div>
        </aside>
      </div>
    </section>
  );
}
