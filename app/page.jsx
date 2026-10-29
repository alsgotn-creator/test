import Link from "next/link";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* ===== 마키 ===== */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          <span>2D / 3D</span>
          <span>AI</span>
          <span>KT</span>
          <span>Lecture</span>
          <span>2D / 3D</span>
          <span>AI</span>
          <span>KT</span>
          <span>Lecture</span>
        </div>
      </div>

      {/* ===== 대표 작품 ===== */}
      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">Selected Work</p>
              <h2 className="title-lg">대표 작품</h2>
            </div>
          </div>
          <Gallery galleryKey="featured" />
          <div className="work-links reveal">
            <Link href="/works-2d3d" className="link-arrow">
              2D·3D 전체 보기 →
            </Link>
            <Link href="/works-ai" className="link-arrow">
              AI 전체 보기 →
            </Link>
            <Link href="/works-kt" className="link-arrow">
              KT 전체 보기 →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 소개 ===== */}
      <section className="section section--soft" id="about">
        <div className="container about">
          <div className="reveal">
            <p className="eyebrow">About</p>
            <h2 className="title-lg">
              안녕하세요,
              <br />
              모션 디자이너
              <br />
              Noitom입니다.
            </h2>
          </div>
          <div className="reveal">
            <div className="about__text">
              <p>
                <strong>2D/3D 모션, AI 비주얼</strong>을 중심으로 작업하고 있습니다. 메시지가 가장 잘
                전달되는 움직임을 찾는 것을 좋아합니다.
              </p>
              <p>
                기획 단계부터 함께 고민하며, 결과물이 브랜드의 언어로 오래 쓰일 수 있도록 디자인합니다.
                또한 기업과 대학에서 <strong>모션그래픽 강의</strong>를 진행하고 있습니다.
              </p>
            </div>
            <div className="stats">
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
            </div>
          </div>
        </div>
      </section>

      {/* ===== 서비스 ===== */}
      <section className="section section--dark">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">Services</p>
              <h2 className="title-lg">할 수 있는 일</h2>
            </div>
          </div>
          <div className="services reveal">
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
              <h3 className="service__title">KT 프로젝트</h3>
              <p className="service__desc">KT 관련 프로젝트 작업물</p>
            </div>
            <div className="service">
              <p className="service__num">04</p>
              <h3 className="service__title">출강 · 강의</h3>
              <p className="service__desc">기업 · 대학 · 교육기관 모션그래픽 교육</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 강의 배너 ===== */}
      <section className="section">
        <div className="container">
          <div className="banner reveal">
            <div>
              <p className="eyebrow">Lecture</p>
              <h2 className="title-md">모션그래픽, 실무자에게 직접 배워보세요.</h2>
              <p className="lead">
                After Effects 기초부터 실무 프로젝트까지. 기업 출강, 대학 특강, 원데이 클래스를
                진행합니다.
              </p>
            </div>
            <div className="banner__actions">
              <Link href="/lecture" className="btn btn--primary">
                강의 안내 <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
