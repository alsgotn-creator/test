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

   onError(해상도 폴백): 유튜브는 원본이 HD로 올라간 영상에만 maxresdefault(1280×720)를
          만들어 둡니다. SD 업로드거나, 방금 올려서 아직 처리 중이면 404가 납니다.
          그때 깨진 이미지 대신 아래로 한 칸씩 내려갑니다:

              maxresdefault(1280×720) → sddefault(640×480) → hqdefault(480×360)

          data/works.js 에는 항상 maxresdefault 주소를 적어두면 됩니다. 나중에
          유튜브가 HD 썸네일을 만들어내면, 다음 방문부터 저절로 제일 위 칸이
          성공하므로 따로 고칠 필요가 없습니다.
   ========================================================= */

// 유튜브 썸네일이면 해상도 높은 순으로 후보를 만들고, 아니면 원본 주소 하나만.
function candidatesOf(src) {
  if (!src.includes("/maxresdefault.jpg")) return [src];
  return [
    src,
    src.replace("/maxresdefault.jpg", "/sddefault.jpg"),
    src.replace("/maxresdefault.jpg", "/hqdefault.jpg"),
  ];
}

export default function WorkThumb({ work, sizes, priority = false }) {
  // 현재 src를 state에 담지 않고 "어느 썸네일에서 몇 번 실패했는지"만 기억합니다.
  // 이렇게 하면 work.thumb이 다른 작품으로 바뀔 때(모달 재사용 등) thumb 비교가
  // 어긋나 step이 저절로 0으로 돌아가고, effect로 state를 되돌릴 필요가 없습니다.
  const [failed, setFailed] = useState({ thumb: null, step: 0 });

  const chain = candidatesOf(work.thumb);
  const step = failed.thumb === work.thumb ? failed.step : 0;
  const src = chain[Math.min(step, chain.length - 1)];

  return (
    <Image
      src={src}
      alt={work.title}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => {
        // 마지막 후보까지 실패하면 더 내려갈 곳이 없으므로 그대로 둡니다.
        if (step < chain.length - 1) setFailed({ thumb: work.thumb, step: step + 1 });
      }}
    />
  );
}
