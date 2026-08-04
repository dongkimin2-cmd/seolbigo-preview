'use client';
// 필모그래피 클라이언트 — lib/pro-data 의 검증 대기·포트폴리오 타일을 렌더.
// 포트폴리오 필터 칩 실동작 + Before/After 슬라이더를 React 상태로 이식,
// data-toast → toast() 로 교체 (2026-08-04)
import { useMemo, useRef, useState } from 'react';
import { toast } from '../../lib/toast';
import {
  FILM_FILTERS, FILM_PENDING, FILM_TILES,
  type FilmFilterId, type FilmTile,
} from '../../lib/pro-data';

// Before/After 타일 — 드래그/클릭으로 분할선(--x) 이동 (MockupBridge 의 .ba 바인딩을 React 로 이식)
function BaTile({ tile }: { tile: FilmTile }) {
  const [x, setX] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const set = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setX(Math.max(2, Math.min(98, ((clientX - r.left) / r.width) * 100)));
  };
  return (
    <div ref={ref} className="ba" data-bound="1" style={{ aspectRatio: "1/1", "--x": x + "%" }}
      onMouseDown={e => { set(e.clientX); e.preventDefault(); }}
      onMouseMove={e => { if (e.buttons === 1) set(e.clientX); }}
      onTouchStart={e => set(e.touches[0].clientX)}
      onTouchMove={e => set(e.touches[0].clientX)}
      onClick={e => set(e.clientX)}>
      <div className={'ba__l ph ' + tile.left} /><div className={'ba__r ph ' + tile.right} /><div className="ba__hd" /></div>
  );
}

export default function ProFilmClient() {
  const [filter, setFilter] = useState<FilmFilterId>('all');

  const tiles = useMemo(
    () => FILM_TILES.filter(t => filter === 'all' || t.cat === filter),
    [filter]);

  return (
    <div data-react>
      <div className="row between" style={{ marginBottom: 20, alignItems: "flex-start" }}>
        <div><h1 className="t-h24" style={{ margin: "0" }}>필모그래피</h1>
          <p className="t-b14 c-sec" style={{ margin: "4px 0 0" }}>사진만 올리면 포트폴리오와 후기 페이지가 자동으로 만들어집니다. 따로 관리할 게 없습니다.</p></div>
        <button className="btn medium primary"
          onClick={() => toast('사진을 올리면 메타데이터 검증 후 자동 공개됩니다 · 데모에서는 업로드가 생략됩니다')}>＋ 시공 사진 등록</button>
      </div>

      <div className="panel" style={{ background: "var(--sg-bg-brand-subtle)", boxShadow: "none", marginBottom: 16 }}>
        <div className="row gap16" style={{ flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ flex: "1", minWidth: 280 }}>
            <div className="t-b16 fw7" style={{ marginBottom: 4 }}>광고비 0원으로 84건의 실적이 증명되고 있습니다</div>
            <p className="t-b14 c-sec" style={{ margin: "0" }}>포털 광고와 매칭앱 크레딧을 끊은 뒤 6개월간
              절감한 금액은 <b className="c-brand num">720만원</b>입니다. 그 사이 수주는 18% 늘었습니다.</p>
          </div>
          <div className="row gap20" style={{ gap: 20 }}>
            <div style={{ textAlign: "center" }}><div className="t-h24 num c-brand">84</div>
              <div className="t-b12 c-sec">검증 완료</div></div>
            <div style={{ textAlign: "center" }}><div className="t-h24 num">3</div>
              <div className="t-b12 c-sec">검증 대기</div></div>
            <div style={{ textAlign: "center" }}><div className="t-h24 num c-suc">100%</div>
              <div className="t-b12 c-sec">검증 통과율</div></div>
          </div>
        </div>
      </div>

      <div className="panel" style={{ marginBottom: 16 }}>
        <h3 className="panel__t">검증 대기 중</h3>
        <p className="t-b12 c-sec" style={{ margin: "-8px 0 14px" }}>촬영 시각·위치 메타데이터를 시공 일정과 대조합니다.
          통과하면 자동으로 공개 포트폴리오에 올라갑니다.</p>
        <div className="col gap8">
          {FILM_PENDING.map(p => (
            <div key={p.id} className="jobrow">
              <div className={'ph ' + p.tone} style={{ width: 56, height: 56, flex: "0 0 56px", borderRadius: 8 }} />
              <div style={{ flex: "1" }}><div className="t-b14 fw7">{p.title}</div>
                <div className="t-b12 c-sec">{p.meta}</div></div>
              <div className="row gap6">{p.verified.map(v => <span key={v} className="verified">{v}</span>)}
                <span className={'badge ' + p.badge.cls}>{p.badge.label}</span>
                {p.appeal && <button className="btn tiny outlined">소명하기</button>}</div></div>
          ))}
        </div>
      </div>

      <div className="panel">
        <div className="row between" style={{ marginBottom: 14 }}>
          <h3 className="panel__t" style={{ margin: "0" }}>공개 포트폴리오 84건</h3>
          <div className="row gap6">{FILM_FILTERS.map(f => (
            <button key={f.id} className="chip sm" aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}>{f.label}</button>
          ))}</div></div>
        <div className="grid g4" style={{ gap: 12 }}>
          {tiles.map(t => <BaTile key={t.id} tile={t} />)}
        </div>
      </div>
    </div>
  );
}
