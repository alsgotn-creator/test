"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";

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

export default function AboutServiceCurtain() {
  const wrapRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  // ===== 진입 라벨 "ABOUT" — 커튼(블록 와이프) 대신 아주 천천히 디졸브로 나타났다 사라짐 =====
  const aboutLabelOpacity = useTransform(scrollYProgress, [0, 0.1, 0.22, 0.32], [0, 1, 1, 0]);
  const aboutLabelScale = useTransform(scrollYProgress, [0.1, 0.32], [1, 1.05]);

  // 작은 "About" 라벨(빨간 eyebrow) — 서서히 나타남
  const eyebrowOpacity = useTransform(scrollYProgress, [0.34, 0.44], [0, 1]);

  // ===== 배경 사진 — "About" 라벨이 사라지는 구간과 겹치도록 해 진짜 디졸브(크로스페이드)로
  // 아주 천천히 드러납니다. Hero 배경 영상과 동일하게, 보이는 내내 스크롤에 따라 서서히
  // 확대됩니다(줌인). =====
  const bgOpacity = useTransform(scrollYProgress, [0.24, 0.42], [0, 1]);
  const bgScale = useTransform(scrollYProgress, [0.24, 0.85], [1, 1.15]);

  // ===== 헤드라인(줄 단위 마스크 리빌) + 소개 텍스트 + 스탯 — 구간을 넉넉히 늘려서 천천히 =====
  const line1 = useMaskReveal(scrollYProgress, 0.38, 0.14);
  const line2 = useMaskReveal(scrollYProgress, 0.43, 0.14);
  const line3 = useMaskReveal(scrollYProgress, 0.48, 0.14);
  const textBlock = useMaskReveal(scrollYProgress, 0.56, 0.13, 1.08);
  const statsBlock = useMaskReveal(scrollYProgress, 0.61, 0.13, 1.08);

  // ===== 전체 필드(사진+텍스트)가 하나로 묶여 디졸브로 나타났다 사라지는 구간 =====
  // 급격한 스케일 변화 없이, 아주 서서히 드러나고(opacity) 끝에서도 서서히 사라집니다.
  const fieldScale = useTransform(scrollYProgress, [0.18, 0.4], [1.04, 1]);
  const fieldOpacity = useTransform(scrollYProgress, [0.18, 0.4, 0.7, 0.8], [0, 1, 1, 0]);

  // ===== 전환 라벨 "SERVICES" — 역시 디졸브로 천천히 나타났다 사라짐 =====
  const servicesLabelOpacity = useTransform(
    scrollYProgress,
    [0.68, 0.76, 0.84, 0.92],
    [0, 1, 1, 0]
  );
  const servicesLabelScale = useTransform(scrollYProgress, [0.76, 0.92], [1, 1.05]);

  // ===== Services가 디졸브로 천천히 등장 =====
  const servicesOpacity = useTransform(scrollYProgress, [0.78, 0.92], [0, 1]);
  const servicesScale = useTransform(scrollYProgress, [0.78, 1], [0.97, 1]);
  const svcHead = useMaskReveal(scrollYProgress, 0.84, 0.08, 1.08);
  const svcCards = useMaskReveal(scrollYProgress, 0.89, 0.08, 1.05);
  const svcLecture = useMaskReveal(scrollYProgress, 0.95, 0.05, 1.04);

  return (
    <section className="about-curtain" ref={wrapRef}>
      <div className="about-curtain__pin">
        {/* ===== About: 배경 사진 + 헤드라인 + 소개 — 하나의 "필드"로 묶여 함께 줄어듭니다 ===== */}
        <motion.div
          id="about"
          className="about-curtain__field"
          style={{ scale: fieldScale, opacity: fieldOpacity }}
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

        {/* ===== 중앙 라벨 — 디졸브로 천천히 나타났다 사라짐 ===== */}
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

        {/* ===== Services: 디졸브로 천천히 큰 화면으로 등장 ===== */}
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
