"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WORKS } from "@/data/works";
import Modal from "./Modal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function Placeholder({ work }) {
  const [a, b] = work.color || ["#222", "#666"];
  return (
    <div
      className="work-card__placeholder"
      style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}
    />
  );
}

/**
 * 풀블리드 갤러리 — galleryKey에 따라 WORKS를 필터링해서 보여줍니다.
 *   "2d3d" | "ai" | "branding" → 해당 section 작품만
 *   "featured"           → featured:true 인 작품만 (Home 대표 작품)
 * "세로 2단" 레이아웃: 컬럼 수 = 아이템 개수 ÷ 2 (올림) → 항상 정확히 2행.
 */
export default function Gallery({ galleryKey }) {
  const gridRef = useRef(null);
  const [openId, setOpenId] = useState(null);

  const list =
    galleryKey === "featured"
      ? WORKS.filter((w) => w.featured)
      : WORKS.filter((w) => w.section === galleryKey);
  const cols = Math.max(1, Math.ceil(list.length / 2));

  // 스크롤로 들어오며 순서대로 떠오르는 애니메이션 (GSAP + ScrollTrigger)
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const items = grid.querySelectorAll(".gallery__item");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !items.length) return;

    const ctx = gsap.context(() => {
      gsap.from(items, {
        opacity: 0,
        y: 32,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: { trigger: grid, start: "top 88%" },
      });
    }, grid);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [galleryKey, list.length]);

  if (!list.length) return null;

  const reduceMotion = () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const handleEnter = (e) => {
    const v = e.currentTarget.querySelector("video");
    if (v) v.play().catch(() => {});
    if (!reduceMotion()) {
      const media = e.currentTarget.querySelectorAll("img, video, .work-card__placeholder");
      gsap.to(media, { scale: 1.05, duration: 0.6, ease: "power3.out" });
    }
  };

  const handleLeave = (e) => {
    const v = e.currentTarget.querySelector("video");
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
    const media = e.currentTarget.querySelectorAll("img, video, .work-card__placeholder");
    gsap.to(media, { scale: 1, duration: 0.6, ease: "power3.out" });
  };

  const openWork = list.find((w) => w.id === openId) || null;

  return (
    <>
      <div className="gallery" ref={gridRef} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {list.map((w) => (
          <article
            key={w.id}
            className="gallery__item"
            tabIndex={0}
            role="button"
            aria-label={`${w.title} 영상 보기`}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            onClick={() => setOpenId(w.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOpenId(w.id);
              }
            }}
          >
            {w.thumb ? (
              <img src={w.thumb} alt={w.title} loading="lazy" />
            ) : (
              <Placeholder work={w} />
            )}
            {w.preview ? <video src={w.preview} muted loop playsInline preload="none" /> : null}
            <div className="gallery__caption">
              <p className="gallery__title">{w.title}</p>
              <p className="gallery__year">{w.year}</p>
            </div>
          </article>
        ))}
      </div>
      <Modal work={openWork} onClose={() => setOpenId(null)} />
    </>
  );
}
