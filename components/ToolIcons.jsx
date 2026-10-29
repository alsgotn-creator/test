"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TOOLS } from "@/data/tools";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ToolIcons() {
  const rowRef = useRef(null);

  // 스크롤로 들어오며 아이콘이 하나씩 순서대로 튕기듯 나타나는 애니메이션
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = row.querySelectorAll(".tool-chip");
    const ctx = gsap.context(() => {
      gsap.from(items, {
        opacity: 0,
        y: 20,
        scale: 0.85,
        duration: 0.6,
        ease: "back.out(2)",
        stagger: 0.05,
        scrollTrigger: { trigger: row, start: "top 90%" },
      });
    }, row);

    return () => ctx.revert();
  }, []);

  const handleEnter = (e) => {
    gsap.to(e.currentTarget, { y: -6, scale: 1.08, duration: 0.35, ease: "power3.out" });
  };
  const handleLeave = (e) => {
    gsap.to(e.currentTarget, { y: 0, scale: 1, duration: 0.45, ease: "power3.out" });
  };

  return (
    <div className="tools" ref={rowRef}>
      {TOOLS.map((tool) => (
        <div
          key={tool.id}
          className={`tool-chip${tool.icon ? "" : " tool-chip--empty"}`}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          tabIndex={0}
        >
          {tool.icon ? (
            <img
              className={`tool-chip__icon${tool.style === "badge" ? " tool-chip__icon--badge" : ""}`}
              src={tool.icon}
              alt={tool.label}
              loading="lazy"
            />
          ) : (
            <span className="tool-chip__icon tool-chip__icon--empty" aria-hidden="true">
              +
            </span>
          )}
          <span className="tool-chip__label">{tool.label}</span>
        </div>
      ))}
    </div>
  );
}
