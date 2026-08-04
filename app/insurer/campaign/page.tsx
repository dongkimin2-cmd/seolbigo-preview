// 자동 이식된 목업 화면 p-ins-campaign — 원본: seolbigo-preview/index.html (백오피스)
// 헤더·내브는 BackofficeShell 공용 (실제 <Link> 라우팅) — 2026-08-04
// 데이터 기반 전환 (2026-08-04) — KPI·세그먼트·캠페인·쿠폰 단가를 lib/ins-data 로 추출.
// 상호작용은 '캠페인 만들기' 토스트뿐이라 서버 컴포넌트 유지 + ToastButton 만 클라이언트.
import BackofficeShell from '../../../components/BackofficeShell';
import ToastButton from '../../../components/ins/ToastButton';
import { CAMP_KPIS, CAMP_SEGMENTS, CAMP_CAMPAIGNS, CAMP_COUPONS } from '../../../lib/ins-data';

export default function Page() {
  return (
    <BackofficeShell persona="ins" id="p-ins-campaign">

            <div className="row between" style={{ marginBottom: 20, alignItems: "flex-start" }}>
              <div><h1 className="t-h24" style={{ margin: "0" }}>예방 쿠폰 캠페인</h1>
                <p className="t-b14 c-sec" style={{ margin: "4px 0 0" }}>사고가 나기 전에 막는 것이 가장 싼 보상입니다. 고위험 가입자에게 점검·클리닝 쿠폰을 배포합니다.</p></div>
              <ToastButton className="btn medium primary" message="데모에서는 캠페인 생성이 생략됩니다">＋ 캠페인 만들기</ToastButton>
            </div>

            <div className="grid g4" style={{ gap: 12, marginBottom: 16 }}>
              {CAMP_KPIS.map(k => (
                <div key={k.label} className="panel"
                  style={k.subtleBg ? { background: `var(--sg-bg-${k.subtleBg}-subtle)`, boxShadow: "none" } : undefined}>
                  <div className="t-b12 c-sec">{k.label}</div>
                  <div className={'t-h24 num' + (k.valueClass ? ' ' + k.valueClass : '')} style={{ margin: "4px 0 2px" }}>{k.value}</div>
                  <div className="t-b12 c-sec">{k.sub}</div>
                </div>
              ))}
            </div>

            <div className="panel" style={{ marginBottom: 16 }}>
              <h3 className="panel__t">고위험 세그먼트</h3>
              <p className="t-b12 c-sec" style={{ margin: "-8px 0 14px" }}>아파트 준공연도 · 배관 재질 · 난방 방식 · 과거 청구 이력을 결합해 산출합니다.
                설비고에 축적된 실제 하자·세정 케이스가 가중치를 보정합니다.</p>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <tbody><tr><th style={{ textAlign: "left", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>세그먼트</th>
                  <th style={{ textAlign: "right", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>가입자</th>
                  <th style={{ textAlign: "right", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>연 청구율</th>
                  <th style={{ textAlign: "left", padding: "9px 0 9px 16px", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600", width: 160 }}>위험도</th>
                  <th style={{ textAlign: "right", padding: "9px 0", borderBottom: "1px solid var(--sg-border-default)", color: "var(--sg-text-secondary)", fontWeight: "600" }}>권장 조치</th></tr>
                {CAMP_SEGMENTS.map((s, i) => {
                  // 마지막 행은 하단 경계선 없음 (원본 목업과 동일)
                  const bd = i < CAMP_SEGMENTS.length - 1 ? { borderBottom: "1px solid var(--sg-border-subtle)" } : {};
                  return (
                    <tr key={s.label}><td style={{ padding: "13px 0", ...bd }}>{s.label}</td>
                      <td className="num" style={{ textAlign: "right", ...bd }}>{s.subscribers}</td>
                      <td className="num fw7" style={{ textAlign: "right", ...bd, ...(s.rateTone ? { color: `var(--sg-text-${s.rateTone})` } : {}) }}>{s.rate}</td>
                      <td style={{ paddingLeft: 16, ...bd }}>
                        <div className="posbar"><i style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: s.barWidth, borderRadius: 999, background: `var(--sg-bg-${s.barBg})` }} /></div></td>
                      <td style={{ textAlign: "right", ...bd }}><span className={'badge ' + s.actionTone}>{s.action}</span></td></tr>
                  );
                })}
              </tbody></table>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 340px", gap: 16, alignItems: "start" }}>
              <div className="panel">
                <h3 className="panel__t">진행 중인 캠페인</h3>
                <div className="col gap12" style={{ marginTop: 14 }}>
                  {CAMP_CAMPAIGNS.map(c => (
                    <div key={c.title} className="jobrow" style={c.ended ? { alignItems: "flex-start", opacity: ".6" } : { alignItems: "flex-start" }}>
                      <span style={{ fontSize: 22 }}>{c.emoji}</span>
                      <div style={{ flex: "1" }}>
                        <div className="row gap4" style={{ marginBottom: 4 }}>
                          <span className="t-b14 fw7">{c.title}</span>
                          <span className={'badge ' + c.badgeTone}>{c.badge}</span></div>
                        <div className="t-b12 c-sec" style={{ marginBottom: 8 }}>{c.desc}</div>
                        <div className="row gap16" style={{ flexWrap: "wrap" }}>
                          {c.stats.map(s => (
                            <span key={s.label} className="t-b12 c-sec">{s.label} <b className={'num' + (s.suc ? ' c-suc' : '')}>{s.value}</b></span>
                          ))}</div>
                      </div>
                      <button className={'btn small ' + c.btn}>리포트</button></div>
                  ))}
                </div>
              </div>

              <div className="col gap12">
                <div className="panel" style={{ background: "var(--sg-bg-info-subtle)", boxShadow: "none" }}>
                  <div className="t-b14 fw7" style={{ marginBottom: 6 }}>해외 검증 사례</div>
                  <p className="t-b12 c-sec" style={{ margin: "0 0 10px" }}>영국 Ondo InsurTech의 <b>LeakBot</b>은 보험사가 누수 감지기를
                    가입자에게 배포하고 기기당 월 구독료를 내는 구조로 <b>보험사 ROI 188%</b>를 실증하며
                    15.1만 대를 보급했습니다.</p>
                  <p className="t-b12 c-sec" style={{ margin: "0" }}>설비고는 센서 이전에 <b>사람의 손(세정·점검)</b>으로 같은 예방 가치를
                    먼저 증명하고, 중기적으로 IoT 감지기 배포를 얹습니다.</p>
                </div>
                <div className="panel">
                  <h3 className="panel__t">쿠폰 단가</h3>
                  <div className="col gap8">
                    {CAMP_COUPONS.map(cp => (
                      <div key={cp.label} className="row between"><span className="t-b14 c-sec">{cp.label}</span><span className="t-b14 fw6 num">{cp.price}</span></div>
                    ))}
                  </div>
                  <hr className="hair" style={{ margin: "14px 0" }} />
                  <div className="row between"><span className="t-b14 c-sec">건당 평균 누수 지급액</span>
                    <span className="t-b14 fw7 num">571,000원</span></div>
                  <p className="t-b12 c-sec" style={{ margin: "10px 0 0" }}>쿠폰 6장이 사고 1건을 막으면 손익분기입니다.
                    현재 실측 전환은 <b className="c-suc">쿠폰 26장당 1건</b> 예방입니다.</p>
                </div>
              </div>
            </div>
    </BackofficeShell>
  );
}
