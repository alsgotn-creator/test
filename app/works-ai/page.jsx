import Gallery from "@/components/Gallery";

export const metadata = {
  title: "AI",
  description: "생성형 AI를 활용한 비주얼 익스플로레이션, 영상 작업 모음.",
};

export default function WorksAiPage() {
  return (
    <>
      <section className="page-head">
        <div className="container reveal">
          <p className="eyebrow">Work</p>
          <h1 className="title-xl">AI</h1>
          <p className="lead">생성형 AI를 모션 작업에 결합한 비주얼 익스플로레이션입니다. 타일을 누르면 영상을 볼 수 있어요.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <Gallery galleryKey="ai" />
      </section>
    </>
  );
}
