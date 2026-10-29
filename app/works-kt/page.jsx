import Gallery from "@/components/Gallery";

export const metadata = {
  title: "KT",
  description: "KT 관련 프로젝트 작업 모음.",
};

export default function WorksKtPage() {
  return (
    <>
      <section className="page-head">
        <div className="container reveal">
          <p className="eyebrow">Work</p>
          <h1 className="title-xl">KT</h1>
          <p className="lead">KT 관련 프로젝트 작업 모음입니다. 타일을 누르면 영상을 볼 수 있어요.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <Gallery galleryKey="kt" />
      </section>
    </>
  );
}
