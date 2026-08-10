'use client';
// 요청 인박스 클라이언트 — lib/pro-data 의 요청 목록을 필터 칩·정렬 select 로 실동작 렌더.
// data-go → router.push, data-done/data-toast → 상태 전이 + toast() 로 교체 (2026-08-04)
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GO_ROUTES } from '../../lib/routes';
import { toast } from '../../lib/toast';
import {
  INBOX_FILTERS, INBOX_REQUESTS, INBOX_SORTS,
  type InboxFilterId, type InboxSort,
} from '../../lib/pro-data';
import type { LiveRequest } from '../../lib/db';

// 실요청 경과 시간 표기
function ago(iso: string) {
  const m = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60_000));
  if (m < 1) return '방금 전';
  if (m < 60) return `${m}분 전`;
  const h = Math.round(m / 60);
  return h < 24 ? `${h}시간 전` : `${Math.round(h / 24)}일 전`;
}

export default function ProInboxClient({ live = [] }: { live?: LiveRequest[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState<InboxFilterId>('all');
  const [sort, setSort] = useState<InboxSort>('마감 임박순');
  // 수락/신청 완료된 요청 id 집합 (done 상태 전이)
  const [accepted, setAccepted] = useState<Set<string>>(() => new Set());

  const accept = (id: string, doneToast: string) => {
    setAccepted(prev => new Set(prev).add(id));
    toast(doneToast);
  };

  const list = useMemo(() => {
    let out = INBOX_REQUESTS.filter(r => filter === 'all' || r.kind === filter);
    if (sort === '마감 임박순') out = [...out].sort((a, b) => a.deadlineHours - b.deadlineHours);
    else if (sort === '금액 높은순') out = [...out].sort((a, b) => b.priceWon - a.priceWon);
    else out = [...out].sort((a, b) => a.distanceKm - b.distanceKm);
    return out;
  }, [filter, sort]);

  return (
    <div data-react>
      <h1 className="t-h24" style={{ margin: "0 0 4px" }}>요청 인박스</h1>
      <p className="t-b14 c-sec" style={{ margin: "0 0 20px" }}>내 서비스 지역·업종에 맞는 요청만 들어옵니다. 크레딧을 쓰지 않습니다.</p>

      <div className="panel" style={{ padding: "14px 18px", marginBottom: 16 }}>
        <div className="row gap6" style={{ flexWrap: "wrap" }}>
          {INBOX_FILTERS.map(f => (
            <button key={f.id} className="chip sm" aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}>{f.label}</button>
          ))}
          <div style={{ flex: "1" }} />
          <select className="inp" value={sort} onChange={e => setSort(e.target.value as InboxSort)}
            style={{ width: "auto", height: 34, padding: "0 34px 0 12px", fontSize: 13 }}>
            {INBOX_SORTS.map(s => <option key={s}>{s}</option>)}</select>
        </div>
      </div>

      <div className="col gap12">
        {live.map(r => (
          <div key={r.id} className="panel" style={{ padding: 20, boxShadow: '0 0 0 2px var(--sg-brand-primary) inset' }}>
            <div className="row between" style={{ marginBottom: 12 }}>
              <div className="row gap4">
                <span className="badge b-brands">실시간 접수</span>
                {r.status === 'quoted' && <span className="badge b-green">내 견적 제출됨</span>}
              </div>
              <span className="t-b12 c-sec">{ago(r.createdAt)}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "120px minmax(0,1fr) 200px", gap: 18, alignItems: "start" }}>
              <div className="ph wet" style={{ aspectRatio: "1/1", borderRadius: 10 }} />
              <div>
                <div className="t-h18" style={{ marginBottom: 4 }}>
                  {(r.symptoms[0] ?? '누수 의심')} — AI 진단 완료</div>
                <div className="t-b14 c-sec" style={{ marginBottom: 10 }}>{r.address || '주소 미입력'}</div>
                <div className="row gap6" style={{ flexWrap: "wrap" }}>
                  {r.symptoms.map(t => <span key={t} className="badge b-gline">{t}</span>)}
                  {r.photoCount > 0 && <span className="badge b-blue">사진 {r.photoCount}장</span>}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="t-b12 c-sec">플랫폼 기준가</div>
                <div className="t-h20 num" style={{ marginBottom: 2 }}>32~58만원</div>
                <div className="t-b12 c-sec" style={{ marginBottom: 12 }}>제출된 견적 {r.quoteCount}건</div>
                <button className="btn medium primary block"
                  onClick={() => router.push(GO_ROUTES['pro-quote'] + '?req=' + encodeURIComponent(r.id))}>견적 작성</button>
              </div>
            </div>
          </div>
        ))}
        {list.map(r => {
          const done = accepted.has(r.id);
          return (
            <div key={r.id} className="panel" style={{ padding: 20 }}>
              <div className="row between" style={{ marginBottom: 12 }}>
                <div className="row gap4">
                  {r.headBadges.map(b => <span key={b.label} className={'badge ' + b.cls}>{b.label}</span>)}</div>
                {r.deadlineDanger
                  ? <span className="t-b12" style={{ color: "var(--sg-text-danger)" }}>{r.deadline}</span>
                  : <span className="t-b12 c-sec">{r.deadline}</span>}</div>
              <div style={{ display: "grid", gridTemplateColumns: "120px minmax(0,1fr) 200px", gap: 18, alignItems: "start" }}>
                <div className={'ph ' + r.tone} style={{ aspectRatio: "1/1", borderRadius: 10 }} />
                <div>
                  <div className="t-h18" style={{ marginBottom: 4 }}>{r.title}</div>
                  <div className="t-b14 c-sec" style={{ marginBottom: 10 }}>{r.desc}</div>
                  <div className="row gap6" style={r.wrapTags ? { flexWrap: "wrap" } : undefined}>
                    {r.tags.map(t => <span key={t.label} className={'badge ' + t.cls}>{t.label}</span>)}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="t-b12 c-sec">{r.priceLabel}</div>
                  <div className="t-h20 num" style={{ marginBottom: 2 }}>{r.price}</div>
                  <div className="t-b12 c-sec" style={{ marginBottom: 12 }}>{r.priceSub}</div>
                  {(() => { const a = r.action; return a.kind === 'quote' ? (
                    <>
                      <button className="btn medium primary block"
                        onClick={() => router.push(GO_ROUTES['pro-quote'])}>{a.label}</button>
                      <button className="btn small ghost block" style={{ marginTop: 6 }}>{a.secondary}</button>
                    </>
                  ) : (
                    <button className={'btn medium primary block' + (done ? ' done' : '')} disabled={done}
                      onClick={() => accept(r.id, a.toast)}>{done ? a.done : a.label}</button>
                  ); })()}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
