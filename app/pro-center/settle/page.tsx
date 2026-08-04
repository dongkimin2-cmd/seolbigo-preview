// 자동 이식된 목업 화면 p-pro-settle — 원본: seolbigo-preview/index.html (백오피스)
// 헤더·내브는 BackofficeShell 공용 (실제 <Link> 라우팅) — 2026-08-04
import BackofficeShell from '../../../components/BackofficeShell';

export default function Page() {
  return (
    <BackofficeShell persona="pro" id="p-pro-settle">

            <h1 className="t-h24" style={{ margin: "0 0 4px" }}>정산</h1>
            <p className="t-b14 c-sec" style={{ margin: "0 0 20px" }}>고객이 완료 승인한 건은 매주 금요일에 지급됩니다.</p>
      
            <div className="grid g4" style={{ gap: 12, marginBottom: 16 }}>
              <div className="panel" style={{ background: "var(--sg-bg-brand-subtle)", boxShadow: "none" }}>
                <div className="t-b12 c-sec">이번 주 지급 예정</div>
                <div className="t-h24 num c-brand" style={{ margin: "4px 0 2px" }}>1,919,800원</div>
                <div className="t-b12 c-sec">11.22 (금) 입금</div></div>
              <div className="panel"><div className="t-b12 c-sec">에스크로 보관중</div>
                <div className="t-h24 num" style={{ margin: "4px 0 2px" }}>690,000원</div>
                <div className="t-b12 c-sec">완료 승인 대기 2건</div></div>
              <div className="panel"><div className="t-b12 c-sec">이번 달 누적 지급</div>
                <div className="t-h24 num" style={{ margin: "4px 0 2px" }}>7,748,400원</div>
                <div className="t-b12 c-suc fw6">지난달 대비 +18%</div></div>
              <div className="panel"><div className="t-b12 c-sec">보증기금 적립</div>
                <div className="t-h24 num" style={{ margin: "4px 0 2px" }}>168,400원</div>
                <div className="t-b12 c-sec">거래액의 2% 적립</div></div>
            </div>
      
            <div className="panel" style={{ marginBottom: 16 }}>
              <div className="row between" style={{ marginBottom: 14 }}>
                <h3 className="panel__t" style={{ margin: "0" }}>정산 내역</h3>
                <select className="inp" style={{ width: "auto", height: 34, padding: "0 34px 0 12px", fontSize: 13 }}>
                  <option>2026년 11월</option><option>2026년 10월</option></select></div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <tbody><tr><th style={{ textAlign: "left", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>완료일</th>
                  <th style={{ textAlign: "left", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>시공</th>
                  <th style={{ textAlign: "right", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>거래액</th>
                  <th style={{ textAlign: "right", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>수수료</th>
                  <th style={{ textAlign: "right", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>보증기금</th>
                  <th style={{ textAlign: "right", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>지급액</th>
                  <th style={{ textAlign: "right", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>상태</th></tr>
                <tr><td className="num" style={{ padding: "12px 0", borderBottom: "1px solid var(--sg-border-subtle)" }}>11.19</td>
                  <td style={{ borderBottom: "1px solid var(--sg-border-subtle)" }}>배관 이음부 보수 · 청솔 1204호</td>
                  <td className="num" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>490,000</td>
                  <td className="num c-sec" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>−39,200</td>
                  <td className="num c-sec" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>−9,800</td>
                  <td className="num fw7" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>441,000</td>
                  <td style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}><span className="badge b-orange">승인 대기</span></td></tr>
                <tr><td className="num" style={{ padding: "12px 0", borderBottom: "1px solid var(--sg-border-subtle)" }}>11.16</td>
                  <td style={{ borderBottom: "1px solid var(--sg-border-subtle)" }}>난방배관 클리닝 · 개포늘푸른 902호</td>
                  <td className="num" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>220,000</td>
                  <td className="num c-sec" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>−17,600</td>
                  <td className="num c-sec" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>−4,400</td>
                  <td className="num fw7" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>198,000</td>
                  <td style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}><span className="badge b-green">지급 예정</span></td></tr>
                <tr><td className="num" style={{ padding: "12px 0", borderBottom: "1px solid var(--sg-border-subtle)" }}>11.14</td>
                  <td style={{ borderBottom: "1px solid var(--sg-border-subtle)" }}>공용 입상관 고압세정 · 역삼청솔 3동</td>
                  <td className="num" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>1,430,000</td>
                  <td className="num c-sec" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>−114,400</td>
                  <td className="num c-sec" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>−28,600</td>
                  <td className="num fw7" style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}>1,287,000</td>
                  <td style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}><span className="badge b-gray">지급 완료</span></td></tr>
                <tr><td className="num" style={{ padding: "12px 0" }}>11.09</td>
                  <td>수도배관 클리닝 · 청솔 806호</td>
                  <td className="num" style={{ textAlign: "right" }}>180,000</td>
                  <td className="num c-sec" style={{ textAlign: "right" }}>−14,400</td>
                  <td className="num c-sec" style={{ textAlign: "right" }}>−3,600</td>
                  <td className="num fw7" style={{ textAlign: "right" }}>162,000</td>
                  <td style={{ textAlign: "right" }}><span className="badge b-gray">지급 완료</span></td></tr>
              </tbody></table>
            </div>
      
            <div className="grid g2" style={{ gap: 16 }}>
              <div className="panel">
                <h3 className="panel__t">SaaS 구독</h3>
                <div className="row between" style={{ marginBottom: 8 }}>
                  <span className="t-b14 c-sec">플랜</span><span className="t-b14 fw6">프로 (필모그래피 무제한)</span></div>
                <div className="row between" style={{ marginBottom: 8 }}>
                  <span className="t-b14 c-sec">월 이용료</span><span className="t-b14 fw6 num">49,000원</span></div>
                <div className="row between"><span className="t-b14 c-sec">다음 결제일</span><span className="t-b14 fw6">2026.12.01</span></div>
                <hr className="hair" style={{ margin: "14px 0" }} />
                <p className="t-b12 c-sec" style={{ margin: "0" }}>견적·일정 도구, 필모그래피 호스팅, 세무 연계 리포트가 포함됩니다.</p>
              </div>
              <div className="panel">
                <h3 className="panel__t">세무 리포트</h3>
                <p className="t-b12 c-sec" style={{ margin: "-8px 0 14px" }}>플랫폼 거래 내역을 부가세 신고 양식으로 내려받을 수 있습니다.</p>
                <div className="col gap8">
                  <button className="btn medium outlined block">2026년 2기 예정신고 자료</button>
                  <button className="btn medium ghost block">전체 거래내역 엑셀 내려받기</button>
                </div>
              </div>
            </div>
    </BackofficeShell>
  );
}
