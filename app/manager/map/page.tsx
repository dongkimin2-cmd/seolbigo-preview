// 자동 이식된 목업 화면 p-mgr-map — 원본: seolbigo-preview/index.html (백오피스)
// 헤더·내브는 BackofficeShell 공용 (실제 <Link> 라우팅) — 2026-08-04
// 데이터 기반 전환 (2026-08-04) — 필터·범례·타임라인·통계를 lib/mgr-data.ts 에서 렌더
import RiserGrid from '../../../components/RiserGrid';
import BackofficeShell from '../../../components/BackofficeShell';
import MapFilterChips from '../../../components/mgr/MapFilterChips';
import ToastButton from '../../../components/mgr/ToastButton';
import { MGR_MAP_DONGS, MGR_MAP_LEGEND, MGR_MAP_TIMELINE, MGR_DONG103_STATS } from '../../../lib/mgr-data';

export default function Page() {
  return (
    <BackofficeShell persona="mgr" id="p-mgr-map">

            <div className="row between" style={{ marginBottom: 16, alignItems: "flex-start" }}>
              <div><h1 className="t-h24" style={{ margin: "0" }}>디지털 이력 지도 — 103동</h1>
                <p className="t-b14 c-sec" style={{ margin: "4px 0 0" }}>입상관 계통도 위에 수리·세정·교체 이력이 좌표 단위로 쌓입니다. 셀을 클릭해 보세요.</p></div>
              <div className="row gap8">
                <select className="inp" style={{ width: "auto", height: 38, padding: "0 34px 0 12px", fontSize: 14 }}>
                  {MGR_MAP_DONGS.map(d => <option key={d}>{d}</option>)}</select>
                <ToastButton className="btn medium outlined" msg="데모에서는 PDF 다운로드가 생략됩니다">PDF 내려받기</ToastButton></div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 360px", gap: 16, alignItems: "start" }}>
              <div className="panel">
                <MapFilterChips />
                <div className="riserwrap">
                  <div className="riserhd">
                    <span /><span>1라인</span><span>2라인</span><span>3라인</span><span>4라인</span></div>
                  <RiserGrid />
                </div>
                <div className="row gap16" style={{ marginTop: 16, flexWrap: "wrap" }}>
                  {MGR_MAP_LEGEND.map(l => (
                    <span key={l.label} className="t-b12 c-sec"><i className="lg" style={{ background: l.color }} />{l.label}</span>
                  ))}
                </div>
              </div>

              <div className="col gap12" style={{ position: "sticky", top: 88 }}>
                <div className="panel">
                  <div className="row between" style={{ marginBottom: 12 }}>
                    <h3 className="panel__t" style={{ margin: "0" }}>1204호 · 3라인 12층</h3>
                    <span className="badge b-red">반복 하자</span></div>
                  <div className="tl" style={{ paddingLeft: 24 }}>
                    {MGR_MAP_TIMELINE.map((t, i) => (
                      <div key={t.title} className="tl__i done" style={{ paddingBottom: i === MGR_MAP_TIMELINE.length - 1 ? "0" : 16 }}>
                        <div className="t-b14 fw7">{t.title}</div>
                        <div className="t-b12 c-sec">{t.meta}</div>
                        {t.badges && <div className="row gap4" style={{ marginTop: 4 }}>{t.badges.map(b => (
                          <span key={b.label} className={'badge b-' + b.tone}>{b.label}</span>
                        ))}</div>}</div>
                    ))}
                  </div>
                  <hr className="hair" style={{ margin: "16px 0" }} />
                  <div className="callout warn" style={{ padding: 12 }}>
                    <span className="c-dan" style={{ flex: "0 0 20px" }}>!</span>
                    <p className="t-b12" style={{ margin: "0" }}><b>2년 내 같은 부위 2회 누수.</b>
                      슬래브 관통부 구조적 결함 가능성이 있어 정밀 진단을 권장합니다.</p>
                  </div>
                </div>
                <div className="panel">
                  <h3 className="panel__t">103동 통계</h3>
                  <div className="col gap8">
                    {MGR_DONG103_STATS.map(s => (
                      <div key={s.label} className="row between"><span className="t-b14 c-sec">{s.label}</span>
                        {s.danger
                          ? <span className="t-b14 fw6" style={{ color: "var(--sg-text-danger)" }}>{s.value}</span>
                          : <span className={'t-b14 fw6' + (s.num ? ' num' : '')}>{s.value}</span>}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
    </BackofficeShell>
  );
}
