// 자동 이식된 목업 화면 p-ins-campaign — 원본: seolbigo-preview/index.html (백오피스)
// 헤더·내브는 BackofficeShell 공용 (실제 <Link> 라우팅) — 2026-08-04
import BackofficeShell from '../../../components/BackofficeShell';

export default function Page() {
  return (
    <BackofficeShell persona="ins" id="p-ins-campaign">

            <div className="row between" style={{ marginBottom: 20, alignItems: "flex-start" }}>
              <div><h1 className="t-h24" style={{ margin: "0" }}>예방 쿠폰 캠페인</h1>
                <p className="t-b14 c-sec" style={{ margin: "4px 0 0" }}>사고가 나기 전에 막는 것이 가장 싼 보상입니다. 고위험 가입자에게 점검·클리닝 쿠폰을 배포합니다.</p></div>
              <button className="btn medium primary" data-toast="데모에서는 캠페인 생성이 생략됩니다">＋ 캠페인 만들기</button>
            </div>
      
            <div className="grid g4" style={{ gap: 12, marginBottom: 16 }}>
              <div className="panel"><div className="t-b12 c-sec">배포한 쿠폰</div>
                <div className="t-h24 num" style={{ margin: "4px 0 2px" }}>4,280장</div>
                <div className="t-b12 c-sec">3개 캠페인 누적</div></div>
              <div className="panel"><div className="t-b12 c-sec">사용률</div>
                <div className="t-h24 num" style={{ margin: "4px 0 2px" }}>38.2%</div>
                <div className="t-b12 c-sec">1,636장 사용</div></div>
              <div className="panel"><div className="t-b12 c-sec">예방 추정 사고</div>
                <div className="t-h24 num c-suc" style={{ margin: "4px 0 2px" }}>62건</div>
                <div className="t-b12 c-sec">대조군 대비 청구율 차이</div></div>
              <div className="panel" style={{ background: "var(--sg-bg-success-subtle)", boxShadow: "none" }}>
                <div className="t-b12 c-sec">캠페인 ROI</div>
                <div className="t-h24 num c-suc" style={{ margin: "4px 0 2px" }}>164%</div>
                <div className="t-b12 c-sec">투입 2.1억 · 회수 5.5억</div></div>
            </div>
      
            <div className="panel" style={{ marginBottom: 16 }}>
              <h3 className="panel__t">고위험 세그먼트</h3>
              <p className="t-b12 c-sec" style={{ margin: "-8px 0 14px" }}>아파트 준공연도 · 배관 재질 · 난방 방식 · 과거 청구 이력을 결합해 산출합니다.
                설비고에 축적된 실제 하자·세정 케이스가 가중치를 보정합니다.</p>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <tbody><tr><th style={{ textAlign: "left", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>세그먼트</th>
                  <th style={{ textAlign: "right", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>가입자</th>
                  <th style={{ textAlign: "right", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>연 청구율</th>
                  <th style={{ textAlign: "left", padding: "9px 0 9px 16px", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600", width: 160 }}>위험도</th>
                  <th style={{ textAlign: "right", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>권장 조치</th></tr>
                <tr><td style={{ padding: "13px 0", borderBottom: "1px solid var(--sg-border-subtle)" }}>준공 30년↑ · 중앙난방 · 강관</td>
                  <td className="num" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>18,420</td>
                  <td className="num fw7" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)", color: "var(--sg-text-danger)" }}>4.8%</td>
                  <td style={{ paddingLeft: 16, borderBottom: "1px solid var(--sg-border-subtle)" }}>
                    <div className="posbar"><i style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: "88%", borderRadius: 999, background: "var(--sg-bg-danger)" }} /></div></td>
                  <td style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}><span className="badge b-red">배관 클리닝</span></td></tr>
                <tr><td style={{ padding: "13px 0", borderBottom: "1px solid var(--sg-border-subtle)" }}>준공 25~29년 · 과거 청구 이력</td>
                  <td className="num" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>9,860</td>
                  <td className="num fw7" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)", color: "var(--sg-text-warning)" }}>3.2%</td>
                  <td style={{ paddingLeft: 16, borderBottom: "1px solid var(--sg-border-subtle)" }}>
                    <div className="posbar"><i style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: "62%", borderRadius: 999, background: "var(--sg-bg-warning)" }} /></div></td>
                  <td style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}><span className="badge b-orange">무료 점검</span></td></tr>
                <tr><td style={{ padding: "13px 0" }}>준공 20~24년 · 개별난방</td>
                  <td className="num" style={{ textAlign: "right" }}>24,180</td>
                  <td className="num fw7" style={{ textAlign: "right" }}>1.4%</td>
                  <td style={{ paddingLeft: 16 }}>
                    <div className="posbar"><i style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: "26%", borderRadius: 999, background: "var(--sg-bg-success)" }} /></div></td>
                  <td style={{ textAlign: "right" }}><span className="badge b-gline">알림만</span></td></tr>
              </tbody></table>
            </div>
      
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 340px", gap: 16, alignItems: "start" }}>
              <div className="panel">
                <h3 className="panel__t">진행 중인 캠페인</h3>
                <div className="col gap12" style={{ marginTop: 14 }}>
                  <div className="jobrow" style={{ alignItems: "flex-start" }}>
                    <span style={{ fontSize: 22 }}>🚿</span>
                    <div style={{ flex: "1" }}>
                      <div className="row gap4" style={{ marginBottom: 4 }}>
                        <span className="t-b14 fw7">노후 단지 배관 클리닝 50% 지원</span>
                        <span className="badge b-brand">진행중</span></div>
                      <div className="t-b12 c-sec" style={{ marginBottom: 8 }}>준공 30년↑ 중앙난방 가입자 대상 · 2026.09.01 ~ 2026.12.31</div>
                      <div className="row gap16" style={{ flexWrap: "wrap" }}>
                        <span className="t-b12 c-sec">배포 <b className="num">2,400장</b></span>
                        <span className="t-b12 c-sec">사용 <b className="num">1,012장 (42%)</b></span>
                        <span className="t-b12 c-sec">예방 추정 <b className="num c-suc">41건</b></span>
                        <span className="t-b12 c-sec">ROI <b className="num c-suc">187%</b></span></div>
                    </div>
                    <button className="btn small outlined">리포트</button></div>
      
                  <div className="jobrow" style={{ alignItems: "flex-start" }}>
                    <span style={{ fontSize: 22 }}>🔍</span>
                    <div style={{ flex: "1" }}>
                      <div className="row gap4" style={{ marginBottom: 4 }}>
                        <span className="t-b14 fw7">재청구 이력 가입자 무료 점검</span>
                        <span className="badge b-brand">진행중</span></div>
                      <div className="t-b12 c-sec" style={{ marginBottom: 8 }}>1년 내 청구 이력 가입자 대상 · 2026.10.01 ~ 2027.03.31</div>
                      <div className="row gap16" style={{ flexWrap: "wrap" }}>
                        <span className="t-b12 c-sec">배포 <b className="num">1,280장</b></span>
                        <span className="t-b12 c-sec">사용 <b className="num">418장 (33%)</b></span>
                        <span className="t-b12 c-sec">예방 추정 <b className="num c-suc">14건</b></span>
                        <span className="t-b12 c-sec">ROI <b className="num c-suc">142%</b></span></div>
                    </div>
                    <button className="btn small outlined">리포트</button></div>
      
                  <div className="jobrow" style={{ alignItems: "flex-start", opacity: ".6" }}>
                    <span style={{ fontSize: 22 }}>🌀</span>
                    <div style={{ flex: "1" }}>
                      <div className="row gap4" style={{ marginBottom: 4 }}>
                        <span className="t-b14 fw7">상가 그리스트랩 정기 관리 제휴</span>
                        <span className="badge b-gray">종료</span></div>
                      <div className="t-b12 c-sec" style={{ marginBottom: 8 }}>음식점 영업배상 가입자 대상 · 2026.03 ~ 2026.08</div>
                      <div className="row gap16" style={{ flexWrap: "wrap" }}>
                        <span className="t-b12 c-sec">배포 <b className="num">600장</b></span>
                        <span className="t-b12 c-sec">사용 <b className="num">206장 (34%)</b></span>
                        <span className="t-b12 c-sec">예방 추정 <b className="num">7건</b></span>
                        <span className="t-b12 c-sec">ROI <b className="num">118%</b></span></div>
                    </div>
                    <button className="btn small ghost">리포트</button></div>
                </div>
              </div>
      
              <div className="col gap12">
                <div className="panel" style={{ background: "var(--sg-bg-info-subtle)", boxShadow: "none" }}>
                  <div className="t-b14 fw7" style={{ marginBottom: 6 }}>해외 검증 사례</div>
                  <p className="t-b12 c-sec" style={{ margin: "0 0 10px" }}>영국 Ondo InsurTech의 <b>LeakBot</b>은 보험사가 누수 감지기를
                    가입자에게 배포하고 기기당 월 구독료를 내는 구조로 <b>보험사 ROI 188%</b>를 실증하며
                    15.1만 대를 보급했습니다.</p>
                  <p className="t-b12 c-sec" style={{ margin: "0" }}>설비고는 센서 이전에 <b>사람의 손(세정·점검)</b>으로 같은 예방 가치를
                    먼저 증명하고, 중기적으로 IoT 감지기 배포를 얹습니다.</p>
                </div>
                <div className="panel">
                  <h3 className="panel__t">쿠폰 단가</h3>
                  <div className="col gap8">
                    <div className="row between"><span className="t-b14 c-sec">배관 클리닝 50% 지원</span><span className="t-b14 fw6 num">90,000원</span></div>
                    <div className="row between"><span className="t-b14 c-sec">무료 배관 점검</span><span className="t-b14 fw6 num">40,000원</span></div>
                    <div className="row between"><span className="t-b14 c-sec">그리스트랩 관리</span><span className="t-b14 fw6 num">120,000원</span></div>
                  </div>
                  <hr className="hair" style={{ margin: "14px 0" }} />
                  <div className="row between"><span className="t-b14 c-sec">건당 평균 누수 지급액</span>
                    <span className="t-b14 fw7 num">571,000원</span></div>
                  <p className="t-b12 c-sec" style={{ margin: "10px 0 0" }}>쿠폰 6장이 사고 1건을 막으면 손익분기입니다.
                    현재 실측 전환은 <b className="c-suc">쿠폰 26장당 1건</b> 예방입니다.</p>
                </div>
              </div>
            </div>
    </BackofficeShell>
  );
}
