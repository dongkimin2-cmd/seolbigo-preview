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

## Supabase · Solapi 연동 (선택)

키가 없으면 전 화면이 mock 데이터로 동작합니다(현재 상태). 실DB/실발송으로 전환하려면:

1. **Supabase** — 프로젝트 생성 후 SQL Editor 에 `supabase/migrations/0001_init.sql` → `supabase/seed.sql` 순서로 실행
2. `.env.local` 작성:

```
NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=...        # 서버 전용 — 절대 클라이언트 노출 금지
SOLAPI_API_KEY=...                   # 선택 — 없으면 알림은 콘솔 로그
SOLAPI_API_SECRET=...
SOLAPI_SENDER=01012345678            # Solapi 에 등록된 발신번호
```

3. `npm run dev` — `lib/db.ts` / `lib/notify.ts` 가 키 유무를 감지해 자동 전환합니다.

주의: Solapi 는 발신번호 등록·알림톡 템플릿 심사가 선행 필요. 드라이버는 SMS 스텁이며 실사용 전 공식 문서로 검증하세요.
Auth(로그인) 연동 전까지 DB 쓰기는 service role 로 수행됩니다 — RLS 정책은 마이그레이션에 포함되어 있어 Auth 도입 시 그대로 적용됩니다.

## Auth 스캐폴드 (Phase 2 — ⚠️ 실환경 미검증)

키가 없으면 완전히 비활성입니다(현 데모 동작 무변화). 활성화 절차:

1. `supabase/migrations/0002_profiles.sql` 을 SQL Editor 에서 실행 (profiles 테이블 + 가입 트리거 + RLS)
2. Vercel(또는 .env.local)에 `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` = `sb_publishable_...` 추가 → 재배포
3. Supabase → Authentication → URL Configuration 에 Site URL(배포 주소)과 Redirect URL `<사이트>/auth/callback` 등록
4. `/login` 에서 이메일 가입/로그인 확인. 카카오는 Authentication → Providers → Kakao 설정 후 LoginClient 의 버튼을 signInWithOAuth 로 교체
5. 역할(role)은 profiles 테이블에서 운영자가 승격 (consumer → pro/manager/insurer)

구성: `lib/auth.ts`(서버 세션·역할 조회) · `middleware.ts`(세션 갱신, 라우트 강제 보호는 아직 없음) · `app/login` + `components/LoginClient.tsx` · `app/auth/callback`


## 사진 업로드 (E1-5 · Supabase Storage)

진단 사진은 Storage `photos` 버킷(비공개)에 저장됩니다. 최초 1회 설정:

1. Supabase 대시보드 → Storage → **New bucket** → 이름 `photos`, **Public OFF** 로 생성
2. 끝. 서버가 service role 키로 접근하므로 별도 Storage 정책은 필요 없습니다.

키가 없거나 버킷이 없으면 업로드는 조용히 생략되고(mock 경로 기록) 데모 동작은 그대로 유지됩니다.
소비자 화면에 사진을 다시 보여주는 것(signed URL)은 후속 과제입니다.
