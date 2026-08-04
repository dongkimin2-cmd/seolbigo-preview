'use client';
// 사업자 센터 대시보드 클라이언트 — lib/pro-data 의 KPI·일정·요청 데이터를 렌더.
// data-go → router.push/Link, data-done/data-toast → 상태 전이 + toast() 로 교체 (2026-08-04)
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GO_ROUTES } from '../../lib/routes';
import { toast } from '../../lib/toast';
import { PRO_KPIS, TODAY_JOBS, DASH_REQUESTS, DASH_WEEK_SETTLE } from '../../lib/pro-data';

export default function ProDashboardClient() {
  const router = useRouter();
  // 수락 완료된 요청 id 집합 (done 상태 전이)
  const [accepted, setAccepted] = useState<Set<string>>(() => new Set());

  const accept = (id: string, doneToast: string) => {
    setAccepted(prev => new Set(prev).add(id));
    toast(doneToast);
  };

  return (
    <div data-react>
      <div className="row between" style={{ marginBottom: 20, alignItems: "flex-start" }}>
        <div><h1 className="t-h24" style={{ margin: "0" }}>안녕하세요, 깨끗한집설비님</h1>
          <p className="t-b14 c-sec" style={{ margin: "4px 0 0" }}>2026년 11월 · 오늘 방문 2건이 예정되어 있습니다</p></div>
        <button className="btn medium primary" onClick={() => router.push(GO_ROUTES['pro-inbox'])}>새 요청 4건 확인</button>
      </div>

      <div className="grid g4" style={{ gap: 12, marginBottom: 16 }}>
        {PRO_KPIS.map(k => (
          <div key={k.label} className="panel"
            style={k.brandPanel ? { background: "var(--sg-bg-brand-subtle)", boxShadow: "none" } : undefined}>
            <div className="t-b12 c-sec">{k.label}</div>
            <div className={k.valueClass} style={{ margin: "4px 0 2px" }}>{k.value}</div>
            <div className={k.subClass}>{k.sub}</div></div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 340px", gap: 16, alignItems: "start" }}>
        <div>
          <div className="panel" style={{ marginBottom: 16 }}>
            <div className="row between" style={{ marginBottom: 14 }}>
              <h3 className="panel__t" style={{ margin: "0" }}>오늘 일정</h3>
              <span className="t-b12 c-sec">2026.11.19 (수)</span></div>
            <div className="col gap8">
              {TODAY_JOBS.map(j => (
                <div key={j.time} className="jobrow">
                  <span className={'badge ' + j.timeBadge}>{j.time}</span>
                  <div style={{ flex: "1" }}><div className="t-b14 fw7">{j.title}</div>
                    <div className="t-b12 c-sec">{j.meta}</div></div>
                  <span className={'badge ' + j.statusBadge}>{j.status}</span></div>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="row between" style={{ marginBottom: 14 }}>
              <h3 className="panel__t" style={{ margin: "0" }}>새로 들어온 요청</h3>
              <Link href={GO_ROUTES['pro-inbox']} className="more">전체 보기 ›</Link></div>
            <div className="col gap8">
              {DASH_REQUESTS.map(r => {
                const done = accepted.has(r.id);
                return (
                  <div key={r.id} className="jobrow" onClick={() => router.push(GO_ROUTES['pro-inbox'])} style={{ cursor: "pointer" }}>
                    <div className={'ph ' + r.tone} style={{ width: 52, height: 52, flex: "0 0 52px", borderRadius: 8 }} />
                    <div style={{ flex: "1" }}><div className="row gap4" style={{ marginBottom: 2 }}>
                      {r.badges.map(b => <span key={b.label} className={'badge ' + b.cls}>{b.label}</span>)}</div>
                      <div className="t-b14 fw7">{r.title}</div>
                      <div className="t-b12 c-sec">{r.meta}</div></div>
                    {r.action.kind === 'quote'
                      ? <button className="btn small primary"
                          onClick={e => { e.stopPropagation(); router.push(GO_ROUTES['pro-quote']); }}>{r.action.label}</button>
                      : <button className={'btn small outlined' + (done ? ' done' : '')} disabled={done}
                          onClick={e => {
                            e.stopPropagation();
                            if (r.action.kind === 'accept') accept(r.id, r.action.toast);
                          }}>{done && r.action.kind === 'accept' ? r.action.done : r.action.label}</button>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="col gap12">
          <div className="panel">
            <h3 className="panel__t">신용등급</h3>
            <div className="row gap12" style={{ alignItems: "center", marginBottom: 14 }}>
              <div className="ring" style={{ width: 76, height: 76, flex: "0 0 76px" }}>
                <svg width="76" height="76"><circle cx="38" cy="38" r="31" fill="none" stroke="#EFF1F5" strokeWidth={10} />
                  <circle cx="38" cy="38" r="31" fill="none" stroke="#693BF2" strokeWidth={10} strokeLinecap="round" strokeDasharray="195" strokeDashoffset={27} /></svg>
                <div className="ring__t"><div className="t-h18 num">86</div></div></div>
              <div><div className="t-b16 fw7 c-brand">플래티넘</div>
                <div className="t-b12 c-sec">상위 8% · 검색 노출 1순위</div></div>
            </div>
            <button className="btn small outlined block" onClick={() => router.push(GO_ROUTES['pro-grade'])}>등급 산정 근거 보기</button>
          </div>
          <div className="panel">
            <h3 className="panel__t">이번 주 정산</h3>
            <div className="col gap8" style={{ marginBottom: 12 }}>
              {DASH_WEEK_SETTLE.map(s => (
                <div key={s.label} className="row between"><span className="t-b14 c-sec">{s.label}</span><span className={s.valueClass}>{s.value}</span></div>
              ))}
            </div>
            <hr className="hair" style={{ margin: "0 0 12px" }} />
            <div className="row between"><span className="t-b14 fw7">지급 예정</span>
              <span className="t-h18 num c-brand">1,919,800원</span></div>
            <div className="t-b12 c-ter" style={{ marginTop: 6 }}>11.22 (금) 입금 예정</div>
          </div>
        </div>
      </div>
    </div>
  );
}
