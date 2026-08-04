// 자동 이식된 목업 화면 p-pro-inbox — 원본: seolbigo-preview/index.html (백오피스)
// 헤더·내브는 BackofficeShell 공용 (실제 <Link> 라우팅) — 2026-08-04
import BackofficeShell from '../../../components/BackofficeShell';

export default function Page() {
  return (
    <BackofficeShell persona="pro" id="p-pro-inbox">

            <h1 className="t-h24" style={{ margin: "0 0 4px" }}>요청 인박스</h1>
            <p className="t-b14 c-sec" style={{ margin: "0 0 20px" }}>내 서비스 지역·업종에 맞는 요청만 들어옵니다. 크레딧을 쓰지 않습니다.</p>
      
            <div className="panel" style={{ padding: "14px 18px", marginBottom: 16 }}>
              <div className="row gap6" style={{ flexWrap: "wrap" }}>
                <button className="chip sm" aria-pressed="true">전체 4</button>
                <button className="chip sm">사진 진단 2</button>
                <button className="chip sm">즉시 견적 1</button>
                <button className="chip sm">실측 요청 1</button>
                <div style={{ flex: "1" }} />
                <select className="inp" style={{ width: "auto", height: 34, padding: "0 34px 0 12px", fontSize: 13 }}>
                  <option>마감 임박순</option><option>금액 높은순</option><option>거리순</option></select>
              </div>
            </div>
      
            <div className="col gap12">
              <div className="panel" style={{ padding: 20 }}>
                <div className="row between" style={{ marginBottom: 12 }}>
                  <div className="row gap4"><span className="badge b-red">긴급</span>
                    <span className="badge b-brand">사진 진단 완료</span>
                    <span className="badge b-gline">청솔 103동 · 1999년 · 12층</span></div>
                  <span className="t-b12" style={{ color: "var(--sg-text-danger)" }}>마감 6시간 전</span></div>
                <div style={{ display: "grid", gridTemplateColumns: "120px minmax(0,1fr) 200px", gap: 18, alignItems: "start" }}>
                  <div className="ph wet" style={{ aspectRatio: "1/1", borderRadius: 10 }} />
                  <div>
                    <div className="t-h18" style={{ marginBottom: 4 }}>안방 천장 누수 — 배관 이음부 추정</div>
                    <div className="t-b14 c-sec" style={{ marginBottom: 10 }}>AI 분류 신뢰도 87% · 전문가 검수 완료 ·
                      윗집 배수관 슬래브 관통부 의심</div>
                    <div className="row gap6" style={{ flexWrap: "wrap" }}>
                      <span className="badge b-gline b12">누수탐지 필요</span>
                      <span className="badge b-gline b12">천장복구 포함 희망</span>
                      <span className="badge b-blue b12">보험 처리 예정</span>
                      <span className="badge b-gline b12">오늘~금요일 방문 희망</span></div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className="t-b12 c-sec">플랫폼 기준가</div>
                    <div className="t-h20 num" style={{ marginBottom: 2 }}>32~58만원</div>
                    <div className="t-b12 c-sec" style={{ marginBottom: 12 }}>중앙값 41만원 · 경쟁 견적 1건</div>
                    <button className="btn medium primary block" data-go="pro-quote">견적 작성</button>
                    <button className="btn small ghost block" style={{ marginTop: 6 }}>이 요청 숨기기</button>
                  </div>
                </div>
              </div>
      
              <div className="panel" style={{ padding: 20 }}>
                <div className="row between" style={{ marginBottom: 12 }}>
                  <div className="row gap4"><span className="badge b-brands">즉시 견적</span>
                    <span className="badge b-gline">개포늘푸른 5동 · 34평</span></div>
                  <span className="t-b12 c-sec">수락 선착순</span></div>
                <div style={{ display: "grid", gridTemplateColumns: "120px minmax(0,1fr) 200px", gap: 18, alignItems: "start" }}>
                  <div className="ph clean" style={{ aspectRatio: "1/1", borderRadius: 10 }} />
                  <div>
                    <div className="t-h18" style={{ marginBottom: 4 }}>수도배관 클리닝 — 확정가 상품</div>
                    <div className="t-b14 c-sec" style={{ marginBottom: 10 }}>규격 상품이라 견적 작성이 없습니다.
                      수락하면 바로 배정되고 금액이 확정됩니다.</div>
                    <div className="row gap6"><span className="badge b-gline b12">화장실 2개</span>
                      <span className="badge b-gline b12">중앙난방</span><span className="badge b-gline b12">11/22 토 13:00</span></div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className="t-b12 c-sec">확정 금액</div>
                    <div className="t-h20 num" style={{ marginBottom: 2 }}>180,000원</div>
                    <div className="t-b12 c-sec" style={{ marginBottom: 12 }}>수수료 차감 후 165,600원</div>
                    <button className="btn medium primary block" data-done="✓ 수락됨" data-toast="요청을 수락했습니다 · 11/22 (토) 13:00 일정이 확정되었습니다">수락하기</button>
                  </div>
                </div>
              </div>
      
              <div className="panel" style={{ padding: 20 }}>
                <div className="row between" style={{ marginBottom: 12 }}>
                  <div className="row gap4"><span className="badge b-blue">실측 요청</span>
                    <span className="badge b-gline">역삼청솔 · 1997년 · 34평</span></div>
                  <span className="t-b12 c-sec">마감 2일 전</span></div>
                <div style={{ display: "grid", gridTemplateColumns: "120px minmax(0,1fr) 200px", gap: 18, alignItems: "start" }}>
                  <div className="ph pipe" style={{ aspectRatio: "1/1", borderRadius: 10 }} />
                  <div>
                    <div className="t-h18" style={{ marginBottom: 4 }}>세대 내 배관 전체 교체 — 무료 실측</div>
                    <div className="t-b14 c-sec" style={{ marginBottom: 10 }}>거주 중 · 도면 첨부됨 · 실측 후 3영업일 내 설계 견적 제출</div>
                    <div className="row gap6"><span className="badge b-gline b12">중앙난방</span>
                      <span className="badge b-gline b12">강관(백관)</span><span className="badge b-green b12">도면 있음</span></div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className="t-b12 c-sec">유사 단지 실적</div>
                    <div className="t-h20 num" style={{ marginBottom: 2 }}>180~420만원</div>
                    <div className="t-b12 c-sec" style={{ marginBottom: 12 }}>실측 후 확정</div>
                    <button className="btn medium primary block" data-done="✓ 신청 완료" data-toast="실측 방문을 신청했습니다 · 고객 확인 후 일정이 확정됩니다">실측 방문 신청</button>
                  </div>
                </div>
              </div>
            </div>
    </BackofficeShell>
  );
}
