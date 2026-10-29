"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 포트폴리오 하이라이트 클립 — 각 영상에서 가장 장면 전환이 활발한 구간만 잘라뒀습니다
// (public/assets/videos/hero/*.mp4, 소리 없음)
const HERO_CLIPS = [
  "/assets/videos/hero/ohouse.mp4",
  "/assets/videos/hero/kream.mp4",
  "/assets/videos/hero/case.mp4",
  "/assets/videos/hero/colpop.mp4",
];

function pickNext(current) {
  if (HERO_CLIPS.length <= 1) return 0;
  let next = Math.floor(Math.random() * HERO_CLIPS.length);
  while (next === current) next = Math.floor(Math.random() * HERO_CLIPS.length);
  return next;
}

export default function Hero() {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  // 서버 렌더와 첫 클라이언트 렌더를 일치시키기 위해 0으로 시작하고,
  // 마운트 후 effect에서 랜덤하게 다시 고릅니다(hydration mismatch 방지).
  const [clipIndex, setClipIndex] = useState(0);

  useEffect(() => {
    setClipIndex(Math.floor(Math.random() * HERO_CLIPS.length));
  }, []);

  // 배경 영상 — 스크롤에 맞춰 천천히 확대되는 패럴랙스 (scrub)
  useEffect(() => {
    const hero = heroRef.current;
    const bg = bgRef.current;
    if (!hero || !bg) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to(bg, {
        scale: 1.15,
        ease: "none",
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
      });
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero__bg" ref={bgRef} aria-hidden="true">
        <video
          key={clipIndex}
          src={HERO_CLIPS[clipIndex]}
          autoPlay
          muted
          playsInline
          onEnded={() => setClipIndex((i) => pickNext(i))}
        />
      </div>
      <div className="hero__overlay" aria-hidden="true" />
      <div className="container">
        <div className="hero__bottom">
          <span className="scroll-hint">Scroll</span>
        </div>
      </div>
    </section>
  );
}
