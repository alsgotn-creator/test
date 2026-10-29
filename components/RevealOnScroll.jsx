"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// 스크롤 등장 애니메이션 (.reveal) — 원래 vanilla script.js의 observeReveal()과 동일한 동작.
// App Router는 페이지를 이동해도 레이아웃이 그대로 유지되므로, pathname이 바뀔 때마다
// (새 페이지의 .reveal 요소들을 잡기 위해) 다시 스캔합니다.
export default function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
