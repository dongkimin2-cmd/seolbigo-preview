'use client';
// 하단 중앙 토스트 (목업 _p9 이식) — MockupBridge 와 상태 기반 컴포넌트가 공유
export function toast(msg: string, type?: 'ok' | 'warn') {
  let wrap = document.querySelector('.toast-wrap');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.className = 'toast-wrap';
    document.body.appendChild(wrap);
  }
  const el = document.createElement('div');
  el.className = 'toast ' + (type || 'ok');
  el.setAttribute('role', 'status');
  el.textContent = msg;
  wrap.appendChild(el);
  requestAnimationFrame(() => el.classList.add('on'));
  setTimeout(() => { el.classList.remove('on'); setTimeout(() => el.remove(), 300); }, 2600);
}
