# 설비고 웹 — Next.js 서비스 스켈레톤

정적 목업(`seolbigo-preview`)의 소비자 플로우를 실제 서비스 구조로 이식한 스켈레톤입니다.
디자인·마크업·데모 수치는 목업과 1:1 동일하며, 뼈대(라우팅·컴포넌트·API 계층)만 실제 구조입니다.

## 실행

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # 프로덕션 빌드
```

## 구조

| 경로 | 내용 |
|---|---|
| `app/` | App Router 라우트 21개 (소비자 플로우: 홈·진단 3단계·견적·예약·추적·보증·보험·이력·공동구매·서비스 진입 6종) |
| `app/api/` | mock API 예시 (`POST /api/diagnose`, `GET /api/quotes`) |
| `lib/routes.ts` | 목업 `data-go` 값 → 실제 라우트 매핑 (단일 소스) |
| `lib/mock-data.ts` | 데모 데이터 단일 소스 — 백엔드 연결 시 이 모듈만 교체 |
| `components/Gnb.tsx` | GNB (실제 `<Link>` 라우팅) |
| `components/MockupBridge.tsx` | 목업 인터랙션 계층 이식 (토스트·검증·칩·상태전이·모바일 보정) |
| `app/tokens.css` | 숨고 Prisma 디자인 토큰 (Pretendard는 `public/fonts/` 파일 참조) |
| `app/mockup.css` | 목업 도메인 CSS + 모바일 미디어쿼리 |

## 설계 노트

- **화면 본문은 목업에서 자동 변환(JSX)** 된 상태로 시작합니다. 화면을 손볼 때마다
  해당 화면을 상태 기반 컴포넌트로 점진 전환하고, 그만큼 `MockupBridge`의 역할을 줄여
  최종적으로 제거하는 것이 로드맵입니다.
- 백오피스(사업자·관리사무소·보험사) 17개 화면은 이번 범위 밖 — GNB에서 정적 목업으로 연결됩니다.
- 수치는 전부 데모/연출 값입니다 (내부 문서 '숫자 대조표' 참고, **저장소에 커밋 금지**).
- 다음 단계 후보: 진단 폼 상태를 `useState`/서버 액션으로 전환 → 견적·예약을 mock API와 연결 →
  인증(사업자/소비자) → DB.

## 원본

- 정적 목업: https://dongkimin2-cmd.github.io/seolbigo-preview/ (`main` 브랜치)
- 이 스켈레톤: `next-skeleton` 브랜치
