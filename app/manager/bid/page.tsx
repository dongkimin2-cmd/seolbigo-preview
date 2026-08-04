// 자동 이식된 목업 화면 p-mgr-bid — 원본: seolbigo-preview/index.html (백오피스)
// 헤더·내브는 BackofficeShell 공용 (실제 <Link> 라우팅) — 2026-08-04
import BackofficeShell from '../../../components/BackofficeShell';

export default function Page() {
  return (
    <BackofficeShell persona="mgr" id="p-mgr-bid">

            <h1 className="t-h24" style={{ margin: "0 0 4px" }}>입찰 대응 도구</h1>
            <p className="t-b14 c-sec" style={{ margin: "0 0 20px" }}>500만원(부가가치세 제외) 초과 계약은 경쟁입찰 의무 대상입니다
              (선정지침 제4조제3항 · 별표 2). 공고문과 적격심사 서류를 표준안으로 자동 생성합니다.</p>
      
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 340px", gap: 16, alignItems: "start" }}>
              <div>
                <div className="callout info" style={{ marginBottom: 16 }}>
                  <span className="c-inf" style={{ flex: "0 0 20px" }}>⚖️</span>
                  <div><p className="t-b14 fw6" style={{ margin: "0 0 2px" }}>이번 건은 경쟁입찰 대상입니다</p>
                    <p className="t-b14 c-sec" style={{ margin: "0" }}>21개동 입상관 일괄 세정 · 예정가격 <b className="num">2,940만원</b> —
                      「주택관리업자 및 사업자 선정지침」에 따라 K-apt 전자입찰을 거쳐야 합니다.</p></div>
                </div>
      
                <div className="block" style={{ boxShadow: "0 0 0 1px var(--sg-border-subtle) inset", background: "#fff", marginBottom: 16 }}>
                  <h2 className="block__t">자동 생성 서류</h2>
                  <p className="block__d">단지 이력과 오염도 데이터를 근거로 채워집니다. 내려받아 수정한 뒤 K-apt에 올리세요.</p>
                  <div className="col gap8" style={{ marginTop: 14 }}>
                    <div className="jobrow" style={{ background: "#fff", boxShadow: "0 0 0 1px var(--sg-border-subtle) inset" }}>
                      <span style={{ fontSize: 20 }}>📄</span>
                      <div style={{ flex: "1" }}><div className="t-b14 fw7">입찰공고문 · 과업 사양서 (표준안)</div>
                        <div className="t-b12 c-sec">세정 범위·공법·검수 기준·하자보증 조건 — K-apt 게시용 12페이지</div></div>
                      <span className="verified">✓ 생성 완료</span>
                      <button className="btn small outlined" data-toast="데모에서는 다운로드가 생략됩니다">내려받기</button></div>
                    <div className="jobrow" style={{ background: "#fff", boxShadow: "0 0 0 1px var(--sg-border-subtle) inset" }}>
                      <span style={{ fontSize: 20 }}>📊</span>
                      <div style={{ flex: "1" }}><div className="t-b14 fw7">입찰가격 상한 산출 근거</div>
                        <div className="t-b12 c-sec">동일 규모 단지 42건의 실제 계약금액 분포 · 공고문에 상한 명시 시 첨부</div></div>
                      <span className="verified">✓ 생성 완료</span>
                      <button className="btn small outlined" data-toast="데모에서는 다운로드가 생략됩니다">내려받기</button></div>
                    <div className="jobrow" style={{ background: "#fff", boxShadow: "0 0 0 1px var(--sg-border-subtle) inset" }}>
                      <span style={{ fontSize: 20 }}>📋</span>
                      <div style={{ flex: "1" }}><div className="t-b14 fw7">적격심사 평가표</div>
                        <div className="t-b12 c-sec">선정지침 [별표 6] 용역 사업자 표준평가표 기준 · 배점 자동 반영</div></div>
                      <span className="verified">✓ 생성 완료</span>
                      <button className="btn small outlined" data-toast="데모에서는 다운로드가 생략됩니다">내려받기</button></div>
                    <div className="jobrow" style={{ background: "#fff", boxShadow: "0 0 0 1px var(--sg-border-subtle) inset" }}>
                      <span style={{ fontSize: 20 }}>🗂</span>
                      <div style={{ flex: "1" }}><div className="t-b14 fw7">현장설명회 자료</div>
                        <div className="t-b12 c-sec">이력 지도 · 오염도 리포트 발췌본</div></div>
                      <span className="badge b-orange">생성중</span>
                      <button className="btn small ghost" disabled={true}>대기</button></div>
                  </div>
                </div>
      
                <div className="block" style={{ boxShadow: "0 0 0 1px var(--sg-border-subtle) inset", background: "#fff", marginBottom: "0" }}>
                  <h2 className="block__t">입찰가격 상한 산출 근거</h2>
                  <p className="block__d">동일 규모·연식 단지의 실제 계약금액입니다. 공고문에 상한을 명시할 때의 근거이자, 유착 의혹을 막는 가장 강한 자료입니다.</p>
                  <div className="range" style={{ paddingTop: 36 }}>
                    <div className="range__bar">
                      <div className="range__fair" style={{ left: "20%", right: "22%" }} />
                      <div className="range__mark" style={{ left: "49%" }} />
                      <div className="range__cap" style={{ left: "49%" }}>우리 상한 2,940만원</div>
                    </div>
                    <div className="range__lbl"><span className="num">2,180만원</span>
                      <span className="c-suc fw6">적정 구간 (42개 단지)</span><span className="num">3,860만원</span></div>
                  </div>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, marginTop: 24 }}>
                    <tbody><tr><th style={{ textAlign: "left", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>항목</th>
                      <th style={{ textAlign: "right", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>수량</th>
                      <th style={{ textAlign: "right", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>표준 단가</th>
                      <th style={{ textAlign: "right", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>금액</th></tr>
                    <tr><td style={{ padding: "11px 0", borderBottom: "1px solid var(--sg-border-subtle)" }}>입상관 고압세정</td>
                      <td className="num" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>84라인</td>
                      <td className="num c-sec" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>280,000</td>
                      <td className="num" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>23,520,000</td></tr>
                    <tr><td style={{ padding: "11px 0", borderBottom: "1px solid var(--sg-border-subtle)" }}>내시경 조사 · 리포트</td>
                      <td className="num" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>21개동</td>
                      <td className="num c-sec" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>180,000</td>
                      <td className="num" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>3,780,000</td></tr>
                    <tr><td style={{ padding: "11px 0" }}>폐수 처리 · 정리</td>
                      <td className="num" style={{ textAlign: "right" }}>1식</td>
                      <td className="num c-sec" style={{ textAlign: "right" }}>2,100,000</td>
                      <td className="num" style={{ textAlign: "right" }}>2,100,000</td></tr>
                    <tr><td className="t-h16" style={{ padding: "14px 0 0" }} colSpan={3}>입찰가격 상한 (VAT 별도)</td>
                      <td className="t-h20 num c-brand" style={{ textAlign: "right", padding: "14px 0 0" }}>29,400,000원</td></tr>
                  </tbody></table>
                </div>
              </div>
      
              <div className="col gap12" style={{ position: "sticky", top: 88 }}>
                <div className="panel">
                  <h3 className="panel__t">입찰 진행 상황</h3>
                  <div className="tl" style={{ paddingLeft: 24, marginTop: 8 }}>
                    <div className="tl__i done" style={{ paddingBottom: 16 }}>
                      <div className="t-b14 fw7">서류 자동 생성</div>
                      <div className="t-b12 c-sec">11.19 · 4종 중 3종 완료</div></div>
                    <div className="tl__i now" style={{ paddingBottom: 16 }}>
                      <div className="t-b14 fw7">입대의 심의</div>
                      <div className="t-b12 c-sec">11.28 정기회의 상정 예정</div></div>
                    <div className="tl__i" style={{ paddingBottom: 16 }}>
                      <div className="t-b14 fw7 c-ter">K-apt 전자입찰 공고</div>
                      <div className="t-b12 c-ter">마감일 전일 기준 10일 전 공고 (지침 제15조 · 긴급/재공고 5일)</div></div>
                    <div className="tl__i" style={{ paddingBottom: "0" }}>
                      <div className="t-b14 fw7 c-ter">개찰 · 적격심사</div></div>
                  </div>
                </div>
                <div className="panel">
                  <h3 className="panel__t">집행 근거</h3>
                  <div className="col gap8" style={{ marginBottom: 12 }}>
                    <div className="row between"><span className="t-b14 c-sec">집행 계정</span><span className="t-b14 fw6">수선유지비</span></div>
                    <div className="row between"><span className="t-b14 c-sec">상품 분류</span><span className="t-b14 fw6">청소 용역</span></div>
                    <div className="row between"><span className="t-b14 c-sec">낙찰 방법</span><span className="t-b14 fw6">적격심사제 (지침 제7조)</span></div>
                  </div>
                  <div className="callout" style={{ padding: 12 }}>
                    <p className="t-b12 c-sec" style={{ margin: "0" }}>세정은 자본적 지출이 아닌 <b>청소 용역</b>으로 분류되어
                      관리비(수선유지비) 집행이 가능합니다. 지자체 질의회신 자료가 첨부됩니다.</p></div>
                  <button className="btn medium outlined block" style={{ marginTop: 12 }} data-toast="데모에서는 질의회신 자료 열람이 생략됩니다">질의회신 자료 보기</button>
                </div>
              </div>
            </div>
    </BackofficeShell>
  );
}
