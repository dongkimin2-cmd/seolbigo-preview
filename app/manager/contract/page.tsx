// 자동 이식된 목업 화면 p-mgr-contract — 원본: seolbigo-preview/index.html (백오피스)
// 헤더·내브는 BackofficeShell 공용 (실제 <Link> 라우팅) — 2026-08-04
import BackofficeShell from '../../../components/BackofficeShell';

export default function Page() {
  return (
    <BackofficeShell persona="mgr" id="p-mgr-contract">

            <h1 className="t-h24" style={{ margin: "0 0 4px" }}>정기 세정 계약</h1>
            <p className="t-b14 c-sec" style={{ margin: "0 0 20px" }}>건물별 오염 속도로 산출된 주기에 맞춰 일정이 자동 배정됩니다. 장기수선계획·관리비 예산 주기와 연동됩니다.</p>
      
            <div className="grid g4" style={{ gap: 12, marginBottom: 16 }}>
              <div className="panel"><div className="t-b12 c-sec">계약중인 동</div>
                <div className="t-h24 num" style={{ margin: "4px 0 2px" }}>14 / 21</div>
                <div className="t-b12 c-sec">미계약 7개동</div></div>
              <div className="panel"><div className="t-b12 c-sec">연간 계약금액</div>
                <div className="t-h24 num" style={{ margin: "4px 0 2px" }}>1,860만원</div>
                <div className="t-b12 c-sec">수선유지비 집행</div></div>
              <div className="panel" style={{ background: "var(--sg-bg-warning-subtle)", boxShadow: "none" }}>
                <div className="t-b12 c-sec">주기 초과</div>
                <div className="t-h24 num" style={{ margin: "4px 0 2px", color: "var(--sg-text-warning)" }}>6개 라인</div>
                <div className="t-b12 c-sec">발주 필요</div></div>
              <div className="panel"><div className="t-b12 c-sec">다음 시공</div>
                <div className="t-h24 num" style={{ margin: "4px 0 2px" }}>D-9</div>
                <div className="t-b12 c-sec">105동 · 11.28</div></div>
            </div>
      
            <div className="panel" style={{ marginBottom: 16 }}>
              <h3 className="panel__t">기준 주기</h3>
              <p className="t-b12 c-sec" style={{ margin: "-8px 0 14px" }}>설비고 표준 주기를 기본값으로 쓰되,
                오염도 조사 결과가 있으면 그 건물의 실측 주기로 자동 대체됩니다.</p>
              <div className="grid g3" style={{ gap: 12 }}>
                <div className="tier"><div><div className="t-b14 fw7">음식점 라인</div>
                  <div className="t-b12 c-sec">그리스트랩 포함</div></div><span className="t-b16 fw7">6개월</span></div>
                <div className="tier on"><div><div className="t-b14 fw7">노후 단지 (25년↑)</div>
                  <div className="t-b12 c-sec">우리 단지 적용중</div></div><span className="t-b16 fw7 c-brand">1년</span></div>
                <div className="tier"><div><div className="t-b14 fw7">일반 단지</div>
                  <div className="t-b12 c-sec">준공 25년 미만</div></div><span className="t-b16 fw7">2년</span></div>
              </div>
            </div>
      
            <div className="panel">
              <div className="row between" style={{ marginBottom: 14 }}>
                <h3 className="panel__t" style={{ margin: "0" }}>동별 계약 · 일정</h3>
                <div className="row gap6"><button className="chip sm" aria-pressed="true">전체 21</button>
                  <button className="chip sm">계약중 14</button><button className="chip sm">주기 초과 6</button></div></div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <tbody><tr><th style={{ textAlign: "left", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>동</th>
                  <th style={{ textAlign: "left", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>대상</th>
                  <th style={{ textAlign: "left", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>직전 시공</th>
                  <th style={{ textAlign: "left", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>산출 주기</th>
                  <th style={{ textAlign: "left", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>다음 예정</th>
                  <th style={{ textAlign: "right", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>상태</th></tr>
                <tr><td style={{ padding: "12px 0", borderBottom: "1px solid var(--sg-border-subtle)" }}><b>103동</b></td>
                  <td style={{ borderBottom: "1px solid var(--sg-border-subtle)" }}>오수관 4라인</td>
                  <td className="num c-sec" style={{ borderBottom: "1px solid var(--sg-border-subtle)" }}>기록 없음</td>
                  <td style={{ borderBottom: "1px solid var(--sg-border-subtle)" }}><b className="c-brand">10개월</b> <span className="t-b12 c-sec">(실측)</span></td>
                  <td className="num" style={{ borderBottom: "1px solid var(--sg-border-subtle)" }}>즉시</td>
                  <td style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}><span className="badge b-red">발주 필요</span></td></tr>
                <tr><td style={{ padding: "12px 0", borderBottom: "1px solid var(--sg-border-subtle)" }}><b>105동</b></td>
                  <td style={{ borderBottom: "1px solid var(--sg-border-subtle)" }}>입상관 4라인</td>
                  <td className="num c-sec" style={{ borderBottom: "1px solid var(--sg-border-subtle)" }}>2025.11.28</td>
                  <td style={{ borderBottom: "1px solid var(--sg-border-subtle)" }}>1년 <span className="t-b12 c-sec">(표준)</span></td>
                  <td className="num" style={{ borderBottom: "1px solid var(--sg-border-subtle)" }}>2026.11.28</td>
                  <td style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}><span className="badge b-brand">D-9</span></td></tr>
                <tr><td style={{ padding: "12px 0", borderBottom: "1px solid var(--sg-border-subtle)" }}><b>107동</b></td>
                  <td style={{ borderBottom: "1px solid var(--sg-border-subtle)" }}>입상관 4라인</td>
                  <td className="num c-sec" style={{ borderBottom: "1px solid var(--sg-border-subtle)" }}>2024.03.12</td>
                  <td style={{ borderBottom: "1px solid var(--sg-border-subtle)" }}>1년 <span className="t-b12 c-sec">(표준)</span></td>
                  <td className="num" style={{ borderBottom: "1px solid var(--sg-border-subtle)" }}>2025.03 초과</td>
                  <td style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}><span className="badge b-orange">8개월 초과</span></td></tr>
                <tr><td style={{ padding: "12px 0", borderBottom: "1px solid var(--sg-border-subtle)" }}><b>112동</b></td>
                  <td style={{ borderBottom: "1px solid var(--sg-border-subtle)" }}>그리스트랩 (음식점 4)</td>
                  <td className="num c-sec" style={{ borderBottom: "1px solid var(--sg-border-subtle)" }}>2026.07.05</td>
                  <td style={{ borderBottom: "1px solid var(--sg-border-subtle)" }}>6개월 <span className="t-b12 c-sec">(표준)</span></td>
                  <td className="num" style={{ borderBottom: "1px solid var(--sg-border-subtle)" }}>2027.01.05</td>
                  <td style={{ textAlign: "right", borderBottom: "1px solid var(--sg-border-subtle)" }}><span className="badge b-green">자동 배정</span></td></tr>
                <tr><td style={{ padding: "12px 0" }}><b>115동</b></td>
                  <td>입상관 4라인</td><td className="num c-sec">2026.09.02</td>
                  <td>1년 <span className="t-b12 c-sec">(표준)</span></td><td className="num">2027.09.02</td>
                  <td style={{ textAlign: "right" }}><span className="badge b-green">정상</span></td></tr>
              </tbody></table>
            </div>
    </BackofficeShell>
  );
}
