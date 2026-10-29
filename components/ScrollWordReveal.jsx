"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * 문장을 단어 단위로 쪼개서, 섹션을 고정(pin)하지 않고 문단이 화면을 지나가는
 * 동안 스크롤 위치에 맞춰 한 단어씩 밝아지는 리빌입니다.
 * (참고: yanfssss.ayoniyi.dev의 "스크롤로 문장이 생성되는" 효과 —
 *  거기는 섹션을 pin해서 쓰지만, 여긴 짧은 인라인 문단 여러 곳에 쓰므로
 *  스크롤을 멈추지 않는 가벼운 버전으로 만들었습니다.)
 *
 * <ScrollWordReveal text="문장" as="p" className="lead" />
 */
export default function ScrollWordReveal({ text, as: Tag = "p", className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const words = el.querySelectorAll(".sw-word");
    if (!words.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.22 },
        {
          opacity: 1,
          ease: "none",
          stagger: 1,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "bottom 55%",
            scrub: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [text]);

  const words = text.split(" ");

  return (
    <Tag className={className} ref={ref}>
      {words.map((w, i) => (
        <span className="sw-word" key={i}>
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
