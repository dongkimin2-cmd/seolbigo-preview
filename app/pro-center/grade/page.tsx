// 자동 이식된 목업 화면 p-pro-grade — 원본: seolbigo-preview/index.html (백오피스)
// 헤더·내브는 BackofficeShell 공용 (실제 <Link> 라우팅) — 2026-08-04
import BackofficeShell from '../../../components/BackofficeShell';

export default function Page() {
  return (
    <BackofficeShell persona="pro" id="p-pro-grade">

            <h1 className="t-h24" style={{ margin: "0 0 4px" }}>신용등급</h1>
            <p className="t-b14 c-sec" style={{ margin: "0 0 20px" }}>광고비가 아니라 실적이 노출 순위를 정합니다. 산정 근거는 모두 공개됩니다.</p>
      
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 340px", gap: 16, alignItems: "start" }}>
              <div>
                <div className="panel" style={{ marginBottom: 16 }}>
                  <h3 className="panel__t">점수 구성</h3>
                  <div className="col gap16" style={{ marginTop: 14 }}>
                    <div><div className="row between t-b14" style={{ marginBottom: 6 }}>
                        <span className="fw6">검증 필모그래피 <span className="c-sec fw5">· 30점 만점</span></span>
                        <span className="fw7 num">28 / 30</span></div>
                      <div className="posbar"><i style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: "93%", borderRadius: 999, background: "var(--sg-brand-primary)" }} /></div>
                      <div className="t-b12 c-sec" style={{ marginTop: 4 }}>84건 검증 · 위치·시각 메타데이터 100% 통과</div></div>
                    <div><div className="row between t-b14" style={{ marginBottom: 6 }}>
                        <span className="fw6">재시공률 <span className="c-sec fw5">· 25점 만점</span></span>
                        <span className="fw7 num">24 / 25</span></div>
                      <div className="posbar"><i style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: "96%", borderRadius: 999, background: "var(--sg-brand-primary)" }} /></div>
                      <div className="t-b12 c-sec" style={{ marginTop: 4 }}>1.2% · 업계 평균 4.8%</div></div>
                    <div><div className="row between t-b14" style={{ marginBottom: 6 }}>
                        <span className="fw6">고객 평점 <span className="c-sec fw5">· 20점 만점</span></span>
                        <span className="fw7 num">19 / 20</span></div>
                      <div className="posbar"><i style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: "95%", borderRadius: 999, background: "var(--sg-brand-primary)" }} /></div>
                      <div className="t-b12 c-sec" style={{ marginTop: 4 }}>★ 4.9 · 후기 126건</div></div>
                    <div><div className="row between t-b14" style={{ marginBottom: 6 }}>
                        <span className="fw6">응답 속도 <span className="c-sec fw5">· 15점 만점</span></span>
                        <span className="fw7 num">11 / 15</span></div>
                      <div className="posbar"><i style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: "73%", borderRadius: 999, background: "var(--sg-text-warning)" }} /></div>
                      <div className="t-b12" style={{ marginTop: 4, color: "var(--sg-text-warning)" }}>평균 28분 · 15분 이내면 만점입니다</div></div>
                    <div><div className="row between t-b14" style={{ marginBottom: 6 }}>
                        <span className="fw6">기준가 준수율 <span className="c-sec fw5">· 10점 만점</span></span>
                        <span className="fw7 num">10 / 10</span></div>
                      <div className="posbar"><i style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: "100%", borderRadius: 999, background: "var(--sg-brand-primary)" }} /></div>
                      <div className="t-b12 c-sec" style={{ marginTop: 4 }}>적정 구간 이탈 0건 · 승인 없는 추가금 0건</div></div>
                  </div>
                </div>
      
                <div className="panel" style={{ marginBottom: "0" }}>
                  <h3 className="panel__t">등급별 혜택</h3>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, marginTop: 12 }}>
                    <tbody><tr><th style={{ textAlign: "left", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>등급</th>
                      <th style={{ textAlign: "left", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>점수</th>
                      <th style={{ textAlign: "left", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>노출</th>
                      <th style={{ textAlign: "left", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>요청 배정</th></tr>
                    <tr style={{ background: "var(--sg-bg-brand-subtle)" }}><td style={{ padding: "12px 8px", borderRadius: "8px 0 0 8px" }}><b>플래티넘</b> <span className="badge b-brands">현재</span></td>
                      <td>85점 이상</td><td>검색 1순위</td><td style={{ borderRadius: "0 8px 8px 0" }}><b>우선 배정</b></td></tr>
                    <tr><td style={{ padding: "12px 8px" }}>골드</td><td>70~84점</td><td>2순위</td><td>일반</td></tr>
                    <tr><td style={{ padding: "12px 8px" }}>실버</td><td>50~69점</td><td>3순위</td><td>일반</td></tr>
                    <tr><td style={{ padding: "12px 8px" }}>신규</td><td>50점 미만</td><td>지역 한정</td><td>지역 배정</td></tr>
                  </tbody></table>
                  <p className="t-b12 c-sec" style={{ margin: "12px 0 0" }}>중개 수수료는 등급과 무관하게 <b>8% 단일</b>입니다.
                    등급은 노출 순위와 요청 배정에만 영향을 줍니다.</p>
                </div>
              </div>
      
              <div className="col gap12" style={{ position: "sticky", top: 88 }}>
                <div className="panel" style={{ textAlign: "center" }}>
                  <div className="ring" style={{ width: 132, height: 132, flex: "0 0 132px", margin: "0 auto 14px" }}>
                    <svg width="132" height="132"><circle cx="66" cy="66" r="55" fill="none" stroke="#EFF1F5" strokeWidth={14} />
                      <circle cx="66" cy="66" r="55" fill="none" stroke="#693BF2" strokeWidth={14} strokeLinecap="round" strokeDasharray="345" strokeDashoffset={48} /></svg>
                    <div className="ring__t"><div className="t-h24 num">86</div><div className="t-b12 c-sec">/ 100</div></div></div>
                  <div className="t-h20 c-brand" style={{ marginBottom: 2 }}>플래티넘</div>
                  <div className="t-b14 c-sec">전체 사업자 중 상위 8%</div>
                  <hr className="hair" style={{ margin: "16px 0" }} />
                  <div className="col gap8">
                    <div className="row between"><span className="t-b14 c-sec">검색 노출 순위</span><span className="t-b14 fw7">1순위</span></div>
                    <div className="row between"><span className="t-b14 c-sec">중개 수수료</span><span className="t-b14 fw7">8%</span></div>
                    <div className="row between"><span className="t-b14 c-sec">요청 우선 배정</span><span className="t-b14 fw7 c-suc">적용중</span></div>
                  </div>
                </div>
                <div className="panel" style={{ background: "var(--sg-bg-warning-subtle)", boxShadow: "none" }}>
                  <div className="t-b14 fw7" style={{ marginBottom: 6 }}>4점만 더 올리면</div>
                  <p className="t-b12 c-sec" style={{ margin: "0" }}>응답 속도를 <b>평균 15분 이내</b>로 줄이면 90점입니다.
                    90점부터는 지역 대표 사업자로 홈 화면에 노출됩니다.</p>
                </div>
              </div>
            </div>
    </BackofficeShell>
  );
}
