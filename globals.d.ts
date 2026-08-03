// 인라인 CSS 커스텀 프로퍼티(--x 등) 허용
import 'react';
declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
