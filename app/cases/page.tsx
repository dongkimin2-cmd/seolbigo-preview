
// 자동 이식된 목업 화면 p-cases — 원본: seolbigo-preview/index.html
// 인터랙션(토스트·검증·칩 등)은 components/MockupBridge 가 위임 처리합니다.
export default function Page() {
  
  return (
    <section className="page on" id="p-cases">
      <><div className="phead"><div className="phead__in">
          <div className="crumb"><a data-go="home">&#54856;</a><span>›</span><a data-go="diag3">&#51652;&#45800; &#44208;&#44284;</a><span>›</span><b>&#50976;&#49324; &#49884;&#44277; &#49324;&#47168;</b></div>
          <h1>&#44057;&#51008; &#51665;, &#44057;&#51008; &#51613;&#49345;&#51008; &#50612;&#46523;&#44172; &#44256;&#52452;&#51012;&#44620;&#50836;</h1>
          <p className="sub">&#54032;&#47168;&#47484; &#52286;&#50500;&#48372;&#46319; &#51312;&#44148;&#51060; &#44057;&#51008; &#49892;&#51228; &#49884;&#44277;&#51012; &#54869;&#51064;&#54616;&#49464;&#50836;. &#47784;&#46160; &#54540;&#47019;&#54268; &#44208;&#51228;·&#44160;&#51613;&#51012; &#44144;&#52828; &#49324;&#47168;&#51077;&#45768;&#45796;.</p>
        </div></div>
      
        <div className="flow">
          <div>
            <div className="panel" style={{ marginBottom: 16, padding: "16px 20px" }}>
              <div className="row between gap12" style={{ flexWrap: "wrap" }}>
                <div className="row gap6" style={{ flexWrap: "wrap" }}>
                  <button className="chip sm" aria-pressed="true">&#44057;&#51008; &#50500;&#54028;&#53944;</button>
                  <button className="chip sm">&#44057;&#51008; &#50672;&#49885; ±3&#45380;</button>
                  <button className="chip sm" aria-pressed="true">&#44057;&#51008; &#51613;&#49345;</button>
                  <button className="chip sm">&#44057;&#51008; &#52789;&#49688;&#45824;</button>
                  <button className="chip sm">&#48372;&#54744; &#52376;&#47532; &#44148;&#47564;</button>
                </div>
                <select className="inp" style={{ width: "auto", height: 38, padding: "0 36px 0 12px", fontSize: 14 }}>
                  <option>&#52572;&#49888;&#49692;</option><option>&#44552;&#50529; &#45230;&#51008;&#49692;</option><option>&#50976;&#49324;&#46020;&#49692;</option></select>
              </div>
            </div>
      
            <div className="row between" style={{ margin: "0 4px 12px" }}>
              <span className="t-b14 c-sec">&#52509; <b className="c-brand num">12</b>&#44148;</span>
              <span className="t-b14 c-sec">&#54217;&#44512; <b className="num">41.2&#47564;&#50896;</b> · &#54217;&#44512; &#49548;&#50836; <b className="num">4&#49884;&#44036;</b></span>
            </div>
      
            <div className="col gap12">
              <div className="card" style={{ padding: 18, display: "flex", gap: 18, cursor: "pointer" }} data-go="case-detail">
                <div className="ph wet" style={{ width: 150, height: 112, flex: "0 0 150px", borderRadius: 10 }} />
                <div style={{ flex: "1", minWidth: "0" }}>
                  <div className="row gap4" style={{ marginBottom: 6 }}>
                    <span className="badge b-brand">&#44057;&#51008; &#50500;&#54028;&#53944;</span><span className="badge b-gline">1999&#45380;</span>
                    <span className="badge b-gline">12&#52789;</span><span className="badge b-gline">&#51473;&#50521;&#45212;&#48169;</span></div>
                  <div className="t-h18">&#48176;&#44288; &#51060;&#51020;&#48512; &#48372;&#49688; + &#52380;&#51109; &#47560;&#44048; &#48373;&#44396;</div>
                  <div className="t-b14 c-sec" style={{ margin: "4px 0 10px" }}>&#45572;&#49688; &#53456;&#51648; → &#51060;&#51020;&#48512; &#49892;&#47553; → &#49437;&#44256; &#48372;&#49688; → &#46020;&#48176; · &#52509; 4&#49884;&#44036;</div>
                  <div className="row between">
                    <span className="t-b14 c-sec">&#44648;&#45143;&#54620;&#51665;&#49444;&#48708; · ★ 4.9 (126)</span>
                    <span className="t-h20 num">380,000&#50896;</span></div>
                </div>
              </div>
              <div className="card" style={{ padding: 18, display: "flex", gap: 18, cursor: "pointer" }} data-go="case-detail">
                <div className="ph pipe" style={{ width: 150, height: 112, flex: "0 0 150px", borderRadius: 10 }} />
                <div style={{ flex: "1", minWidth: "0" }}>
                  <div className="row gap4" style={{ marginBottom: 6 }}>
                    <span className="badge b-gline">&#44060;&#54252;&#45720;&#54392;&#47480;</span><span className="badge b-gline">2001&#45380;</span>
                    <span className="badge b-orange">&#50556;&#44036;&#51089;&#50629;</span></div>
                  <div className="t-h18">&#45572;&#49688; &#53456;&#51648; + &#51060;&#51020;&#48512; &#51204;&#52404; &#44368;&#52404;</div>
                  <div className="t-b14 c-sec" style={{ margin: "4px 0 10px" }}>&#47588;&#47549;&#44288; &#46041;&#44288; · &#50556;&#44036; &#52628;&#44032;&#44552; 40,000&#50896; &#54252;&#54632; · &#52509; 6&#49884;&#44036;</div>
                  <div className="row between">
                    <span className="t-b14 c-sec">&#54620;&#48731;&#48176;&#44288; · ★ 4.8 (89)</span>
                    <span className="t-h20 num">450,000&#50896;</span></div>
                </div>
              </div>
              <div className="card" style={{ padding: 18, display: "flex", gap: 18, cursor: "pointer" }} data-go="case-detail">
                <div className="ph clean" style={{ width: 150, height: 112, flex: "0 0 150px", borderRadius: 10 }} />
                <div style={{ flex: "1", minWidth: "0" }}>
                  <div className="row gap4" style={{ marginBottom: 6 }}>
                    <span className="badge b-gline">&#50669;&#49340;&#52397;&#49556;</span><span className="badge b-gline">1997&#45380;</span>
                    <span className="badge b-green">&#48372;&#54744; &#51204;&#50529; &#52376;&#47532;</span></div>
                  <div className="t-h18">&#51060;&#51020;&#48512; &#48372;&#49688; (&#47560;&#44048; &#48373;&#44396; &#50630;&#51020;)</div>
                  <div className="t-b14 c-sec" style={{ margin: "4px 0 10px" }}>&#50967;&#51665; &#51068;&#49345;&#49373;&#54876;&#48176;&#49345;&#52293;&#51076;&#48372;&#54744;&#51004;&#47196; &#51204;&#50529; &#52376;&#47532; · &#52509; 3&#49884;&#44036;</div>
                  <div className="row between">
                    <span className="t-b14 c-sec">&#50864;&#49457;&#49444;&#48708; · ★ 4.7 (52)</span>
                    <span className="t-h20 num">330,000&#50896;</span></div>
                </div>
              </div>
            </div>
          </div>
      
          <aside className="side">
            <div className="panel">
              <h3 className="panel__t">12&#44148; &#50836;&#50557;</h3>
              <div className="range" style={{ paddingTop: 30 }}>
                <div className="range__bar">
                  <div className="range__fair" style={{ left: "22%", right: "22%" }} />
                  <div className="range__mark" style={{ left: "50%" }} />
                  <div className="range__cap" style={{ left: "50%" }}>&#51473;&#50521;&#44050; 41&#47564;</div>
                </div>
                <div className="range__lbl"><span className="num">32&#47564;</span><span className="num">58&#47564;</span></div>
              </div>
              <hr className="hair" style={{ margin: "18px 0" }} />
              <div className="col gap8">
                <div className="row between"><span className="t-b14 c-sec">&#52380;&#51109; &#48373;&#44396; &#54252;&#54632;</span><span className="t-b14 fw6">9&#44148;</span></div>
                <div className="row between"><span className="t-b14 c-sec">&#48372;&#54744; &#52376;&#47532;</span><span className="t-b14 fw6">5&#44148;</span></div>
                <div className="row between"><span className="t-b14 c-sec">&#51116;&#49884;&#44277; &#48156;&#49373;</span><span className="t-b14 fw6 c-suc">0&#44148;</span></div>
              </div>
              <button className="btn large primary block" data-go="quotes" style={{ marginTop: 18 }}>&#51060; &#51312;&#44148;&#51004;&#47196; &#44204;&#51201; &#48155;&#44592;</button>
            </div>
          </aside>
        </div></>
    </section>
  );
}
