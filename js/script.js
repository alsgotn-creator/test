/* =========================================================
   script.js — 사이트 전체 스크립트

   1. 설정 (이메일)
   2. 작품 데이터        ★ 작품 추가/수정은 여기서
   3. 공통 (헤더 · 모바일 메뉴 · 스크롤 등장 · 연도)
   4. 페이지 전환 (#home · #work · #lecture · #contact)
   5. 작품 그리드 · 필터 · 영상 모달
   6. 문의 폼
   ========================================================= */


/* =========================================================
   1. 설정
   ========================================================= */
const EMAIL = "hello@example.com"; // ← 실제 이메일로 변경
const USE_MAILTO = true;           // 폼 서비스(Formspree 등)를 쓰려면 false + form action 지정


/* =========================================================
   2. 작품 데이터

   id        : 고유값 (영문, 겹치지 않게)
   title     : 작품명
   client    : 클라이언트 / 프로젝트 성격
   year      : 연도
   category  : 필터 분류 — CATEGORIES 의 key 중 하나
   thumb     : 썸네일 이미지 경로 (없으면 그라디언트로 표시)
               예) "assets/images/works/brand-film.jpg"
   preview   : 카드에 마우스 올렸을 때 재생할 짧은 mp4 (선택)
               예) "assets/videos/brand-film-loop.mp4"
   video     : 모달에서 재생할 영상
               - 유튜브: "https://www.youtube.com/embed/영상ID"
               - 비메오: "https://player.vimeo.com/video/영상ID"
               - 직접 파일: "assets/videos/파일명.mp4"
   role      : 담당 역할
   tools     : 사용 툴 (배열)
   desc      : 작품 설명
   featured  : true 면 메인(Home)에 노출
   color     : 썸네일 없을 때 그라디언트 색상 [시작, 끝]
   ========================================================= */
const CATEGORIES = {
  all: "전체",
  brand: "브랜드 필름",
  title: "타이틀 · 오프닝",
  "3d": "3D 모션",
  ui: "UI 모션",
  social: "소셜 콘텐츠",
};

const WORKS = [
  {
    id: "brand-film-2026",
    title: "Brand Film — Rebirth",
    client: "가상의 브랜드 A",
    year: 2026,
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
    category: "3d",
    thumb: "",
    preview: "",
    video: "",
    role: "3D Modeling, Lighting, Animation",
    tools: ["Cinema 4D", "Octane", "After Effects"],
    desc: "신제품 런칭용 3D 프로덕트 비주얼. 재질과 빛의 표현에 집중했습니다.",
    featured: true,
    color: ["#2b5cff", "#9db4ff"],
  },
  {
    id: "app-ui-motion",
    title: "App UI Motion Guide",
    client: "가상의 핀테크 앱",
    year: 2025,
    category: "ui",
    thumb: "",
    preview: "",
    video: "",
    role: "UI Motion, Prototyping",
    tools: ["After Effects", "Figma", "Lottie"],
    desc: "앱 전반의 인터랙션 모션 가이드와 Lottie 에셋 제작.",
    featured: true,
    color: ["#13c296", "#a6f0da"],
  },
  {
    id: "social-campaign",
    title: "Social Campaign Series",
    client: "가상의 패션 브랜드",
    year: 2025,
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
];


/* =========================================================
   3. 공통
   ========================================================= */
const header = document.querySelector(".header");
const menuBtn = document.querySelector(".menu-btn");

// 스크롤 시 헤더 하단 라인
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// 모바일 메뉴 토글
menuBtn.addEventListener("click", () => {
  const open = document.body.classList.toggle("menu-open");
  menuBtn.setAttribute("aria-expanded", open);
});

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
   4. 페이지 전환
   <section class="page" id="work"> 처럼 id 가 곧 주소(#work)가 됩니다.
   ========================================================= */
const pages = document.querySelectorAll(".page");
const navLinks = document.querySelectorAll(".nav a");

function showPage() {
  let target = document.getElementById(location.hash.slice(1));
  if (!target || !target.classList.contains("page")) target = document.getElementById("home");
  const id = target.id;

  pages.forEach((p) => p.classList.toggle("is-active", p === target));
  navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + id));
  document.body.classList.remove("menu-open");
  window.scrollTo(0, 0);
  document.title = (target.dataset.title ? target.dataset.title + " — " : "") + "NAME — Motion Designer";
}

window.addEventListener("hashchange", showPage);


/* =========================================================
   5. 작품 그리드 · 필터 · 영상 모달
   <div class="work-grid" data-works></div>             → 전체 작품
   <div class="work-grid" data-works="featured"></div>  → featured 만
   <div class="filter" data-filter></div>               → 필터 버튼 자리
   ========================================================= */
const isExternal = (path) => /^(https?:)?\/\//.test(path);

function placeholder(work) {
  const [a, b] = work.color || ["#222", "#666"];
  return `<div class="work-card__placeholder" style="background:linear-gradient(135deg, ${a}, ${b})">${work.title}</div>`;
}

function thumbHTML(work) {
  return work.thumb ? `<img src="${work.thumb}" alt="${work.title}" loading="lazy">` : placeholder(work);
}

function renderGrid(grid) {
  const list = grid.dataset.works === "featured" ? WORKS.filter((w) => w.featured) : WORKS;

  grid.innerHTML = list
    .map(
      (w) => `
      <article class="work-card reveal" data-id="${w.id}" data-category="${w.category}" tabindex="0" role="button" aria-label="${w.title} 영상 보기">
        <div class="work-card__thumb">
          ${thumbHTML(w)}
          ${w.preview ? `<video src="${w.preview}" muted loop playsinline preload="none" style="opacity:0"></video>` : ""}
          <span class="work-card__play" aria-hidden="true"></span>
        </div>
        <div class="work-card__info">
          <h3 class="work-card__title">${w.title}</h3>
          <span class="work-card__meta">${CATEGORIES[w.category] || ""} · ${w.year}</span>
        </div>
        <p class="work-card__client">${w.client}</p>
      </article>`
    )
    .join("");

  // 마우스 오버 시 프리뷰 영상 재생
  grid.querySelectorAll(".work-card").forEach((card) => {
    const v = card.querySelector("video");
    if (!v) return;
    card.addEventListener("mouseenter", () => { v.style.opacity = 1; v.play().catch(() => {}); });
    card.addEventListener("mouseleave", () => { v.style.opacity = 0; v.pause(); v.currentTime = 0; });
  });

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".work-card");
    if (card) openModal(card.dataset.id);
  });
  grid.addEventListener("keydown", (e) => {
    const card = e.target.closest(".work-card");
    if (card && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openModal(card.dataset.id); }
  });
}

function renderFilter(filterEl, grid) {
  const used = new Set(WORKS.map((w) => w.category));
  const keys = Object.keys(CATEGORIES).filter((k) => k === "all" || used.has(k));
  filterEl.innerHTML = keys
    .map((k, i) => `<button class="filter__btn${i === 0 ? " is-active" : ""}" data-key="${k}">${CATEGORIES[k]}</button>`)
    .join("");

  filterEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter__btn");
    if (!btn) return;
    filterEl.querySelectorAll(".filter__btn").forEach((b) => b.classList.toggle("is-active", b === btn));
    const key = btn.dataset.key;
    grid.querySelectorAll(".work-card").forEach((card) => {
      card.classList.toggle("is-hidden", key !== "all" && card.dataset.category !== key);
    });
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

document.querySelectorAll("[data-works]").forEach((grid) => {
  renderGrid(grid);
  const filterEl = grid.parentElement.querySelector("[data-filter]");
  if (filterEl) renderFilter(filterEl, grid);
});


/* =========================================================
   6. 문의 폼
   서버 없이 동작하도록 메일 앱을 열어 내용을 채워줍니다.
   ========================================================= */
const form = document.querySelector("#contact-form");

// data-contact-type="lecture" 버튼을 누르면 문의 유형 자동 선택
document.querySelectorAll("[data-contact-type]").forEach((btn) =>
  btn.addEventListener("click", () => {
    const radio = form.querySelector(`input[name="type"][value="${btn.dataset.contactType}"]`);
    if (radio) radio.checked = true;
  })
);

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


/* ---------- 시작 ---------- */
showPage();
observeReveal();
