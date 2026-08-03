'use client';
// p-insurance — 데이터 기반으로 전환 완료: 사실자료 리포트의 시공 내역·청구 금액이
// 선택 견적 + 승인 추가금에서 계산되고, 표준 분포는 STANDARD_RANGES 대조표에서 나옵니다.
import { useEffect, useState } from 'react';
import { CLAIM_TOTAL_RANGE, DEMO_QUOTES, INSURANCE_DEDUCTIBLE, STANDARD_RANGES, type Quote }
  from '../../lib/mock-data';
import { loadSelectedQuote } from '../../lib/quote-store';
import { loadVariation } from '../../lib/variation-store';
import { toast } from '../../lib/toast';

export default function Page() {
  const [quote, setQuote] = useState<Quote>(DEMO_QUOTES[0]);
  const [extra, setExtra] = useState(80_000);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setQuote(loadSelectedQuote());
    const v = loadVariation();
    if (v) setExtra(v.extraWon);
  }, []);

  const rows = [
    ...quote.lineItems.map(li => ({ name: li.name, won: li.won })),
    ...(extra > 0 ? [{ name: '현장 변수 (고객 승인)', won: extra }] : []),
  ];
  const total = rows.reduce((s, r) => s + r.won, 0);
  const expected = Math.max(0, total - INSURANCE_DEDUCTIBLE);

  return (
    <section className="page on" id="p-insurance" data-react>
      <div className="phead"><div className="phead__in">
        <div className="crumb"><a data-go="home">홈</a><span>›</span><b>보험 청구 Fast-Track</b></div>
        <h1>서류를 다시 만들 필요가 없습니다</h1>
        <p className="sub">시공 기록이 그대로 보험사 청구용 표준 사실자료가 됩니다. 접수부터 정산까지 평균 2.4일.</p>
      </div></div>

      <div className="flow">
        <div>
          <div className="block">
            <h2 className="block__t">자동 생성된 사실자료 리포트</h2>
            <p className="block__d">설비고는 손해사정을 대신하지 않습니다. 판단에 필요한 <b>사실 증거를 표준 양식으로 정리</b>해 제공합니다.</p>
            <div className="doc">
              <div className="doc__hd">
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-.3px' }}>누수 사고 사실자료 리포트</div>
                  <div className="t-b12 c-sec" style={{ marginTop: 2 }}>일상생활배상책임보험 청구용 · 표준 양식 v2.1</div>
                </div>
                <div style={{ textAlign: 'right' }} className="t-b12 c-sec">
                  <div>작성일 2026.11.19</div><div className="num">R-2611-0417</div></div>
              </div>

              <div className="t-b12 fw7" style={{ margin: '0 0 8px' }}>1. 사고 개요</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px', marginBottom: 18 }}>
                <div className="row between"><span className="c-sec">사고 일시</span><span className="num">2026.11.16 추정</span></div>
                <div className="row between"><span className="c-sec">접수 일시</span><span className="num">2026.11.17 21:04</span></div>
                <div className="row between"><span className="c-sec">사고 장소</span><span>청솔 103동 1204호 안방</span></div>
                <div className="row between"><span className="c-sec">원인 세대</span><span>1304호 (상층)</span></div>
              </div>

              <div className="t-b12 fw7" style={{ margin: '0 0 8px' }}>2. 원인 부위 확인</div>
              <div className="grid g3" style={{ gap: 8, marginBottom: 8 }}>
                <div className="ph wet" style={{ aspectRatio: '4/3', borderRadius: 6 }} />
                <div className="ph pipe" style={{ aspectRatio: '4/3', borderRadius: 6 }} />
                <div className="ph clean" style={{ aspectRatio: '4/3', borderRadius: 6 }} />
              </div>
              <div className="t-b12 c-sec" style={{ marginBottom: 18 }}>
                촬영 메타데이터 검증 완료 · 열화상 판독 결과 첨부 · AI 분류 신뢰도 87%</div>

              <div className="t-b12 fw7" style={{ margin: '0 0 8px' }}>3. 시공 내역 및 가격 구성</div>
              <table style={{ marginBottom: 18 }}>
                <tbody>
                  <tr><th>공정</th><th style={{ textAlign: 'right' }}>청구 금액</th><th style={{ textAlign: 'right' }}>표준 분포</th><th style={{ textAlign: 'right' }}>판정</th></tr>
                  {rows.map(r => (
                    <tr key={r.name}><td>{r.name}</td>
                      <td className="n">{r.won.toLocaleString()}</td>
                      <td className="n c-sec">{STANDARD_RANGES[r.name] ?? '—'}</td>
                      <td className="n"><span className="badge b-green">적정</span></td></tr>
                  ))}
                  <tr><td style={{ fontWeight: 700, paddingTop: 12, border: 0 }}>합계</td>
                    <td className="n" style={{ fontWeight: 800, paddingTop: 12, border: 0 }}>{total.toLocaleString()}</td>
                    <td className="n c-sec" style={{ paddingTop: 12, border: 0 }}>{CLAIM_TOTAL_RANGE}</td>
                    <td className="n" style={{ paddingTop: 12, border: 0 }}><span className="badge b-green">범위 내</span></td></tr>
                </tbody>
              </table>

              <div className="t-b12 fw7" style={{ margin: '0 0 8px' }}>4. 첨부 서류</div>
              <div className="row gap6" style={{ flexWrap: 'wrap' }}>
                <span className="badge b-gline b12">플랫폼 공식 내역서</span>
                <span className="badge b-gline b12">Before/After 사진 6매</span>
                <span className="badge b-gline b12">열화상 판독지</span>
                <span className="badge b-gline b12">사업자 등록증 · 배상책임보험 증권</span>
                <span className="badge b-gline b12">에스크로 결제 확인서</span>
              </div>
            </div>
            <div className="callout" style={{ marginTop: 16 }}>
              <span className="c-ter" style={{ flex: '0 0 20px' }}>⚖️</span>
              <p className="t-b12 c-sec" style={{ margin: 0 }}>본 리포트는 <b>사실자료 제공</b>에 한하며, 보험금 사정이나 적정성 판단을 대행하지 않습니다.
                손해사정 업무는 등록 손해사정법인이 수행합니다.</p>
            </div>
          </div>

          <div className="block" style={{ marginBottom: 0 }}>
            <h2 className="block__t">청구 진행 상황</h2>
            <div className="tl" style={{ marginTop: 20 }}>
              <div className="tl__i done"><div className="t-b16 fw7">리포트 자동 생성</div>
                <div className="t-b14 c-sec">11.19 18:02 · 시공 완료와 동시에 생성</div></div>
              <div className="tl__i done"><div className="t-b16 fw7">원인 세대 동의 확인</div>
                <div className="t-b14 c-sec">11.19 19:20 · 1304호 보험 접수 동의</div></div>
              <div className="tl__i now"><div className="row gap6"><span className="t-b16 fw7">보험사 접수</span><span className="badge b-brand">현재</span></div>
                <div className="t-b14 c-sec">11.19 19:24 · ○○화재 접수번호 2026-114-88213</div></div>
              <div className="tl__i"><div className="t-b16 fw7 c-ter">손해사정 검토</div>
                <div className="t-b14 c-ter">표준 분포 대조 결과 첨부로 현장 조사 생략 가능</div></div>
              <div className="tl__i"><div className="t-b16 fw7 c-ter">보험금 지급</div>
                <div className="t-b14 c-ter">평균 2.4일 소요</div></div>
            </div>
          </div>
        </div>

        <aside className="side">
          <div className="panel">
            <h3 className="panel__t">청구 요약</h3>
            <div className="col gap8">
              <div className="row between"><span className="t-b14 c-sec">보험 종류</span><span className="t-b14 fw6">일상생활배상책임</span></div>
              <div className="row between"><span className="t-b14 c-sec">피보험자</span><span className="t-b14 fw6">1304호 (상층)</span></div>
              <div className="row between"><span className="t-b14 c-sec">자기부담금</span><span className="t-b14 num">{INSURANCE_DEDUCTIBLE.toLocaleString()}원</span></div>
            </div>
            <hr className="hair" style={{ margin: '14px 0' }} />
            <div className="row between" style={{ marginBottom: 4 }}>
              <span className="t-b14 c-sec">청구 금액</span><span className="t-b14 num">{total.toLocaleString()}원</span></div>
            <div className="row between" style={{ marginBottom: 16 }}>
              <span className="t-h16">예상 수령액</span><span className="t-h20 num c-brand">{expected.toLocaleString()}원</span></div>
            <button className={'btn large primary block' + (submitted ? ' done' : '')} disabled={submitted}
              onClick={() => { setSubmitted(true);
                toast('사실자료 패키지가 보험사에 제출되었습니다 · 심사 결과는 알림으로 안내됩니다'); }}>
              {submitted ? '✓ 제출 완료' : '보험사에 제출'}</button>
            <button className="btn medium ghost block" style={{ marginTop: 8 }}
              data-toast="데모에서는 PDF 다운로드가 생략됩니다">리포트 PDF 내려받기</button>
          </div>
          <div className="panel" style={{ background: 'var(--sg-bg-success-subtle)', boxShadow: 'none' }}>
            <div className="t-b14 fw7" style={{ marginBottom: 6 }}>왜 빠른가요?</div>
            <p className="t-b12 c-sec" style={{ margin: 0 }}>보험사가 현장 조사를 하는 가장 큰 이유는
              청구 금액이 적정한지 알 수 없기 때문입니다. 설비고는 표준 공정 DB의 분포를 함께 제출하므로
              조사 단계를 건너뛸 수 있습니다.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
