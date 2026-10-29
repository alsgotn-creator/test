import Gallery from "@/components/Gallery";

export const metadata = {
  title: "브랜딩",
  description: "브랜딩 관련 프로젝트 작업 모음.",
};

export default function WorksBrandingPage() {
  return (
    <>
      <section className="page-head">
        <div className="container reveal">
          <p className="eyebrow">Work</p>
          <h1 className="title-xl">브랜딩</h1>
          <p className="lead">브랜딩 관련 프로젝트 작업 모음입니다. 타일을 누르면 영상을 볼 수 있어요.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <Gallery galleryKey="branding" />
      </section>
    </>
  );
}
