
// 자동 이식된 목업 화면 p-booking — 원본: seolbigo-preview/index.html
// 인터랙션(토스트·검증·칩 등)은 components/MockupBridge 가 위임 처리합니다.
export default function Page() {
  
  return (
    <section className="page on" id="p-booking">
      <><div className="phead"><div className="phead__in">
          <div className="crumb"><a data-go="home">&#54856;</a><span>›</span><a data-go="quotes">&#44204;&#51201; &#48708;&#44368;</a><span>›</span><b>&#50696;&#50557; · &#44208;&#51228;</b></div>
          <h1>&#48169;&#47928; &#51068;&#51221;&#51012; &#51221;&#54616;&#44256; &#44208;&#51228;&#54616;&#49464;&#50836;</h1>
          <p className="sub">&#44208;&#51228; &#44552;&#50529;&#51008; &#50640;&#49828;&#53356;&#47196;&#50640; &#48372;&#44288;&#46104;&#47728;, &#49884;&#44277; &#50756;&#47308;&#47484; &#54869;&#51064;&#54616;&#49888; &#46244; &#49324;&#50629;&#51088;&#50640;&#44172; &#51648;&#44553;&#46121;&#45768;&#45796;.</p>
        </div></div>
      
        <div className="flow">
          <div>
            <div className="block">
              <h2 className="block__t">&#48169;&#47928; &#51068;&#51221;</h2>
              <p className="block__d">&#44648;&#45143;&#54620;&#51665;&#49444;&#48708;&#51032; &#50696;&#50557; &#44032;&#45733; &#49884;&#44036;&#51077;&#45768;&#45796;.</p>
              <div className="row gap8" id="bookDays" data-single="" style={{ marginBottom: 16, flexWrap: "wrap" }}>
                <button className="chip">11/18 (&#54868;)</button>
                <button className="chip" aria-pressed="true">11/19 (&#49688;)</button>
                <button className="chip">11/20 (&#47785;)</button>
                <button className="chip">11/21 (&#44552;)</button>
                <button className="chip">11/22 (&#53664;)</button>
              </div>
              <div className="row gap8" id="bookTimes" data-single="" style={{ flexWrap: "wrap" }}>
                <button className="chip sm">09:00</button><button className="chip sm">11:00</button>
                <button className="chip sm" aria-pressed="true">14:00</button><button className="chip sm">16:00</button>
                <button className="chip sm" disabled={true} style={{ opacity: ".4" }}>18:00 (&#47560;&#44048;)</button>
              </div>
            </div>
      
            <div className="block">
              <h2 className="block__t">&#54788;&#51109; &#51221;&#48372;</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 14 }}>
                <div className="field" style={{ gridColumn: "1/-1" }}><span className="lb">&#51452;&#49548;</span>
                  <input className="inp" value="서울 강남구 청솔아파트 103동 1204호" /></div>
                <div className="field"><span className="lb">&#50672;&#46973;&#52376;</span>
                  <input className="inp" value="010-****-1234" disabled={true} style={{ background: "var(--sg-bg-subtle)", color: "var(--sg-text-disabled)" }} /></div>
                <div className="field"><span className="lb">&#51452;&#52264; &#44032;&#45733; &#50668;&#48512;</span>
                  <select className="inp"><option>&#51648;&#54616;&#51452;&#52264;&#51109; &#44032;&#45733;</option><option>&#48520;&#44032;</option></select></div>
                <div className="field" style={{ gridColumn: "1/-1" }}><span className="lb">&#44592;&#49324;&#45784;&#44760; &#51204;&#54624; &#47568;</span>
                  <textarea className="inp" placeholder="예: 낮에는 집에 사람이 없어 경비실에 연락 부탁드립니다." /></div>
              </div>
              <div className="callout info" style={{ marginTop: 16 }}>
                <span className="c-inf" style={{ flex: "0 0 20px" }}>☎</span>
                <p className="t-b14 c-sec" style={{ margin: "0" }}>&#50672;&#46973;&#52376;&#45716; <b>&#50504;&#49900;&#48264;&#54840;</b>&#47196; &#50672;&#44208;&#46104;&#50612; &#49892;&#51228; &#48264;&#54840;&#44032; &#49324;&#50629;&#51088;&#50640;&#44172; &#44277;&#44060;&#46104;&#51648; &#50506;&#49845;&#45768;&#45796;.</p>
              </div>
            </div>
      
            <div className="block" style={{ marginBottom: "0" }}>
              <h2 className="block__t">&#44208;&#51228; &#49688;&#45800;</h2>
              <div style={{ marginTop: 14 }}>
                <label className="row between" style={{ padding: "16px 0", borderBottom: "1px solid var(--sg-border-subtle)", cursor: "pointer" }}>
                  <span className="t-b16">&#49888;&#50857; / &#52404;&#53356;&#52852;&#46300;</span>
                  <span style={{ width: 22, height: 22, borderRadius: "50%", border: "7px solid var(--sg-brand-primary)" }} /></label>
                <label className="row between" style={{ padding: "16px 0", borderBottom: "1px solid var(--sg-border-subtle)", cursor: "pointer" }}>
                  <span className="t-b16">&#44228;&#51340; &#44036;&#54200;&#44208;&#51228;</span>
                  <span style={{ width: 22, height: 22, borderRadius: "50%", border: "1.5px solid var(--sg-border-strong)" }} /></label>
                <label className="row between" style={{ padding: "16px 0", cursor: "pointer" }}>
                  <span className="t-b16">&#48372;&#54744;&#44552; &#49688;&#47161; &#54980; &#44208;&#51228; <span className="badge b-blue" style={{ marginLeft: 4 }}>&#51068;&#48176;&#52293; &#50672;&#44228;</span></span>
                  <span style={{ width: 22, height: 22, borderRadius: "50%", border: "1.5px solid var(--sg-border-strong)" }} /></label>
              </div>
              <p className="t-b12 c-ter" style={{ margin: "16px 0 0" }}>&#49444;&#48708;&#44256;&#45716; &#53685;&#49888;&#54032;&#47588;&#51473;&#44060;&#51088;&#51060;&#47728; &#53685;&#49888;&#54032;&#47588;&#51032; &#45817;&#49324;&#51088;&#44032; &#50500;&#45785;&#45768;&#45796;.
                &#44208;&#51228;&#45716; &#46321;&#47197; PG&#49324;&#51032; &#51648;&#44553;&#45824;&#54665;·&#50696;&#52824; &#49436;&#48708;&#49828;&#47484; &#53685;&#54644; &#52376;&#47532;&#46121;&#45768;&#45796;.</p>
            </div>
          </div>
      
          <aside className="side">
            <div className="panel">
              <div className="row gap12" style={{ marginBottom: 16 }}>
                <div className="avatar sq" style={{ width: 44, height: 44 }}>&#44648;</div>
                <div style={{ flex: "1" }}><div className="t-b16 fw7">&#44648;&#45143;&#54620;&#51665;&#49444;&#48708;</div>
                  <div className="t-b12 c-sec" id="bookWhen">11.19 (&#49688;) 14:00 &#48169;&#47928;</div></div>
              </div>
              <hr className="hair" style={{ margin: "0 0 14px" }} />
              <h3 className="panel__t">&#44208;&#51228; &#44552;&#50529;</h3>
              <div className="col gap8">
                <div className="row between"><span className="t-b14 c-sec">&#48176;&#44288; &#51060;&#51020;&#48512; &#48372;&#49688;</span><span className="t-b14 num">310,000</span></div>
                <div className="row between"><span className="t-b14 c-sec">&#52380;&#51109; &#47560;&#44048; &#48373;&#44396;</span><span className="t-b14 num">100,000</span></div>
                <div className="row between"><span className="t-b14 c-sec">&#54788;&#51109; &#48320;&#49688; &#52628;&#44032;&#44552;</span><span className="t-b12 c-sec">&#49849;&#51064; &#54980; &#52397;&#44396;</span></div>
              </div>
              <hr className="hair" style={{ margin: "14px 0" }} />
              <div className="row between" style={{ marginBottom: 16 }}>
                <span className="t-h16">&#51648;&#44552; &#44208;&#51228;</span><span className="t-h24 num c-brand">410,000&#50896;</span></div>
              <button className="btn large primary block" data-go="variation" data-validate="booking" data-toast="410,000원 결제 완료 \xB7 예약이 확정되었습니다">&#44208;&#51228;&#54616;&#44256; &#50696;&#50557; &#54869;&#51221;</button>
            </div>
            <div className="panel" style={{ background: "var(--sg-bg-info-subtle)", boxShadow: "none" }}>
              <div className="t-b14 fw7" style={{ marginBottom: 6 }}>&#128274; &#50640;&#49828;&#53356;&#47196;&#47196; &#48372;&#44288;&#46121;&#45768;&#45796;</div>
              <p className="t-b12 c-sec" style={{ margin: "0" }}>&#49884;&#44277; &#50756;&#47308;&#47484; &#54869;&#51064;&#54616;&#44256; &#49849;&#51064;&#54616;&#49884;&#47732; &#44536;&#46412; &#49324;&#50629;&#51088;&#50640;&#44172; &#51648;&#44553;&#46121;&#45768;&#45796;.
                &#51473;&#44060; &#49688;&#49688;&#47308; 8%&#45716; &#51648;&#44553; &#49884; &#44277;&#51228;&#46104;&#47728;, &#44256;&#44061;&#51060; &#46384;&#47196; &#48512;&#45812;&#54616;&#45716; &#44552;&#50529;&#51008; &#50630;&#49845;&#45768;&#45796;.</p>
            </div>
          </aside>
        </div></>
    </section>
  );
}
