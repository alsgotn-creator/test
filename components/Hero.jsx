"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const heroRef = useRef(null);
  const shapeRef = useRef(null);

  // 히어로 배경 원 — 스크롤에 맞춰 자연스럽게 움직이는 패럴랙스 (scrub)
  useEffect(() => {
    const hero = heroRef.current;
    const shape = shapeRef.current;
    if (!hero || !shape) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to(shape, {
        yPercent: 30,
        xPercent: -8,
        ease: "none",
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
      });
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="container">
        <p className="eyebrow">Motion Designer · Lecturer</p>
        <h1 className="hero__title title-xl">
          <span className="line">
            <span>움직임으로</span>
          </span>
          <span className="line">
            <span>
              브랜드의 <em>이야기</em>를
            </span>
          </span>
          <span className="line">
            <span>디자인합니다.</span>
          </span>
        </h1>
        <div className="hero__bottom">
          <div className="hero__actions">
            <Link href="/works-2d3d" className="btn btn--primary">
              작품 보기 <span className="arrow">→</span>
            </Link>
            <Link href="/contact" className="btn btn--line">
              프로젝트 문의
            </Link>
          </div>
          <span className="scroll-hint">Scroll</span>
        </div>
      </div>
      <div className="hero__shape" ref={shapeRef} aria-hidden="true" />
    </section>
  );
}
