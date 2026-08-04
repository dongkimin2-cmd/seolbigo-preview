// 자동 이식된 목업 화면 p-mgr-report — 원본: seolbigo-preview/index.html (백오피스)
// 헤더·내브는 BackofficeShell 공용 (실제 <Link> 라우팅) — 2026-08-04
import BackofficeShell from '../../../components/BackofficeShell';

export default function Page() {
  return (
    <BackofficeShell persona="mgr" id="p-mgr-report">

            <h1 className="t-h24" style={{ margin: "0 0 4px" }}>오염도 리포트 — 103동 오수관</h1>
            <p className="t-b14 c-sec" style={{ margin: "0 0 20px" }}>2026.11.14 내시경 조사 · 조사번호 S-2611-0103 · 촬영 구간 12개소</p>
      
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 340px", gap: 16, alignItems: "start" }}>
              <div>
                <div className="panel" style={{ marginBottom: 16 }}>
                  <div className="row gap24" style={{ gap: 24, alignItems: "center", flexWrap: "wrap" }}>
                    <div className="ring" style={{ width: 120, height: 120, flex: "0 0 120px" }}>
                      <svg width="120" height="120"><circle cx="60" cy="60" r="50" fill="none" stroke="#EFF1F5" strokeWidth={13} />
                        <circle cx="60" cy="60" r="50" fill="none" stroke="#FF3541" strokeWidth={13} strokeLinecap="round" strokeDasharray="314" strokeDashoffset={60} /></svg>
                      <div className="ring__t"><div className="t-h24 num">81</div><div className="t-b12 c-sec">오염도</div></div></div>
                    <div style={{ flex: "1", minWidth: 280 }}>
                      <span className="urg urgent" style={{ marginBottom: 10 }}><i />즉시 세정 권장</span>
                      <p className="t-b14 c-sec" style={{ margin: "8px 0 14px" }}>관경의 약 <b>42%</b>가 기름때와 침전물로 좁아진 상태입니다.
                        동일 조건(1999년 준공·음식점 라인 없음) 건물 대비 <b>상위 12%</b> 오염 수준입니다.</p>
                      <div className="tier on"><div><div className="t-b14 fw7">다음 세정 권장 시점</div>
                        <div className="t-b12 c-sec">이 건물의 오염 축적 속도로 산출 · 특허 출원 준비 중</div></div>
                        <span className="t-b16 fw7 c-brand">10개월 후</span></div>
                    </div>
                  </div>
                </div>
      
                <div className="panel" style={{ marginBottom: 16 }}>
                  <h3 className="panel__t">라인별 오염도</h3>
                  <div className="col gap12" style={{ marginTop: 14 }}>
                    <div><div className="row between t-b14" style={{ marginBottom: 6 }}>
                        <span className="fw6">3라인 (저층 역류 발생 구간)</span>
                        <span className="fw7 num" style={{ color: "var(--sg-text-danger)" }}>92</span></div>
                      <div className="posbar"><i style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: "92%", borderRadius: 999, background: "var(--sg-bg-danger)" }} /></div></div>
                    <div><div className="row between t-b14" style={{ marginBottom: 6 }}>
                        <span className="fw6">4라인</span><span className="fw7 num" style={{ color: "var(--sg-text-warning)" }}>78</span></div>
                      <div className="posbar"><i style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: "78%", borderRadius: 999, background: "var(--sg-bg-warning)" }} /></div></div>
                    <div><div className="row between t-b14" style={{ marginBottom: 6 }}>
                        <span className="fw6">2라인</span><span className="fw7 num" style={{ color: "var(--sg-text-warning)" }}>74</span></div>
                      <div className="posbar"><i style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: "74%", borderRadius: 999, background: "var(--sg-bg-warning)" }} /></div></div>
                    <div><div className="row between t-b14" style={{ marginBottom: 6 }}>
                        <span className="fw6">1라인</span><span className="fw7 num c-suc">61</span></div>
                      <div className="posbar"><i style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: "61%", borderRadius: 999, background: "var(--sg-bg-success)" }} /></div></div>
                  </div>
                </div>
      
                <div className="panel" style={{ marginBottom: "0" }}>
                  <h3 className="panel__t">내시경 촬영 기록</h3>
                  <p className="t-b12 c-sec" style={{ margin: "-8px 0 14px" }}>촬영 구간별 원본 영상은 단지 계정에 영구 보관됩니다.</p>
                  <div className="grid g4" style={{ gap: 12 }}>
                    <div><div className="ph pipe" style={{ aspectRatio: "4/3", borderRadius: 8 }} />
                      <div className="t-b12 c-sec" style={{ marginTop: 6 }}>3라인 B1 · 오염도 92</div></div>
                    <div><div className="ph pipe" style={{ aspectRatio: "4/3", borderRadius: 8 }} />
                      <div className="t-b12 c-sec" style={{ marginTop: 6 }}>3라인 5F · 오염도 88</div></div>
                    <div><div className="ph clean" style={{ aspectRatio: "4/3", borderRadius: 8 }} />
                      <div className="t-b12 c-sec" style={{ marginTop: 6 }}>1라인 B1 · 오염도 61</div></div>
                    <div><div className="ph clean" style={{ aspectRatio: "4/3", borderRadius: 8 }} />
                      <div className="t-b12 c-sec" style={{ marginTop: 6 }}>1라인 10F · 오염도 58</div></div>
                  </div>
                </div>
              </div>
      
              <div className="col gap12" style={{ position: "sticky", top: 88 }}>
                <div className="panel">
                  <h3 className="panel__t">권장 조치</h3>
                  <div className="col gap8" style={{ marginBottom: 14 }}>
                    <div className="row between"><span className="t-b14 c-sec">세정 범위</span><span className="t-b14 fw6">전 라인 (4개)</span></div>
                    <div className="row between"><span className="t-b14 c-sec">예상 공사비</span><span className="t-b14 fw6 num">1,430,000원</span></div>
                    <div className="row between"><span className="t-b14 c-sec">소요 기간</span><span className="t-b14 fw6">1일</span></div>
                    <div className="row between"><span className="t-b14 c-sec">집행 계정</span><span className="t-b14 fw6">수선유지비</span></div>
                  </div>
                  <hr className="hair" style={{ margin: "0 0 14px" }} />
                  <div className="callout" style={{ padding: 12, marginBottom: 14 }}>
                    <p className="t-b12 c-sec" style={{ margin: "0" }}>부가세 제외 500만원 이하이므로 <b>경쟁입찰 의무 대상이 아닙니다</b>
                      (선정지침 제4조제3항 · 별표 2). 수의계약 근거 자료가 자동 첨부됩니다.</p></div>
                  <button className="btn large primary block" data-go="mgr-contract">세정 발주하기</button>
                  <button className="btn medium outlined block" style={{ marginTop: 8 }} data-go="mgr-brief">입대의 보고자료로</button>
                </div>
                <div className="panel" style={{ background: "var(--sg-bg-success-subtle)", boxShadow: "none" }}>
                  <div className="t-b14 fw7" style={{ marginBottom: 6 }}>왜 주기를 우리가 정하나요</div>
                  <p className="t-b12 c-sec" style={{ margin: "0" }}>일본은 배수설비 청소를 6개월마다 법으로 의무화했지만
                    한국에는 법정 주기가 없습니다. 관행적인 2~3년 대신, 이 건물의 실제 오염 속도로 다음 시점을 계산합니다.</p>
                </div>
              </div>
            </div>
    </BackofficeShell>
  );
}
