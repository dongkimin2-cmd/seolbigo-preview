// 자동 이식된 목업 화면 p-mgr-report — 원본: seolbigo-preview/index.html (백오피스)
// 헤더·내브는 BackofficeShell 공용 (실제 <Link> 라우팅) — 2026-08-04
// 데이터 기반 전환 (2026-08-04) — 라인별 오염도·촬영 기록·권장 조치를 lib/mgr-data.ts 에서 렌더
import Link from 'next/link';
import BackofficeShell from '../../../components/BackofficeShell';
import { GO_ROUTES } from '../../../lib/routes';
import { MGR_REPORT_LINES, MGR_REPORT_PHOTOS, MGR_REPORT_ACTIONS } from '../../../lib/mgr-data';

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
                    {MGR_REPORT_LINES.map(l => (
                      <div key={l.name}><div className="row between t-b14" style={{ marginBottom: 6 }}>
                          <span className="fw6">{l.name}</span>
                          <span className={'fw7 num' + (l.tone === 'success' ? ' c-suc' : '')}
                            style={l.tone === 'success' ? undefined : { color: `var(--sg-text-${l.tone})` }}>{l.score}</span></div>
                        <div className="posbar"><i style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: `${l.score}%`, borderRadius: 999, background: `var(--sg-bg-${l.tone})` }} /></div></div>
                    ))}
                  </div>
                </div>

                <div className="panel" style={{ marginBottom: "0" }}>
                  <h3 className="panel__t">내시경 촬영 기록</h3>
                  <p className="t-b12 c-sec" style={{ margin: "-8px 0 14px" }}>촬영 구간별 원본 영상은 단지 계정에 영구 보관됩니다.</p>
                  <div className="grid g4" style={{ gap: 12 }}>
                    {MGR_REPORT_PHOTOS.map(p => (
                      <div key={p.caption}><div className={'ph ' + p.tone} style={{ aspectRatio: "4/3", borderRadius: 8 }} />
                        <div className="t-b12 c-sec" style={{ marginTop: 6 }}>{p.caption}</div></div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col gap12" style={{ position: "sticky", top: 88 }}>
                <div className="panel">
                  <h3 className="panel__t">권장 조치</h3>
                  <div className="col gap8" style={{ marginBottom: 14 }}>
                    {MGR_REPORT_ACTIONS.map(a => (
                      <div key={a.label} className="row between"><span className="t-b14 c-sec">{a.label}</span><span className={'t-b14 fw6' + (a.num ? ' num' : '')}>{a.value}</span></div>
                    ))}
                  </div>
                  <hr className="hair" style={{ margin: "0 0 14px" }} />
                  <div className="callout" style={{ padding: 12, marginBottom: 14 }}>
                    <p className="t-b12 c-sec" style={{ margin: "0" }}>부가세 제외 500만원 이하이므로 <b>경쟁입찰 의무 대상이 아닙니다</b>
                      (선정지침 제4조제3항 · 별표 2). 수의계약 근거 자료가 자동 첨부됩니다.</p></div>
                  <Link href={GO_ROUTES['mgr-contract']} className="btn large primary block">세정 발주하기</Link>
                  <Link href={GO_ROUTES['mgr-brief']} className="btn medium outlined block" style={{ marginTop: 8 }}>입대의 보고자료로</Link>
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
