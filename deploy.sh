#!/bin/bash
# 조각 파일 수정 후 실행 → index.html 재빌드 + GitHub Pages 배포
set -e
cd "$(dirname "$0")"
cat _p1.html _p2.html _p3.html _p4.html _p5.html _p6.html _p7.html _p8.html _pA.html _pB.html _p9.html > index.html
git add -A
git commit -m "${1:-목업 수정}"
git push origin main
echo "배포 완료 → https://dongkimin2-cmd.github.io/seolbigo-preview/"
