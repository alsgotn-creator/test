"use client";

import { useEffect, useRef } from "react";

const isExternal = (path) => /^(https?:)?\/\//.test(path);

function Placeholder({ work }) {
  const [a, b] = work.color || ["#222", "#666"];
  return (
    <div
      className="work-card__placeholder"
      style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}
    />
  );
}

function Media({ work }) {
  const src = work.video;
  if (!src) {
    return work.thumb ? <img src={work.thumb} alt={work.title} /> : <Placeholder work={work} />;
  }
  if (!isExternal(src) || /\.(mp4|webm|mov)$/i.test(src)) {
    return <video src={src} controls autoPlay playsInline />;
  }
  const sep = src.includes("?") ? "&" : "?";
  return (
    <iframe
      src={`${src}${sep}autoplay=1`}
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
      title={work.title}
    />
  );
}

// work가 null/undefined면 숨겨진 상태로 렌더링합니다(기존 vanilla 버전처럼 DOM은
// 유지한 채 opacity/visibility로 여닫는 방식과 동일한 느낌을 주기 위함).
export default function Modal({ work, onClose }) {
  const closeBtnRef = useRef(null);
  const isOpen = Boolean(work);

  useEffect(() => {
    if (!isOpen) return;
    document.body.classList.add("is-locked");
    closeBtnRef.current?.focus();
    return () => document.body.classList.remove("is-locked");
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      className={`modal${isOpen ? " is-open" : ""}`}
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button ref={closeBtnRef} className="modal__close" aria-label="닫기" onClick={onClose}>
        ✕
      </button>
      <div className="modal__box">
        <div className="modal__media">{work ? <Media work={work} /> : null}</div>
        {work ? (
          <div className="modal__body">
            <div>
              <h3 className="modal__title">{work.title}</h3>
              <p className="modal__meta">
                {work.client} · {work.year} · {work.role}
              </p>
              <ul className="modal__tags">
                {(work.tools || []).map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <p className="modal__desc">{work.desc}</p>
          </div>
        ) : (
          <div className="modal__body" />
        )}
      </div>
    </div>
  );
}
