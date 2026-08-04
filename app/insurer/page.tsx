// 자동 이식된 목업 화면 p-ins-home — 원본: seolbigo-preview/index.html (백오피스)
// 헤더·내브는 BackofficeShell 공용 (실제 <Link> 라우팅) — 2026-08-04
import BackofficeShell from '../../components/BackofficeShell';

export default function Page() {
  return (
    <BackofficeShell persona="ins" id="p-ins-home">

            <div className="row between" style={{ marginBottom: 20, alignItems: "flex-start" }}>
              <div><h1 className="t-h24" style={{ margin: "0" }}>누수 청구 심사</h1>
                <p className="t-b14 c-sec" style={{ margin: "4px 0 0" }}>설비고 연계 건은 표준 공정 DB 대조 결과가 함께 들어옵니다. 판단은 손해사정이 합니다.</p></div>
              <button className="btn medium outlined" data-toast="데모에서는 다운로드가 생략됩니다">엑셀 내려받기</button>
            </div>
      
            <div className="grid g4" style={{ gap: 12, marginBottom: 16 }}>
              <div className="panel"><div className="t-b12 c-sec">이번 달 누수 접수</div>
                <div className="t-h24 num" style={{ margin: "4px 0 2px" }}>1,284건</div>
                <div className="t-b12 c-sec">전체 청구의 52.7%</div></div>
              <div className="panel" style={{ background: "var(--sg-bg-info-subtle)", boxShadow: "none" }}>
                <div className="t-b12 c-sec">설비고 연계 건</div>
                <div className="t-h24 num c-inf" style={{ margin: "4px 0 2px" }}>218건</div>
                <div className="t-b12 c-sec">17.0% · 전월 대비 +4.2%p</div></div>
              <div className="panel"><div className="t-b12 c-sec">평균 정산 소요</div>
                <div className="t-h24 num" style={{ margin: "4px 0 2px" }}>2.4일</div>
                <div className="t-b12 c-sec">비연계 건 11.6일</div></div>
              <div className="panel"><div className="t-b12 c-sec">현장조사 생략률</div>
                <div className="t-h24 num c-suc" style={{ margin: "4px 0 2px" }}>71%</div>
                <div className="t-b12 c-sec">연계 건 기준 · 건당 18만원 절감</div></div>
            </div>
      
            <div className="panel" style={{ padding: "14px 18px", marginBottom: 16 }}>
              <div className="row gap6" style={{ flexWrap: "wrap" }}>
                <button className="chip sm" aria-pressed="true">설비고 연계 218</button>
                <button className="chip sm">표준 범위 내 186</button>
                <button className="chip sm">검토 필요 24</button>
                <button className="chip sm">이상치 8</button>
                <button className="chip sm">서류 미비 12</button>
                <div style={{ flex: "1" }} />
                <select className="inp" style={{ width: "auto", height: 34, padding: "0 34px 0 12px", fontSize: 13 }}>
                  <option>접수 최신순</option><option>금액 높은순</option><option>이상치 우선</option></select>
              </div>
            </div>
      
            <div className="panel">
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <tbody><tr><th style={{ textAlign: "left", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>접수번호</th>
                  <th style={{ textAlign: "left", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>사고</th>
                  <th style={{ textAlign: "left", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>피보험자</th>
                  <th style={{ textAlign: "right", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>청구액</th>
                  <th style={{ textAlign: "left", padding: "9px 0 9px 16px", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>표준 분포 대조</th>
                  <th style={{ textAlign: "right", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>상태</th>
                  <th style={{ width: 90, borderBottom: "1px solid var(--sg-border-default)" }} /></tr>
      
                <tr><td className="num" style={{ padding: "13px 0", borderBottom: "1px solid var(--sg-border-subtle)" }}>2026-114-88213</td>
                  <td style={{ borderBottom: "1px solid var(--sg-border-subtle)" }}>배관 이음부 누수 · 청솔 1204호</td>
                  <td style={{ borderBottom: "1px solid var(--sg-border-subtle)" }}>1304호 (상층)</td>
                  <td className="num fw7" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>490,000</td>
                  <td style={{ paddingLeft: 16, borderBottom: "1px solid var(--sg-border-subtle)", width: 180 }}>
                    <div className="posbar"><span style={{ left: "47%" }} /></div>
                    <div className="t-b12 c-suc fw6" style={{ marginTop: 4 }}>범위 내 · 중앙값 근접</div></td>
                  <td style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}><span className="badge b-orange">심사 대기</span></td>
                  <td style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>
                    <button className="btn tiny primary" data-go="ins-case">열기</button></td></tr>
      
                <tr><td className="num" style={{ padding: "13px 0", borderBottom: "1px solid var(--sg-border-subtle)" }}>2026-114-88207</td>
                  <td style={{ borderBottom: "1px solid var(--sg-border-subtle)" }}>화장실 바닥 누수 · 개포늘푸른 902호</td>
                  <td style={{ borderBottom: "1px solid var(--sg-border-subtle)" }}>1002호 (상층)</td>
                  <td className="num fw7" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>2,840,000</td>
                  <td style={{ paddingLeft: 16, borderBottom: "1px solid var(--sg-border-subtle)" }}>
                    <div className="posbar"><span style={{ left: "94%", boxShadow: "0 0 0 3px var(--sg-bg-danger) inset,var(--sg-shadow-up-1)" }} /></div>
                    <div className="t-b12 fw6" style={{ marginTop: 4, color: "var(--sg-text-danger)" }}>상위 6% · 이상치</div></td>
                  <td style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}><span className="badge b-red">조사 배정</span></td>
                  <td style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>
                    <button className="btn tiny outlined" data-go="ins-case">열기</button></td></tr>
      
                <tr><td className="num" style={{ padding: "13px 0", borderBottom: "1px solid var(--sg-border-subtle)" }}>2026-114-88198</td>
                  <td style={{ borderBottom: "1px solid var(--sg-border-subtle)" }}>주방 배수관 누수 · 역삼청솔 508호</td>
                  <td style={{ borderBottom: "1px solid var(--sg-border-subtle)" }}>608호 (상층)</td>
                  <td className="num fw7" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>330,000</td>
                  <td style={{ paddingLeft: 16, borderBottom: "1px solid var(--sg-border-subtle)" }}>
                    <div className="posbar"><span style={{ left: "28%" }} /></div>
                    <div className="t-b12 c-suc fw6" style={{ marginTop: 4 }}>범위 내</div></td>
                  <td style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}><span className="badge b-green">지급 완료</span></td>
                  <td style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>
                    <button className="btn tiny ghost" data-go="ins-case">열기</button></td></tr>
      
                <tr><td className="num" style={{ padding: "13px 0", borderBottom: "1px solid var(--sg-border-subtle)" }}>2026-114-88176</td>
                  <td style={{ borderBottom: "1px solid var(--sg-border-subtle)" }}>천장 누수 · 신도림한내 1801호</td>
                  <td style={{ borderBottom: "1px solid var(--sg-border-subtle)" }}>1901호 (상층)</td>
                  <td className="num fw7" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>1,120,000</td>
                  <td style={{ paddingLeft: 16, borderBottom: "1px solid var(--sg-border-subtle)" }}>
                    <div className="posbar"><span style={{ left: "72%", boxShadow: "0 0 0 3px var(--sg-bg-warning) inset,var(--sg-shadow-up-1)" }} /></div>
                    <div className="t-b12 fw6" style={{ marginTop: 4, color: "var(--sg-text-warning)" }}>상위 28% · 검토 필요</div></td>
                  <td style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}><span className="badge b-orange">심사 대기</span></td>
                  <td style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>
                    <button className="btn tiny outlined" data-go="ins-case">열기</button></td></tr>
      
                <tr><td className="num" style={{ padding: "13px 0" }}>2026-114-88154</td>
                  <td>세면대 하부 누수 · 잠실동백 704호</td>
                  <td>804호 (상층)</td>
                  <td className="num fw7" style={{ textAlign: "right" }}>180,000</td>
                  <td style={{ paddingLeft: 16 }}>
                    <div className="posbar"><span style={{ left: "38%" }} /></div>
                    <div className="t-b12 c-suc fw6" style={{ marginTop: 4 }}>범위 내</div></td>
                  <td style={{ textAlign: "right" }}><span className="badge b-green">지급 완료</span></td>
                  <td style={{ textAlign: "right" }}><button className="btn tiny ghost" data-go="ins-case">열기</button></td></tr>
              </tbody></table>
            </div>
    </BackofficeShell>
  );
}
