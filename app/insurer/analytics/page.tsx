// 자동 이식된 목업 화면 p-ins-analytics — 원본: seolbigo-preview/index.html (백오피스)
// 헤더·내브는 BackofficeShell 공용 (실제 <Link> 라우팅) — 2026-08-04
// 데이터 기반 전환 (2026-08-04) — 비교 지표·절감 표·데이터 제공 범위를 lib/ins-data 로 추출.
// 상호작용이 없는 화면이라 서버 컴포넌트 유지.
import BackofficeShell from '../../../components/BackofficeShell';
import {
  INS_COMPARE_METRICS, INS_SAVING_ROWS, INS_SAVING_TOTAL, INS_DATA_SCOPE, INS_PERIOD_OPTIONS,
} from '../../../lib/ins-data';

export default function Page() {
  return (
    <BackofficeShell persona="ins" id="p-ins-analytics">

            <div className="row between" style={{ marginBottom: 20, alignItems: "flex-start" }}>
              <div><h1 className="t-h24" style={{ margin: "0" }}>손해율 절감 실적</h1>
                <p className="t-b14 c-sec" style={{ margin: "4px 0 0" }}>설비고 연계 건과 비연계 건의 실제 차이입니다. 2026년 1~11월 누적.</p></div>
              <select className="inp" style={{ width: "auto", height: 38, padding: "0 34px 0 12px", fontSize: 14 }}>
                {INS_PERIOD_OPTIONS.map(o => <option key={o}>{o}</option>)}</select>
            </div>

            <div className="panel" style={{ marginBottom: 16 }}>
              <h3 className="panel__t">연계 건 vs 비연계 건</h3>
              <div className="col gap16" style={{ marginTop: 16 }}>
                {INS_COMPARE_METRICS.map(m => (
                  <div key={m.title}><div className="row between t-b14" style={{ marginBottom: 8 }}>
                      <span className="fw6">{m.title}</span>
                      <span className="c-sec">연계 <b className="num c-insurer">{m.linked}</b> · 비연계 <b className="num">{m.unlinked}</b></span></div>
                    <div className="row gap12"><span className="t-b12 c-sec" style={{ width: 52 }}>연계</span>
                      <div className="posbar" style={{ flex: "1" }}><i style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: m.linkedWidth, borderRadius: 999, background: "var(--sb-role-insurer)" }} /></div>
                      <span className="t-b12 fw7 num c-suc" style={{ width: 56, textAlign: "right" }}>{m.delta}</span></div>
                    <div className="row gap12" style={{ marginTop: 6 }}><span className="t-b12 c-sec" style={{ width: 52 }}>비연계</span>
                      <div className="posbar" style={{ flex: "1" }}><i style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: m.unlinkedWidth, borderRadius: 999, background: "var(--sg-gray-300)" }} /></div>
                      <span className="t-b12 c-sec" style={{ width: 56, textAlign: "right" }}>기준</span></div></div>
                ))}
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
                  {INS_SAVING_ROWS.map((r, i) => {
                    // 마지막 행은 하단 경계선 없음 (원본 목업과 동일)
                    const bd = i < INS_SAVING_ROWS.length - 1 ? { borderBottom: "1px solid var(--sg-border-subtle)" } : {};
                    return (
                      <tr key={r.item}><td style={{ padding: "12px 0", ...bd }}>{r.item}</td>
                        <td className="num" style={{ textAlign: "right", ...bd }}>{r.count}</td>
                        <td className="num c-sec" style={{ textAlign: "right", ...bd }}>{r.per}</td>
                        <td className="num fw7" style={{ textAlign: "right", ...bd }}>{r.total}</td></tr>
                    );
                  })}
                  <tr><td className="t-h16" style={{ padding: "16px 0 0" }} colSpan={3}>2026년 누적 절감액</td>
                    <td className="t-h20 num c-brand" style={{ textAlign: "right", padding: "16px 0 0" }}>{INS_SAVING_TOTAL}</td></tr>
                </tbody></table>
              </div>

              <div className="col gap12">
                <div className="panel" style={{ background: "var(--sb-role-insurer-subtle)", boxShadow: "none" }}>
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
                    {INS_DATA_SCOPE.map(d => (
                      <div key={d.label} className="row between"><span className="t-b14 c-sec">{d.label}</span><span className={'badge ' + d.badgeTone}>{d.badge}</span></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
    </BackofficeShell>
  );
}
