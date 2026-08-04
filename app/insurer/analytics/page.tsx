// 자동 이식된 목업 화면 p-ins-analytics — 원본: seolbigo-preview/index.html (백오피스)
// 헤더·내브는 BackofficeShell 공용 (실제 <Link> 라우팅) — 2026-08-04
import BackofficeShell from '../../../components/BackofficeShell';

export default function Page() {
  return (
    <BackofficeShell persona="ins" id="p-ins-analytics">

            <div className="row between" style={{ marginBottom: 20, alignItems: "flex-start" }}>
              <div><h1 className="t-h24" style={{ margin: "0" }}>손해율 절감 실적</h1>
                <p className="t-b14 c-sec" style={{ margin: "4px 0 0" }}>설비고 연계 건과 비연계 건의 실제 차이입니다. 2026년 1~11월 누적.</p></div>
              <select className="inp" style={{ width: "auto", height: 38, padding: "0 34px 0 12px", fontSize: 14 }}>
                <option>2026년 누적</option><option>최근 6개월</option><option>이번 달</option></select>
            </div>
      
            <div className="panel" style={{ marginBottom: 16 }}>
              <h3 className="panel__t">연계 건 vs 비연계 건</h3>
              <div className="col gap16" style={{ marginTop: 16 }}>
                <div><div className="row between t-b14" style={{ marginBottom: 8 }}>
                    <span className="fw6">건당 평균 지급액</span>
                    <span className="c-sec">연계 <b className="num c-inf">438,000원</b> · 비연계 <b className="num">571,000원</b></span></div>
                  <div className="row gap12"><span className="t-b12 c-sec" style={{ width: 52 }}>연계</span>
                    <div className="posbar" style={{ flex: "1" }}><i style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: "77%", borderRadius: 999, background: "var(--sg-bg-info)" }} /></div>
                    <span className="t-b12 fw7 num c-suc" style={{ width: 56, textAlign: "right" }}>−23.3%</span></div>
                  <div className="row gap12" style={{ marginTop: 6 }}><span className="t-b12 c-sec" style={{ width: 52 }}>비연계</span>
                    <div className="posbar" style={{ flex: "1" }}><i style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: "100%", borderRadius: 999, background: "var(--sg-gray-300)" }} /></div>
                    <span className="t-b12 c-sec" style={{ width: 56, textAlign: "right" }}>기준</span></div></div>
      
                <div><div className="row between t-b14" style={{ marginBottom: 8 }}>
                    <span className="fw6">현장조사 실시율</span>
                    <span className="c-sec">연계 <b className="num c-inf">29%</b> · 비연계 <b className="num">86%</b></span></div>
                  <div className="row gap12"><span className="t-b12 c-sec" style={{ width: 52 }}>연계</span>
                    <div className="posbar" style={{ flex: "1" }}><i style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: "29%", borderRadius: 999, background: "var(--sg-bg-info)" }} /></div>
                    <span className="t-b12 fw7 num c-suc" style={{ width: 56, textAlign: "right" }}>−57%p</span></div>
                  <div className="row gap12" style={{ marginTop: 6 }}><span className="t-b12 c-sec" style={{ width: 52 }}>비연계</span>
                    <div className="posbar" style={{ flex: "1" }}><i style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: "86%", borderRadius: 999, background: "var(--sg-gray-300)" }} /></div>
                    <span className="t-b12 c-sec" style={{ width: 56, textAlign: "right" }}>기준</span></div></div>
      
                <div><div className="row between t-b14" style={{ marginBottom: 8 }}>
                    <span className="fw6">정산 소요일</span>
                    <span className="c-sec">연계 <b className="num c-inf">2.4일</b> · 비연계 <b className="num">11.6일</b></span></div>
                  <div className="row gap12"><span className="t-b12 c-sec" style={{ width: 52 }}>연계</span>
                    <div className="posbar" style={{ flex: "1" }}><i style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: "21%", borderRadius: 999, background: "var(--sg-bg-info)" }} /></div>
                    <span className="t-b12 fw7 num c-suc" style={{ width: 56, textAlign: "right" }}>−79%</span></div>
                  <div className="row gap12" style={{ marginTop: 6 }}><span className="t-b12 c-sec" style={{ width: 52 }}>비연계</span>
                    <div className="posbar" style={{ flex: "1" }}><i style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: "100%", borderRadius: 999, background: "var(--sg-gray-300)" }} /></div>
                    <span className="t-b12 c-sec" style={{ width: 56, textAlign: "right" }}>기준</span></div></div>
      
                <div><div className="row between t-b14" style={{ marginBottom: 8 }}>
                    <span className="fw6">1년 내 동일 부위 재청구율</span>
                    <span className="c-sec">연계 <b className="num c-inf">2.1%</b> · 비연계 <b className="num">7.8%</b></span></div>
                  <div className="row gap12"><span className="t-b12 c-sec" style={{ width: 52 }}>연계</span>
                    <div className="posbar" style={{ flex: "1" }}><i style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: "27%", borderRadius: 999, background: "var(--sg-bg-info)" }} /></div>
                    <span className="t-b12 fw7 num c-suc" style={{ width: 56, textAlign: "right" }}>−73%</span></div>
                  <div className="row gap12" style={{ marginTop: 6 }}><span className="t-b12 c-sec" style={{ width: 52 }}>비연계</span>
                    <div className="posbar" style={{ flex: "1" }}><i style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: "100%", borderRadius: 999, background: "var(--sg-gray-300)" }} /></div>
                    <span className="t-b12 c-sec" style={{ width: 56, textAlign: "right" }}>기준</span></div></div>
              </div>
            </div>
      
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 340px", gap: 16, alignItems: "start" }}>
              <div className="panel">
                <h3 className="panel__t">절감 효과 산출</h3>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, marginTop: 12 }}>
                  <tbody><tr><th style={{ textAlign: "left", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>항목</th>
                    <th style={{ textAlign: "right", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>건수</th>
                    <th style={{ textAlign: "right", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>건당</th>
                    <th style={{ textAlign: "right", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>누적 절감</th></tr>
                  <tr><td style={{ padding: "12px 0", borderBottom: "1px solid var(--sg-border-subtle)" }}>현장조사 생략</td>
                    <td className="num" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>1,412</td>
                    <td className="num c-sec" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>180,000</td>
                    <td className="num fw7" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>254,160,000</td></tr>
                  <tr><td style={{ padding: "12px 0", borderBottom: "1px solid var(--sg-border-subtle)" }}>과다 청구 사전 차단</td>
                    <td className="num" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>86</td>
                    <td className="num c-sec" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>412,000</td>
                    <td className="num fw7" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>35,432,000</td></tr>
                  <tr><td style={{ padding: "12px 0", borderBottom: "1px solid var(--sg-border-subtle)" }}>재청구 감소</td>
                    <td className="num" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>108</td>
                    <td className="num c-sec" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>571,000</td>
                    <td className="num fw7" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>61,668,000</td></tr>
                  <tr><td style={{ padding: "12px 0" }}>CS 응대 · 분쟁 처리</td>
                    <td className="num" style={{ textAlign: "right" }}>1,946</td>
                    <td className="num c-sec" style={{ textAlign: "right" }}>24,000</td>
                    <td className="num fw7" style={{ textAlign: "right" }}>46,704,000</td></tr>
                  <tr><td className="t-h16" style={{ padding: "16px 0 0" }} colSpan={3}>2026년 누적 절감액</td>
                    <td className="t-h20 num c-brand" style={{ textAlign: "right", padding: "16px 0 0" }}>3억 9,796만원</td></tr>
                </tbody></table>
              </div>
      
              <div className="col gap12">
                <div className="panel" style={{ background: "var(--sg-bg-info-subtle)", boxShadow: "none" }}>
                  <div className="t-b12 c-sec">누수 지급보험금 (반기)</div>
                  <div className="t-h24 num" style={{ margin: "4px 0 2px" }}>1,517억원</div>
                  <div className="t-b12 c-sec">지급 원인 1위 · 금액 비중 65.6%<br />(한국신용정보원, 2023 상반기)</div>
                  <hr className="hair" style={{ margin: "14px 0" }} />
                  <p className="t-b12 c-sec" style={{ margin: "0" }}>이 규모에서는 <b>1%의 절감도 연 30억원</b>입니다.
                    연계율을 17%에서 50%로 올리면 절감 효과는 세 배가 됩니다.</p>
                </div>
                <div className="panel">
                  <h3 className="panel__t">데이터 제공 범위</h3>
                  <div className="col gap10" style={{ gap: 10 }}>
                    <div className="row between"><span className="t-b14 c-sec">사실자료 리포트</span><span className="badge b-green">제공중</span></div>
                    <div className="row between"><span className="t-b14 c-sec">표준 분포 대조</span><span className="badge b-green">제공중</span></div>
                    <div className="row between"><span className="t-b14 c-sec">단지 이력 조회 API</span><span className="badge b-orange">협의중</span></div>
                    <div className="row between"><span className="t-b14 c-sec">위험 예측 스코어</span><span className="badge b-gline">2027 예정</span></div>
                  </div>
                </div>
              </div>
            </div>
    </BackofficeShell>
  );
}
