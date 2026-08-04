'use client';
// 데모 토스트 버튼 — 목업의 data-toast 속성을 onClick 상태 기반으로 전환 (2026-08-04)
// PDF 다운로드류 "데모에서는 생략됩니다" 안내에 사용.
import type { CSSProperties, ReactNode } from 'react';
import { toast } from '../../lib/toast';

export default function ToastButton({ className, style, msg, children }: {
  className: string;
  style?: CSSProperties;
  msg: string;                // 클릭 시 띄울 토스트 문구
  children: ReactNode;
}) {
  return (
    <button className={className} style={style} onClick={() => toast(msg)}>{children}</button>
  );
}
