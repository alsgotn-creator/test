/* =========================================================
   motion.js — GSAP 기반 모션

   사용법: 각 html 하단에서
     <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
     <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
     <script src="js/script.js"></script>   ← 먼저: 갤러리/모달 등 DOM을 그립니다
     <script src="js/motion.js"></script>   ← 다음: 이미 그려진 DOM에 GSAP을 겁니다
   순서로 불러옵니다. gsap/ScrollTrigger가 없으면 아무 것도 하지 않고
   조용히 넘어가므로(CDN 장애 등) 사이트 자체는 그대로 동작합니다.

   여기서 다루는 3가지가 "GSAP을 어떻게 적용하는지"의 기본 패턴입니다:
   1) scrub(스크롤 연동) 패럴랙스 — 히어로 배경 원
   2) ScrollTrigger + stagger — 갤러리 타일이 스크롤에 맞춰 순서대로 떠오름
   3) 호버 인터랙션 — gsap.to 로 부드러운 확대
   ========================================================= */
(function () {
  if (typeof gsap === "undefined") return; // CDN 로드 실패 시 사이트 동작에 영향 없이 종료
  const hasScrollTrigger = typeof ScrollTrigger !== "undefined";
  if (hasScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return; // 모션 최소화 설정을 존중합니다


  /* ---------- 1) 히어로 배경 원 — 스크롤 패럴랙스 (scrub) ---------- */
  const heroShape = document.querySelector(".hero__shape");
  if (heroShape && hasScrollTrigger) {
    gsap.to(heroShape, {
      yPercent: 30,
      xPercent: -8,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true, // 스크롤 위치에 그대로 묶여서 움직입니다
      },
    });
  }


  /* ---------- 2) 갤러리 타일 — 스크롤로 들어오며 순서대로 떠오름 ---------- */
  document.querySelectorAll(".gallery").forEach((grid) => {
    const items = grid.querySelectorAll(".gallery__item");
    if (!items.length || !hasScrollTrigger) return;
    gsap.from(items, {
      opacity: 0,
      y: 32,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.06,
      scrollTrigger: {
        trigger: grid,
        start: "top 88%",
      },
    });
  });


  /* ---------- 3) 갤러리 타일 호버 — 부드러운 확대 ----------
     흑백/회색 오버레이·캡션은 css(style.css)가 담당하고,
     확대(scale)만 GSAP으로 처리해 두 시스템이 같은 속성을 겹쳐 건드리지 않게 합니다. */
  document.querySelectorAll(".gallery__item").forEach((item) => {
    const media = item.querySelectorAll("img, video, .work-card__placeholder");
    if (!media.length) return;
    item.addEventListener("mouseenter", () => {
      gsap.to(media, { scale: 1.05, duration: 0.6, ease: "power3.out" });
    });
    item.addEventListener("mouseleave", () => {
      gsap.to(media, { scale: 1, duration: 0.6, ease: "power3.out" });
    });
  });
})();
