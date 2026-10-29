"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/works-2d3d", label: "2D·3D" },
  { href: "/works-ai", label: "AI" },
  { href: "/works-kt", label: "KT" },
  { href: "/lecture", label: "Lecture" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // 스크롤 시 헤더 하단 라인
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 모바일 메뉴 열림 상태를 body 클래스에 반영 (기존 CSS가 body.menu-open을 기준으로 함)
  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
  }, [menuOpen]);

  // 경로가 바뀌면(페이지 이동) 모바일 메뉴를 닫습니다
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className={`header${scrolled ? " is-scrolled" : ""}`}>
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
