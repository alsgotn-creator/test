/* =========================================================
   data/tools.js — "이런 작업이 가능합니다" 섹션에 쓰이는 툴 아이콘 목록

   icon: "/assets/icons/파일명.svg" (public/ 기준) | null
         null 이면 아직 로고 파일이 없는 상태 — 플레이스홀더 칩으로 표시됩니다.
         아래 3개(Higgsfield, Midjourney, ComfyUI)는 CC0 라이선스인 Simple Icons에
         없어서 받아오지 못했습니다. public/assets/icons/ 에 해당 로고 svg/png를
         넣고 여기 icon 값만 채워주시면 자동으로 반영됩니다.
         예) higgsfield: "/assets/icons/higgsfield.svg"
   ========================================================= */
export const TOOLS = [
  { id: "higgsfield", label: "Higgsfield", icon: null },
  { id: "gpt", label: "GPT", icon: "/assets/icons/openai.svg" },
  { id: "claude", label: "Claude", icon: "/assets/icons/claude.svg" },
  { id: "midjourney", label: "Midjourney", icon: null },
  { id: "illustrator", label: "Illustrator", icon: "/assets/icons/adobeillustrator.svg" },
  { id: "photoshop", label: "Photoshop", icon: "/assets/icons/adobephotoshop.svg" },
  { id: "premiere", label: "Premiere", icon: "/assets/icons/adobepremierepro.svg" },
  { id: "ae", label: "After Effects", icon: "/assets/icons/adobeaftereffects.svg" },
  { id: "c4d", label: "C4D", icon: "/assets/icons/cinema4d.svg" },
  { id: "blender", label: "Blender", icon: "/assets/icons/blender.svg" },
  { id: "comfyui", label: "ComfyUI", icon: null },
];
