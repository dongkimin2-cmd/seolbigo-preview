'use client';
// AI 분석 진행 연출 (목업 runDiag 이식) — 완료 후 결과 페이지로 이동
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useDiagAnimation() {
  const router = useRouter();
  useEffect(() => {
    const bar = document.getElementById('diagbar');
    const s3 = document.getElementById('diagstep3');
    const s4 = document.getElementById('diagstep4');
    if (!bar) return;
    bar.style.width = '12%';
    if (s3) s3.innerHTML = '<span class="c-ter">◌</span><span class="t-b14 c-sec">유사 시공 사례 4,182건 대조</span>';
    if (s4) s4.innerHTML = '<span class="c-ter">◌</span><span class="t-b14 c-sec">전문가 검수 대기</span>';
    const t1 = setTimeout(() => { bar.style.width = '48%'; }, 300);
    const t2 = setTimeout(() => {
      bar.style.width = '76%';
      if (s3) s3.innerHTML = '<span class="c-suc">✓</span><span class="t-b14">유사 시공 사례 12건 매칭</span>';
    }, 1200);
    const t3 = setTimeout(() => {
      bar.style.width = '100%';
      if (s4) s4.innerHTML = '<span class="c-suc">✓</span><span class="t-b14">전문가 검수 완료</span>';
    }, 2100);
    const t4 = setTimeout(() => router.push('/diagnose/result'), 2900);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [router]);
}
