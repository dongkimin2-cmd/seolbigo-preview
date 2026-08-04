// 자동 이식된 목업 화면 p-pro-film — 원본: seolbigo-preview/index.html (백오피스)
// 헤더·내브는 BackofficeShell 공용 (실제 <Link> 라우팅) — 2026-08-04
import BackofficeShell from '../../../components/BackofficeShell';

export default function Page() {
  return (
    <BackofficeShell persona="pro" id="p-pro-film">

            <div className="row between" style={{ marginBottom: 20, alignItems: "flex-start" }}>
              <div><h1 className="t-h24" style={{ margin: "0" }}>필모그래피</h1>
                <p className="t-b14 c-sec" style={{ margin: "4px 0 0" }}>사진만 올리면 포트폴리오와 후기 페이지가 자동으로 만들어집니다. 따로 관리할 게 없습니다.</p></div>
              <button className="btn medium primary" data-toast="사진을 올리면 메타데이터 검증 후 자동 공개됩니다 · 데모에서는 업로드가 생략됩니다">＋ 시공 사진 등록</button>
            </div>
      
            <div className="panel" style={{ background: "var(--sg-bg-brand-subtle)", boxShadow: "none", marginBottom: 16 }}>
              <div className="row gap16" style={{ flexWrap: "wrap", alignItems: "center" }}>
                <div style={{ flex: "1", minWidth: 280 }}>
                  <div className="t-b16 fw7" style={{ marginBottom: 4 }}>광고비 0원으로 84건의 실적이 증명되고 있습니다</div>
                  <p className="t-b14 c-sec" style={{ margin: "0" }}>포털 광고와 매칭앱 크레딧을 끊은 뒤 6개월간
                    절감한 금액은 <b className="c-brand num">720만원</b>입니다. 그 사이 수주는 18% 늘었습니다.</p>
                </div>
                <div className="row gap20" style={{ gap: 20 }}>
                  <div style={{ textAlign: "center" }}><div className="t-h24 num c-brand">84</div>
                    <div className="t-b12 c-sec">검증 완료</div></div>
                  <div style={{ textAlign: "center" }}><div className="t-h24 num">3</div>
                    <div className="t-b12 c-sec">검증 대기</div></div>
                  <div style={{ textAlign: "center" }}><div className="t-h24 num c-suc">100%</div>
                    <div className="t-b12 c-sec">검증 통과율</div></div>
                </div>
              </div>
            </div>
      
            <div className="panel" style={{ marginBottom: 16 }}>
              <h3 className="panel__t">검증 대기 중</h3>
              <p className="t-b12 c-sec" style={{ margin: "-8px 0 14px" }}>촬영 시각·위치 메타데이터를 시공 일정과 대조합니다.
                통과하면 자동으로 공개 포트폴리오에 올라갑니다.</p>
              <div className="col gap8">
                <div className="jobrow">
                  <div className="ph wet" style={{ width: 56, height: 56, flex: "0 0 56px", borderRadius: 8 }} />
                  <div style={{ flex: "1" }}><div className="t-b14 fw7">배관 이음부 보수 + 천장 복구 · 청솔 1204호</div>
                    <div className="t-b12 c-sec">Before 2매 · After 2매 · 2026.11.19 촬영</div></div>
                  <div className="row gap6"><span className="verified">✓ 시각 일치</span><span className="verified">✓ 위치 일치</span>
                    <span className="badge b-orange">검수중</span></div></div>
                <div className="jobrow">
                  <div className="ph clean" style={{ width: 56, height: 56, flex: "0 0 56px", borderRadius: 8 }} />
                  <div style={{ flex: "1" }}><div className="t-b14 fw7">난방배관 클리닝 · 개포늘푸른 902호</div>
                    <div className="t-b12 c-sec">Before 1매 · After 1매 · 2026.11.18 촬영</div></div>
                  <div className="row gap6"><span className="verified">✓ 시각 일치</span>
                    <span className="badge b-red">위치 불일치</span>
                    <button className="btn tiny outlined">소명하기</button></div></div>
              </div>
            </div>
      
            <div className="panel">
              <div className="row between" style={{ marginBottom: 14 }}>
                <h3 className="panel__t" style={{ margin: "0" }}>공개 포트폴리오 84건</h3>
                <div className="row gap6"><button className="chip sm" aria-pressed="true">전체</button>
                  <button className="chip sm">누수 41</button><button className="chip sm">세정 22</button>
                  <button className="chip sm">클리닝 21</button></div></div>
              <div className="grid g4" style={{ gap: 12 }}>
                <div className="ba" style={{ aspectRatio: "1/1", "--x": "50%" }}><div className="ba__l ph wet" /><div className="ba__r ph clean" /><div className="ba__hd" /></div>
                <div className="ba" style={{ aspectRatio: "1/1", "--x": "50%" }}><div className="ba__l ph pipe" /><div className="ba__r ph clean" /><div className="ba__hd" /></div>
                <div className="ba" style={{ aspectRatio: "1/1", "--x": "50%" }}><div className="ba__l ph wet" /><div className="ba__r ph clean" /><div className="ba__hd" /></div>
                <div className="ba" style={{ aspectRatio: "1/1", "--x": "50%" }}><div className="ba__l ph clean" /><div className="ba__r ph pipe" /><div className="ba__hd" /></div>
              </div>
            </div>
    </BackofficeShell>
  );
}
