# 설비고 목업 — 소스 번들

## 구성
- `_p1.html` … `_p9.html` : 조각 파일. **index.html 은 이 조각들을 이어붙인 결과물이므로 직접 고치지 말 것.**
- `tokens.css` : 숨고 Prisma 토큰 + Pretendard base64 @font-face (1.17MB)
- `fonts/` : Pretendard woff2 원본

## 빌드 명령 (조각 수정 후 반드시 실행)
```bash
cat _p1.html _p2.html _p3.html _p4.html _p5.html _p6.html _p7.html _p8.html _pA.html _pB.html _p9.html > index.html
```

## 단독 실행 파일 만들기
`index.html` 의 `<link rel="stylesheet" href="tokens.css">` 를 `tokens.css` 내용을 담은 `<style>` 로 치환 → `설비고_목업.html`

## 조각별 담당 화면
| 파일 | 내용 |
|---|---|
| _p1 | @dsCard, head, 기본 CSS, Prisma 프리미티브(.t-*, .btn, .badge, .chip, .card, .field, .inp, .callout), 앱 셸(.gnb, .wrap, .phead, .flow, .side, .panel, .block, .steps) |
| _p2 | 설비고 도메인 CSS + **모바일 미디어쿼리 전체** + `<body>` + GNB + 햄버거/드로어 + p-home |
| _p3 | p-diag1, p-diag2, p-diag3, p-cases, p-case-detail |
| _p4 | p-quotes, p-pro, p-booking, p-variation, p-tracking |
| _p5 | p-warranty, p-insurance, p-history, p-groupbuy |
| _p6 | p-services, p-survey, p-scope, p-instant |
| _p7 | p-area (방수·도장 사진+면적 하이브리드) |
| _p8 | 사업자 센터 7종 (pro-home / inbox / quote / film / grade / store / settle) |
| _pA | 관리사무소 6종 (mgr-home / map / report / contract / bid / brief) |
| _pB | 손해보험사 4종 (ins-home / case / analytics / campaign) |
| _p9 | `</main></div>` + 전체 JS (라우터, AI 분석 연출, 동별 위험도, 입상관 계통도, Before/After 슬라이더, 모바일 스크립트) |

총 37개 화면.
