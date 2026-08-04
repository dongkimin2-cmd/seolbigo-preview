// 자동 이식된 목업 화면 p-mgr-map — 원본: seolbigo-preview/index.html (백오피스)
// 헤더·내브는 BackofficeShell 공용 (실제 <Link> 라우팅) — 2026-08-04
import RiserGrid from '../../../components/RiserGrid';
import BackofficeShell from '../../../components/BackofficeShell';

export default function Page() {
  return (
    <BackofficeShell persona="mgr" id="p-mgr-map">

            <div className="row between" style={{ marginBottom: 16, alignItems: "flex-start" }}>
              <div><h1 className="t-h24" style={{ margin: "0" }}>디지털 이력 지도 — 103동</h1>
                <p className="t-b14 c-sec" style={{ margin: "4px 0 0" }}>입상관 계통도 위에 수리·세정·교체 이력이 좌표 단위로 쌓입니다. 셀을 클릭해 보세요.</p></div>
              <div className="row gap8">
                <select className="inp" style={{ width: "auto", height: 38, padding: "0 34px 0 12px", fontSize: 14 }}>
                  <option>103동</option><option>105동</option><option>107동</option></select>
                <button className="btn medium outlined" data-toast="데모에서는 PDF 다운로드가 생략됩니다">PDF 내려받기</button></div>
            </div>
      
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 360px", gap: 16, alignItems: "start" }}>
              <div className="panel">
                <div className="row gap6" style={{ marginBottom: 16, flexWrap: "wrap" }}>
                  <button className="chip sm" aria-pressed="true">전체 이력</button>
                  <button className="chip sm">누수 보수</button>
                  <button className="chip sm">고압세정</button>
                  <button className="chip sm">배관 교체</button>
                  <button className="chip sm">최근 1년</button>
                </div>
                <div className="riserwrap">
                  <div className="riserhd">
                    <span /><span>1라인</span><span>2라인</span><span>3라인</span><span>4라인</span></div>
                  <RiserGrid />
                </div>
                <div className="row gap16" style={{ marginTop: 16, flexWrap: "wrap" }}>
                  <span className="t-b12 c-sec"><i className="lg" style={{ background: "#F6F7F9" }} />이력 없음</span>
                  <span className="t-b12 c-sec"><i className="lg" style={{ background: "#E7F4FF" }} />세정</span>
                  <span className="t-b12 c-sec"><i className="lg" style={{ background: "#F1EEFF" }} />누수 보수</span>
                  <span className="t-b12 c-sec"><i className="lg" style={{ background: "#E7FCEF" }} />배관 교체</span>
                  <span className="t-b12 c-sec"><i className="lg" style={{ background: "#FDEBEC" }} />반복 하자</span>
                </div>
              </div>
      
              <div className="col gap12" style={{ position: "sticky", top: 88 }}>
                <div className="panel">
                  <div className="row between" style={{ marginBottom: 12 }}>
                    <h3 className="panel__t" style={{ margin: "0" }}>1204호 · 3라인 12층</h3>
                    <span className="badge b-red">반복 하자</span></div>
                  <div className="tl" style={{ paddingLeft: 24 }}>
                    <div className="tl__i done" style={{ paddingBottom: 16 }}>
                      <div className="t-b14 fw7">배관 이음부 보수 + 천장 복구</div>
                      <div className="t-b12 c-sec">2026.11.19 · 깨끗한집설비 · 490,000원</div>
                      <div className="row gap4" style={{ marginTop: 4 }}><span className="badge b-green">보험 처리</span>
                        <span className="badge b-brand">보증중</span></div></div>
                    <div className="tl__i done" style={{ paddingBottom: 16 }}>
                      <div className="t-b14 fw7">동일 부위 누수 (1차)</div>
                      <div className="t-b12 c-sec">2024.07.02 · 외부 업체 · 기록만 존재</div></div>
                    <div className="tl__i done" style={{ paddingBottom: "0" }}>
                      <div className="t-b14 fw7">입상관 고압세정</div>
                      <div className="t-b12 c-sec">2023.05.18 · 단지 일괄 시공</div></div>
                  </div>
                  <hr className="hair" style={{ margin: "16px 0" }} />
                  <div className="callout warn" style={{ padding: 12 }}>
                    <span className="c-dan" style={{ flex: "0 0 20px" }}>!</span>
                    <p className="t-b12" style={{ margin: "0" }}><b>2년 내 같은 부위 2회 누수.</b>
                      슬래브 관통부 구조적 결함 가능성이 있어 정밀 진단을 권장합니다.</p>
                  </div>
                </div>
                <div className="panel">
                  <h3 className="panel__t">103동 통계</h3>
                  <div className="col gap8">
                    <div className="row between"><span className="t-b14 c-sec">누적 이력</span><span className="t-b14 fw6 num">42건</span></div>
                    <div className="row between"><span className="t-b14 c-sec">반복 하자 세대</span><span className="t-b14 fw6" style={{ color: "var(--sg-text-danger)" }}>3세대</span></div>
                    <div className="row between"><span className="t-b14 c-sec">최근 세정</span><span className="t-b14 fw6">2023.05</span></div>
                    <div className="row between"><span className="t-b14 c-sec">누적 집행액</span><span className="t-b14 fw6 num">1,840만원</span></div>
                  </div>
                </div>
              </div>
            </div>
    </BackofficeShell>
  );
}
