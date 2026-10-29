import Link from "next/link";

export const metadata = {
  title: "Lecture",
  description: "모션 디자이너 Noitom의 출강 · 강의 안내. 기업 출강, 대학 특강, 원데이 클래스, 1:1 코칭.",
};

export default function LecturePage() {
  return (
    <>
      {/* ===== 타이틀 ===== */}
      <section className="page-head">
        <div className="container reveal">
          <p className="eyebrow">Lecture</p>
          <h1 className="title-xl">출강 · 강의</h1>
          <p className="lead">현업 모션 디자이너의 실무 노하우를 그대로 전합니다. 대상과 목적에 맞게 커리큘럼을 맞춤 구성해 드려요.</p>
        </div>
      </section>

      {/* ===== 강의 형태 ===== */}
      <section className="section section--soft">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">Format</p>
              <h2 className="title-lg">강의 형태</h2>
            </div>
          </div>
          <div className="formats">
            <article className="format reveal">
              <p className="format__tag">Corporate</p>
              <h3 className="format__title">기업 출강</h3>
              <p className="format__desc">사내 디자인 · 마케팅 팀 대상 실무 교육. 팀의 작업 환경에 맞춰 진행합니다.</p>
              <p className="format__meta">4시간 ~ 다회차 · 5~30명</p>
            </article>
            <article className="format reveal">
              <p className="format__tag">University</p>
              <h3 className="format__title">대학 특강</h3>
              <p className="format__desc">디자인 · 영상 전공 학생 대상 특강, 포트폴리오 리뷰, 진로 멘토링.</p>
              <p className="format__meta">2~3시간 · 인원 무관</p>
            </article>
            <article className="format reveal">
              <p className="format__tag">Class</p>
              <h3 className="format__title">원데이 클래스</h3>
              <p className="format__desc">입문자를 위한 하루 집중 클래스. 수업이 끝나면 완성된 결과물을 가져갑니다.</p>
              <p className="format__meta">4~6시간 · 소규모</p>
            </article>
            <article className="format reveal">
              <p className="format__tag">1:1</p>
              <h3 className="format__title">1:1 코칭</h3>
              <p className="format__desc">개인 프로젝트 피드백, 포트폴리오 컨설팅, 툴 집중 레슨.</p>
              <p className="format__meta">회당 2시간 · 온라인/오프라인</p>
            </article>
          </div>
        </div>
      </section>

      {/* ===== 커리큘럼 ===== */}
      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">Curriculum</p>
              <h2 className="title-lg">강의 주제</h2>
            </div>
            <p className="lead">아래 주제를 조합하거나, 원하는 내용으로 새로 구성할 수 있어요.</p>
          </div>

          <div className="curriculum">
            <div className="course reveal">
              <p className="course__num">01</p>
              <div>
                <h3 className="course__title">After Effects 기초</h3>
                <span className="course__level">입문</span>
              </div>
              <div className="course__desc">
                툴이 처음인 분도 따라올 수 있는 기초 과정.
                <ul>
                  <li>인터페이스와 작업 흐름 이해</li>
                  <li>키프레임 · 그래프 에디터로 자연스러운 움직임 만들기</li>
                  <li>텍스트 애니메이션 · 셰이프 레이어</li>
                </ul>
              </div>
              <p className="course__time">8시간 ~</p>
            </div>

            <div className="course reveal">
              <p className="course__num">02</p>
              <div>
                <h3 className="course__title">모션그래픽 실무</h3>
                <span className="course__level">중급</span>
              </div>
              <div className="course__desc">
                실제 클라이언트 작업 방식을 그대로 경험하는 과정.
                <ul>
                  <li>기획 · 스토리보드 · 스타일 프레임</li>
                  <li>모션 원리(Easing, Timing, Overlap) 적용</li>
                  <li>렌더링 · 납품 규격 · 협업 팁</li>
                </ul>
              </div>
              <p className="course__time">12시간 ~</p>
            </div>

            <div className="course reveal">
              <p className="course__num">03</p>
              <div>
                <h3 className="course__title">Cinema 4D 3D 모션</h3>
                <span className="course__level">중급</span>
              </div>
              <div className="course__desc">
                2D 모션 디자이너를 위한 3D 입문.
                <ul>
                  <li>모델링 · 머티리얼 · 라이팅 기초</li>
                  <li>MoGraph로 만드는 3D 모션</li>
                  <li>After Effects 와의 합성 워크플로우</li>
                </ul>
              </div>
              <p className="course__time">12시간 ~</p>
            </div>

            <div className="course reveal">
              <p className="course__num">04</p>
              <div>
                <h3 className="course__title">UI 모션 & Lottie</h3>
                <span className="course__level">중급</span>
              </div>
              <div className="course__desc">
                앱 · 웹 서비스를 위한 인터랙션 모션.
                <ul>
                  <li>UI 모션 원칙과 모션 가이드 작성</li>
                  <li>Figma → After Effects → Lottie 제작 흐름</li>
                  <li>개발자 협업과 에셋 최적화</li>
                </ul>
              </div>
              <p className="course__time">6시간 ~</p>
            </div>

            <div className="course reveal">
              <p className="course__num">05</p>
              <div>
                <h3 className="course__title">AI 툴과 모션 디자인</h3>
                <span className="course__level">전체</span>
              </div>
              <div className="course__desc">
                생성형 AI를 모션 작업에 실용적으로 활용하는 방법.
                <ul>
                  <li>이미지 · 영상 생성 툴로 레퍼런스와 소스 만들기</li>
                  <li>기존 워크플로우와 결합하는 방법</li>
                </ul>
              </div>
              <p className="course__time">3시간 ~</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 진행 과정 ===== */}
      <section className="section section--dark">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">Process</p>
              <h2 className="title-lg">진행 과정</h2>
            </div>
          </div>
          <ol className="process reveal">
            <li>
              <h3>문의</h3>
              <p>대상, 인원, 희망 일정과 주제를 알려주세요.</p>
            </li>
            <li>
              <h3>상담 · 제안</h3>
              <p>수강생 수준과 목적에 맞춘 커리큘럼과 견적을 보내드립니다.</p>
            </li>
            <li>
              <h3>준비</h3>
              <p>강의 자료, 예제 파일, 실습 환경을 미리 안내합니다.</p>
            </li>
            <li>
              <h3>강의 · 피드백</h3>
              <p>강의 후 자료 공유와 질의응답을 지원합니다.</p>
            </li>
          </ol>
        </div>
      </section>

      {/* ===== 출강 이력 ===== */}
      <section className="section">
        <div className="container history">
          <div className="reveal">
            <p className="eyebrow">History</p>
            <h2 className="title-lg">출강 이력</h2>
          </div>
          {/* 실제 이력으로 교체하세요 */}
          <ul className="history__list reveal">
            <li>
              <span className="history__year">2026</span>
              <span className="history__org">○○대학교 시각디자인과</span>
              <span className="history__type">특강</span>
            </li>
            <li>
              <span className="history__year">2026</span>
              <span className="history__org">○○ 주식회사 디자인팀</span>
              <span className="history__type">기업 출강</span>
            </li>
            <li>
              <span className="history__year">2025</span>
              <span className="history__org">○○ 디자인 아카데미</span>
              <span className="history__type">정규 과정</span>
            </li>
            <li>
              <span className="history__year">2025</span>
              <span className="history__org">○○ 콘텐츠진흥원</span>
              <span className="history__type">워크숍</span>
            </li>
            <li>
              <span className="history__year">2024</span>
              <span className="history__org">○○예술대학교 영상학과</span>
              <span className="history__type">특강</span>
            </li>
          </ul>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section section--soft">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">FAQ</p>
              <h2 className="title-lg">자주 묻는 질문</h2>
            </div>
          </div>
          <div className="faq reveal">
            <details>
              <summary>온라인 강의도 가능한가요?</summary>
              <p>네, Zoom · Google Meet 등으로 실시간 온라인 강의가 가능합니다. 화면 공유와 실습 피드백도 함께 진행합니다.</p>
            </details>
            <details>
              <summary>수강생 수준이 제각각인데 괜찮을까요?</summary>
              <p>사전 설문으로 수준을 파악한 뒤, 기초와 심화 과제를 나눠 모두가 따라올 수 있게 구성합니다.</p>
            </details>
            <details>
              <summary>실습용 프로그램이 필요한가요?</summary>
              <p>실습 강의는 Adobe After Effects(체험판 가능)가 설치된 PC가 필요합니다. 이론 위주 특강은 장비가 필요 없습니다.</p>
            </details>
            <details>
              <summary>강의료는 어떻게 되나요?</summary>
              <p>강의 형태, 시간, 인원, 지역에 따라 달라집니다. 문의 주시면 맞춤 견적을 보내드립니다.</p>
            </details>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section">
        <div className="container cta reveal">
          <h2 className="title-lg">강의를 계획하고 계신가요?</h2>
          <p className="lead">일정과 대상만 알려주시면 맞춤 커리큘럼을 제안해 드릴게요.</p>
          <Link href="/contact?type=lecture" className="btn btn--primary">
            강의 문의하기 <span className="arrow">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
