import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact",
  description: "모션 디자이너 Noitom에게 프로젝트, 출강, 협업을 문의하세요.",
};

export default function ContactPage() {
  return (
    <>
      <section className="page-head">
        <div className="container reveal">
          <p className="eyebrow">Contact</p>
          <h1 className="title-xl">함께 만들어요.</h1>
          <p className="lead">프로젝트, 출강, 협업 등 어떤 이야기든 편하게 남겨주세요. 영업일 기준 1~2일 안에 답변드립니다.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container contact">
          {/* 연락처 정보 */}
          <aside className="contact-info reveal">
            <div className="contact-info__item">
              <p className="contact-info__label">Email</p>
              <p className="contact-info__value">
                <a href="mailto:alsgotn@naver.com">alsgotn@naver.com</a>
              </p>
            </div>
            <div className="contact-info__item">
              <p className="contact-info__label">Phone</p>
              <p className="contact-info__value">
                <a href="tel:010-8669-5788">010-8669-5788</a>
              </p>
            </div>
            <div className="contact-info__item">
              <p className="contact-info__label">Location</p>
              <p className="contact-info__value">Seoul, Korea</p>
            </div>
            <div className="contact-info__item">
              <p className="contact-info__label">Social</p>
              <div className="contact-info__sns">
                <a href="#" target="_blank" rel="noopener">Instagram</a>
                <a href="#" target="_blank" rel="noopener">Vimeo</a>
                <a href="#" target="_blank" rel="noopener">Behance</a>
              </div>
            </div>
          </aside>

          {/* 문의 폼 */}
          <ContactForm />
        </div>
      </section>
    </>
  );
}
