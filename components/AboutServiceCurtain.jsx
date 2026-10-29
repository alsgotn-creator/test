"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";

// 커튼을 이루는 세로 타일 개수 — motion.dev의 "Curtains: Pixels" 트랜지션을
// 참고해, 블록들이 아래에서 차오르듯 덮었다가 다시 걷히며 다음 섹션을 드러냅니다.
// 이 섹션엔 커튼이 두 번 등장합니다: ① 진입 시(사진이 나오기 전) ② About→Services 전환 시.
const CURTAIN_TILES = 8;
const CURTAIN_INDEXES = Array.from({ length: CURTAIN_TILES }, (_, i) => i);

// 텍스트를 "마스크(overflow-hidden로 가려진 채 아래→위로 올라오며 드러남) + 스케일"로
// 등장시키는 데 쓰는 스크롤 구간별 모션값. opacity도 y/scale과 똑같이 전체 구간에 걸쳐
// 서서히 올라가도록 해서(앞부분에서 급하게 끝내지 않음) "툭" 튀어나오지 않게 합니다.
function useMaskReveal(progress, start, duration = 0.12, scaleFrom = 1.25) {
  const end = start + duration;
  const y = useTransform(progress, [start, end], ["100%", "0%"]);
  const scale = useTransform(progress, [start, end], [scaleFrom, 1]);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  return { y, scale, opacity };
}

// ===== 타임라인 상수 (progress 0~1, 섹션 전체 420vh 기준) =====
// 진입(ENTRY) 커튼도 전환(EXIT) 커튼과 같은 호흡(유지 시간 + 걷히는 속도)으로 맞춰서
// "번쩍"하고 사라지지 않도록 합니다.
const ENTRY_START = 0.015;
const ENTRY_STAGGER = 0.012;
const ENTRY_HOLD = 0.02;
const ENTRY_RETRACT_DUR = 0.08;

const EXIT_START = 0.7;
const EXIT_STAGGER = 0.012;
const EXIT_COVER_DUR = 0.08;
const EXIT_HOLD = 0.02;
const EXIT_RETRACT_DUR = 0.08;

// 타일 i의 scaleY를 하나의 useTransform 키프레임으로 표현합니다:
// v<0(핀 고정 전) → 0(안 보임) → v=0에서 즉시 1(덮임, 진입 커튼) → 잠시 유지
//   → ENTRY_RETRACT_DUR 동안 0으로 걷힘 → EXIT 구간에서 다시 0→1→1→0(전환 커튼).
function useTileScaleY(progress, i) {
  const entryHoldEnd = ENTRY_START + i * ENTRY_STAGGER + ENTRY_HOLD;
  const entryRetractEnd = entryHoldEnd + ENTRY_RETRACT_DUR;
  const exitStart = EXIT_START + i * EXIT_STAGGER;
  const exitCoverEnd = exitStart + EXIT_COVER_DUR;
  const exitRetractStart = exitCoverEnd + EXIT_HOLD;
  const exitRetractEnd = exitRetractStart + EXIT_RETRACT_DUR;

  return useTransform(
    progress,
    [0, 0.0001, entryHoldEnd, entryRetractEnd, exitStart, exitCoverEnd, exitRetractStart, exitRetractEnd],
    [0, 1, 1, 0, 0, 1, 1, 0]
  );
}

export default function AboutServiceCurtain() {
  const wrapRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  // ===== 진입 라벨 "ABOUT" — 핀 고정 전(v<0)엔 보이지 않다가, 고정되는 즉시 나타나
  // 커튼이 걷히는 속도(ENTRY_RETRACT_DUR)에 맞춰 천천히 사라짐(Services 라벨과 같은 호흡) =====
  const aboutLabelOpacity = useTransform(scrollYProgress, [0, 0.005, 0.04, 0.2], [0, 1, 1, 0]);
  const aboutLabelScale = useTransform(scrollYProgress, [0.04, 0.2], [1, 1.12]);

  // 작은 "About" 라벨(빨간 eyebrow) — 커튼이 완전히 걷힌 뒤 한 박자 쉬고 서서히 나타남.
  // 이게 없으면 커튼 타일 사이 틈으로 계속 비쳐 보입니다.
  const eyebrowOpacity = useTransform(scrollYProgress, [0.24, 0.32], [0, 1]);

  // ===== 배경 사진 — 커튼이 다 걷힌 뒤에야 서서히 드러남(트랜지션과 겹치지 않게) =====
  const bgOpacity = useTransform(scrollYProgress, [0.22, 0.34], [0, 1]);
  const bgScale = useTransform(scrollYProgress, [0.22, 0.85], [1.18, 1]);

  // ===== 헤드라인(줄 단위 마스크 리빌) + 소개 텍스트 + 스탯 — 구간을 넉넉히 늘려서 천천히 =====
  const line1 = useMaskReveal(scrollYProgress, 0.26, 0.18);
  const line2 = useMaskReveal(scrollYProgress, 0.31, 0.18);
  const line3 = useMaskReveal(scrollYProgress, 0.36, 0.18);
  const textBlock = useMaskReveal(scrollYProgress, 0.46, 0.16, 1.08);
  const statsBlock = useMaskReveal(scrollYProgress, 0.52, 0.16, 1.08);

  // ===== 전체 필드(사진+텍스트)가 하나로 묶여 나타났다 줄어드는 구간 =====
  // About 영역이 보이기 시작하는 순간부터 필드 전체를 서서히 드러내 갑작스러운
  // 등장 없이 검은 트랜지션 배경에서 자연스럽게 이어지도록 합니다.
  const fieldScale = useTransform(
    scrollYProgress,
    [0.08, 0.3, 0.7, 0.8],
    [0.7, 1, 1, 0.5]
  );
  const fieldRadius = useTransform(scrollYProgress, [0.7, 0.8], [0, 36]);
  const fieldOpacity = useTransform(scrollYProgress, [0.08, 0.3, 0.78, 0.86], [0, 1, 1, 0]);

  // ===== 전환 라벨 "SERVICES" — 커튼이 다 덮었을 때 떴다가, 걷히는 커튼과 함께 사라짐 =====
  const servicesLabelOpacity = useTransform(
    scrollYProgress,
    [0.7, 0.78, 0.844, 0.924],
    [0, 1, 1, 0]
  );
  const servicesLabelScale = useTransform(scrollYProgress, [0.844, 0.924], [1, 1.12]);

  // ===== Services가 큰 화면으로 등장 =====
  const servicesOpacity = useTransform(scrollYProgress, [0.74, 0.84], [0, 1]);
  const servicesScale = useTransform(scrollYProgress, [0.74, 1], [0.7, 1]);
  const svcHead = useMaskReveal(scrollYProgress, 0.82, 0.08, 1.1);
  const svcCards = useMaskReveal(scrollYProgress, 0.88, 0.08, 1.06);
  const svcLecture = useMaskReveal(scrollYProgress, 0.94, 0.06, 1.05);

  // 커튼 타일 — 고정 개수(8개)이므로 인덱스별로 useTransform을 직접 호출
  const tileScales = CURTAIN_INDEXES.map((i) => useTileScaleY(scrollYProgress, i));

  return (
    <section className="about-curtain" ref={wrapRef}>
      <div className="about-curtain__pin">
        {/* ===== About: 배경 사진 + 헤드라인 + 소개 — 하나의 "필드"로 묶여 함께 줄어듭니다 ===== */}
        <motion.div
          id="about"
          className="about-curtain__field"
          style={{ scale: fieldScale, borderRadius: fieldRadius, opacity: fieldOpacity }}
        >
          <motion.div className="about-curtain__bg" style={{ opacity: bgOpacity, scale: bgScale }}>
            <img src="/assets/images/about-bg.jpg" alt="" className="about-curtain__bg-img" />
            <div className="about-curtain__scrim" />
          </motion.div>

          <div className="about-curtain__content container">
            <motion.p className="eyebrow" style={{ opacity: eyebrowOpacity }}>
              About
            </motion.p>
            <h2 className="title-lg about-curtain__headline">
              <span className="mask-line">
                <motion.span style={{ y: line1.y, scale: line1.scale, opacity: line1.opacity }}>
                  안녕하세요,
                </motion.span>
              </span>
              <span className="mask-line">
                <motion.span style={{ y: line2.y, scale: line2.scale, opacity: line2.opacity }}>
                  모션 디자이너
                </motion.span>
              </span>
              <span className="mask-line">
                <motion.span style={{ y: line3.y, scale: line3.scale, opacity: line3.opacity }}>
                  Noitom입니다.
                </motion.span>
              </span>
            </h2>

            <div className="about-curtain__row">
              <motion.div
                className="about-curtain__text"
                style={{ y: textBlock.y, scale: textBlock.scale, opacity: textBlock.opacity }}
              >
                <p>
                  2D/3D 모션, AI 비주얼을 중심으로 작업하고 있습니다. 메시지가 가장 잘 전달되는
                  움직임을 찾는 것을 좋아합니다.
                </p>
                <p>
                  기획 단계부터 함께 고민하며, 결과물이 브랜드의 언어로 오래 쓰일 수 있도록
                  디자인합니다. 또한 기업과 대학에서 모션그래픽 강의를 진행하고 있습니다.
                </p>
              </motion.div>

              <motion.div
                className="stats about-curtain__stats"
                style={{ y: statsBlock.y, scale: statsBlock.scale, opacity: statsBlock.opacity }}
              >
                <div>
                  <p className="stats__num">
                    8<sup>+</sup>
                  </p>
                  <p className="stats__label">년차 경력</p>
                </div>
                <div>
                  <p className="stats__num">
                    120<sup>+</sup>
                  </p>
                  <p className="stats__label">완료 프로젝트</p>
                </div>
                <div>
                  <p className="stats__num">
                    40<sup>+</sup>
                  </p>
                  <p className="stats__label">출강 · 강의</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ===== 커튼 (진입 + 전환 공용) ===== */}
        <div className="about-curtain__curtain" aria-hidden="true">
          {CURTAIN_INDEXES.map((i) => (
            <motion.div key={i} className="about-curtain__tile" style={{ scaleY: tileScales[i] }} />
          ))}
        </div>

        {/* ===== 커튼 중앙 라벨 — 트랜지션과 함께 나타났다 사라짐 ===== */}
        <motion.p
          className="about-curtain__label"
          aria-hidden="true"
          style={{ opacity: aboutLabelOpacity, scale: aboutLabelScale }}
        >
          About
        </motion.p>
        <motion.p
          className="about-curtain__label"
          aria-hidden="true"
          style={{ opacity: servicesLabelOpacity, scale: servicesLabelScale }}
        >
          Services
        </motion.p>

        {/* ===== Services: 커튼이 걷히며 큰 화면으로 등장 ===== */}
        <motion.div
          id="services"
          className="about-curtain__services"
          style={{ opacity: servicesOpacity, scale: servicesScale }}
        >
          <div className="container">
            <motion.div
              className="section-head"
              style={{ y: svcHead.y, scale: svcHead.scale, opacity: svcHead.opacity }}
            >
              <div>
                <p className="eyebrow">Services</p>
                <h2 className="title-lg">이런 작업이 가능합니다</h2>
              </div>
            </motion.div>

            <motion.div
              className="services"
              style={{ y: svcCards.y, scale: svcCards.scale, opacity: svcCards.opacity }}
            >
              <div className="service">
                <p className="service__num">01</p>
                <h3 className="service__title">2D / 3D 모션</h3>
                <p className="service__desc">브랜드 필름, 타이틀, 3D 비주얼, UI 모션까지</p>
              </div>
              <div className="service">
                <p className="service__num">02</p>
                <h3 className="service__title">AI 비주얼</h3>
                <p className="service__desc">생성형 AI를 활용한 비주얼 익스플로레이션과 후반 작업</p>
              </div>
              <div className="service">
                <p className="service__num">03</p>
                <h3 className="service__title">브랜딩</h3>
                <p className="service__desc">브랜드 아이덴티티, 로고 모션, 브랜드 필름 작업</p>
              </div>
              <div className="service">
                <p className="service__num">04</p>
                <h3 className="service__title">출강 · 강의</h3>
                <p className="service__desc">기업 · 대학 · 교육기관 모션그래픽 교육</p>
              </div>
            </motion.div>

            {/* 04 출강·강의 하위구조 — Lecture 안내 */}
            <motion.div
              className="service-lecture"
              style={{ y: svcLecture.y, scale: svcLecture.scale, opacity: svcLecture.opacity }}
            >
              <div>
                <p className="eyebrow">Lecture</p>
                <h4 className="title-md">모션그래픽, 실무자에게 직접 배워보세요.</h4>
                <p className="lead">
                  After Effects 기초부터 실무 프로젝트까지. 기업 출강, 대학 특강, 원데이 클래스를
                  진행합니다.
                </p>
              </div>
              <Link href="/lecture" className="btn btn--primary">
                강의 안내 <span className="arrow">→</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
