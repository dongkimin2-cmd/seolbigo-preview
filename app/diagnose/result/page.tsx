'use client';
// p-diag3 — 진단 응답 데이터로 렌더 (POST /api/diagnose 결과가 diag-store 를 통해 전달됨)
// 헤드라인·긴급도·신뢰도·기준가 범위·공정 내역이 전부 DiagnosisResult 에서 나옵니다.
import { useEffect, useState } from 'react';
import { DEMO_DIAGNOSIS, type DiagnosisResult } from '../../../lib/mock-data';
import { loadDiagnosis } from '../../../lib/diag-store';

export default function Page() {
  const [result, setResult] = useState<DiagnosisResult>(DEMO_DIAGNOSIS);
  const [symptoms, setSymptoms] = useState<string[]>([]);

  useEffect(() => {
    const s = loadDiagnosis();
    if (s) { setResult(s.result); setSymptoms(s.input.symptoms); }
  }, []);

  const r = result;
  const span = r.priceMax - r.priceMin;
  const pct = (v: number) => ((v - r.priceMin) / span * 100).toFixed(1) + '%';

  return (
    <section className="page on" id="p-diag3" data-react>
      <div className="phead"><div className="phead__in">
        <div className="crumb"><a data-go="home">홈</a><span>›</span><a data-go="diag1">AI 사진 진단</a><span>›</span><b>진단 결과</b></div>
        <div className="row between" style={{ alignItems: 'flex-start' }}>
          <div>
            <h1>{r.title}</h1>
            <p className="sub">{r.meta} · 진단번호 {r.caseNo}</p>
          </div>
          <div className="row gap8">
            <span className={'urg ' + r.urgency}><i />{r.urgencyLabel}</span>
            <span className="verified">✓ 전문가 검수 완료</span>
          </div>
        </div>
      </div></div>

      <div className="flow">
        <div>
          <div className="steps">
            <div className="done">1. 현장 사진</div><div className="done">2. AI 분석</div><div className="on">3. 진단 결과</div>
          </div>

          <div className="block">
            <h2 className="block__t">진단 내용</h2>
            <p className="block__d">{r.description}</p>
            {symptoms.length > 0 && (
              <div className="row gap6" style={{ flexWrap: 'wrap', marginBottom: 16 }}>
                <span className="t-b12 c-sec" style={{ alignSelf: 'center' }}>입력하신 증상</span>
                {symptoms.map(s => <span key={s} className="badge b-gline b12">{s}</span>)}
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: '220px minmax(0,1fr)', gap: 24, alignItems: 'start' }}>
              <div className="ph wet" style={{ aspectRatio: '4/3', borderRadius: 10 }} />
              <div>
                <div className="row between" style={{ marginBottom: 12 }}>
                  <span className="t-b14 fw6">AI 분류 신뢰도</span>
                  <span className="t-b14 fw7 num c-brand">{r.confidence[0].pct}%</span></div>
                <div className="col gap10" style={{ gap: 10 }}>
                  {r.confidence.map(c => (
                    <div key={c.label} className="row between gap12">
                      <span className={'t-b14' + (c.main ? '' : ' c-sec')} style={{ flex: '0 0 130px' }}>{c.label}</span>
                      <div className="posbar" style={{ flex: 1 }}>
                        <i style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: c.pct + '%', borderRadius: 999,
                          background: c.main ? 'var(--sg-brand-primary)' : 'var(--sg-gray-300)' }} />
                      </div>
                      <span className="t-b12 num c-sec" style={{ width: 34, textAlign: 'right' }}>{c.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="block">
            <h2 className="block__t">이 조건의 기준가 범위</h2>
            <p className="block__d">강남구 · 준공 27년차 · 중앙난방 · {r.type} <b className="c-brand">유사 사례 {r.matchedCases}건</b> 기준</p>
            <div className="range" style={{ paddingTop: 34 }}>
              <div className="range__bar">
                <div className="range__fair" style={{ left: pct(r.fairMin), right: (100 - parseFloat(pct(r.fairMax))).toFixed(1) + '%' }} />
                <div className="range__mark" style={{ left: pct(r.priceMid) }} />
                <div className="range__cap" style={{ left: pct(r.priceMid) }}>중앙값 {r.priceMid}만원</div>
              </div>
              <div className="range__lbl">
                <span className="num">최저 {r.priceMin}만원</span>
                <span className="c-suc fw6">적정 구간 {r.fairMin}~{r.fairMax}만원</span>
                <span className="num">최고 {r.priceMax}만원</span>
              </div>
            </div>
            <hr className="hair" style={{ margin: '22px 0 16px' }} />
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <tbody>
                {r.priceItems.map((it, i) => (
                  <tr key={it.name}>
                    <td style={{ padding: '9px 0', color: 'var(--sg-text-secondary)',
                      borderBottom: i < r.priceItems.length - 1 ? '1px solid var(--sg-border-subtle)' : undefined }}>{it.name}</td>
                    <td className="num" style={{ textAlign: 'right',
                      borderBottom: i < r.priceItems.length - 1 ? '1px solid var(--sg-border-subtle)' : undefined }}>{it.range}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="callout" style={{ marginTop: 18 }}>
              <span className="c-ter" style={{ flex: '0 0 20px' }}>ⓘ</span>
              <p className="t-b12 c-sec" style={{ margin: 0 }}>이 금액은 <b>참고 기준가</b>이며 확정 견적이 아닙니다.
                현장 상황에 따라 달라질 수 있으며, 달라지는 경우 항목별로 승인을 받은 뒤에만 청구됩니다.</p>
            </div>
          </div>

          <div className="block">
            <div className="row between" style={{ marginBottom: 16 }}>
              <h2 className="block__t" style={{ margin: 0 }}>나와 같은 집, 같은 증상 <span className="c-brand num">{r.matchedCases}건</span></h2>
              <span className="more" data-go="cases">모두 보기 ›</span>
            </div>
            <div className="grid g3" style={{ gap: 16 }}>
              <div className="casecard card" style={{ overflow: 'hidden' }} data-go="case-detail">
                <div className="ph wet" style={{ aspectRatio: '4/3', borderRadius: 0 }} />
                <div style={{ padding: '12px 14px 14px' }}>
                  <div className="t-b12 c-sec">청솔 · 1999년 · 12층</div>
                  <div className="t-b14 fw6">이음부 보수 + 천장 복구</div>
                  <div className="t-h18 num" style={{ marginTop: 4 }}>38만원</div></div></div>
              <div className="casecard card" style={{ overflow: 'hidden' }} data-go="case-detail">
                <div className="ph pipe" style={{ aspectRatio: '4/3', borderRadius: 0 }} />
                <div style={{ padding: '12px 14px 14px' }}>
                  <div className="t-b12 c-sec">개포 · 2001년 · 8층</div>
                  <div className="t-b14 fw6">탐지 + 이음부 교체</div>
                  <div className="t-h18 num" style={{ marginTop: 4 }}>45만원</div></div></div>
              <div className="casecard card" style={{ overflow: 'hidden' }} data-go="case-detail">
                <div className="ph clean" style={{ aspectRatio: '4/3', borderRadius: 0 }} />
                <div style={{ padding: '12px 14px 14px' }}>
                  <div className="t-b12 c-sec">역삼 · 1997년 · 5층</div>
                  <div className="t-b14 fw6">이음부 보수만</div>
                  <div className="t-h18 num" style={{ marginTop: 4 }}>33만원</div></div></div>
            </div>
          </div>

          <div className="block" style={{ marginBottom: 0 }}>
            <h2 className="block__t">지금 해야 할 일</h2>
            <div className="col gap12" style={{ marginTop: 14 }}>
              <div className="row gap10" style={{ gap: 10 }}><span className="badge b-red">1</span>
                <span className="t-b14">윗집에 연락해 사용을 잠시 멈춰달라고 요청하세요.</span></div>
              <div className="row gap10" style={{ gap: 10 }}><span className="badge b-orange">2</span>
                <span className="t-b14">누수 부위 아래 가구·가전을 옮기고 현재 상태를 사진으로 남겨두세요.</span></div>
              <div className="row gap10" style={{ gap: 10 }}><span className="badge b-gray">3</span>
                <span className="t-b14">일상생활배상책임보험 가입 여부를 확인하세요. 윗집 보험으로 처리될 수 있습니다.</span></div>
            </div>
          </div>
        </div>

        <aside className="side">
          <div className="panel">
            <h3 className="panel__t">이 진단으로 할 수 있는 것</h3>
            <div className="col gap8">
              <button className="btn large primary block" data-go="quotes">견적 3곳 받기</button>
              <button className="btn medium outlined block" data-go="cases">유사 사례 {r.matchedCases}건 보기</button>
              <button className="btn medium ghost block" data-toast="데모에서는 PDF 다운로드가 생략됩니다">진단서 PDF 내려받기</button>
            </div>
            <hr className="hair" style={{ margin: '16px 0' }} />
            <div className="col gap8">
              <div className="row between"><span className="t-b14 c-sec">예상 소요</span><span className="t-b14 fw6">4시간</span></div>
              <div className="row between"><span className="t-b14 c-sec">보험 처리 가능성</span><span className="t-b14 fw6 c-suc">높음</span></div>
              <div className="row between"><span className="t-b14 c-sec">방문 가능 사업자</span><span className="t-b14 fw6">7곳</span></div>
            </div>
          </div>
          <div className="panel" style={{ background: 'var(--sg-bg-info-subtle)', boxShadow: 'none' }}>
            <div className="t-b14 fw7" style={{ marginBottom: 6 }}>보험으로 처리될 수 있어요</div>
            <p className="t-b12 c-sec" style={{ margin: '0 0 12px' }}>윗집 원인 누수는 상대방 일상생활배상책임보험 대상입니다.
              설비고는 시공 내역을 보험사 청구용 사실자료로 자동 정리해 드립니다.</p>
            <button className="btn small outlined block" data-go="insurance">보험 청구 절차 보기</button>
          </div>
        </aside>
      </div>
    </section>
  );
}
