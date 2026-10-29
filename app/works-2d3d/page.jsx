import Gallery from "@/components/Gallery";

export const metadata = {
  title: "2D·3D",
  description: "브랜드 필름, 타이틀 시퀀스, 3D 비주얼, UI 모션 작업 모음.",
};

export default function Works2d3dPage() {
  return (
    <>
      <section className="page-head">
        <div className="container reveal">
          <p className="eyebrow">Work</p>
          <h1 className="title-xl">2D · 3D</h1>
          <p className="lead">브랜드 필름부터 타이틀 시퀀스, 3D, UI 모션까지. 타일을 누르면 영상을 볼 수 있어요.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <Gallery galleryKey="2d3d" />
      </section>
    </>
  );
}
