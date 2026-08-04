// 자동 이식된 목업 화면 p-mgr-home — 원본: seolbigo-preview/index.html (백오피스)
// 헤더·내브는 BackofficeShell 공용 (실제 <Link> 라우팅) — 2026-08-04
import DongGrid from '../../components/DongGrid';
import BackofficeShell from '../../components/BackofficeShell';

export default function Page() {
  return (
    <BackofficeShell persona="mgr" id="p-mgr-home">

            <div className="row between" style={{ marginBottom: 20, alignItems: "flex-start" }}>
              <div><h1 className="t-h24" style={{ margin: "0" }}>청솔아파트 배관 현황</h1>
                <p className="t-b14 c-sec" style={{ margin: "4px 0 0" }}>준공 1999년 · 27년차 · 21개동 1,240세대 · 중앙난방</p></div>
              <div className="row gap8">
                <button className="btn medium outlined" data-go="mgr-brief">입대의 보고자료 생성</button>
                <button className="btn medium primary" data-go="mgr-map">이력 지도 열기</button></div>
            </div>
      
            <div className="grid g4" style={{ gap: 12, marginBottom: 16 }}>
              <div className="panel"><div className="t-b12 c-sec">누적 기록된 이력</div>
                <div className="t-h24 num" style={{ margin: "4px 0 2px" }}>318건</div>
                <div className="t-b12 c-sec">2019년~ · 좌표 단위 기록</div></div>
              <div className="panel" style={{ background: "var(--sg-bg-warning-subtle)", boxShadow: "none" }}>
                <div className="t-b12 c-sec">세정 주기 초과 라인</div>
                <div className="t-h24 num" style={{ margin: "4px 0 2px", color: "var(--sg-text-warning)" }}>6개</div>
                <div className="t-b12 c-sec">103·107·112동 오수관</div></div>
              <div className="panel"><div className="t-b12 c-sec">올해 하자 발생</div>
                <div className="t-h24 num" style={{ margin: "4px 0 2px" }}>14건</div>
                <div className="t-b12 c-suc fw6">작년 대비 −38%</div></div>
              <div className="panel"><div className="t-b12 c-sec">절감한 유지보수비</div>
                <div className="t-h24 num c-brand" style={{ margin: "4px 0 2px" }}>2,840만원</div>
                <div className="t-b12 c-sec">예방 세정 도입 후 2년</div></div>
            </div>
      
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 340px", gap: 16, alignItems: "start" }}>
              <div>
                <div className="panel" style={{ marginBottom: 16 }}>
                  <div className="row between" style={{ marginBottom: 14 }}>
                    <h3 className="panel__t" style={{ margin: "0" }}>동별 배관 위험도</h3>
                    <span className="t-b12 c-sec">오염도 · 연식 · 하자 이력 종합</span></div>
                  <DongGrid />
                  <div className="row gap16" style={{ marginTop: 14, flexWrap: "wrap" }}>
                    <span className="t-b12 c-sec"><i className="lg" style={{ background: "#E7FCEF" }} />양호</span>
                    <span className="t-b12 c-sec"><i className="lg" style={{ background: "#FFF7F0" }} />관찰</span>
                    <span className="t-b12 c-sec"><i className="lg" style={{ background: "#FFE0CC" }} />주의</span>
                    <span className="t-b12 c-sec"><i className="lg" style={{ background: "#FDEBEC" }} />즉시 조치</span>
                  </div>
                </div>
      
                <div className="panel">
                  <div className="row between" style={{ marginBottom: 14 }}>
                    <h3 className="panel__t" style={{ margin: "0" }}>조치가 필요한 항목</h3>
                    <span className="more" data-go="mgr-report">리포트 보기 ›</span></div>
                  <div className="col gap8">
                    <div className="jobrow">
                      <span className="badge b-red">즉시</span>
                      <div style={{ flex: "1" }}><div className="t-b14 fw7">103동 오수관 — 오염도 81점</div>
                        <div className="t-b12 c-sec">관경 42% 협착 · 저층 역류 위험 · 마지막 세정 기록 없음</div></div>
                      <button className="btn small primary" data-go="mgr-contract">세정 발주</button></div>
                    <div className="jobrow">
                      <span className="badge b-orange">주의</span>
                      <div style={{ flex: "1" }}><div className="t-b14 fw7">107동 입상관 — 세정 주기 8개월 초과</div>
                        <div className="t-b12 c-sec">직전 세정 2024.03 · 권장 주기 1년 (노후 단지)</div></div>
                      <button className="btn small outlined" data-go="mgr-contract">일정 잡기</button></div>
                    <div className="jobrow">
                      <span className="badge b-gray">예정</span>
                      <div style={{ flex: "1" }}><div className="t-b14 fw7">112동 상가 그리스트랩 — 6개월 주기 도래</div>
                        <div className="t-b12 c-sec">음식점 4곳 · 2027.01 예정</div></div>
                      <button className="btn small ghost">자동 배정됨</button></div>
                  </div>
                </div>
              </div>
      
              <div className="col gap12">
                <div className="panel" style={{ background: "var(--sg-bg-brand-subtle)", boxShadow: "none" }}>
                  <div className="t-b14 fw7" style={{ marginBottom: 6 }}>소장이 바뀌어도 이력은 남습니다</div>
                  <p className="t-b12 c-sec" style={{ margin: "0" }}>종이 서류와 담당자 기억에 있던 배관 병력이
                    좌표 단위로 보존됩니다. 인수인계 시 계정만 넘기면 됩니다.</p>
                </div>
                <div className="panel">
                  <h3 className="panel__t">이번 달 일정</h3>
                  <div className="col gap10" style={{ gap: 10 }}>
                    <div className="row between"><span className="t-b14">103동 오수관 세정</span><span className="badge b-orange">발주 대기</span></div>
                    <div className="row between"><span className="t-b14">105동 세대 클리닝 공동구매</span><span className="badge b-brand">모집중 18/24</span></div>
                    <div className="row between"><span className="t-b14">장기수선충당금 집행 보고</span><span className="badge b-gline">11.28</span></div>
                  </div>
                </div>
                <div className="panel">
                  <h3 className="panel__t">세대 공동구매 연계</h3>
                  <p className="t-b12 c-sec" style={{ margin: "-8px 0 12px" }}>공용관 세정 시공팀이 들어간 김에
                    같은 라인 세대를 묶으면 입주민 부담이 내려갑니다.</p>
                  <div className="row between" style={{ marginBottom: 8 }}>
                    <span className="t-b12 c-sec">105동 참여</span><span className="t-b14 fw7 num">18 / 24세대</span></div>
                  <div className="gauge" style={{ marginBottom: 12 }}><i style={{ width: "75%" }} /></div>
                  <button className="btn small outlined block" data-done="✓ 발송 완료" data-toast="105동 게시판·앱 알림으로 공지가 발송되었습니다">관리사무소 공지 발송</button>
                </div>
              </div>
            </div>
    </BackofficeShell>
  );
}
