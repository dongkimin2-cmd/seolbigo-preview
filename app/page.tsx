
// 자동 이식된 목업 화면 p-home — 원본: seolbigo-preview/index.html
// 인터랙션(토스트·검증·칩 등)은 components/MockupBridge 가 위임 처리합니다.
export default function Page() {
  
  return (
    <section className="page on" id="p-home">
      <><div className="wrap">
          <div className="hero">
            <div className="badge b-brand b12" style={{ marginBottom: 12 }}>AI &#51652;&#45800; · &#44592;&#51456;&#44032; &#44277;&#44060; · 1&#45380; &#50504;&#49900;&#48372;&#51613;</div>
            <h1 className="t-d28" style={{ margin: "0 0 6px" }}>
              <span className="c-brand">&#44053;&#45224;&#44396; &#52397;&#49556;&#50500;&#54028;&#53944;</span>&#51032; &#48176;&#44288;,<br />&#50612;&#46356;&#44032; &#47928;&#51228;&#51068;&#44620;&#50836;?
            </h1>
            <p className="t-b16 c-sec" style={{ margin: "0 0 22px" }}>&#49324;&#51652; &#54620; &#51109;&#51060;&#47732; &#54616;&#51088; &#50976;&#54805;&#44284; &#51201;&#51221; &#44032;&#44201; &#48276;&#50948;&#47484; &#50508;&#47140;&#46300;&#47140;&#50836;.</p>
            <div className="row gap8" style={{ maxWidth: 560, margin: "0 auto" }}>
              <div className="searchbar">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth={1.8} /><path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" /></svg>
                <input placeholder="어떤 증상인가요? (예: 천장 누수)" />
              </div>
              <button className="btn large primary" data-go="diag1" style={{ flex: "0 0 auto" }}>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 2.5l1.6 4.3 4.4 1.7-4.4 1.7L10 14.5 8.4 10.2 4 8.5l4.4-1.7L10 2.5z" fill="currentColor" /></svg>
                AI &#49324;&#51652; &#51652;&#45800;
              </button>
            </div>
      
            <div className="cats">
              <button className="cat" data-go="diag1" data-svc="누수피해복구">
                <i style={{ background: "#FDEBEC" }}>&#128167;</i><span>&#45572;&#49688;&#54588;&#54644;<br />&#48373;&#44396;</span>
                <em className="cat__how">&#49324;&#51652; &#51652;&#45800;</em></button>
              <button className="cat" data-go="survey" data-svc="배관 설계\xB7교체">
                <i style={{ background: "#F1EEFF" }}>&#128295;</i><span>&#48176;&#44288; &#49444;&#44228;<br />· &#44368;&#52404;</span>
                <em className="cat__how how-b">&#54788;&#51109; &#49892;&#52769;</em></button>
              <button className="cat" data-go="diag1" data-svc="누수 탐지\xB7공사">
                <i style={{ background: "#E7F4FF" }}>&#128269;</i><span>&#45572;&#49688; &#53456;&#51648;<br />· &#44277;&#49324;</span>
                <em className="cat__how">&#49324;&#51652; &#51652;&#45800;</em></button>
              <button className="cat" data-go="scope" data-svc="고압세정\xB7준설">
                <i style={{ background: "#FFF7F0" }}>&#127744;</i><span>&#44256;&#50517;&#49464;&#51221;<br />· &#51456;&#49444;</span>
                <em className="cat__how how-c">&#44288;&#47196; &#51312;&#49324;</em></button>
              <button className="cat" data-go="area" data-svc="방수\xB7도장">
                <i style={{ background: "#E7FCEF" }}>&#129521;</i><span>&#48169;&#49688;<br />· &#46020;&#51109;</span>
                <em className="cat__how how-e">&#49324;&#51652;+&#47732;&#51201;</em></button>
              <button className="cat" data-go="instant" data-svc="수도배관 클리닝">
                <i style={{ background: "#E7F4FF" }}>&#128703;</i><span>&#49688;&#46020;&#48176;&#44288;<br />&#53364;&#47532;&#45789;</span>
                <em className="cat__how how-d">&#51593;&#49884; &#44204;&#51201;</em></button>
              <button className="cat" data-go="instant" data-svc="난방배관 클리닝">
                <i style={{ background: "#FFFCDE" }}>&#9832;&#65039;</i><span>&#45212;&#48169;&#48176;&#44288;<br />&#53364;&#47532;&#45789;</span>
                <em className="cat__how how-d">&#51593;&#49884; &#44204;&#51201;</em></button>
              <button className="cat" data-go="drone" data-svc="드론 외벽 점검">
                <i style={{ background: "#EFF4FF" }}>&#128760;</i><span>&#46300;&#47200;<br />&#50808;&#48317; &#51216;&#44160;</span>
                <em className="cat__how how-c">&#46300;&#47200; &#51216;&#44160;</em></button>
            </div>
            <div className="t-b12 c-ter" style={{ marginTop: 14 }}>
              &#49436;&#48708;&#49828;&#47560;&#45796; &#49884;&#51089;&#54616;&#45716; &#48169;&#48277;&#51060; &#45796;&#47493;&#45768;&#45796; · <span className="more" data-go="services" style={{ fontSize: 12 }}>&#51652;&#51077; &#44221;&#47196; &#51204;&#52404; &#48372;&#44592; ›</span>
            </div>
          </div>
        </div>
      
        <hr className="thick" />
      
        <div className="wrap">
          <section className="sec">
            <div className="sec__hd">
              <div>
                <div className="sec__ov">&#52572;&#44540; &#44053;&#45224;&#44396; &#52397;&#49556;&#50500;&#54028;&#53944; · &#51456;&#44277; 1999&#45380;</div>
                <h2 className="t-h20" style={{ margin: "0" }}>&#50864;&#47532; &#50500;&#54028;&#53944;&#50640;&#49436; &#49892;&#51228;&#47196; &#51060;&#47111;&#44172; &#44256;&#52452;&#50612;&#50836;</h2>
              </div>
              <span className="more" data-go="cases">&#51204;&#52404; &#49324;&#47168; &#48372;&#44592; ›</span>
            </div>
            <div className="grid g6">
              <div className="casecard" data-go="case-detail"><div className="ph wet">Before</div>
                <div className="t-b12 fw6" style={{ marginTop: 8 }}>&#50504;&#48169; &#52380;&#51109; &#45572;&#49688;</div>
                <div className="t-b12 c-sec">&#50967;&#51665; &#48176;&#44288; &#51060;&#51020;&#48512; · 38&#47564;&#50896;</div></div>
              <div className="casecard" data-go="case-detail"><div className="ph pipe">Before</div>
                <div className="t-b12 fw6" style={{ marginTop: 8 }}>&#51452;&#48169; &#48176;&#49688;&#44288; &#50669;&#47448;</div>
                <div className="t-b12 c-sec">&#44256;&#50517;&#49464;&#51221; · 22&#47564;&#50896;</div></div>
              <div className="casecard" data-go="case-detail"><div className="ph clean">Before</div>
                <div className="t-b12 fw6" style={{ marginTop: 8 }}>&#50728;&#49688; &#49688;&#50517; &#51200;&#54616;</div>
                <div className="t-b12 c-sec">&#45212;&#48169;&#48176;&#44288; &#53364;&#47532;&#45789; · 34&#47564;&#50896;</div></div>
              <div className="casecard" data-go="case-detail"><div className="ph wet">Before</div>
                <div className="t-b12 fw6" style={{ marginTop: 8 }}>&#54868;&#51109;&#49892; &#48148;&#45797; &#45572;&#49688;</div>
                <div className="t-b12 c-sec">&#48169;&#49688; &#51116;&#49884;&#44277; · 96&#47564;&#50896;</div></div>
              <div className="casecard" data-go="case-detail"><div className="ph pipe">Before</div>
                <div className="t-b12 fw6" style={{ marginTop: 8 }}>&#49464;&#47732;&#45824; &#54616;&#48512; &#45572;&#49688;</div>
                <div className="t-b12 c-sec">&#48176;&#49688; &#53944;&#47017; &#44368;&#52404; · 9&#47564;&#50896;</div></div>
              <div className="casecard" data-go="case-detail"><div className="ph clean">Before</div>
                <div className="t-b12 fw6" style={{ marginTop: 8 }}>&#45212;&#48169; &#50728;&#46020; &#54200;&#52264;</div>
                <div className="t-b12 c-sec">&#48516;&#48176;&#44592; &#51216;&#44160; · 15&#47564;&#50896;</div></div>
            </div>
          </section>
      
          <hr className="hair" />
      
          <section className="sec">
            <div className="sec__hd"><div>
              <div className="sec__ov">&#44228;&#50557; &#51204;&#50640; &#54869;&#51064;&#54616;&#49464;&#50836;</div>
              <h2 className="t-h20" style={{ margin: "0" }}>&#49444;&#48708;&#44256;&#45716; &#44032;&#44201;&#51032; &#44540;&#44144;&#47484; &#47676;&#51200; &#48372;&#50668;&#46300;&#47549;&#45768;&#45796;</h2>
            </div></div>
            <div className="grid g3">
              <div className="card pad">
                <div className="badge b-brand" style={{ marginBottom: 10 }}>STEP 1</div>
                <div className="t-h16" style={{ marginBottom: 4 }}>&#49324;&#51652;&#51012; &#50732;&#47532;&#47732; AI&#44032; &#51652;&#45800;</div>
                <p className="t-b14 c-sec" style={{ margin: "0" }}>&#54616;&#51088; &#50976;&#54805;&#44284; &#44596;&#44553;&#46020;&#47484; &#48516;&#47448;&#54616;&#44256;, &#51204;&#47928;&#44032;&#44032; &#54620; &#48264; &#45908; &#44160;&#49688;&#54633;&#45768;&#45796;.</p>
              </div>
              <div className="card pad">
                <div className="badge b-brand" style={{ marginBottom: 10 }}>STEP 2</div>
                <div className="t-h16" style={{ marginBottom: 4 }}>&#44057;&#51008; &#51665;, &#44057;&#51008; &#51613;&#49345; &#49324;&#47168; &#45824;&#51312;</div>
                <p className="t-b14 c-sec" style={{ margin: "0" }}>&#50672;&#49885;·&#48176;&#44288; &#51116;&#51656;&#51060; &#48708;&#49847;&#54620; &#49892;&#51228; &#49884;&#44277; &#49324;&#47168;&#50640;&#49436; &#44592;&#51456;&#44032; &#48276;&#50948;&#47484; &#48977;&#49845;&#45768;&#45796;.</p>
              </div>
              <div className="card pad">
                <div className="badge b-brand" style={{ marginBottom: 10 }}>STEP 3</div>
                <div className="t-h16" style={{ marginBottom: 4 }}>&#52628;&#44032;&#44552;&#51008; &#54637;&#47785;&#51004;&#47196; &#49849;&#51064;</div>
                <p className="t-b14 c-sec" style={{ margin: "0" }}>&#54788;&#51109;&#50640;&#49436; &#44050;&#51060; &#50724;&#47476;&#47732; &#50612;&#46500; &#48320;&#49688;&#47196; &#50620;&#47560;&#51064;&#51648; &#48372;&#44256; &#51649;&#51217; &#49849;&#51064;&#54633;&#45768;&#45796;.</p>
              </div>
            </div>
            <div className="grid g4" style={{ marginTop: 20 }}>
              <div className="stat"><b className="c-brand num">4,182</b><span className="t-b12 c-sec">&#45572;&#51201; &#49884;&#44277; &#52992;&#51060;&#49828;</span></div>
              <div className="stat"><b className="num">±8%</b><span className="t-b12 c-sec">&#44592;&#51456;&#44032; &#50724;&#52264; &#48276;&#50948;</span></div>
              <div className="stat"><b className="num">1&#45380;</b><span className="t-b12 c-sec">&#47924;&#49345; A/S &#48372;&#51613;</span></div>
              <div className="stat"><b className="num">&#54217;&#44512; 2.4&#51068;</b><span className="t-b12 c-sec">&#48372;&#54744;&#44552; &#51221;&#49328; &#49548;&#50836;</span></div>
            </div>
          </section>
      
          <hr className="hair" />
      
          <section className="sec">
            <div className="sec__hd"><div>
              <div className="sec__ov">&#50864;&#47532; &#45800;&#51648; 103&#46041;</div>
              <h2 className="t-h20" style={{ margin: "0" }}>&#45212;&#48169;&#48176;&#44288; &#53364;&#47532;&#45789; &#44277;&#46041;&#44396;&#47588;&#44032; &#51652;&#54665; &#51473;&#51060;&#50640;&#50836;</h2>
            </div><span className="more" data-go="groupbuy">&#52280;&#50668;&#54616;&#44592; ›</span></div>
            <div className="card pad" style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ flex: "1", minWidth: 280 }}>
                <div className="row between" style={{ marginBottom: 8 }}>
                  <span className="t-b14 fw6">&#54788;&#51116; <span className="c-brand">18&#49464;&#45824;</span> &#52280;&#50668; · 24&#49464;&#45824; &#45804;&#49457; &#49884; &#52572;&#51200;&#44032;</span>
                  <span className="t-b14 fw7 num">75%</span>
                </div>
                <div className="gauge"><i style={{ width: "75%" }} /></div>
                <div className="t-b12 c-sec" style={{ marginTop: 8 }}>&#47784;&#51665; &#47560;&#44048;&#44620;&#51648; 3&#51068; &#45224;&#51020; · &#44057;&#51008; &#46972;&#51064;&#51012; &#47926;&#50612; &#49884;&#44277;&#54644; &#45800;&#44032;&#44032; &#45236;&#47140;&#44049;&#45768;&#45796;</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="t-b12 c-sec" style={{ textDecoration: "line-through" }}>1&#49464;&#45824; 34&#47564;&#50896;</div>
                <div className="t-h24 c-brand num">23.8&#47564;&#50896;</div>
                <button className="btn medium primary" data-go="groupbuy" style={{ marginTop: 8 }}>&#44277;&#46041;&#44396;&#47588; &#52280;&#50668;</button>
              </div>
            </div>
          </section>
      
          <hr className="hair" />
      
          <section className="sec">
            <div className="grid g4">
              <div><div className="t-h16" style={{ marginBottom: 4 }}>&#128737;&#65039; 1&#45380; &#50504;&#49900; &#48372;&#51613;</div>
                <p className="t-b14 c-sec" style={{ margin: "0" }}>&#54540;&#47019;&#54268; &#44208;&#51228; &#44148;&#51008; &#51116;&#49884;&#44277;·A/S&#47484; &#49444;&#48708;&#44256;&#44032; &#48372;&#51109;&#54633;&#45768;&#45796;.</p></div>
              <div><div className="t-h16" style={{ marginBottom: 4 }}>&#128274; &#50640;&#49828;&#53356;&#47196; &#44208;&#51228;</div>
                <p className="t-b14 c-sec" style={{ margin: "0" }}>&#49884;&#44277; &#50756;&#47308;&#47484; &#54869;&#51064;&#54620; &#46244; &#45824;&#44552;&#51060; &#49324;&#50629;&#51088;&#50640;&#44172; &#51648;&#44553;&#46121;&#45768;&#45796;.</p></div>
              <div><div className="t-h16" style={{ marginBottom: 4 }}>&#128196; &#48372;&#54744; Fast-Track</div>
                <p className="t-b14 c-sec" style={{ margin: "0" }}>&#44277;&#49885; &#45236;&#50669;&#49436;&#44032; &#48372;&#54744;&#49324; &#52397;&#44396; &#49436;&#47448;&#47196; &#48148;&#47196; &#51060;&#50612;&#51665;&#45768;&#45796;.</p></div>
              <div><div className="t-h16" style={{ marginBottom: 4 }}>&#128247; &#51312;&#51089; &#48520;&#44032; &#54596;&#47784;&#44536;&#47000;&#54588;</div>
                <p className="t-b14 c-sec" style={{ margin: "0" }}>Before/After &#52524;&#50689; &#47700;&#53440;&#45936;&#51060;&#53552;&#47484; &#49884;&#44277; &#51068;&#51221;&#44284; &#45824;&#51312; &#44160;&#51613;&#54633;&#45768;&#45796;.</p></div>
            </div>
          </section>
        </div>
      
        <footer style={{ background: "var(--sg-bg-subtle)", marginTop: 24, padding: "32px 0" }}>
          <div className="wrap">
            <div className="logo" style={{ fontSize: 17, marginBottom: 10 }}>&#49444;&#48708;&#44256;</div>
            <p className="t-b12 c-ter" style={{ margin: "0", maxWidth: 720 }}>
              &#49444;&#48708;&#44256;&#45716; &#53685;&#49888;&#54032;&#47588;&#51473;&#44060;&#51088;&#47196;&#49436; &#53685;&#49888;&#54032;&#47588;&#51032; &#45817;&#49324;&#51088;&#44032; &#50500;&#45768;&#47728;, &#44060;&#48324; &#49884;&#44277;&#50640; &#45824;&#54620; &#52293;&#51076;&#51008; &#44033; &#49324;&#50629;&#51088;&#50640;&#44172; &#51080;&#49845;&#45768;&#45796;.
              &#54540;&#47019;&#54268;&#51060; &#51228;&#44277;&#54616;&#45716; &#44592;&#51456;&#44032;&#45716; &#52280;&#44256;&#50857; &#44032;&#44204;&#51201;&#51060;&#47728; &#54869;&#51221; &#44204;&#51201;&#51060; &#50500;&#45785;&#45768;&#45796;.
              &#48372;&#51613; &#54532;&#47196;&#44536;&#47016;&#51008; &#48372;&#54744; &#44592;&#48152; &#48324;&#46020; &#49345;&#54408;&#51004;&#47196; &#50868;&#50689;&#46121;&#45768;&#45796;.
            </p>
          </div>
        </footer></>
    </section>
  );
}
