// 자동 이식된 목업 화면 p-mgr-home — 원본: seolbigo-preview/index.html (백오피스)
// 헤더·내브는 BackofficeShell 공용 (실제 <Link> 라우팅) — 2026-08-04
// 데이터 기반 전환 (2026-08-04) — KPI·조치 항목·일정·범례를 lib/mgr-data.ts 에서 렌더
import Link from 'next/link';
import DongGrid from '../../components/DongGrid';
import BackofficeShell from '../../components/BackofficeShell';
import DoneToastButton from '../../components/mgr/DoneToastButton';
import { GO_ROUTES } from '../../lib/routes';
import { MGR_HOME_KPIS, MGR_DONG_LEGEND, MGR_ACTIONS, MGR_MONTH_SCHEDULE } from '../../lib/mgr-data';

export default function Page() {
  return (
    <BackofficeShell persona="mgr" id="p-mgr-home">

            <div className="row between" style={{ marginBottom: 20, alignItems: "flex-start" }}>
              <div><h1 className="t-h24" style={{ margin: "0" }}>청솔아파트 배관 현황</h1>
                <p className="t-b14 c-sec" style={{ margin: "4px 0 0" }}>준공 1999년 · 27년차 · 21개동 1,240세대 · 중앙난방</p></div>
              <div className="row gap8">
                <Link href={GO_ROUTES['mgr-brief']} className="btn medium outlined">입대의 보고자료 생성</Link>
                <Link href={GO_ROUTES['mgr-map']} className="btn medium primary">이력 지도 열기</Link></div>
            </div>

            <div className="grid g4" style={{ gap: 12, marginBottom: 16 }}>
              {MGR_HOME_KPIS.map(k => (
                <div key={k.label} className="panel" style={k.warn ? { background: "var(--sg-bg-warning-subtle)", boxShadow: "none" } : undefined}>
                  <div className="t-b12 c-sec">{k.label}</div>
                  <div className={'t-h24 num' + (k.valueBrand ? ' c-brand' : '')}
                    style={k.warn ? { margin: "4px 0 2px", color: "var(--sg-text-warning)" } : { margin: "4px 0 2px" }}>{k.value}</div>
                  <div className={k.subSuccess ? 't-b12 c-suc fw6' : 't-b12 c-sec'}>{k.sub}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 340px", gap: 16, alignItems: "start" }}>
              <div>
                <div className="panel" style={{ marginBottom: 16 }}>
                  <div className="row between" style={{ marginBottom: 14 }}>
                    <h3 className="panel__t" style={{ margin: "0" }}>동별 배관 위험도</h3>
                    <span className="t-b12 c-sec">오염도 · 연식 · 하자 이력 종합</span></div>
                  <DongGrid />
                  <div className="row gap16" style={{ marginTop: 14, flexWrap: "wrap" }}>
                    {MGR_DONG_LEGEND.map(l => (
                      <span key={l.label} className="t-b12 c-sec"><i className="lg" style={{ background: l.color }} />{l.label}</span>
                    ))}
                  </div>
                </div>

                <div className="panel">
                  <div className="row between" style={{ marginBottom: 14 }}>
                    <h3 className="panel__t" style={{ margin: "0" }}>조치가 필요한 항목</h3>
                    <Link href={GO_ROUTES['mgr-report']} className="more">리포트 보기 ›</Link></div>
                  <div className="col gap8">
                    {MGR_ACTIONS.map(a => (
                      <div key={a.title} className="jobrow">
                        <span className={'badge b-' + a.badge.tone}>{a.badge.label}</span>
                        <div style={{ flex: "1" }}><div className="t-b14 fw7">{a.title}</div>
                          <div className="t-b12 c-sec">{a.desc}</div></div>
                        {a.action.go
                          ? <Link href={GO_ROUTES[a.action.go]} className={'btn small ' + a.action.kind}>{a.action.label}</Link>
                          : <button className={'btn small ' + a.action.kind}>{a.action.label}</button>}</div>
                    ))}
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
                    {MGR_MONTH_SCHEDULE.map(s => (
                      <div key={s.title} className="row between"><span className="t-b14">{s.title}</span><span className={'badge b-' + s.badge.tone}>{s.badge.label}</span></div>
                    ))}
                  </div>
                </div>
                <div className="panel">
                  <h3 className="panel__t">세대 공동구매 연계</h3>
                  <p className="t-b12 c-sec" style={{ margin: "-8px 0 12px" }}>공용관 세정 시공팀이 들어간 김에
                    같은 라인 세대를 묶으면 입주민 부담이 내려갑니다.</p>
                  <div className="row between" style={{ marginBottom: 8 }}>
                    <span className="t-b12 c-sec">105동 참여</span><span className="t-b14 fw7 num">18 / 24세대</span></div>
                  <div className="gauge" style={{ marginBottom: 12 }}><i style={{ width: "75%" }} /></div>
                  <DoneToastButton className="btn small outlined block" doneLabel="✓ 발송 완료"
                    msg="105동 게시판·앱 알림으로 공지가 발송되었습니다">관리사무소 공지 발송</DoneToastButton>
                </div>
              </div>
            </div>
    </BackofficeShell>
  );
}
