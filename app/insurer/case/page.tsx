// 자동 이식된 목업 화면 p-ins-case — 원본: seolbigo-preview/index.html (백오피스)
// 헤더·내브는 BackofficeShell 공용 (실제 <Link> 라우팅) — 2026-08-04
import BackofficeShell from '../../../components/BackofficeShell';

export default function Page() {
  return (
    <BackofficeShell persona="ins" id="p-ins-case">

            <div className="crumb" style={{ marginBottom: 6 }}><a data-go="ins-home">청구 심사</a><span>›</span><b>2026-114-88213</b></div>
            <h1 className="t-h24" style={{ margin: "0 0 4px" }}>배관 이음부 누수 — 청솔아파트 1204호</h1>
            <p className="t-b14 c-sec" style={{ margin: "0 0 20px" }}>접수 2026.11.19 19:24 · 피보험자 1304호 · 설비고 리포트 R-2611-0417 연계</p>
      
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 340px", gap: 16, alignItems: "start" }}>
              <div>
                <div className="panel" style={{ marginBottom: 16 }}>
                  <h3 className="panel__t">가격 구성 — 표준 분포 대조</h3>
                  <p className="t-b12 c-sec" style={{ margin: "-8px 0 16px" }}>플랫폼 표준 공정 DB의 같은 조건(강남구·준공 27년차·중앙난방)
                    시공 <b>1,284건</b> 분포와 대조한 결과입니다. 적정성 판단이 아니라 <b>사실 대조</b>입니다.</p>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                    <tbody><tr><th style={{ textAlign: "left", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>공정</th>
                      <th style={{ textAlign: "right", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>청구액</th>
                      <th style={{ textAlign: "right", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>표준 분포</th>
                      <th style={{ textAlign: "left", padding: "9px 0 9px 16px", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600", width: 150 }}>위치</th>
                      <th style={{ textAlign: "right", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>판정</th></tr>
                    <tr><td style={{ padding: "13px 0", borderBottom: "1px solid var(--sg-border-subtle)" }}>누수 탐지 (청음+열화상)</td>
                      <td className="num" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>100,000</td>
                      <td className="num c-sec" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>80,000~120,000</td>
                      <td style={{ paddingLeft: 16, borderBottom: "1px solid var(--sg-border-subtle)" }}>
                        <div className="posbar"><span style={{ left: "50%" }} /></div></td>
                      <td style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}><span className="badge b-green">적정</span></td></tr>
                    <tr><td style={{ padding: "13px 0", borderBottom: "1px solid var(--sg-border-subtle)" }}>배관 이음부 보수 (2개소)</td>
                      <td className="num" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>210,000</td>
                      <td className="num c-sec" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>150,000~280,000</td>
                      <td style={{ paddingLeft: 16, borderBottom: "1px solid var(--sg-border-subtle)" }}>
                        <div className="posbar"><span style={{ left: "46%" }} /></div></td>
                      <td style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}><span className="badge b-green">적정</span></td></tr>
                    <tr><td style={{ padding: "13px 0", borderBottom: "1px solid var(--sg-border-subtle)" }}>천장 마감 복구 (3.3㎡)</td>
                      <td className="num" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>100,000</td>
                      <td className="num c-sec" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>90,000~180,000</td>
                      <td style={{ paddingLeft: 16, borderBottom: "1px solid var(--sg-border-subtle)" }}>
                        <div className="posbar"><span style={{ left: "16%" }} /></div></td>
                      <td style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}><span className="badge b-green">적정</span></td></tr>
                    <tr><td style={{ padding: "13px 0", borderBottom: "1px solid var(--sg-border-subtle)" }}>현장 변수 (고객 승인 완료)</td>
                      <td className="num" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>80,000</td>
                      <td className="num c-sec" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>65,000~95,000</td>
                      <td style={{ paddingLeft: 16, borderBottom: "1px solid var(--sg-border-subtle)" }}>
                        <div className="posbar"><span style={{ left: "50%" }} /></div></td>
                      <td style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}><span className="badge b-green">적정</span></td></tr>
                    <tr><td className="t-h16" style={{ padding: "16px 0 0" }}>합계</td>
                      <td className="t-h18 num" style={{ textAlign: "right", padding: "16px 0 0" }}>490,000</td>
                      <td className="num c-sec" style={{ textAlign: "right", padding: "16px 0 0" }}>320,000~580,000</td>
                      <td style={{ padding: "16px 0 0 16px" }}><div className="posbar"><span style={{ left: "47%" }} /></div></td>
                      <td style={{ textAlign: "right", padding: "16px 0 0" }}><span className="badge b-green b12">범위 내</span></td></tr>
                  </tbody></table>
                </div>
      
                <div className="panel" style={{ marginBottom: 16 }}>
                  <h3 className="panel__t">사실 증거</h3>
                  <div className="grid g4" style={{ gap: 12, marginTop: 12 }}>
                    <div><div className="ph wet" style={{ aspectRatio: "4/3", borderRadius: 8 }} />
                      <div className="t-b12 c-sec" style={{ marginTop: 6 }}>피해 부위 · 11.17 21:02</div></div>
                    <div><div className="ph pipe" style={{ aspectRatio: "4/3", borderRadius: 8 }} />
                      <div className="t-b12 c-sec" style={{ marginTop: 6 }}>원인 부위 · 11.19 14:26</div></div>
                    <div><div className="ph pipe" style={{ aspectRatio: "4/3", borderRadius: 8 }} />
                      <div className="t-b12 c-sec" style={{ marginTop: 6 }}>열화상 판독 · 11.19 14:12</div></div>
                    <div><div className="ph clean" style={{ aspectRatio: "4/3", borderRadius: 8 }} />
                      <div className="t-b12 c-sec" style={{ marginTop: 6 }}>복구 완료 · 11.19 17:48</div></div>
                  </div>
                  <div className="row gap6" style={{ marginTop: 14, flexWrap: "wrap" }}>
                    <span className="verified">✓ 촬영 시각 검증</span>
                    <span className="verified">✓ 위치 좌표 검증</span>
                    <span className="verified">✓ 시공 일정과 일치</span>
                    <span className="verified">✓ 에스크로 결제 확인</span>
                    <span className="verified">✓ 사업자 배상책임보험 유효</span>
                  </div>
                </div>
      
                <div className="panel" style={{ marginBottom: "0" }}>
                  <h3 className="panel__t">단지 배관 이력 조회</h3>
                  <p className="t-b12 c-sec" style={{ margin: "-8px 0 14px" }}>관리사무소가 동의한 범위에서 해당 좌표의 과거 이력을 확인할 수 있습니다.</p>
                  <div className="callout warn">
                    <span className="c-dan" style={{ flex: "0 0 20px" }}>!</span>
                    <div><p className="t-b14 fw6" style={{ margin: "0 0 2px" }}>동일 부위 2024.07 누수 이력이 있습니다</p>
                      <p className="t-b14 c-sec" style={{ margin: "0" }}>외부 업체 시공 기록만 존재하며 시공 내역은 없습니다.
                        구조적 결함이라면 반복 청구가 예상되므로, 근본 원인 진단을 조건으로 지급하는 방안을 검토할 수 있습니다.</p></div>
                  </div>
                </div>
              </div>
      
              <div className="col gap12" style={{ position: "sticky", top: 88 }}>
                <div className="panel">
                  <h3 className="panel__t">지급 결정</h3>
                  <div className="col gap8" style={{ marginBottom: 14 }}>
                    <div className="row between"><span className="t-b14 c-sec">청구 금액</span><span className="t-b14 num">490,000</span></div>
                    <div className="row between"><span className="t-b14 c-sec">자기부담금</span><span className="t-b14 num c-sec">−200,000</span></div>
                    <div className="row between"><span className="t-b14 c-sec">보상 한도</span><span className="t-b14 num">1억원</span></div>
                  </div>
                  <hr className="hair" style={{ margin: "0 0 14px" }} />
                  <div className="row between" style={{ marginBottom: 16 }}>
                    <span className="t-h16">지급 예정액</span><span className="t-h24 num c-brand">290,000원</span></div>
                  <button className="btn large primary block" data-done="✓ 승인 완료" data-toast="지급 승인 처리되었습니다 · 290,000원이 지급 예정입니다">현장조사 없이 승인</button>
                  <button className="btn medium outlined block" style={{ marginTop: 8 }} data-toast="등록 손해사정법인에 배정되었습니다 · 데모 연출입니다">손해사정 배정</button>
                  <button className="btn medium ghost block" style={{ marginTop: 4 }} data-toast="추가 자료 요청이 접수되었습니다 · 데모 연출입니다">추가 자료 요청</button>
                </div>
      
                <div className="panel" style={{ background: "var(--sg-bg-success-subtle)", boxShadow: "none" }}>
                  <div className="t-b14 fw7" style={{ marginBottom: 6 }}>조사 생략 권고</div>
                  <p className="t-b12 c-sec" style={{ margin: "0 0 10px" }}>4개 공정 모두 표준 분포 내이고 사실 증거 5종이 검증되었습니다.
                    동일 패턴 건의 조사 후 감액률은 <b className="num">1.8%</b>로, 조사 비용(건당 18만원)이 감액분을 초과합니다.</p>
                  <div className="row between"><span className="t-b12 c-sec">예상 절감</span>
                    <span className="t-b14 fw7 c-suc num">174,000원</span></div>
                </div>
      
                <div className="panel">
                  <h3 className="panel__t">법적 경계</h3>
                  <p className="t-b12 c-sec" style={{ margin: "0" }}>설비고는 <b>사실자료 제공</b>만 수행하며 보험금 사정이나
                    적정성 판단을 대행하지 않습니다. 지급 결정과 손해사정은 귀사 및 등록 손해사정법인의 업무입니다.</p>
                </div>
              </div>
            </div>
    </BackofficeShell>
  );
}
