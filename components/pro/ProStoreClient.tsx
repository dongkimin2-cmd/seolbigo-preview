'use client';
// 자재 · 장비 구매 클라이언트 — lib/pro-data 의 상품 목록을 카테고리 칩으로 실동작 필터링 (2026-08-04)
import { useMemo, useState } from 'react';
import { STORE_FILTERS, STORE_PRODUCTS, type StoreFilter } from '../../lib/pro-data';

export default function ProStoreClient() {
  const [filter, setFilter] = useState<StoreFilter>('전체');

  const products = useMemo(
    () => STORE_PRODUCTS.filter(p => filter === '전체' || p.category === filter),
    [filter]);

  return (
    <div data-react>
      <h1 className="t-h24" style={{ margin: "0 0 4px" }}>자재 · 장비 구매</h1>
      <p className="t-b14 c-sec" style={{ margin: "0 0 20px" }}>입점 사업자 공동구매 도매가입니다. 이번 달 절감액 <b className="c-brand num">312,000원</b></p>

      <div className="panel" style={{ padding: "14px 18px", marginBottom: 16 }}>
        <div className="row gap6" style={{ flexWrap: "wrap" }}>
          {STORE_FILTERS.map(f => (
            <button key={f} className="chip sm" aria-pressed={filter === f}
              onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
      </div>

      <div className="grid g4" style={{ gap: 12, marginBottom: 16 }}>
        {products.map(p => (
          <div key={p.id} className="panel" style={{ padding: 14 }}>
            <div className={p.tone ? 'ph ' + p.tone : 'ph'} style={{ aspectRatio: "1/1", borderRadius: 8, marginBottom: 10 }} />
            <div className="t-b12 c-sec">{p.category}</div>
            <div className="t-b14 fw7" style={{ marginBottom: 6 }}>{p.name}</div>
            <div className="row between" style={{ alignItems: "flex-end" }}>
              <div><div className="t-b12 c-sec num" style={{ textDecoration: "line-through" }}>{p.listPrice}</div>
                <div className="t-h18 num c-brand">{p.salePrice}</div></div>
              <span className="badge b-red">{p.discount}</span></div>
          </div>
        ))}
      </div>

      <div className="panel" style={{ background: "var(--sg-bg-brand-subtle)", boxShadow: "none" }}>
        <div className="row between" style={{ marginBottom: 10 }}>
          <div><div className="t-b16 fw7">이번 주 공동구매 — 난방배관 세정제</div>
            <div className="t-b12 c-sec">입점 사업자 42곳이 함께 주문 중 · 목표 수량 달성 시 추가 12% 인하</div></div>
          <span className="badge b-brands b12">마감 2일 전</span></div>
        <div className="gauge" style={{ marginBottom: 8 }}><i style={{ width: "68%" }} /></div>
        <div className="row between">
          <span className="t-b12 c-sec">340 / 500박스</span>
          <span className="t-b14 fw7 c-brand">달성 시 59,800원</span></div>
      </div>
    </div>
  );
}
