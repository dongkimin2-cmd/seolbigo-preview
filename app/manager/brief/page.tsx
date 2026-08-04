// 자동 이식된 목업 화면 p-mgr-brief — 원본: seolbigo-preview/index.html (백오피스)
// 헤더·내브는 BackofficeShell 공용 (실제 <Link> 라우팅) — 2026-08-04
// 데이터 기반 전환 (2026-08-04) — 업체 비교·집행 계정·근거·이전 보고자료를 lib/mgr-data.ts 에서 렌더
import BackofficeShell from '../../../components/BackofficeShell';
import ToastButton from '../../../components/mgr/ToastButton';
import DoneToastButton from '../../../components/mgr/DoneToastButton';
import { MGR_BRIEF_VENDORS, MGR_BRIEF_ACCOUNT, MGR_BRIEF_EVIDENCE, MGR_BRIEF_HISTORY } from '../../../lib/mgr-data';

export default function Page() {
  return (
    <BackofficeShell persona="mgr" id="p-mgr-brief">

            <div className="row between" style={{ marginBottom: 20, alignItems: "flex-start" }}>
              <div><h1 className="t-h24" style={{ margin: "0" }}>입주자대표회의 보고자료</h1>
                <p className="t-b14 c-sec" style={{ margin: "4px 0 0" }}>“왜 이 업체를, 이 금액에” — 설명해야 하는 것을 데이터로 대신합니다.</p></div>
              <div className="row gap8">
                <ToastButton className="btn medium outlined" msg="데모에서는 PDF 다운로드가 생략됩니다">PDF 내려받기</ToastButton>
                <DoneToastButton className="btn medium primary" doneLabel="✓ 제출 완료"
                  msg="11월 정기 입주자대표회의 안건으로 제출되었습니다">회의 자료로 제출</DoneToastButton></div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 300px", gap: 16, alignItems: "start" }}>
              <div className="doc" style={{ padding: 36 }}>
                <div className="doc__hd">
                  <div><div style={{ fontSize: 19, fontWeight: "800", letterSpacing: "-.4px" }}>103동 오수관 고압세정 시행 건</div>
                    <div className="t-b12 c-sec" style={{ marginTop: 4 }}>2026년 11월 정기 입주자대표회의 안건 · 청솔아파트 관리사무소</div></div>
                  <div style={{ textAlign: "right" }} className="t-b12 c-sec">
                    <div>작성일 2026.11.19</div><div className="num">B-2611-0103</div></div>
                </div>

                <div className="t-b14 fw7" style={{ margin: "0 0 10px" }}>1. 시행 필요성</div>
                <p className="t-b14 c-sec" style={{ margin: "0 0 8px", lineHeight: "22px" }}>
                  2026.11.14 내시경 조사 결과 103동 오수관의 오염도는 <b className="c-dan">81점(즉시 세정 권장)</b>으로,
                  관경의 약 42%가 협착된 상태입니다. 3라인은 92점으로 이미 저층 세대 역류가 2회 발생했습니다.</p>
                <div className="row gap12" style={{ margin: "14px 0 24px" }}>
                  <div className="ph pipe" style={{ width: 150, height: 112, borderRadius: 8 }} />
                  <div className="ph pipe" style={{ width: 150, height: 112, borderRadius: 8 }} />
                  <div style={{ flex: "1", padding: 14, borderRadius: 8, background: "var(--sg-bg-danger-subtle)" }}>
                    <div className="t-b12 fw7 c-dan" style={{ marginBottom: 4 }}>방치 시 예상</div>
                    <div className="t-b12 c-sec">저층 4개 세대 역류 사고 시 세대당 복구비 180~300만원,
                      단지 배상 분쟁 발생 가능. 예방 세정비의 약 5배.</div></div>
                </div>

                <div className="t-b14 fw7" style={{ margin: "0 0 10px" }}>2. 금액의 적정성</div>
                <p className="t-b14 c-sec" style={{ margin: "0 0 14px", lineHeight: "22px" }}>
                  설비고 플랫폼에 축적된 <b>동일 규모·연식 단지 42건</b>의 실제 계약금액 분포와 대조한 결과,
                  본 건 예정가격은 적정 구간 내에 있습니다.</p>
                <div className="range" style={{ paddingTop: 36, marginBottom: 24 }}>
                  <div className="range__bar">
                    <div className="range__fair" style={{ left: "20%", right: "22%" }} />
                    <div className="range__mark" style={{ left: "44%" }} />
                    <div className="range__cap" style={{ left: "44%" }}>본 건 143만원</div>
                  </div>
                  <div className="range__lbl"><span className="num">112만원</span>
                    <span className="c-suc fw6">적정 구간</span><span className="num">198만원</span></div>
                </div>

                <div className="t-b14 fw7" style={{ margin: "0 0 10px" }}>3. 업체 선정 근거</div>
                <table style={{ marginBottom: 24 }}>
                  <tbody><tr><th>업체</th><th>신용등급</th><th>필모그래피</th><th>재시공률</th><th style={{ textAlign: "right" }}>견적</th></tr>
                  {MGR_BRIEF_VENDORS.map(v => (
                    <tr key={v.name}><td>{v.selected ? <><b>{v.name}</b> <span className="badge b-brands">선정</span></> : v.name}</td>
                      <td>{v.credit}</td><td className="num">{v.films}</td><td className={'num' + (v.redoGood ? ' c-suc' : '')}>{v.redo}</td>
                      <td className="n">{v.selected ? <b>{v.price}</b> : v.price}</td></tr>
                  ))}
                </tbody></table>
                <p className="t-b12 c-sec" style={{ margin: "0 0 24px" }}>
                  최저가는 한빛배관이나, 재시공률과 검증 필모그래피 건수를 반영한 적격심사 결과 깨끗한집설비를 선정했습니다.
                  차액 5만원 대비 재시공 리스크 절감 효과가 크다고 판단했습니다.</p>

                <div className="t-b14 fw7" style={{ margin: "0 0 10px" }}>4. 집행 계정</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px", marginBottom: 8 }}>
                  {MGR_BRIEF_ACCOUNT.map(a => (
                    <div key={a.label} className="row between"><span className="c-sec">{a.label}</span><span>{a.value}</span></div>
                  ))}
                </div>
              </div>

              <div className="col gap12" style={{ position: "sticky", top: 88 }}>
                <div className="panel" style={{ background: "var(--sg-bg-brand-subtle)", boxShadow: "none" }}>
                  <div className="t-b14 fw7" style={{ marginBottom: 6 }}>유착 의혹을 막는 방법</div>
                  <p className="t-b12 c-sec" style={{ margin: "0" }}>&quot;왜 저 업체냐&quot;는 질문에 <b>친분이 아니라 숫자로</b> 답합니다.
                    신용등급·재시공률·42개 단지 실거래 분포가 모두 플랫폼 기록이라 소장이 만든 자료가 아닙니다.</p>
                </div>
                <div className="panel">
                  <h3 className="panel__t">포함된 근거</h3>
                  <div className="col gap10" style={{ gap: 10 }}>
                    {MGR_BRIEF_EVIDENCE.map(e => (
                      <div key={e} className="row gap8"><span className="c-suc">✓</span><span className="t-b14">{e}</span></div>
                    ))}
                  </div>
                </div>
                <div className="panel">
                  <h3 className="panel__t">이전 보고자료</h3>
                  <div className="col gap8">
                    {MGR_BRIEF_HISTORY.map(h => (
                      <div key={h.title} className="row between"><span className="t-b14">{h.title}</span><span className="badge b-gray">{h.result}</span></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
    </BackofficeShell>
  );
}
