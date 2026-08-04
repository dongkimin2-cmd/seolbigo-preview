// 자동 이식된 목업 화면 p-pro-quote — 원본: seolbigo-preview/index.html (백오피스)
// 헤더·내브는 BackofficeShell 공용 (실제 <Link> 라우팅) — 2026-08-04
import BackofficeShell from '../../../components/BackofficeShell';

export default function Page() {
  return (
    <BackofficeShell persona="pro" id="p-pro-quote">

            <div className="crumb" style={{ marginBottom: 6 }}><a data-go="pro-inbox">요청 인박스</a><span>›</span><b>견적 작성</b></div>
            <h1 className="t-h24" style={{ margin: "0 0 4px" }}>안방 천장 누수 — 배관 이음부 추정</h1>
            <p className="t-b14 c-sec" style={{ margin: "0 0 20px" }}>청솔 103동 1204호 · 준공 1999년 · 중앙난방 · 요청번호 Q-2611-0417</p>
      
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
                    <button className="btn medium outlined" style={{ flex: "0 0 auto" }} data-toast="데모에서는 항목 추가가 생략됩니다">＋ 항목 추가</button>
                  </div>
      
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                    <tbody><tr><th style={{ textAlign: "left", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>공정</th>
                      <th style={{ textAlign: "left", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>표준 범위</th>
                      <th style={{ textAlign: "right", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>내 단가</th>
                      <th style={{ width: 36, borderBottom: "1px solid var(--sg-border-default)" }} /></tr>
                    <tr><td style={{ padding: "12px 0", borderBottom: "1px solid var(--sg-border-subtle)" }}>
                        <div className="t-b14 fw6">누수 탐지 (청음 + 열화상)</div></td>
                      <td style={{ borderBottom: "1px solid var(--sg-border-subtle)" }}>
                        <span className="t-b12 c-sec num">80,000 ~ 120,000</span></td>
                      <td style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>
                        <span className="t-b16 fw7 num">100,000</span>
                        <div className="badge b-green" style={{ marginTop: 2 }}>범위 내</div></td>
                      <td style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)", color: "var(--sg-text-tertiary)" }}>✕</td></tr>
                    <tr><td style={{ padding: "12px 0", borderBottom: "1px solid var(--sg-border-subtle)" }}>
                        <div className="t-b14 fw6">배관 이음부 실링·보수 (2개소)</div></td>
                      <td style={{ borderBottom: "1px solid var(--sg-border-subtle)" }}>
                        <span className="t-b12 c-sec num">150,000 ~ 280,000</span></td>
                      <td style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>
                        <span className="t-b16 fw7 num">210,000</span>
                        <div className="badge b-green" style={{ marginTop: 2 }}>범위 내</div></td>
                      <td style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)", color: "var(--sg-text-tertiary)" }}>✕</td></tr>
                    <tr><td style={{ padding: "12px 0", borderBottom: "1px solid var(--sg-border-subtle)" }}>
                        <div className="t-b14 fw6">천장 마감 복구 (석고 + 도배)</div></td>
                      <td style={{ borderBottom: "1px solid var(--sg-border-subtle)" }}>
                        <span className="t-b12 c-sec num">90,000 ~ 180,000</span></td>
                      <td style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>
                        <span className="t-b16 fw7 num">100,000</span>
                        <div className="badge b-green" style={{ marginTop: 2 }}>범위 내</div></td>
                      <td style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)", color: "var(--sg-text-tertiary)" }}>✕</td></tr>
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
                    <div className="varow"><span className="chk">✓</span>
                      <div style={{ flex: "1" }}><div className="row between"><span className="t-b14 fw6">준공 25년 초과 노후 배관</span>
                        <span className="t-b14 num">+25,000 ~ 35,000</span></div>
                        <p className="t-b12 c-sec" style={{ margin: "2px 0 0" }}>인접 구간 보강이 필요할 수 있습니다</p></div></div>
                    <div className="varow"><span className="chk">✓</span>
                      <div style={{ flex: "1" }}><div className="row between"><span className="t-b14 fw6">매립관 절개 필요</span>
                        <span className="t-b14 num">+40,000 ~ 60,000</span></div>
                        <p className="t-b12 c-sec" style={{ margin: "2px 0 0" }}>벽체 절개·복구 공정이 추가됩니다</p></div></div>
                    <div className="varow" style={{ opacity: ".5" }}><span className="chk" style={{ background: "var(--sg-bg-emphasis)", color: "var(--sg-text-disabled)" }}>＋</span>
                      <div style={{ flex: "1" }}><div className="row between"><span className="t-b14 fw6">야간 작업</span>
                        <span className="t-b14 num">+40,000</span></div></div></div>
                  </div>
                </div>
      
                <div className="panel" style={{ marginBottom: "0" }}>
                  <h3 className="panel__t">고객에게 전하는 말</h3>
                  <textarea className="inp" style={{ minHeight: 88 }}>오늘 오후 바로 방문 가능합니다. 열화상 장비로 정확한 위치를 잡은 뒤 절개 범위를 최소화해 시공합니다. 천장 복구까지 당일 마무리 가능합니다.</textarea>
                </div>
              </div>
      
              <div className="col gap12" style={{ position: "sticky", top: 88 }}>
                <div className="panel">
                  <h3 className="panel__t">기준가 대비 내 견적</h3>
                  <div className="range" style={{ paddingTop: 32 }}>
                    <div className="range__bar">
                      <div className="range__fair" style={{ left: "22%", right: "22%" }} />
                      <div className="range__mark" style={{ left: "47%" }} />
                      <div className="range__cap" style={{ left: "47%" }}>내 견적 41만</div>
                    </div>
                    <div className="range__lbl"><span className="num">32만</span><span className="num">58만</span></div>
                  </div>
                  <div className="callout" style={{ marginTop: 18, padding: 12, background: "var(--sg-bg-success-subtle)" }}>
                    <span className="c-suc" style={{ flex: "0 0 20px" }}>✓</span>
                    <p className="t-b12" style={{ margin: "0" }}><b>적정 구간입니다.</b> 이 위치의 견적은 평균 채택률이
                      <b className="num">38%</b>로 가장 높습니다.</p>
                  </div>
                  <hr className="hair" style={{ margin: "16px 0" }} />
                  <div className="col gap8" style={{ marginBottom: 14 }}>
                    <div className="row between"><span className="t-b14 c-sec">공정 합계</span><span className="t-b14 num">410,000</span></div>
                    <div className="row between"><span className="t-b14 c-sec">중개 수수료 8%</span><span className="t-b14 num c-sec">−32,800</span></div>
                  </div>
                  <hr className="hair" style={{ margin: "0 0 14px" }} />
                  <div className="row between" style={{ marginBottom: 16 }}>
                    <span className="t-h16">예상 수령액</span><span className="t-h20 num c-brand">377,200원</span></div>
                  <button className="btn large primary block" data-go="pro-inbox" data-toast="견적을 보냈습니다 · 고객이 열람하면 알림이 옵니다">견적 보내기</button>
                  <button className="btn medium ghost block" style={{ marginTop: 8 }} data-toast="임시 저장되었습니다">임시 저장</button>
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
    </BackofficeShell>
  );
}
