// p-home — 데이터 기반으로 전환 완료: 카테고리(SERVICES)·시공 사례(DEMO_CASES)·공동구매(GROUPBUY)가
// 다른 화면과 같은 단일 소스에서 렌더됩니다. (서버 컴포넌트)
import { DEMO_CASES, GROUPBUY, SERVICES, tierFor } from '../lib/mock-data';

const STATS = [
  { v: '4,182', unit: '', label: '누적 시공 케이스', brand: true },
  { v: '±8%', unit: '', label: '기준가 오차 범위' },
  { v: '1년', unit: '', label: '무상 A/S 보증' },
  { v: '평균 2.4일', unit: '', label: '보험금 정산 소요' },
];

export default function Page() {
  const gbPct = Math.min(100, Math.round(GROUPBUY.current / GROUPBUY.goal * 100));
  const nowWon = tierFor(GROUPBUY.current).won;
  const finalWon = GROUPBUY.tiers[GROUPBUY.tiers.length - 1].won;

  return (
    <section className="page on" id="p-home">
      <div className="wrap">
        <div className="hero">
          <div className="badge b-brand b12" style={{ marginBottom: 12 }}>AI 진단 · 기준가 공개 · 1년 안심보증</div>
          <h1 className="t-d28" style={{ margin: '0 0 6px' }}>
            <span className="c-brand">강남구 청솔아파트</span>의 배관,<br />어디가 문제일까요?
          </h1>
          <p className="t-b16 c-sec" style={{ margin: '0 0 22px' }}>사진 한 장이면 하자 유형과 적정 가격 범위를 알려드려요.</p>
          <div className="row gap8" style={{ maxWidth: 560, margin: '0 auto' }}>
            <div className="searchbar">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.8" /><path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
              <input placeholder="어떤 증상인가요? (예: 천장 누수)" />
            </div>
            <button className="btn large primary" data-go="diag1" style={{ flex: '0 0 auto' }}>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 2.5l1.6 4.3 4.4 1.7-4.4 1.7L10 14.5 8.4 10.2 4 8.5l4.4-1.7L10 2.5z" fill="currentColor" /></svg>
              AI 사진 진단
            </button>
          </div>

          <div className="cats">
            {SERVICES.map(s => (
              <button key={s.id} className="cat" data-go={s.go} data-svc={s.name}>
                <i style={{ background: s.iconBg }}>{s.icon}</i>
                <span>{s.nameLines[0]}<br />{s.nameLines[1]}</span>
                <em className={'cat__how' + (s.howTone ? ' how-' + s.howTone : '')}>{s.how}</em>
              </button>
            ))}
          </div>
          <div className="t-b12 c-ter" style={{ marginTop: 14 }}>
            서비스마다 시작하는 방법이 다릅니다 · <span className="more" data-go="services" style={{ fontSize: 12 }}>진입 경로 전체 보기 ›</span>
          </div>
        </div>
      </div>

      <hr className="thick" />

      <div className="wrap">
        <section className="sec">
          <div className="sec__hd">
            <div>
              <div className="sec__ov">최근 강남구 청솔아파트 · 준공 1999년</div>
              <h2 className="t-h20" style={{ margin: 0 }}>우리 아파트에서 실제로 이렇게 고쳤어요</h2>
            </div>
            <span className="more" data-go="cases">전체 사례 보기 ›</span>
          </div>
          <div className="grid g6">
            {DEMO_CASES.map(c => (
              <div key={c.id} className="casecard" data-go="case-detail">
                <div className={'ph ' + c.tone}>Before</div>
                <div className="t-b12 fw6" style={{ marginTop: 8 }}>{c.title}</div>
                <div className="t-b12 c-sec">{c.work} · {c.price}만원</div>
              </div>
            ))}
          </div>
        </section>

        <hr className="hair" />

        <section className="sec">
          <div className="sec__hd"><div>
            <div className="sec__ov">계약 전에 확인하세요</div>
            <h2 className="t-h20" style={{ margin: 0 }}>설비고는 가격의 근거를 먼저 보여드립니다</h2>
          </div></div>
          <div className="grid g3">
            <div className="card pad">
              <div className="badge b-brand" style={{ marginBottom: 10 }}>STEP 1</div>
              <div className="t-h16" style={{ marginBottom: 4 }}>사진을 올리면 AI가 진단</div>
              <p className="t-b14 c-sec" style={{ margin: 0 }}>하자 유형과 긴급도를 분류하고, 전문가가 한 번 더 검수합니다.</p>
            </div>
            <div className="card pad">
              <div className="badge b-brand" style={{ marginBottom: 10 }}>STEP 2</div>
              <div className="t-h16" style={{ marginBottom: 4 }}>같은 집, 같은 증상 사례 대조</div>
              <p className="t-b14 c-sec" style={{ margin: 0 }}>연식·배관 재질이 비슷한 실제 시공 사례에서 기준가 범위를 뽑습니다.</p>
            </div>
            <div className="card pad">
              <div className="badge b-brand" style={{ marginBottom: 10 }}>STEP 3</div>
              <div className="t-h16" style={{ marginBottom: 4 }}>추가금은 항목으로 승인</div>
              <p className="t-b14 c-sec" style={{ margin: 0 }}>현장에서 값이 오르면 어떤 변수로 얼마인지 보고 직접 승인합니다.</p>
            </div>
          </div>
          <div className="grid g4" style={{ marginTop: 20 }}>
            {STATS.map(s => (
              <div key={s.label} className="stat">
                <b className={'num' + (s.brand ? ' c-brand' : '')}>{s.v}</b>
                <span className="t-b12 c-sec">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="hair" />

        <section className="sec">
          <div className="sec__hd"><div>
            <div className="sec__ov">우리 단지 103동</div>
            <h2 className="t-h20" style={{ margin: 0 }}>난방배관 클리닝 공동구매가 진행 중이에요</h2>
          </div><span className="more" data-go="groupbuy">참여하기 ›</span></div>
          <div className="card pad" style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 280 }}>
              <div className="row between" style={{ marginBottom: 8 }}>
                <span className="t-b14 fw6">현재 <span className="c-brand">{GROUPBUY.current}세대</span> 참여 · {GROUPBUY.goal}세대 달성 시 최저가</span>
                <span className="t-b14 fw7 num">{gbPct}%</span>
              </div>
              <div className="gauge"><i style={{ width: gbPct + '%' }} /></div>
              <div className="t-b12 c-sec" style={{ marginTop: 8 }}>모집 마감까지 {GROUPBUY.deadlineDays}일 남음 · 같은 라인을 묶어 시공해 단가가 내려갑니다</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="t-b12 c-sec" style={{ textDecoration: 'line-through' }}>1세대 {Math.round(GROUPBUY.indivWon / 10_000)}만원</div>
              <div className="t-h24 c-brand num">{(finalWon / 10_000).toFixed(1)}만원</div>
              <button className="btn medium primary" data-go="groupbuy" style={{ marginTop: 8 }}>공동구매 참여</button>
            </div>
          </div>
        </section>

        <hr className="hair" />

        <section className="sec">
          <div className="grid g4">
            <div><div className="t-h16" style={{ marginBottom: 4 }}>🛡️ 1년 안심 보증</div>
              <p className="t-b14 c-sec" style={{ margin: 0 }}>플랫폼 결제 건은 재시공·A/S를 설비고가 보장합니다.</p></div>
            <div><div className="t-h16" style={{ marginBottom: 4 }}>🔒 에스크로 결제</div>
              <p className="t-b14 c-sec" style={{ margin: 0 }}>시공 완료를 확인한 뒤 대금이 사업자에게 지급됩니다.</p></div>
            <div><div className="t-h16" style={{ marginBottom: 4 }}>📄 보험 Fast-Track</div>
              <p className="t-b14 c-sec" style={{ margin: 0 }}>공식 내역서가 보험사 청구 서류로 바로 이어집니다.</p></div>
            <div><div className="t-h16" style={{ marginBottom: 4 }}>📷 조작 불가 필모그래피</div>
              <p className="t-b14 c-sec" style={{ margin: 0 }}>Before/After 촬영 메타데이터를 시공 일정과 대조 검증합니다.</p></div>
          </div>
        </section>
      </div>

      <footer style={{ background: 'var(--sg-bg-subtle)', marginTop: 24, padding: '32px 0' }}>
        <div className="wrap">
          <div className="logo" style={{ fontSize: 17, marginBottom: 10 }}>설비고</div>
          <p className="t-b12 c-ter" style={{ margin: 0, maxWidth: 720 }}>
            설비고는 통신판매중개자로서 통신판매의 당사자가 아니며, 개별 시공에 대한 책임은 각 사업자에게 있습니다.
            플랫폼이 제공하는 기준가는 참고용 가견적이며 확정 견적이 아닙니다.
            보증 프로그램은 보험 기반 별도 상품으로 운영됩니다.
          </p>
        </div>
      </footer>
    </section>
  );
}
