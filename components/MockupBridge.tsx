'use client';
// 목업 _p9.html 의 인터랙션 계층을 Next.js 로 이식한 브리지.
// - [data-go] 클릭 → 실제 라우팅 (router.push)
// - 토스트 / 폼 검증 / 칩 단일·다중 선택 / 완료 상태 전이 / 요약 동기화
// - 모바일 보정(표 래핑, 인라인 그리드 1열화, 하단 CTA 클론)
// 화면 컴포넌트를 점진적으로 "진짜" 상태 기반 컴포넌트로 옮기면
// 이 브리지의 역할이 줄어들다가 최종적으로 제거됩니다.
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { GO_ROUTES, BACKOFFICE_IDS, MOCKUP_URL } from '../lib/routes';
import { toast } from '../lib/toast';

const validators: Record<string, () => string | null> = {
  diag1() {
    const n = document.querySelectorAll('#diagSymChips .chip[aria-pressed="true"]').length;
    if (!n) return '증상을 1개 이상 선택해주세요.';
    const a = document.getElementById('diagAddr') as HTMLInputElement | null;
    if (a && !a.value.trim()) { a.classList.add('err'); a.focus(); return '아파트 · 주소를 입력해주세요.'; }
    return null;
  },
  booking() {
    if (!document.querySelector('#bookDays .chip[aria-pressed="true"]')) return '방문 날짜를 선택해주세요.';
    if (!document.querySelector('#bookTimes .chip[aria-pressed="true"]')) return '방문 시간을 선택해주세요.';
    return null;
  },
};

function syncCounts() {
  // [data-react] 화면의 요약 텍스트는 React 가 렌더 — 브리지가 덮어쓰면 React 텍스트 노드가 분리됨
  const sc = document.getElementById('diagSymCount');
  if (sc && !sc.closest('[data-react]')) sc.textContent =
    document.querySelectorAll('#diagSymChips .chip[aria-pressed="true"]').length + '개 선택';
  const bw = document.getElementById('bookWhen');
  if (bw && !bw.closest('[data-react]')) {
    const d = document.querySelector('#bookDays .chip[aria-pressed="true"]');
    const t = document.querySelector('#bookTimes .chip[aria-pressed="true"]');
    bw.textContent = d && t
      ? (d.textContent || '').replace('/', '.') + ' ' + t.textContent + ' 방문'
      : '방문 일정을 선택해주세요';
  }
}

/** 라우트 렌더 후 목업 시절 동적 보정을 재적용 (멱등) */
function enhance() {
  // 서비스명 태그 반영 (data-svc 로 진입한 경우)
  const svc = sessionStorage.getItem('svc');
  if (svc) ['svcTag', 'instTitle'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = svc;
  });

  // 인라인 grid → 모바일 1열
  document.querySelectorAll<HTMLElement>('[style*="grid-template-columns"]').forEach(el => {
    if (el.closest('.cats')) return;
    const s = el.getAttribute('style') || '';
    el.classList.add('gcol');
    if (/repeat\(4,1fr\)|repeat\(3,1fr\)/.test(s.replace(/\s/g, ''))) el.classList.add('keep2');
  });

  // 넓은 표 가로 스크롤 래핑
  document.querySelectorAll('table').forEach(tb => {
    if (tb.parentElement?.classList.contains('tblwrap')) return;
    let cols = 0;
    tb.querySelectorAll('tr').forEach(tr => { cols = Math.max(cols, tr.children.length); });
    const w = document.createElement('div');
    w.className = 'tblwrap' + (cols >= 3 ? ' wide' : '');
    tb.parentNode?.insertBefore(w, tb);
    w.appendChild(tb);
  });

  document.querySelectorAll('.svc').forEach(el => el.closest('.grid')?.classList.add('svcgrid'));
  document.querySelectorAll<HTMLElement>('[style*="position:sticky"]').forEach(el => el.classList.add('instk'));

  // Before/After 슬라이더
  document.querySelectorAll<HTMLElement>('.ba').forEach(el => {
    if (el.dataset.bound) return;
    el.dataset.bound = '1';
    const set = (ev: MouseEvent | TouchEvent) => {
      const r = el.getBoundingClientRect();
      const cx = 'touches' in ev ? ev.touches[0].clientX : ev.clientX;
      const x = ((cx - r.left) / r.width) * 100;
      el.style.setProperty('--x', Math.max(2, Math.min(98, x)) + '%');
    };
    let on = false;
    el.addEventListener('mousedown', e => { on = true; set(e); e.preventDefault(); });
    el.addEventListener('mousemove', e => { if (on) set(e); });
    el.addEventListener('touchstart', e => { on = true; set(e); });
    el.addEventListener('touchmove', e => { if (on) set(e); });
    window.addEventListener('mouseup', () => { on = false; });
    window.addEventListener('touchend', () => { on = false; });
    el.addEventListener('click', set);
  });

  syncCta();
  syncCounts();
}

/** 모바일 하단 고정 CTA — 우측 패널 주요 버튼 클론 */
function syncCta() {
  let mcta = document.getElementById('mcta');
  if (!mcta) {
    mcta = document.createElement('div');
    mcta.className = 'mcta'; mcta.id = 'mcta';
    document.getElementById('app')?.appendChild(mcta);
  }
  mcta.innerHTML = '';
  if (window.innerWidth > 767) return;
  const cur = document.querySelector('.page.on');
  if (!cur) return;
  const btn = cur.querySelector('.side .btn.primary');
  if (!btn) return;
  const c = btn.cloneNode(true) as HTMLElement;
  c.classList.remove('medium', 'small');
  c.classList.add('large', 'block');
  // React onClick 은 cloneNode 로 복제되지 않으므로 원본 클릭으로 위임
  // (data-* 브리지 버튼은 문서 위임으로 이미 동작하므로 제외 — 중복 실행 방지)
  if (!btn.hasAttribute('data-go') && !btn.hasAttribute('data-toast') && !btn.hasAttribute('data-done')) {
    c.addEventListener('click', () => (btn as HTMLElement).click());
  }
  mcta.appendChild(c);
}

export default function MockupBridge() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => { enhance(); }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const t = target.closest<HTMLElement>('[data-go],[data-toast]');
      if (t) {
        e.preventDefault();
        const v = t.getAttribute('data-validate');
        if (v && validators[v]) {
          const err = validators[v]();
          if (err) { toast(err, 'warn'); return; }
        }
        const msg = t.getAttribute('data-toast');
        if (msg) toast(msg);
        const done = t.getAttribute('data-done');
        if (done) {
          const mark = (b: HTMLElement) => {
            b.textContent = done; b.classList.add('done'); (b as HTMLButtonElement).disabled = true;
          };
          mark(t);
          if (t.closest('#mcta')) {
            const orig = document.querySelector<HTMLElement>('.page.on .side .btn.primary');
            if (orig) mark(orig);
          }
          syncCta();
        }
        const svc = t.getAttribute('data-svc');
        if (svc) sessionStorage.setItem('svc', svc);
        const go = t.getAttribute('data-go');
        if (go) {
          if (GO_ROUTES[go]) router.push(GO_ROUTES[go]);
          else if (BACKOFFICE_IDS.has(go)) {
            toast('백오피스 화면은 목업에서 확인할 수 있어요.');
            window.open(MOCKUP_URL, '_blank');
          }
        }
        return;
      }
      // 상태 기반으로 전환된 화면([data-react])의 칩·옵션은 React 가 관리 — 브리지 개입 금지
      if (target.closest('[data-react]')) return;
      const o = target.closest('.opt');
      if (o) {
        o.parentElement?.querySelectorAll('.opt').forEach(x => x.classList.remove('on'));
        o.classList.add('on');
        return;
      }
      const c = target.closest<HTMLButtonElement>('.chip');
      if (c && !c.disabled) {
        const single = c.closest('[data-single]');
        if (single) {
          single.querySelectorAll('.chip').forEach(x => x.setAttribute('aria-pressed', 'false'));
          c.setAttribute('aria-pressed', 'true');
        } else {
          c.setAttribute('aria-pressed', c.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
        }
        syncCounts();
      }
    };
    const onInput = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.classList?.contains('err')) t.classList.remove('err');
    };
    const onResize = () => syncCta();
    document.addEventListener('click', onClick);
    document.addEventListener('input', onInput);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('input', onInput);
      window.removeEventListener('resize', onResize);
    };
  }, [router]);

  return null;
}
