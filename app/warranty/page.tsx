'use client';
// p-warranty — 데이터 기반으로 전환 완료: 보증 한도·내역서가 선택 견적 + 승인 추가금에서 계산됩니다.
import { useEffect, useState } from 'react';
import { DEMO_QUOTES, type Quote } from '../../lib/mock-data';
import { loadSelectedQuote } from '../../lib/quote-store';
import { loadVariation } from '../../lib/variation-store';
import { toast } from '../../lib/toast';

export default function Page() {
  const [quote, setQuote] = useState<Quote>(DEMO_QUOTES[0]);
  const [extra, setExtra] = useState(80_000);
  const [approvedDone, setApprovedDone] = useState(false);

  useEffect(() => {
    setQuote(loadSelectedQuote());
    const v = loadVariation();
    if (v) setExtra(v.extraWon);
  }, []);

  const total = quote.priceWon + extra;

  return (
    <section className="page on" id="p-warranty" data-react>
      <div className="phead"><div className="phead__in">
        <div className="crumb"><a data-go="home">홈</a><span>›</span><a data-go="tracking">시공 진행</a><span>›</span><b>시공 완료</b></div>
        <h1>시공이 완료되었습니다</h1>
        <p className="sub">결과를 확인하고 승인하시면 대금이 지급되고, 디지털 보증서와 공식 내역서가 발급됩니다.</p>
      </div></div>

      <div className="flow">
        <div>
          <div className="block">
            <h2 className="block__t">시공 결과</h2>
            <p className="block__d">가운데 손잡이를 넘어 Before / After를 비교하세요.</p>
            <div className="ba" id="ba2" style={{ aspectRatio: '16/9' }}>
              <div className="ba__l ph wet" /><div className="ba__r ph clean" />
              <span className="ba__tag l">BEFORE</span><span className="ba__tag r">AFTER</span>
              <div className="ba__hd" />
            </div>
            <div className="row gap6" style={{ marginTop: 12, flexWrap: 'wrap' }}>
              <span className="verified">✓ 촬영 메타데이터 검증됨</span>
              <span className="badge b-gline">2026.11.19 17:48 촬영</span>
              <span className="badge b-gline">시공 일정과 일치</span>
            </div>
          </div>

          <div className="block">
            <h2 className="block__t">1년 무상 A/S 보증서</h2>
            <p className="block__d">플랫폼 결제 건에 한해 설비고가 재시공·A/S를 보장합니다.</p>
            <div className="cert">
              <div className="row between" style={{ position: 'relative', zIndex: 1, marginBottom: 24 }}>
                <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-.4px' }}>설비고 안심보증</div>
                <span className="badge" style={{ background: 'rgba(255,255,255,.2)', color: '#fff' }}>유효</span>
              </div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ opacity: 0.8, fontSize: 12, marginBottom: 4 }}>보증번호</div>
                <div className="num" style={{ fontSize: 22, fontWeight: 800, letterSpacing: '.5px', marginBottom: 20 }}>SB-W-2611-0417</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
                  <div><div style={{ opacity: 0.8, fontSize: 12 }}>보증 기간</div>
                    <div className="fw7" style={{ fontSize: 15 }}>2026.11.19 ~ 2027.11.18</div></div>
                  <div><div style={{ opacity: 0.8, fontSize: 12 }}>보증 한도</div>
                    <div className="fw7 num" style={{ fontSize: 15 }}>{total.toLocaleString()}원</div></div>
                  <div><div style={{ opacity: 0.8, fontSize: 12 }}>보증 범위</div>
                    <div className="fw7" style={{ fontSize: 15 }}>동일 부위 재누수</div></div>
                </div>
              </div>
            </div>
            <div className="callout" style={{ marginTop: 16 }}>
              <span className="c-ter" style={{ flex: '0 0 20px' }}>ⓘ</span>
              <p className="t-b12 c-sec" style={{ margin: 0 }}>보증은 거래액 적립 보증기금과 입점사 배상책임보험으로 이중화되어 운영되는
                <b> 보험 기반 별도 상품</b>입니다. 통신판매중개자로서의 설비고 지위와는 별개입니다.</p>
            </div>
          </div>

          <div className="block" style={{ marginBottom: 0 }}>
            <h2 className="block__t">플랫폼 공식 내역서</h2>
            <p className="block__d">보험 청구·관리비 정산·세금계산서에 그대로 사용할 수 있는 표준 양식입니다.</p>
            <div className="doc">
              <div className="doc__hd">
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-.3px' }}>시공 내역서</div>
                  <div className="t-b12 c-sec" style={{ marginTop: 2 }}>설비고 플랫폼 발행 · 표준 공정 DB 기준</div>
                </div>
                <div style={{ textAlign: 'right' }} className="t-b12 c-sec">
                  <div>발행일 2026.11.19</div><div className="num">SB-2611-0417</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px', marginBottom: 16 }}>
                <div className="row between"><span className="c-sec">현장</span><span>청솔아파트 103동 1204호</span></div>
                <div className="row between"><span className="c-sec">시공사업자</span><span>{quote.proName} (123-45-67890)</span></div>
                <div className="row between"><span className="c-sec">시공일</span><span className="num">2026.11.19</span></div>
                <div className="row between"><span className="c-sec">하자 유형</span><span>배관 이음부 누수</span></div>
              </div>
              <table>
                <tbody>
                  <tr><th>공정</th><th>규격 · 내용</th><th style={{ textAlign: 'right' }}>금액</th></tr>
                  {quote.lineItems.map(li => (
                    <tr key={li.name}><td>{li.name}</td><td className="c-sec">표준 공정 기준</td>
                      <td className="n">{li.won.toLocaleString()}</td></tr>
                  ))}
                  {extra > 0 && (
                    <tr><td>현장 변수 (승인)</td><td className="c-sec">고객 항목별 승인분</td>
                      <td className="n">{extra.toLocaleString()}</td></tr>
                  )}
                  <tr><td colSpan={2} style={{ fontWeight: 700, paddingTop: 12, border: 0 }}>합계 (VAT 포함)</td>
                    <td className="n" style={{ fontWeight: 800, fontSize: 16, paddingTop: 12, border: 0 }}>{total.toLocaleString()}원</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <aside className="side">
          <div className="panel">
            <h3 className="panel__t">완료 승인</h3>
            <p className="t-b14 c-sec" style={{ margin: '0 0 14px' }}>승인하시면 에스크로에 보관된 {total.toLocaleString()}원이
              사업자에게 지급되고, 1년 보증이 시작됩니다.</p>
            <button className={'btn large primary block' + (approvedDone ? ' done' : '')} disabled={approvedDone}
              onClick={() => { setApprovedDone(true);
                toast('시공 완료를 승인했습니다 · 에스크로 대금이 사업자에게 지급됩니다'); }}>
              {approvedDone ? '✓ 승인 완료' : '시공 완료 승인'}</button>
            <button className="btn medium solid block" style={{ marginTop: 8 }}
              data-toast="재시공 요청 시 1년 보증 범위에서 무상 처리됩니다 · 데모에서는 접수가 생략됩니다">재시공 요청</button>
          </div>
          <div className="panel">
            <h3 className="panel__t">이어서 할 수 있는 일</h3>
            <div className="col gap8">
              <button className="btn medium outlined block" data-go="insurance">보험금 청구하기</button>
              <button className="btn medium outlined block" data-go="history">우리집 이력에 저장</button>
              <button className="btn medium ghost block" data-toast="데모에서는 PDF 다운로드가 생략됩니다">내역서 PDF 내려받기</button>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
