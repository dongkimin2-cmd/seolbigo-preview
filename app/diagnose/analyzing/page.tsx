'use client';
import { Ic } from '../../../components/icons';
import { useDiagAnimation } from '../../../components/useDiagAnimation';

// 자동 이식된 목업 화면 p-diag2 — 원본: seolbigo-preview/index.html
// 인터랙션(토스트·검증·칩 등)은 components/MockupBridge 가 위임 처리합니다.
export default function Page() {
  useDiagAnimation();
  return (
    <section className="page on" id="p-diag2">
      <div className="flow solo" style={{ paddingTop: 80, paddingBottom: 120 }}>
          <div style={{ maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
            <div style={{ width: 112, height: 112, borderRadius: "50%", background: "var(--sg-bg-brand-subtle)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, color: "var(--sg-brand-primary)", margin: "0 auto 24px" }}><Ic id="photo-ai" /></div>
            <h2 className="t-h24" style={{ margin: "0 0 6px" }}>&#49324;&#51652;&#51012; &#48516;&#49437;&#54616;&#44256; &#51080;&#50612;&#50836;</h2>
            <p className="t-b16 c-sec" style={{ margin: "0 0 28px" }}>&#48372;&#53685; 20&#52488; &#51221;&#46020; &#44152;&#47549;&#45768;&#45796;</p>
            <div className="gauge" style={{ height: 8 }}><i id="diagbar" style={{ width: "12%", transition: "width .5s ease" }} /></div>
            <div className="panel" style={{ marginTop: 24, textAlign: "left" }}>
              <div className="col gap12">
                <div className="row gap8"><span className="c-suc">✓</span><span className="t-b14">&#54616;&#51088; &#50976;&#54805; &#48516;&#47448;</span></div>
                <div className="row gap8"><span className="c-suc">✓</span><span className="t-b14">&#44596;&#44553;&#46020; &#54032;&#51221;</span></div>
                <div className="row gap8" id="diagstep3"><span className="c-ter">&#9676;</span><span className="t-b14 c-sec">&#50976;&#49324; &#49884;&#44277; &#49324;&#47168; 4,182&#44148; &#45824;&#51312;</span></div>
                <div className="row gap8" id="diagstep4"><span className="c-ter">&#9676;</span><span className="t-b14 c-sec">&#51204;&#47928;&#44032; &#44160;&#49688; &#45824;&#44592;</span></div>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}
