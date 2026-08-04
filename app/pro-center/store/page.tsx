// 자동 이식된 목업 화면 p-pro-store — 원본: seolbigo-preview/index.html (백오피스)
// 헤더·내브는 BackofficeShell 공용 (실제 <Link> 라우팅) — 2026-08-04
import BackofficeShell from '../../../components/BackofficeShell';

export default function Page() {
  return (
    <BackofficeShell persona="pro" id="p-pro-store">

            <h1 className="t-h24" style={{ margin: "0 0 4px" }}>자재 · 장비 구매</h1>
            <p className="t-b14 c-sec" style={{ margin: "0 0 20px" }}>입점 사업자 공동구매 도매가입니다. 이번 달 절감액 <b className="c-brand num">312,000원</b></p>
      
            <div className="panel" style={{ padding: "14px 18px", marginBottom: 16 }}>
              <div className="row gap6" style={{ flexWrap: "wrap" }}>
                <button className="chip sm" aria-pressed="true">전체</button>
                <button className="chip sm">배관 부속</button><button className="chip sm">수전</button>
                <button className="chip sm">세정 약품</button><button className="chip sm">장비</button>
                <button className="chip sm">소모품</button>
              </div>
            </div>
      
            <div className="grid g4" style={{ gap: 12, marginBottom: 16 }}>
              <div className="panel" style={{ padding: 14 }}>
                <div className="ph pipe" style={{ aspectRatio: "1/1", borderRadius: 8, marginBottom: 10 }} />
                <div className="t-b12 c-sec">배관 부속</div>
                <div className="t-b14 fw7" style={{ marginBottom: 6 }}>동관 이음쇠 22mm (10개입)</div>
                <div className="row between" style={{ alignItems: "flex-end" }}>
                  <div><div className="t-b12 c-sec num" style={{ textDecoration: "line-through" }}>18,000</div>
                    <div className="t-h18 num c-brand">12,600원</div></div>
                  <span className="badge b-red">30%↓</span></div>
              </div>
              <div className="panel" style={{ padding: 14 }}>
                <div className="ph clean" style={{ aspectRatio: "1/1", borderRadius: 8, marginBottom: 10 }} />
                <div className="t-b12 c-sec">세정 약품</div>
                <div className="t-b14 fw7" style={{ marginBottom: 6 }}>난방배관 순환 세정제 20L</div>
                <div className="row between" style={{ alignItems: "flex-end" }}>
                  <div><div className="t-b12 c-sec num" style={{ textDecoration: "line-through" }}>96,000</div>
                    <div className="t-h18 num c-brand">68,000원</div></div>
                  <span className="badge b-red">29%↓</span></div>
              </div>
              <div className="panel" style={{ padding: 14 }}>
                <div className="ph" style={{ aspectRatio: "1/1", borderRadius: 8, marginBottom: 10 }} />
                <div className="t-b12 c-sec">장비</div>
                <div className="t-b14 fw7" style={{ marginBottom: 6 }}>고압세정 노즐 세트 (4종)</div>
                <div className="row between" style={{ alignItems: "flex-end" }}>
                  <div><div className="t-b12 c-sec num" style={{ textDecoration: "line-through" }}>340,000</div>
                    <div className="t-h18 num c-brand">248,000원</div></div>
                  <span className="badge b-red">27%↓</span></div>
              </div>
              <div className="panel" style={{ padding: 14 }}>
                <div className="ph pipe" style={{ aspectRatio: "1/1", borderRadius: 8, marginBottom: 10 }} />
                <div className="t-b12 c-sec">수전</div>
                <div className="t-b14 fw7" style={{ marginBottom: 6 }}>주방 싱크 수전 (스텐)</div>
                <div className="row between" style={{ alignItems: "flex-end" }}>
                  <div><div className="t-b12 c-sec num" style={{ textDecoration: "line-through" }}>72,000</div>
                    <div className="t-h18 num c-brand">54,000원</div></div>
                  <span className="badge b-red">25%↓</span></div>
              </div>
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
    </BackofficeShell>
  );
}
