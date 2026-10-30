"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "MAIN" },
  { href: "/#work", label: "VIDEO" },
  { href: "/lecture", label: "LECTURE" },
  { href: "/contact", label: "CONTACT" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // 헤더가 지금 어두운 배경(히어로 영상 / About 진입부의 어두운 사진·그라디언트) 위에
  // 떠 있는지 — 그 구간에서만 밝은 글자색을 쓰고, 그 외(대부분 밝은 배경)엔 기본(어두운)
  // 글자색을 씁니다. 헤더엔 배경색이 없어서(투명) 지금 뒤에 뭐가 있는지 직접 계산합니다.
  const [onDark, setOnDark] = useState(false);

  // 스크롤 시 헤더 하단 라인
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setOnDark(false);
      return;
    }

    const compute = () => {
      const heroEl = document.querySelector(".hero");
      const heroDark = heroEl ? heroEl.getBoundingClientRect().bottom > 0 : false;

      // About→Services 구간: 사진(어두운 스크림)이 보이는 동안은 어두운 배경,
      // 커튼 컴포넌트의 크로스페이드 타이밍(about-curtain__pin → __services)과 맞춰
      // Services의 밝은 그라디언트가 충분히 드러난 뒤(progress ≈ 0.76)부터 밝은 배경으로 간주합니다.
      const aboutEl = document.querySelector(".about-curtain");
      let aboutDark = false;
      if (aboutEl) {
        const rect = aboutEl.getBoundingClientRect();
        const top = window.scrollY + rect.top;
        const scrollable = aboutEl.offsetHeight - window.innerHeight;
        if (scrollable > 0) {
          const progress = (window.scrollY - top) / scrollable;
          aboutDark = progress >= 0 && progress < 0.76;
        }
      }

      setOnDark(heroDark || aboutDark);
    };

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [pathname]);

  return (
    <header className={`header${scrolled ? " is-scrolled" : ""}${onDark ? " header--on-dark" : ""}`}>
      <div className="container header__inner">
        <Link href="/" className="logo">
          Noitom<span>.</span>
        </Link>
        <nav className="nav" aria-label="주요 메뉴">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "is-active" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          className="menu-btn"
          aria-label="메뉴 열기"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
