"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WORKS } from "@/data/works";
import Modal from "./Modal";
import WorkThumb from "./WorkThumb";

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

// 타일에 마우스를 올리고 이만큼 머물러야 영상을 띄웁니다. 그냥 스쳐 지나갈 때마다
// iframe을 만들면 낭비라서 짧게 지연을 둡니다.
const HOVER_DELAY = 350;

/**
 * 호버했을 때 타일 안에서 재생할 영상 주소를 만듭니다.
 * data/works.js의 video가 유튜브/비메오 임베드면 소리 없이 자동재생 + 반복으로
 * 바꿔서 돌려주고, 그 외(빈 값 등)는 null — 이 경우 호버해도 썸네일 그대로입니다.
 *
 * 유튜브는 loop=1 만으로는 반복되지 않고 playlist에 같은 ID를 줘야 합니다.
 * controls=0으로 컨트롤 바를 숨겨 타일이 지저분해지지 않게 했습니다.
 */
function hoverEmbedSrc(video) {
  if (!video) return null;

  const yt = video.match(/youtube\.com\/embed\/([\w-]+)/);
  if (yt) {
    const id = yt[1];
    return (
      `https://www.youtube.com/embed/${id}` +
      `?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&modestbranding=1&rel=0&playsinline=1`
    );
  }

  const vimeo = video.match(/player\.vimeo\.com\/video\/(\d+)/);
  if (vimeo) {
    // background=1 이면 컨트롤/제목 없이 무음 자동재생으로 돕니다.
    return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1&muted=1&loop=1&background=1`;
  }

  return null;
}

// 홈 대표 갤러리가 채우려는 타일 수 — 4단 x 2행. 썸네일 있는 작품이 이보다
// 적으면 가능한 만큼(짝수)만 씁니다.
const FEATURED_TARGET = 8;

/**
 * 홈 대표 갤러리에 보여줄 목록을 만듭니다.
 *
 * 그리드가 "세로 2단"이라 아이템이 홀수면 마지막 칸이 비고, 썸네일이 없는 작품은
 * 회색 그라디언트로 떠서 역시 빈칸처럼 보입니다. 그래서 두 가지를 모두 막습니다.
 *   1) 썸네일이 있는 작품만 후보로 삼고
 *   2) featured 작품을 먼저 넣은 뒤, 칸이 남으면 나머지 작품으로 채워
 *      항상 짝수 개(= 빈칸 없는 2행)가 되게 합니다.
 *
 * 덕분에 data/works.js에 썸네일 없는 플레이스홀더가 섞여 있어도 홈은 늘 꽉 찹니다.
 */
function buildFeaturedList(works) {
  const pool = works.filter((w) => w.thumb);
  const picked = pool.filter((w) => w.featured);
  const rest = pool.filter((w) => !w.featured);

  // 후보가 모자라면 그만큼만, 어느 쪽이든 짝수로 맞춥니다(~1 = 홀수면 1 내림).
  const target = Math.min(FEATURED_TARGET, pool.length) & ~1;

  const list = picked.slice(0, target);
  while (list.length < target && rest.length) list.push(rest.shift());
  return list;
}

/**
 * 풀블리드 갤러리 — galleryKey에 따라 WORKS를 필터링해서 보여줍니다.
 *   "2d3d" | "ai" | "branding" → 해당 section 작품만
 *   "featured"           → 홈 대표 작품 (buildFeaturedList 참고)
 * "세로 2단" 레이아웃: 컬럼 수 = 아이템 개수 ÷ 2 (올림) → 항상 정확히 2행.
 */
export default function Gallery({ galleryKey }) {
  const gridRef = useRef(null);
  const [openId, setOpenId] = useState(null);
  // 지금 호버해서 영상이 돌고 있는 타일. 한 번에 하나만 띄웁니다.
  const [playingId, setPlayingId] = useState(null);
  const hoverTimer = useRef(null);

  const list =
    galleryKey === "featured"
      ? buildFeaturedList(WORKS)
      : WORKS.filter((w) => w.section === galleryKey);
  const cols = Math.max(1, Math.ceil(list.length / 2));

  // 타일이 화면에서 차지하는 실제 폭 — next/image가 이 값으로 알맞은 크기를 골라
  // 내려줍니다. 모바일(<=640px)에선 globals.css가 2단으로 강제하므로 50vw.
  const thumbSizes = `(max-width: 640px) 50vw, ${Math.round(100 / cols)}vw`;

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

  // 타일을 빠르게 스쳐 지나가다 페이지를 벗어나면 예약된 타이머가 남을 수 있어 정리합니다.
  useEffect(() => () => clearTimeout(hoverTimer.current), []);

  if (!list.length) return null;

  const reduceMotion = () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const handleEnter = (e, w) => {
    const v = e.currentTarget.querySelector("video");
    if (v) v.play().catch(() => {});
    if (!reduceMotion()) {
      const media = e.currentTarget.querySelectorAll("img, video, .work-card__placeholder");
      gsap.to(media, { scale: 1.05, duration: 0.6, ease: "power3.out" });
    }

    // preview용 mp4가 따로 있으면 그게 우선입니다(위에서 이미 재생). 없을 때만
    // 유튜브/비메오 임베드를 띄웁니다. 모션을 줄이는 설정이면 띄우지 않습니다.
    if (!w.preview && !reduceMotion() && hoverEmbedSrc(w.video)) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = setTimeout(() => setPlayingId(w.id), HOVER_DELAY);
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

    clearTimeout(hoverTimer.current);
    setPlayingId(null);
  };

  // 타일을 눌러 모달이 열리면 뒤에서 영상이 겹쳐 돌지 않도록 멈춥니다.
  const openModal = (id) => {
    clearTimeout(hoverTimer.current);
    setPlayingId(null);
    setOpenId(id);
  };

  const openWork = list.find((w) => w.id === openId) || null;

  return (
    <>
      <div className="gallery" ref={gridRef} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {list.map((w) => (
          <article
            key={w.id}
            className={`gallery__item${playingId === w.id ? " is-playing" : ""}`}
            tabIndex={0}
            role="button"
            aria-label={`${w.title} 영상 보기`}
            onMouseEnter={(e) => handleEnter(e, w)}
            onMouseLeave={handleLeave}
            onClick={() => openModal(w.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openModal(w.id);
              }
            }}
          >
            {w.thumb ? <WorkThumb work={w} sizes={thumbSizes} /> : <Placeholder work={w} />}
            {w.preview ? <video src={w.preview} muted loop playsInline preload="none" /> : null}
            {playingId === w.id && hoverEmbedSrc(w.video) ? (
              <div className="gallery__embed" aria-hidden="true">
                <iframe
                  src={hoverEmbedSrc(w.video)}
                  title={w.title}
                  allow="autoplay; encrypted-media"
                  tabIndex={-1}
                />
              </div>
            ) : null}
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
