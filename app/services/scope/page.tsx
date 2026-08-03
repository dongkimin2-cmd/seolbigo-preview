
// 자동 이식된 목업 화면 p-scope — 원본: seolbigo-preview/index.html
// 인터랙션(토스트·검증·칩 등)은 components/MockupBridge 가 위임 처리합니다.
export default function Page() {
  
  return (
    <section className="page on" id="p-scope">
      <><div className="phead"><div className="phead__in">
          <div className="crumb"><a data-go="home">&#54856;</a><span>›</span><a data-go="services">&#51204;&#52404; &#49436;&#48708;&#49828;</a><span>›</span><b>&#44256;&#50517;&#49464;&#51221;·&#51456;&#49444;</b></div>
          <h1>&#44288; &#49549;&#51012; &#52237;&#50612;&#48372;&#44256;, &#49464;&#51221; &#51452;&#44592;&#47484; &#44228;&#49328;&#54633;&#45768;&#45796;</h1>
          <p className="sub">&#45236;&#49884;&#44221;&#51004;&#47196; &#52524;&#50689;&#54620; &#50724;&#50684;&#46020;&#47484; &#49688;&#52824;&#54868;&#54644; &#51648;&#44552; &#49464;&#51221;&#51060; &#54596;&#50836;&#54620;&#51648; &#54032;&#45800;&#54616;&#44256;, &#45796;&#51020; &#49884;&#51216;&#51012; &#51060; &#44148;&#47932;&#51032; &#45936;&#51060;&#53552;&#47196; &#49328;&#52636;&#54633;&#45768;&#45796;.</p>
        </div></div>
      
        <div className="flow">
          <div>
            <div className="steps">
              <div className="on">1. &#45824;&#49345; · &#54788;&#54889;</div><div>2. &#45236;&#49884;&#44221; &#51312;&#49324;</div><div>3. &#50724;&#50684;&#46020; &#47532;&#54252;&#53944;</div>
            </div>
      
            <div className="block">
              <h2 className="block__t">&#51312;&#49324; &#45824;&#49345;</h2>
              <p className="block__d">&#50612;&#45712; &#44288;&#47196;&#47484; &#51312;&#49324;&#54624;&#44620;&#50836;?</p>
              <div className="grid g2" style={{ gap: 12 }}>
                <button className="opt on"><span className="opt__k">&#44277;&#50857; &#51077;&#49345;&#44288; · &#50724;&#49688;&#44288;</span>
                  <span className="opt__d">&#46041; &#45800;&#50948; · &#51200;&#52789; &#50669;&#47448; &#50696;&#48169;</span></button>
                <button className="opt"><span className="opt__k">&#49464;&#45824; &#45236; &#48176;&#49688;&#44288;</span>
                  <span className="opt__d">&#51452;&#48169;·&#50837;&#49892; &#48176;&#49688; &#48520;&#47049;</span></button>
                <button className="opt"><span className="opt__k">&#49345;&#44032; &#44536;&#47532;&#49828;&#53944;&#47017;</span>
                  <span className="opt__d">&#51020;&#49885;&#51216; &#46972;&#51064; · 6&#44060;&#50900; &#51452;&#44592; &#44428;&#51109;</span></button>
                <button className="opt"><span className="opt__k">&#45800;&#51648; &#51204;&#52404; &#54616;&#49688;&#44288;</span>
                  <span className="opt__d">&#44288;&#47532;&#49324;&#47924;&#49548; &#48156;&#51452; · &#51456;&#49444; &#54252;&#54632;</span></button>
              </div>
            </div>
      
            <div className="block">
              <h2 className="block__t">&#54788;&#54889;</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 14 }}>
                <div className="field" style={{ gridColumn: "1/-1" }}><span className="lb">&#44148;&#47932; · &#51452;&#49548; <span className="rq">*</span></span>
                  <input className="inp" value="서울 강남구 청솔아파트 103동" /></div>
                <div className="field"><span className="lb">&#44148;&#47932; &#50857;&#46020;</span>
                  <select className="inp"><option>&#44277;&#46041;&#51452;&#53469;</option><option>&#50724;&#54588;&#49828;&#53588;</option><option>&#49345;&#44032;</option><option>&#49324;&#47924;&#50857;</option></select></div>
                <div className="field"><span className="lb">&#52789;&#49688; · &#49464;&#45824;&#49688;</span>
                  <select className="inp"><option>20&#52789; · 80&#49464;&#45824;</option><option>15&#52789; · 60&#49464;&#45824;</option></select></div>
                <div className="field"><span className="lb">&#47560;&#51648;&#47561; &#49464;&#51221; &#49884;&#51216;</span>
                  <select className="inp"><option>&#44592;&#50613;&#45208;&#51648; &#50506;&#51020; / &#44592;&#47197; &#50630;&#51020;</option><option>1&#45380; &#51060;&#45236;</option><option>2~3&#45380; &#51204;</option><option>5&#45380; &#51060;&#49345;</option></select></div>
                <div className="field"><span className="lb">&#51020;&#49885;&#51216; &#51077;&#51216; &#50668;&#48512;</span>
                  <select className="inp"><option>&#50630;&#51020;</option><option>1~2&#44275;</option><option>3&#44275; &#51060;&#49345;</option></select></div>
              </div>
              <hr className="hair" style={{ margin: "20px 0 16px" }} />
              <div className="t-b14 fw6" style={{ marginBottom: 10 }}>&#52572;&#44540; &#51613;&#49345; <span className="t-b12 c-ter fw5">(&#54644;&#45817; &#50630;&#51004;&#47732; &#50696;&#48169; &#51216;&#44160;&#51004;&#47196; &#51652;&#54665;&#46121;&#45768;&#45796;)</span></div>
              <div className="row gap6" style={{ flexWrap: "wrap" }}>
                <button className="chip sm" aria-pressed="true">&#51200;&#52789; &#49464;&#45824; &#50669;&#47448;</button>
                <button className="chip sm">&#48176;&#49688;&#44032; &#45712;&#47548;</button>
                <button className="chip sm">&#54616;&#49688;&#44396; &#45252;&#49352;</button>
                <button className="chip sm">&#48176;&#44288; &#49548;&#51020;</button>
                <button className="chip sm">&#54644;&#45817; &#50630;&#51020; · &#50696;&#48169; &#51216;&#44160;</button>
              </div>
            </div>
      
            <div className="block" style={{ marginBottom: "0" }}>
              <h2 className="block__t">&#51312;&#49324; &#44208;&#44284;&#47196; &#47924;&#50631;&#51012; &#48155;&#44172; &#46104;&#45208;&#50836;</h2>
              <p className="block__d">&#51312;&#49324; &#54980; &#51060;&#47088; &#47532;&#54252;&#53944;&#44032; &#45208;&#50741;&#45768;&#45796;. &#44288;&#47532;&#49324;&#47924;&#49548; &#48372;&#44256;&#50752; &#51077;&#51452;&#51088;&#45824;&#54364;&#54924;&#51032; &#49444;&#47749; &#51088;&#47308;&#47196; &#44536;&#45824;&#47196; &#50424; &#49688; &#51080;&#49845;&#45768;&#45796;.</p>
              <div className="panel" style={{ background: "var(--sg-bg-subtle)", boxShadow: "none", marginTop: 14 }}>
                <div className="row gap24" style={{ gap: 24, alignItems: "center", flexWrap: "wrap" }}>
                  <div className="ring">
                    <svg width="96" height="96"><circle cx="48" cy="48" r="40" fill="none" stroke="#E0E5EB" strokeWidth={12} />
                      <circle cx="48" cy="48" r="40" fill="none" stroke="#FF3541" strokeWidth={12} strokeLinecap="round" strokeDasharray="251" strokeDashoffset={48} /></svg>
                    <div className="ring__t"><div className="t-h20 num">81</div><div className="t-b11 c-sec">&#50724;&#50684;&#46020;</div></div>
                  </div>
                  <div style={{ flex: "1", minWidth: 260 }}>
                    <div className="row gap6" style={{ marginBottom: 8 }}>
                      <span className="urg urgent"><i />&#51593;&#49884; &#49464;&#51221; &#44428;&#51109;</span></div>
                    <div className="t-b14 c-sec" style={{ marginBottom: 12 }}>&#44288;&#44221;&#51032; &#50557; <b>42%</b>&#44032; &#44592;&#47492;&#46412;&#50752; &#52840;&#51204;&#47932;&#47196; &#51329;&#50500;&#51652; &#49345;&#53468;&#51077;&#45768;&#45796;.
                      &#46041;&#51068; &#51312;&#44148; &#44148;&#47932; &#45824;&#48708; &#49345;&#50948; 12% &#49688;&#51456;&#51077;&#45768;&#45796;.</div>
                    <div className="tier on"><div><div className="t-b14 fw7">&#45796;&#51020; &#49464;&#51221; &#44428;&#51109; &#49884;&#51216;</div>
                      <div className="t-b12 c-sec">&#51060; &#44148;&#47932;&#51032; &#50724;&#50684; &#52629;&#51201; &#49549;&#46020;&#47196; &#49328;&#52636;</div></div>
                      <span className="t-b16 fw7 c-brand">10&#44060;&#50900; &#54980;</span></div>
                  </div>
                </div>
                <div className="grid g4" style={{ gap: 8, marginTop: 16 }}>
                  <div className="ph pipe" style={{ aspectRatio: "4/3", borderRadius: 8 }} />
                  <div className="ph pipe" style={{ aspectRatio: "4/3", borderRadius: 8 }} />
                  <div className="ph clean" style={{ aspectRatio: "4/3", borderRadius: 8 }} />
                  <div className="ph clean" style={{ aspectRatio: "4/3", borderRadius: 8 }} />
                </div>
                <div className="t-b12 c-ter" style={{ marginTop: 8 }}>&#8251; &#50696;&#49884; &#54868;&#47732;&#51077;&#45768;&#45796;. &#49892;&#51228; &#47532;&#54252;&#53944;&#45716; &#51312;&#49324; &#54980; &#49373;&#49457;&#46121;&#45768;&#45796;.</div>
              </div>
            </div>
          </div>
      
          <aside className="side">
            <div className="panel">
              <h3 className="panel__t">&#44288;&#47196; &#51312;&#49324; &#50696;&#50557;</h3>
              <div className="col gap10" style={{ gap: 10, marginBottom: 14 }}>
                <div className="row between"><span className="t-b14 c-sec">&#51312;&#49324; &#48708;&#50857;</span>
                  <span className="t-b14 fw6">80,000&#50896;</span></div>
                <div className="row between"><span className="t-b14 c-sec">&#49464;&#51221; &#44228;&#50557; &#49884;</span>
                  <span className="t-b14 fw7 c-suc">&#51204;&#50529; &#52264;&#44048;</span></div>
                <div className="row between"><span className="t-b14 c-sec">&#49548;&#50836; &#49884;&#44036;</span><span className="t-b14 fw6">&#50557; 1&#49884;&#44036;</span></div>
                <div className="row between"><span className="t-b14 c-sec">&#47532;&#54252;&#53944;</span><span className="t-b14 fw6">&#45817;&#51068; &#48156;&#44553;</span></div>
              </div>
              <hr className="hair" style={{ margin: "0 0 14px" }} />
              <div className="field" style={{ marginBottom: 12 }}><span className="lb">&#55148;&#47581; &#51312;&#49324;&#51068;</span>
                <select className="inp" style={{ height: 44, fontSize: 15 }}><option>11/21 (&#44552;) &#50724;&#51204;</option>
                  <option>11/22 (&#53664;) &#50724;&#51204;</option><option>11/25 (&#54868;) &#50724;&#54980;</option></select></div>
              <button className="btn large primary block" data-done="✓ 예약 접수됨" data-toast="관로 조사 예약이 접수되었습니다 \xB7 조사 당일 리포트가 발급됩니다">&#44288;&#47196; &#51312;&#49324; &#50696;&#50557;</button>
            </div>
            <div className="panel" style={{ background: "var(--sg-bg-success-subtle)", boxShadow: "none" }}>
              <div className="t-b14 fw7" style={{ marginBottom: 6 }}>&#51221;&#44592; &#44228;&#50557;&#51004;&#47196; &#51204;&#54872;&#54616;&#47732;</div>
              <p className="t-b12 c-sec" style={{ margin: "0 0 10px" }}>&#51068;&#48376;&#51008; &#48176;&#49688;&#49444;&#48708; &#52397;&#49548;&#47484; 6&#44060;&#50900;&#47560;&#45796; &#48277;&#51004;&#47196; &#51032;&#47924;&#54868;&#54664;&#51648;&#47564;
                &#44397;&#45236;&#50640;&#45716; &#48277;&#51221; &#51452;&#44592;&#44032; &#50630;&#49845;&#45768;&#45796;. &#49444;&#48708;&#44256;&#45716; &#44148;&#47932;&#48324; &#50724;&#50684; &#49549;&#46020;&#47196; &#51452;&#44592;&#47484; &#51221;&#54644; &#51088;&#46041; &#48176;&#51221;&#54633;&#45768;&#45796;.</p>
              <div className="col gap6">
                <div className="row between"><span className="t-b12 c-sec">&#51020;&#49885;&#51216; &#46972;&#51064;</span><span className="t-b12 fw6">6&#44060;&#50900;</span></div>
                <div className="row between"><span className="t-b12 c-sec">&#45432;&#54980; &#45800;&#51648;</span><span className="t-b12 fw6">1&#45380;</span></div>
                <div className="row between"><span className="t-b12 c-sec">&#51068;&#48152; &#45800;&#51648;</span><span className="t-b12 fw6">2&#45380;</span></div>
              </div>
            </div>
          </aside>
        </div></>
    </section>
  );
}
