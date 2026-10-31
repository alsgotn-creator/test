"use client";

import { useState } from "react";
import Image from "next/image";

/* =========================================================
   components/WorkThumb.jsx — 작품 썸네일

   next/image를 씁니다. 원본(1280×720 JPEG)을 그대로 내려주는 대신, Next 서버가
   타일 폭에 맞게 리사이즈하고 WebP/AVIF로 변환해서 보냅니다 — 선명도는 그대로인데
   용량이 크게 줄어듭니다. 허용 호스트는 next.config.mjs의 images.remotePatterns 참고.

   fill: 부모 박스를 꽉 채웁니다. 부모(.gallery__item / .modal__media)가
         position:relative 이고, 자식 img에 inset:0 + object-fit:cover 가
         이미 globals.css에 있어서 추가 스타일 없이 그대로 동작합니다.

   sizes: 이 썸네일이 화면에서 실제로 몇 px 폭으로 보이는지 브라우저에 알려주는 값.
          없으면 브라우저가 "화면 전체 폭"으로 가정해서 필요 이상으로 큰 파일을
          받아옵니다. 그래서 갤러리가 컬럼 수를 계산해 넘겨줍니다.

   onError: 유튜브 maxresdefault.jpg(1280×720)는 원본이 HD로 업로드된 영상에만
            있습니다. SD로 올라간 옛 영상엔 없어서 404가 나는데, 그때 깨진 이미지가
            보이지 않도록 hqdefault.jpg(480×360)로 한 번 되돌립니다.
            → data/works.js 에는 항상 maxresdefault 주소를 적어두면 됩니다.
   ========================================================= */

// "…/maxresdefault.jpg" → "…/hqdefault.jpg" (유튜브 썸네일일 때만)
function fallbackOf(src) {
  return src.includes("/maxresdefault.jpg")
    ? src.replace("/maxresdefault.jpg", "/hqdefault.jpg")
    : null;
}

export default function WorkThumb({ work, sizes, priority = false }) {
  // 현재 src를 state에 담지 않고 "실패한 주소"만 기억합니다. 이렇게 하면
  // work.thumb이 다른 작품으로 바뀔 때(모달 재사용 등) 비교값이 저절로 어긋나
  // 고해상도부터 다시 시도하게 되고, effect로 state를 되돌릴 필요가 없습니다.
  const [failedSrc, setFailedSrc] = useState(null);

  const fallback = fallbackOf(work.thumb);
  const src = failedSrc === work.thumb && fallback ? fallback : work.thumb;

  return (
    <Image
      src={src}
      alt={work.title}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailedSrc(work.thumb)}
    />
  );
}
