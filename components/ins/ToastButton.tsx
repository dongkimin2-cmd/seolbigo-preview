'use client';
// 토스트 버튼 — 서버 컴포넌트 화면에서 data-toast 속성을 대체하는 최소 클라이언트 조각.
// (예: 캠페인 화면의 '캠페인 만들기')
import type { ReactNode } from 'react';
import { toast } from '../../lib/toast';

export default function ToastButton({ className, message, children }: {
  className: string; message: string; children: ReactNode;
}) {
  return (
    <button className={className} onClick={() => toast(message)}>{children}</button>
  );
}
