/* =========================================================
   script.js — 사이트 전체 스크립트 (모든 페이지 공통)

   1. 설정 (이메일)
   2. 작품 데이터        ★ 작품 추가/수정은 여기서
   3. 공통 (헤더 · 모바일 메뉴 · 스크롤 등장 · 연도)
   4. 갤러리(2D/3D · AI · KT) · 영상 모달
   5. 문의 폼
   ========================================================= */


/* =========================================================
   1. 설정
   ========================================================= */
const EMAIL = "v3v@kakao.com"; // ← 실제 이메일로 변경
const USE_MAILTO = true;           // 폼 서비스(Formspree 등)를 쓰려면 false + form action 지정


/* =========================================================
   2. 작품 데이터

   id        : 고유값 (영문, 겹치지 않게)
   title     : 작품명
   client    : 클라이언트 / 프로젝트 성격
   year      : 연도
   section   : 어느 페이지(갤러리)에 보여줄지 — "2d3d" | "ai" | "kt"
   category  : 작업 성격 라벨 (모달에 표시)
   thumb     : 썸네일 이미지 경로 (없으면 그라디언트로 표시)
               예) "assets/images/works/brand-film.jpg"
   preview   : 타일에 마우스 올렸을 때 재생할 짧은 mp4 (선택)
               예) "assets/videos/brand-film-loop.mp4"
   video     : 모달에서 재생할 영상
               - 유튜브: "https://www.youtube.com/embed/영상ID"
               - 비메오: "https://player.vimeo.com/video/영상ID"
               - 직접 파일: "assets/videos/파일명.mp4"
   role      : 담당 역할
   tools     : 사용 툴 (배열)
   desc      : 작품 설명
   featured  : true 면 Home 대표 작품에 노출
   color     : 썸네일 없을 때 그라디언트 색상 [시작, 끝]
   ========================================================= */
const CATEGORIES = {
  brand: "브랜드 필름",
  title: "타이틀 · 오프닝",
  "3d": "3D 모션",
  ui: "UI 모션",
  social: "소셜 콘텐츠",
  ai: "AI 비주얼",
};

const WORKS = [
  // ---------- 2D / 3D ----------
  {
    id: "brand-film-2026",
    title: "Brand Film — Rebirth",
    client: "가상의 브랜드 A",
    year: 2026,
    section: "2d3d",
    category: "brand",
    thumb: "",
    preview: "",
    video: "",
    role: "Direction, Motion Design",
    tools: ["After Effects", "Cinema 4D", "Redshift"],
    desc: "브랜드 리뉴얼을 알리는 60초 런칭 필름. 새 로고의 형태 언어를 모션 시스템으로 확장했습니다.",
    featured: true,
    color: ["#ff4d1c", "#ffb199"],
  },
  {
    id: "festival-opening",
    title: "Festival Opening Title",
    client: "가상의 영화제",
    year: 2026,
    section: "2d3d",
    category: "title",
    thumb: "",
    preview: "",
    video: "",
    role: "Motion Design, Typography",
    tools: ["After Effects", "Illustrator"],
    desc: "영화제 개막식 오프닝 타이틀. 타이포그래피 중심의 키네틱 모션으로 구성했습니다.",
    featured: true,
    color: ["#111111", "#4a4a4a"],
  },
  {
    id: "product-3d",
    title: "Product 3D Visual",
    client: "가상의 테크 브랜드",
    year: 2025,
    section: "2d3d",
    category: "3d",
    thumb: "",
    preview: "",
    video: "",
    role: "3D Modeling, Lighting, Animation",
    tools: ["Cinema 4D", "Octane", "After Effects"],
    desc: "신제품 런칭용 3D 프로덕트 비주얼. 재질과 빛의 표현에 집중했습니다.",
    featured: false,
    color: ["#2b5cff", "#9db4ff"],
  },
  {
    id: "app-ui-motion",
    title: "App UI Motion Guide",
    client: "가상의 핀테크 앱",
    year: 2025,
    section: "2d3d",
    category: "ui",
    thumb: "",
    preview: "",
    video: "",
    role: "UI Motion, Prototyping",
    tools: ["After Effects", "Figma", "Lottie"],
    desc: "앱 전반의 인터랙션 모션 가이드와 Lottie 에셋 제작.",
    featured: false,
    color: ["#13c296", "#a6f0da"],
  },
  {
    id: "social-campaign",
    title: "Social Campaign Series",
    client: "가상의 패션 브랜드",
    year: 2025,
    section: "2d3d",
    category: "social",
    thumb: "",
    preview: "",
    video: "",
    role: "Motion Design",
    tools: ["After Effects", "Premiere Pro"],
    desc: "인스타그램 · 유튜브 숏폼용 캠페인 영상 시리즈 (총 12편).",
    featured: false,
    color: ["#c13cff", "#efb8ff"],
  },
  {
    id: "broadcast-ident",
    title: "Channel Ident Package",
    client: "가상의 방송 채널",
    year: 2024,
    section: "2d3d",
    category: "title",
    thumb: "",
    preview: "",
    video: "",
    role: "Art Direction, Motion Design",
    tools: ["After Effects", "Cinema 4D"],
    desc: "채널 아이덴티티 리뉴얼 — 아이덴트, 범퍼, 로워써드 패키지.",
    featured: false,
    color: ["#ffb800", "#ffe7a3"],
  },

  // ---------- AI ---------- (플레이스홀더 — 실제 작업으로 교체하세요)
  {
    id: "ai-title-reel",
    title: "AI Title Concept Reel",
    client: "가상의 미디어 스튜디오",
    year: 2026,
    section: "ai",
    category: "ai",
    thumb: "",
    preview: "",
    video: "",
    role: "AI 비주얼 익스플로레이션, Motion Design",
    tools: ["Midjourney", "Runway", "After Effects"],
    desc: "생성형 AI로 러프 컨셉을 빠르게 탐색하고, 최종 모션은 직접 다듬어 완성한 타이틀 릴.",
    featured: true,
    color: ["#7c3aed", "#c4b5fd"],
  },
  {
    id: "ai-product-render",
    title: "AI-assisted Product Render",
    client: "가상의 가전 브랜드",
    year: 2025,
    section: "ai",
    category: "ai",
    thumb: "",
    preview: "",
    video: "",
    role: "AI 비주얼 개발, 3D 모션",
    tools: ["Midjourney", "Cinema 4D"],
    desc: "AI 이미지 생성으로 룩을 빠르게 확정한 뒤, 3D로 제품을 재구성한 비주얼 작업.",
    featured: false,
    color: ["#0ea5e9", "#a5f3fc"],
  },
  {
    id: "ai-motion-loop",
    title: "Generative Motion Loop Series",
    client: "개인 작업",
    year: 2025,
    section: "ai",
    category: "ai",
    thumb: "",
    preview: "",
    video: "",
    role: "AI 영상 생성, 큐레이션, 편집",
    tools: ["Runway", "Premiere Pro"],
    desc: "AI 영상 생성 모델로 만든 루프 비주얼을 소셜 콘텐츠용으로 큐레이션한 시리즈.",
    featured: true,
    color: ["#f43f5e", "#fecdd3"],
  },
  {
    id: "ai-campaign-teaser",
    title: "AI Campaign Teaser",
    client: "가상의 뷰티 브랜드",
    year: 2024,
    section: "ai",
    category: "ai",
    thumb: "",
    preview: "",
    video: "",
    role: "AI 비주얼, 합성",
    tools: ["Runway", "After Effects"],
    desc: "캠페인 티저용 AI 비주얼 익스플로레이션과 후반 합성.",
    featured: false,
    color: ["#f59e0b", "#fde68a"],
  },

  // ---------- KT ---------- (플레이스홀더 — 실제 작업으로 교체하세요)
  {
    id: "kt-visual-01",
    title: "KT Project — Visual 01",
    client: "가상의 프로젝트",
    year: 2026,
    section: "kt",
    category: "brand",
    thumb: "",
    preview: "",
    video: "",
    role: "Motion Design",
    tools: ["After Effects"],
    desc: "KT 섹션 플레이스홀더 작업물입니다. 실제 작업으로 교체해 주세요.",
    featured: true,
    color: ["#111111", "#333333"],
  },
  {
    id: "kt-visual-02",
    title: "KT Project — Visual 02",
    client: "가상의 프로젝트",
    year: 2025,
    section: "kt",
    category: "title",
    thumb: "",
    preview: "",
    video: "",
    role: "Motion Design",
    tools: ["After Effects"],
    desc: "KT 섹션 플레이스홀더 작업물입니다. 실제 작업으로 교체해 주세요.",
    featured: false,
    color: ["#1f2937", "#4b5563"],
  },
  {
    id: "kt-visual-03",
    title: "KT Project — Visual 03",
    client: "가상의 프로젝트",
    year: 2025,
    section: "kt",
    category: "3d",
    thumb: "",
    preview: "",
    video: "",
    role: "3D Motion",
    tools: ["Cinema 4D"],
    desc: "KT 섹션 플레이스홀더 작업물입니다. 실제 작업으로 교체해 주세요.",
    featured: true,
    color: ["#334155", "#64748b"],
  },
  {
    id: "kt-visual-04",
    title: "KT Project — Visual 04",
    client: "가상의 프로젝트",
    year: 2024,
    section: "kt",
    category: "social",
    thumb: "",
    preview: "",
    video: "",
    role: "Motion Design",
    tools: ["Premiere Pro"],
    desc: "KT 섹션 플레이스홀더 작업물입니다. 실제 작업으로 교체해 주세요.",
    featured: false,
    color: ["#0f172a", "#334155"],
  },
];


/* =========================================================
   3. 공통
   ========================================================= */
const header = document.querySelector(".header");
const menuBtn = document.querySelector(".menu-btn");

// 스크롤 시 헤더 하단 라인
if (header) {
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

// 모바일 메뉴 토글
if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    menuBtn.setAttribute("aria-expanded", open);
  });
}

// 푸터 연도 자동 표시
document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

// 스크롤 등장 애니메이션 (.reveal)
const revealObserver = "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" })
  : null;

function observeReveal(root = document) {
  root.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => {
    revealObserver ? revealObserver.observe(el) : el.classList.add("is-visible");
  });
}


/* =========================================================
   4. 갤러리(2D/3D · AI · KT · Home 대표 작품) · 영상 모달
   <div class="gallery" data-gallery="2d3d"></div>   → 2D/3D 작품만
   <div class="gallery" data-gallery="ai"></div>      → AI 작품만
   <div class="gallery" data-gallery="kt"></div>      → KT 작품만
   <div class="gallery" data-gallery="featured"></div> → featured 만 (Home)
   ========================================================= */
const isExternal = (path) => /^(https?:)?\/\//.test(path);

function placeholder(work) {
  const [a, b] = work.color || ["#222", "#666"];
  return `<div class="work-card__placeholder" style="background:linear-gradient(135deg, ${a}, ${b})"></div>`;
}

function galleryMediaHTML(work) {
  return work.thumb ? `<img src="${work.thumb}" alt="${work.title}" loading="lazy">` : placeholder(work);
}

function renderGallery(grid) {
  const key = grid.dataset.gallery;
  const list = key === "featured" ? WORKS.filter((w) => w.featured) : WORKS.filter((w) => w.section === key);
  if (!list.length) return;

  // "세로 2단" — 아이템 개수의 절반(올림)만큼 컬럼을 만들어 항상 2행으로 배치합니다
  const cols = Math.max(1, Math.ceil(list.length / 2));
  grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

  grid.innerHTML = list
    .map(
      (w) => `
      <article class="gallery__item" data-id="${w.id}" tabindex="0" role="button" aria-label="${w.title} 영상 보기">
        ${galleryMediaHTML(w)}
        ${w.preview ? `<video src="${w.preview}" muted loop playsinline preload="none"></video>` : ""}
        <div class="gallery__caption">
          <p class="gallery__title">${w.title}</p>
          <p class="gallery__year">${w.year}</p>
        </div>
      </article>`
    )
    .join("");

  // 마우스 오버 시 프리뷰 영상 재생 (CSS가 페이드 인/아웃을 담당)
  grid.querySelectorAll(".gallery__item").forEach((item) => {
    const v = item.querySelector("video");
    if (!v) return;
    item.addEventListener("mouseenter", () => v.play().catch(() => {}));
    item.addEventListener("mouseleave", () => { v.pause(); v.currentTime = 0; });
  });

  grid.addEventListener("click", (e) => {
    const item = e.target.closest(".gallery__item");
    if (item) openModal(item.dataset.id);
  });
  grid.addEventListener("keydown", (e) => {
    const item = e.target.closest(".gallery__item");
    if (item && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openModal(item.dataset.id); }
  });
}

// 모달
const modal = document.createElement("div");
modal.className = "modal";
modal.setAttribute("role", "dialog");
modal.setAttribute("aria-modal", "true");
modal.innerHTML = `
  <button class="modal__close" aria-label="닫기">✕</button>
  <div class="modal__box">
    <div class="modal__media"></div>
    <div class="modal__body">
      <div>
        <h3 class="modal__title"></h3>
        <p class="modal__meta"></p>
        <ul class="modal__tags"></ul>
      </div>
      <p class="modal__desc"></p>
    </div>
  </div>`;
document.body.appendChild(modal);

const $m = (sel) => modal.querySelector(sel);
let lastFocus = null;

function mediaHTML(work) {
  const src = work.video;
  if (!src) return work.thumb ? `<img src="${work.thumb}" alt="${work.title}">` : placeholder(work);
  if (!isExternal(src) || /\.(mp4|webm|mov)$/i.test(src)) return `<video src="${src}" controls autoplay playsinline></video>`;
  const sep = src.includes("?") ? "&" : "?";
  return `<iframe src="${src}${sep}autoplay=1" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="${work.title}"></iframe>`;
}

function openModal(id) {
  const w = WORKS.find((x) => x.id === id);
  if (!w) return;
  lastFocus = document.activeElement;
  $m(".modal__media").innerHTML = mediaHTML(w);
  $m(".modal__title").textContent = w.title;
  $m(".modal__meta").textContent = `${w.client} · ${w.year} · ${w.role}`;
  $m(".modal__desc").textContent = w.desc;
  $m(".modal__tags").innerHTML = (w.tools || []).map((t) => `<li>${t}</li>`).join("");
  modal.classList.add("is-open");
  document.body.classList.add("is-locked");
  $m(".modal__close").focus();
}

function closeModal() {
  modal.classList.remove("is-open");
  document.body.classList.remove("is-locked");
  setTimeout(() => ($m(".modal__media").innerHTML = ""), 350); // 영상 정지
  if (lastFocus) lastFocus.focus();
}

$m(".modal__close").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal(); });

document.querySelectorAll("[data-gallery]").forEach(renderGallery);


/* =========================================================
   5. 문의 폼
   서버 없이 동작하도록 메일 앱을 열어 내용을 채워줍니다.
   contact.html 에만 폼이 있으므로, 다른 페이지에서는 안전하게 건너뜁니다.
   ========================================================= */
const form = document.querySelector("#contact-form");

if (form) {
  // 다른 페이지에서 "...문의하기" 버튼으로 넘어올 때 ?type=lecture 처럼 쿼리로
  // 문의 유형을 넘기면, 해당 라디오를 자동으로 선택해 둡니다.
  const presetType = new URLSearchParams(location.search).get("type");
  if (presetType) {
    const radio = form.querySelector(`input[name="type"][value="${presetType}"]`);
    if (radio) radio.checked = true;
  }

  form.addEventListener("submit", (e) => {
    if (!USE_MAILTO) return; // form action 주소로 전송

    e.preventDefault();
    const data = new FormData(form);
    const typeLabel = form.querySelector(`input[name="type"]:checked`)?.dataset.label || "";

    const subject = `[${typeLabel}] ${data.get("name")}님의 문의`;
    const body = [
      `이름 / 회사: ${data.get("name")}`,
      `이메일: ${data.get("email")}`,
      `연락처: ${data.get("phone") || "-"}`,
      `문의 유형: ${typeLabel}`,
      `예산 / 일정: ${data.get("budget") || "-"}`,
      "",
      data.get("message"),
    ].join("\n");

    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    form.querySelector(".form__status").textContent = "메일 앱이 열렸어요. 내용을 확인하고 전송해 주세요.";
  });
}


/* ---------- 시작 ---------- */
observeReveal();
