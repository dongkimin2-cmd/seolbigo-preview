
// 자동 이식된 목업 화면 p-drone — 원본: seolbigo-preview/index.html
// 인터랙션(토스트·검증·칩 등)은 components/MockupBridge 가 위임 처리합니다.
export default function Page() {
  
  return (
    <section className="page on" id="p-drone">
      <><div className="phead"><div className="phead__in">
          <div className="crumb"><a data-go="home">&#54856;</a><span>›</span><a data-go="services">&#51204;&#52404; &#49436;&#48708;&#49828;</a><span>›</span><b>&#46300;&#47200; &#50808;&#48317; &#51216;&#44160;</b></div>
          <h1>&#46300;&#47200;&#51004;&#47196; &#50808;&#48317;&#51012; &#54993;&#44256;, &#44512;&#50676; &#47532;&#54252;&#53944;&#47484; &#46300;&#47549;&#45768;&#45796;</h1>
          <p className="sub">&#47196;&#54532;·&#44260;&#46028;&#46972; &#50630;&#51060; &#44256;&#54644;&#49345; &#52524;&#50689;&#44284; &#50676;&#54868;&#49345;&#51004;&#47196; &#44512;&#50676;·&#48149;&#47532;·&#48177;&#54868;&#47484; &#44160;&#52636;&#54633;&#45768;&#45796;.
            &#44208;&#44284;&#45716; &#51340;&#54364; &#45800;&#50948; &#47532;&#54252;&#53944;&#47196; &#45224;&#44256;, &#48372;&#49688;&#44032; &#54596;&#50836;&#54616;&#47732; &#48169;&#49688;·&#46020;&#51109; &#44204;&#51201;&#51004;&#47196; &#51060;&#50612;&#51665;&#45768;&#45796;.</p>
        </div></div>
      
        <div className="flow">
          <div>
            <div className="steps">
              <div className="on">1. &#45824;&#49345; · &#54788;&#54889;</div><div>2. &#46300;&#47200; &#52524;&#50689;</div><div>3. &#44512;&#50676; &#47532;&#54252;&#53944;</div>
            </div>
      
            <div className="block">
              <h2 className="block__t">&#51216;&#44160; &#45824;&#49345;</h2>
              <p className="block__d">&#50612;&#45712; &#48512;&#50948;&#47484; &#51216;&#44160;&#54624;&#44620;&#50836;?</p>
              <div className="grid g2" style={{ gap: 12 }}>
                <button className="opt on"><span className="opt__k">&#50808;&#48317; &#51204;&#47732; (&#46041; &#45800;&#50948;)</span>
                  <span className="opt__d">4&#44060; &#47732; &#51204;&#52404; · &#44512;&#50676;·&#48149;&#47532; &#44160;&#52636;</span></button>
                <button className="opt"><span className="opt__k">&#50725;&#49345; · &#51648;&#48533;</span>
                  <span className="opt__d">&#48169;&#49688;&#52789; &#49345;&#53468; · &#48176;&#49688;&#44396; &#47561;&#55192;</span></button>
                <button className="opt"><span className="opt__k">&#52285;&#54840; · &#53076;&#53433; &#46972;&#51064;</span>
                  <span className="opt__d">&#49892;&#47532;&#53080; &#45432;&#54980; · &#45572;&#49688; &#44221;&#47196; &#52628;&#51201;</span></button>
                <button className="opt"><span className="opt__k">&#44512;&#50676; &#51032;&#49900; &#44396;&#44036;</span>
                  <span className="opt__d">&#51060;&#48120; &#48156;&#44204;&#54620; &#48512;&#50948; &#51221;&#48128; &#52524;&#50689;</span></button>
              </div>
            </div>
      
            <div className="block">
              <h2 className="block__t">&#44148;&#47932; &#54788;&#54889;</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 14 }}>
                <div className="field" style={{ gridColumn: "1/-1" }}><span className="lb">&#44148;&#47932; · &#51452;&#49548; <span className="rq">*</span></span>
                  <input className="inp" value="서울 강남구 청솔아파트 103동" /></div>
                <div className="field"><span className="lb">&#52789;&#49688;</span>
                  <select className="inp"><option>20&#52789;</option><option>15&#52789;</option><option>25&#52789; &#51060;&#49345;</option></select></div>
                <div className="field"><span className="lb">&#50808;&#48317; &#47560;&#44048;</span>
                  <select className="inp"><option>&#49688;&#49457;&#54168;&#51064;&#53944;</option><option>&#53440;&#51068;</option><option>&#49437;&#51116;</option><option>&#47784;&#47492;</option></select></div>
                <div className="field"><span className="lb">&#51456;&#44277;&#50672;&#46020;</span>
                  <select className="inp"><option>1999&#45380; (27&#45380;&#52264;)</option><option>2005&#45380;</option></select></div>
                <div className="field"><span className="lb">&#52572;&#44540; &#50808;&#48317; &#48372;&#49688; &#49884;&#51216;</span>
                  <select className="inp"><option>&#44592;&#50613;&#45208;&#51648; &#50506;&#51020; / &#44592;&#47197; &#50630;&#51020;</option><option>3&#45380; &#51060;&#45236;</option><option>5&#45380; &#51060;&#49345;</option></select></div>
              </div>
              <hr className="hair" style={{ margin: "20px 0 16px" }} />
              <div className="t-b14 fw6" style={{ marginBottom: 10 }}>&#52572;&#44540; &#51613;&#49345; <span className="t-b12 c-ter fw5">(&#54644;&#45817; &#50630;&#51004;&#47732; &#51221;&#44592; &#51216;&#44160;&#51004;&#47196; &#51652;&#54665;&#46121;&#45768;&#45796;)</span></div>
              <div className="row gap6" style={{ flexWrap: "wrap" }}>
                <button className="chip sm" aria-pressed="true">&#50808;&#48317; &#44512;&#50676; &#47785;&#44201;</button>
                <button className="chip sm">&#48177;&#54868; · &#50620;&#47337;</button>
                <button className="chip sm">&#52285;&#54840; &#51452;&#48320; &#45572;&#49688;</button>
                <button className="chip sm">&#53440;&#51068; &#46308;&#46904; · &#53448;&#46973;</button>
                <button className="chip sm">&#54644;&#45817; &#50630;&#51020; · &#51221;&#44592; &#51216;&#44160;</button>
              </div>
            </div>
      
            <div className="block" style={{ marginBottom: "0" }}>
              <h2 className="block__t">&#51216;&#44160; &#44208;&#44284;&#47196; &#47924;&#50631;&#51012; &#48155;&#44172; &#46104;&#45208;&#50836;</h2>
              <p className="block__d">&#52524;&#50689; &#54980; &#51060;&#47088; &#47532;&#54252;&#53944;&#44032; &#45208;&#50741;&#45768;&#45796;. &#51077;&#51452;&#51088;&#45824;&#54364;&#54924;&#51032; &#48372;&#44256;&#50752; &#51109;&#44592;&#49688;&#49440;&#44228;&#54925; &#44540;&#44144; &#51088;&#47308;&#47196; &#44536;&#45824;&#47196; &#50424; &#49688; &#51080;&#49845;&#45768;&#45796;.</p>
              <div className="panel" style={{ background: "var(--sg-bg-subtle)", boxShadow: "none", marginTop: 14 }}>
                <div className="row gap24" style={{ gap: 24, alignItems: "center", flexWrap: "wrap" }}>
                  <div className="ring">
                    <svg width="96" height="96"><circle cx="48" cy="48" r="40" fill="none" stroke="#E0E5EB" strokeWidth={12} />
                      <circle cx="48" cy="48" r="40" fill="none" stroke="#FF7C11" strokeWidth={12} strokeLinecap="round" strokeDasharray="251" strokeDashoffset={95} /></svg>
                    <div className="ring__t"><div className="t-h20 num">62</div><div className="t-b11 c-sec">&#50808;&#48317; &#49345;&#53468;</div></div>
                  </div>
                  <div style={{ flex: "1", minWidth: 260 }}>
                    <div className="row gap6" style={{ marginBottom: 8 }}>
                      <span className="urg caution"><i />&#51452;&#51032; — &#48372;&#49688; &#44228;&#54925; &#44428;&#51109;</span></div>
                    <div className="t-b14 c-sec" style={{ marginBottom: 12 }}>&#54253; 0.3mm &#51060;&#49345; &#44512;&#50676; <b>12&#44060;&#49548;</b>,
                      &#50676;&#54868;&#49345; &#48149;&#47532; &#51032;&#49900; <b>3&#44060;&#49548;</b>&#44032; &#44160;&#52636;&#46108; &#50696;&#49884;&#51077;&#45768;&#45796;. &#44512;&#50676;&#47560;&#45796; &#51340;&#54364;·&#54253;·&#44600;&#51060;&#44032; &#44592;&#47197;&#46121;&#45768;&#45796;.</div>
                    <div className="tier on"><div><div className="t-b14 fw7">&#50864;&#49440; &#48372;&#49688; &#44428;&#51109; &#44396;&#44036;</div>
                      <div className="t-b12 c-sec">&#45224;&#52769;&#47732; 9~12&#52789; &#52285;&#54840; &#46972;&#51064;</div></div>
                      <span className="t-b16 fw7 c-brand">3&#44060;&#49548;</span></div>
                  </div>
                </div>
                <div className="grid g4" style={{ gap: 8, marginTop: 16 }}>
                  <div className="ph wet" style={{ aspectRatio: "4/3", borderRadius: 8 }} />
                  <div className="ph pipe" style={{ aspectRatio: "4/3", borderRadius: 8 }} />
                  <div className="ph wet" style={{ aspectRatio: "4/3", borderRadius: 8 }} />
                  <div className="ph clean" style={{ aspectRatio: "4/3", borderRadius: 8 }} />
                </div>
                <div className="t-b12 c-ter" style={{ marginTop: 8 }}>&#8251; &#50696;&#49884; &#54868;&#47732;&#51077;&#45768;&#45796;. &#49892;&#51228; &#47532;&#54252;&#53944;&#45716; &#52524;&#50689; &#54980; &#49373;&#49457;&#46121;&#45768;&#45796;.</div>
              </div>
              <div className="callout" style={{ marginTop: 16 }}>
                <span className="c-ter" style={{ flex: "0 0 20px" }}>&#9878;&#65039;</span>
                <p className="t-b12 c-sec" style={{ margin: "0" }}>&#48376; &#51216;&#44160;&#51008; <b>&#52280;&#44256;&#50857; &#49345;&#53468; &#51312;&#49324;</b>&#51060;&#47728;, &#49884;&#49444;&#47932;&#50504;&#51204;&#48277;&#49345;
                  &#51221;&#48128;&#50504;&#51204;&#51216;&#44160;·&#51221;&#48128;&#50504;&#51204;&#51652;&#45800;&#51012; &#45824;&#52404;&#54616;&#51648; &#50506;&#49845;&#45768;&#45796;. &#46300;&#47200; &#48708;&#54665; &#49849;&#51064;·&#54637;&#44277;&#52524;&#50689; &#49888;&#44256;&#45716; &#49444;&#48708;&#44256;&#44032; &#51068;&#44292; &#45824;&#54665;&#54633;&#45768;&#45796;.</p>
              </div>
            </div>
          </div>
      
          <aside className="side">
            <div className="panel">
              <h3 className="panel__t">&#46300;&#47200; &#51216;&#44160; &#50696;&#50557;</h3>
              <div className="col gap10" style={{ gap: 10, marginBottom: 14 }}>
                <div className="row between"><span className="t-b14 c-sec">&#51216;&#44160; &#48708;&#50857; (1&#44060;&#46041;)</span>
                  <span className="t-b14 fw6">350,000&#50896;</span></div>
                <div className="row between"><span className="t-b14 c-sec">&#48372;&#49688; &#44228;&#50557; &#49884;</span>
                  <span className="t-b14 fw7 c-suc">50% &#52264;&#44048;</span></div>
                <div className="row between"><span className="t-b14 c-sec">&#52524;&#50689; &#49548;&#50836;</span><span className="t-b14 fw6">&#50557; 2&#49884;&#44036;</span></div>
                <div className="row between"><span className="t-b14 c-sec">&#47532;&#54252;&#53944;</span><span className="t-b14 fw6">3&#51068; &#45236; &#48156;&#44553;</span></div>
              </div>
              <hr className="hair" style={{ margin: "0 0 14px" }} />
              <div className="field" style={{ marginBottom: 12 }}><span className="lb">&#55148;&#47581; &#51216;&#44160;&#51068;</span>
                <select className="inp" style={{ height: 44, fontSize: 15 }}><option>11/24 (&#50900;) &#50724;&#51204;</option>
                  <option>11/25 (&#54868;) &#50724;&#51204;</option><option>11/27 (&#47785;) &#50724;&#54980;</option></select></div>
              <button className="btn large primary block" data-done="✓ 예약 접수됨" data-toast="드론 점검 예약이 접수되었습니다 \xB7 기상 조건에 따라 일정이 조정될 수 있습니다">&#46300;&#47200; &#51216;&#44160; &#50696;&#50557;</button>
              <div className="t-b12 c-ter" style={{ marginTop: 10, textAlign: "center" }}>&#50864;&#52380;·&#44053;&#54413; &#49884; &#47924;&#47308;&#47196; &#51068;&#51221;&#51060; &#48320;&#44221;&#46121;&#45768;&#45796;</div>
            </div>
            <div className="panel" style={{ background: "var(--sg-bg-info-subtle)", boxShadow: "none" }}>
              <div className="t-b14 fw7" style={{ marginBottom: 6 }}>&#48372;&#49688;&#44620;&#51648; &#54620; &#48264;&#50640;</div>
              <p className="t-b12 c-sec" style={{ margin: "0 0 12px" }}>&#47532;&#54252;&#53944;&#51032; &#44512;&#50676; &#51340;&#54364;&#50752; &#47732;&#51201;&#51060; &#44536;&#45824;&#47196; &#48169;&#49688;·&#46020;&#51109; &#44204;&#51201;&#51032;
                &#47932;&#47049; &#49328;&#52636;&#50640; &#46308;&#50612;&#44049;&#45768;&#45796;. &#45796;&#49884; &#51124; &#54596;&#50836;&#44032; &#50630;&#49845;&#45768;&#45796;.</p>
              <button className="btn small outlined block" data-go="area">&#48169;&#49688;·&#46020;&#51109; &#44592;&#51456;&#44032; &#48372;&#44592;</button>
            </div>
            <div className="panel">
              <h3 className="panel__t">&#44288;&#47532;&#49324;&#47924;&#49548;&#46972;&#47732;</h3>
              <p className="t-b12 c-sec" style={{ margin: "0" }}>&#51216;&#44160; &#44208;&#44284;&#44032; &#45800;&#51648; <b>&#46356;&#51648;&#53560; &#51060;&#47141; &#51648;&#46020;</b>&#50640; &#51088;&#46041; &#51200;&#51109;&#46104;&#50612;
                &#51077;&#51452;&#51088;&#45824;&#54364;&#54924;&#51032; &#48372;&#44256;&#51088;&#47308;&#50752; &#51109;&#44592;&#49688;&#49440;&#44228;&#54925; &#44540;&#44144;&#47196; &#50424; &#49688; &#51080;&#49845;&#45768;&#45796;.</p>
            </div>
          </aside>
        </div></>
    </section>
  );
}
