/* =========================================================
   data/tools.js — "이런 작업이 가능합니다" 섹션에 쓰이는 툴 아이콘 목록

   icon  : "/assets/icons/파일명" (public/ 기준) | null
           null 이면 아직 로고 파일이 없는 상태 — 플레이스홀더 칩으로 표시됩니다.
   style : "mono"  — 배경이 투명한 단색(검정) 로고. Simple Icons(CC0)에서 받은 것들로,
                      다크 테마에 맞게 옅은 회색으로 바꿔서 보여줍니다.
           "badge" — 브랜드 고유 배경색이 있는 정사각형 로고. 색을 그대로 살려서
                      작은 아이콘처럼 보여줍니다(필터 미적용).
   ========================================================= */
export const TOOLS = [
  { id: "higgsfield", label: "Higgsfield", icon: "/assets/icons/higgsfield.jpg", style: "badge" },
  { id: "gpt", label: "GPT", icon: "/assets/icons/openai.svg", style: "mono" },
  { id: "claude", label: "Claude", icon: "/assets/icons/claude.svg", style: "mono" },
  { id: "midjourney", label: "Midjourney", icon: "/assets/icons/midjourney.png", style: "badge" },
  { id: "illustrator", label: "Illustrator", icon: "/assets/icons/adobeillustrator.svg", style: "mono" },
  { id: "photoshop", label: "Photoshop", icon: "/assets/icons/adobephotoshop.svg", style: "mono" },
  { id: "premiere", label: "Premiere", icon: "/assets/icons/adobepremierepro.svg", style: "mono" },
  { id: "ae", label: "After Effects", icon: "/assets/icons/adobeaftereffects.svg", style: "mono" },
  { id: "c4d", label: "C4D", icon: "/assets/icons/cinema4d.svg", style: "mono" },
  { id: "blender", label: "Blender", icon: "/assets/icons/blender.svg", style: "mono" },
  { id: "comfyui", label: "ComfyUI", icon: "/assets/icons/comfyui.png", style: "badge" },
];
