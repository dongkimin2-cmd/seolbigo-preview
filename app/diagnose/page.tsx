'use client';
// p-diag1 — 상태 기반으로 전환 완료 (MockupBridge 비의존)
// 증상·주소를 React 상태로 관리하고, 제출 시 POST /api/diagnose → 결과를 저장 후 분석 화면으로 이동
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SYMPTOMS } from '../../lib/mock-data';
import { saveDiagnosis } from '../../lib/diag-store';
import { toast } from '../../lib/toast';

export default function Page() {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set([SYMPTOMS[0], SYMPTOMS[1]]));
  const [address, setAddress] = useState('서울 강남구 청솔아파트 103동 1204호');
  const [addrErr, setAddrErr] = useState(false);
  const [busy, setBusy] = useState(false);

  const toggle = (s: string) => setSelected(prev => {
    const next = new Set(prev);
    if (next.has(s)) next.delete(s); else next.add(s);
    return next;
  });

  async function submit() {
    if (!selected.size) { toast('증상을 1개 이상 선택해주세요.', 'warn'); return; }
    if (!address.trim()) { setAddrErr(true); toast('아파트 · 주소를 입력해주세요.', 'warn'); return; }
    setBusy(true);
    try {
      const res = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms: [...selected], address }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error('진단 요청 실패');
      saveDiagnosis({ input: data.input, result: data.result });
      router.push('/diagnose/analyzing');
    } catch {
      toast('진단 요청에 실패했어요. 잠시 후 다시 시도해주세요.', 'warn');
      setBusy(false);
    }
  }

  return (
    <section className="page on" id="p-diag1" data-react>
      <div className="phead"><div className="phead__in">
        <div className="crumb"><a data-go="home">홈</a><span>›</span><a data-go="services">전체 서비스</a><span>›</span><b id="svcTag">누수피해복구</b></div>
        <h1>사진 한 장으로 하자 유형과 기준가를 확인하세요</h1>
        <p className="sub"><span className="badge b-brand b12" style={{ marginRight: 6 }}>사진 진단</span>진단은 무료입니다.
          시공을 맡기지 않아도 결과와 유사 사례를 그대로 받아보실 수 있어요.</p>
      </div></div>

      <div className="flow">
        <div>
          <div className="steps">
            <div className="on">1. 현장 사진</div><div>2. AI 분석</div><div>3. 진단 결과</div>
          </div>

          <div className="block">
            <h2 className="block__t">현장 사진 · 동영상</h2>
            <p className="block__d">천장·벽 얼룩, 물이 새는 부위, 배관 연결부가 잘 보이게 2~3장이면 충분합니다.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
              <div className="ph wet" style={{ aspectRatio: '1/1', borderRadius: 10, position: 'relative' }}>
                <span className="badge b-dim" style={{ position: 'absolute', top: 8, left: 8 }}>1</span></div>
              <div className="ph pipe" style={{ aspectRatio: '1/1', borderRadius: 10, position: 'relative' }}>
                <span className="badge b-dim" style={{ position: 'absolute', top: 8, left: 8 }}>2</span></div>
              <div style={{ aspectRatio: '1/1', borderRadius: 10, border: '1px dashed var(--sg-border-strong)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer', color: 'var(--sg-text-tertiary)' }}>
                <span style={{ fontSize: 26 }}>＋</span><span className="t-b12">파일 추가</span></div>
              <div style={{ aspectRatio: '1/1', borderRadius: 10, background: 'var(--sg-bg-subtle)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, padding: 12, textAlign: 'center' }}>
                <span className="t-b12 c-sec">드래그해서<br />올려도 됩니다</span></div>
            </div>
            <div className="t-b12 c-sec" style={{ marginTop: 12 }}>JPG · PNG · MP4 / 최대 5개 / 개당 50MB</div>
          </div>

          <div className="block">
            <h2 className="block__t">어떤 증상인가요? <span className="c-dan">*</span></h2>
            <p className="block__d">해당하는 항목을 모두 선택하세요. 선택할수록 유사 사례 매칭이 정확해집니다.</p>
            <div className="row gap6" id="diagSymChips" style={{ flexWrap: 'wrap' }}>
              {SYMPTOMS.map(s => (
                <button key={s} className="chip sm" aria-pressed={selected.has(s)}
                  onClick={() => toggle(s)}>{s}</button>
              ))}
            </div>
          </div>

          <div className="block" style={{ marginBottom: 0 }}>
            <h2 className="block__t">건물 정보</h2>
            <p className="block__d">같은 연식·같은 배관 재질의 사례만 골라 비교하기 위해 필요합니다.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="field" style={{ gridColumn: '1/-1' }}><span className="lb">아파트 · 주소 <span className="rq">*</span></span>
                <input className={'inp' + (addrErr ? ' err' : '')} id="diagAddr" value={address}
                  onChange={e => { setAddress(e.target.value); setAddrErr(false); }} /></div>
              <div className="field"><span className="lb">준공연도</span>
                <select className="inp" defaultValue="1999년 (27년차)"><option>1999년 (27년차)</option><option>2005년</option><option>2015년</option></select></div>
              <div className="field"><span className="lb">난방 방식</span>
                <select className="inp" defaultValue="중앙난방"><option>중앙난방</option><option>개별난방</option><option>지역난방</option></select></div>
              <div className="field"><span className="lb">배관 재질 (아는 경우)</span>
                <select className="inp" defaultValue="모름"><option>모름</option><option>동관</option><option>강관(백관)</option><option>PB·XL</option></select></div>
              <div className="field"><span className="lb">발생 시점</span>
                <select className="inp" defaultValue="3일 전부터"><option>3일 전부터</option><option>오늘 처음</option><option>1주일 이상</option></select></div>
            </div>
          </div>
        </div>

        <aside className="side">
          <div className="panel">
            <h3 className="panel__t">진단 요약</h3>
            <div className="col gap10" style={{ gap: 10 }}>
              <div className="row between"><span className="t-b14 c-sec">첨부</span><span className="t-b14 fw6">사진 2장</span></div>
              <div className="row between"><span className="t-b14 c-sec">증상</span><span className="t-b14 fw6" id="diagSymCount">{selected.size}개 선택</span></div>
              <div className="row between"><span className="t-b14 c-sec">건물</span><span className="t-b14 fw6">1999년 · 중앙난방</span></div>
            </div>
            <hr className="hair" style={{ margin: '16px 0' }} />
            <div className="row between"><span className="t-b14 c-sec">비교 대상 사례</span><span className="t-b16 fw7 num c-brand">4,182건</span></div>
            <button className="btn large primary block" onClick={submit} disabled={busy}
              style={{ marginTop: 16 }}>{busy ? '분석 요청 중…' : 'AI 진단 시작하기'}</button>
            <div className="t-b12 c-ter" style={{ marginTop: 10, textAlign: 'center' }}>무료 · 약 20초 소요</div>
          </div>
          <div className="panel" style={{ background: 'var(--sg-bg-brand-subtle)', boxShadow: 'none' }}>
            <div className="t-b14 fw7" style={{ marginBottom: 6 }}>왜 사진을 요구하나요?</div>
            <p className="t-b12 c-sec" style={{ margin: 0 }}>얼룩의 경계 형태와 번진 방향만으로도 누수인지 결로인지 상당 부분 구분됩니다.
              AI 1차 분류 뒤 전문가가 검수해 결과를 확정합니다.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
