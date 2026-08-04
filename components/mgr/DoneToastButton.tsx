'use client';
// 완료 전이 버튼 — 목업의 data-done + data-toast 속성을 상태 기반으로 전환 (2026-08-04)
// 클릭 시 토스트를 띄우고 라벨이 완료 문구로 바뀌며 비활성화됩니다 (GroupbuyClient 의 joined 패턴).
import { useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { toast } from '../../lib/toast';

export default function DoneToastButton({ className, style, doneLabel, msg, children }: {
  className: string;
  style?: CSSProperties;
  doneLabel: string;          // 완료 후 표기 (예: '✓ 발송 완료')
  msg: string;                // 클릭 시 띄울 토스트 문구
  children: ReactNode;
}) {
  const [done, setDone] = useState(false);
  return (
    <button className={className + (done ? ' done' : '')} style={style} disabled={done}
      onClick={() => { toast(msg); setDone(true); }}>
      {done ? doneLabel : children}
    </button>
  );
}
