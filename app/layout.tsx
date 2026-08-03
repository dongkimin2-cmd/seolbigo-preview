import type { Metadata, Viewport } from 'next';
import './tokens.css';
import './mockup.css';
import Gnb from '../components/Gnb';
import MockupBridge from '../components/MockupBridge';

export const metadata: Metadata = {
  title: '설비고 — 근거 있는 설비 시공 플랫폼',
  description: '사진 한 장으로 하자 유형과 적정 가격 범위를 확인하세요. (데모)',
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <div id="app">
          <Gnb />
          <main>{children}</main>
        </div>
        <MockupBridge />
      </body>
    </html>
  );
}
