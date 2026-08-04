// 자동 이식된 목업 화면 p-pro-home — 원본: seolbigo-preview/index.html (백오피스)
// 헤더·내브는 BackofficeShell 공용 (실제 <Link> 라우팅) — 2026-08-04
import BackofficeShell from '../../components/BackofficeShell';

export default function Page() {
  return (
    <BackofficeShell persona="pro" id="p-pro-home">

            <div className="row between" style={{ marginBottom: 20, alignItems: "flex-start" }}>
              <div><h1 className="t-h24" style={{ margin: "0" }}>안녕하세요, 깨끗한집설비님</h1>
                <p className="t-b14 c-sec" style={{ margin: "4px 0 0" }}>2026년 11월 · 오늘 방문 2건이 예정되어 있습니다</p></div>
              <button className="btn medium primary" data-go="pro-inbox">새 요청 4건 확인</button>
            </div>
      
            <div className="grid g4" style={{ gap: 12, marginBottom: 16 }}>
              <div className="panel">
                <div className="t-b12 c-sec">이번 달 수주액</div>
                <div className="t-h24 num" style={{ margin: "4px 0 2px" }}>8,420,000원</div>
                <div className="t-b12 c-suc fw6">지난달 대비 +18%</div></div>
              <div className="panel" style={{ background: "var(--sg-bg-brand-subtle)", boxShadow: "none" }}>
                <div className="t-b12 c-sec">절감한 광고비</div>
                <div className="t-h24 num c-brand" style={{ margin: "4px 0 2px" }}>1,200,000원</div>
                <div className="t-b12 c-sec">포털 광고 · 매칭앱 크레딧 기준</div></div>
              <div className="panel">
                <div className="t-b12 c-sec">검증 필모그래피</div>
                <div className="t-h24 num" style={{ margin: "4px 0 2px" }}>84건</div>
                <div className="t-b12 c-sec">이번 달 +6건 자동 생성</div></div>
              <div className="panel">
                <div className="t-b12 c-sec">재시공률</div>
                <div className="t-h24 num c-suc" style={{ margin: "4px 0 2px" }}>1.2%</div>
                <div className="t-b12 c-sec">업계 평균 4.8%</div></div>
            </div>
      
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 340px", gap: 16, alignItems: "start" }}>
              <div>
                <div className="panel" style={{ marginBottom: 16 }}>
                  <div className="row between" style={{ marginBottom: 14 }}>
                    <h3 className="panel__t" style={{ margin: "0" }}>오늘 일정</h3>
                    <span className="t-b12 c-sec">2026.11.19 (수)</span></div>
                  <div className="col gap8">
                    <div className="jobrow">
                      <span className="badge b-brands">14:00</span>
                      <div style={{ flex: "1" }}><div className="t-b14 fw7">배관 이음부 보수 + 천장 복구</div>
                        <div className="t-b12 c-sec">청솔 103동 1204호 · 490,000원 (추가금 승인 완료)</div></div>
                      <span className="badge b-orange">시공중</span></div>
                    <div className="jobrow">
                      <span className="badge b-gray">17:30</span>
                      <div style={{ flex: "1" }}><div className="t-b14 fw7">난방배관 클리닝</div>
                        <div className="t-b12 c-sec">개포늘푸른 5동 902호 · 220,000원</div></div>
                      <span className="badge b-gline">예정</span></div>
                  </div>
                </div>
      
                <div className="panel">
                  <div className="row between" style={{ marginBottom: 14 }}>
                    <h3 className="panel__t" style={{ margin: "0" }}>새로 들어온 요청</h3>
                    <span className="more" data-go="pro-inbox">전체 보기 ›</span></div>
                  <div className="col gap8">
                    <div className="jobrow" data-go="pro-inbox" style={{ cursor: "pointer" }}>
                      <div className="ph wet" style={{ width: 52, height: 52, flex: "0 0 52px", borderRadius: 8 }} />
                      <div style={{ flex: "1" }}><div className="row gap4" style={{ marginBottom: 2 }}>
                        <span className="badge b-red">긴급</span><span className="badge b-gline">청솔 · 1999년</span></div>
                        <div className="t-b14 fw7">안방 천장 누수 — AI 진단 완료</div>
                        <div className="t-b12 c-sec">기준가 32~58만원 · 경쟁 견적 1건 · 마감 6시간 전</div></div>
                      <button className="btn small primary" data-go="pro-quote">견적 작성</button></div>
                    <div className="jobrow" data-go="pro-inbox" style={{ cursor: "pointer" }}>
                      <div className="ph clean" style={{ width: 52, height: 52, flex: "0 0 52px", borderRadius: 8 }} />
                      <div style={{ flex: "1" }}><div className="row gap4" style={{ marginBottom: 2 }}>
                        <span className="badge b-brand">즉시 견적</span><span className="badge b-gline">34평</span></div>
                        <div className="t-b14 fw7">수도배관 클리닝 — 확정가 상품</div>
                        <div className="t-b12 c-sec">180,000원 · 수락만 하면 배정됩니다</div></div>
                      <button className="btn small outlined" data-done="✓ 수락됨" data-toast="요청을 수락했습니다 · 일정이 배정되었습니다">수락</button></div>
                  </div>
                </div>
              </div>
      
              <div className="col gap12">
                <div className="panel">
                  <h3 className="panel__t">신용등급</h3>
                  <div className="row gap12" style={{ alignItems: "center", marginBottom: 14 }}>
                    <div className="ring" style={{ width: 76, height: 76, flex: "0 0 76px" }}>
                      <svg width="76" height="76"><circle cx="38" cy="38" r="31" fill="none" stroke="#EFF1F5" strokeWidth={10} />
                        <circle cx="38" cy="38" r="31" fill="none" stroke="#693BF2" strokeWidth={10} strokeLinecap="round" strokeDasharray="195" strokeDashoffset={27} /></svg>
                      <div className="ring__t"><div className="t-h18 num">86</div></div></div>
                    <div><div className="t-b16 fw7 c-brand">플래티넘</div>
                      <div className="t-b12 c-sec">상위 8% · 검색 노출 1순위</div></div>
                  </div>
                  <button className="btn small outlined block" data-go="pro-grade">등급 산정 근거 보기</button>
                </div>
                <div className="panel">
                  <h3 className="panel__t">이번 주 정산</h3>
                  <div className="col gap8" style={{ marginBottom: 12 }}>
                    <div className="row between"><span className="t-b14 c-sec">완료 거래액</span><span className="t-b14 num">2,140,000</span></div>
                    <div className="row between"><span className="t-b14 c-sec">중개 수수료 8%</span><span className="t-b14 num c-sec">−171,200</span></div>
                    <div className="row between"><span className="t-b14 c-sec">SaaS 구독료</span><span className="t-b14 num c-sec">−49,000</span></div>
                  </div>
                  <hr className="hair" style={{ margin: "0 0 12px" }} />
                  <div className="row between"><span className="t-b14 fw7">지급 예정</span>
                    <span className="t-h18 num c-brand">1,919,800원</span></div>
                  <div className="t-b12 c-ter" style={{ marginTop: 6 }}>11.22 (금) 입금 예정</div>
                </div>
              </div>
            </div>
    </BackofficeShell>
  );
}
