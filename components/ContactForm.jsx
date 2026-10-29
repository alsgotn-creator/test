"use client";

import { useEffect, useRef, useState } from "react";
import { submitContactForm } from "@/app/contact/actions";

export default function ContactForm() {
  const formRef = useRef(null);
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 다른 페이지에서 "...문의하기" 버튼으로 넘어올 때 ?type=lecture 처럼 쿼리로
  // 문의 유형을 넘기면, 해당 라디오를 자동으로 선택해 둡니다.
  // (next/navigation의 useSearchParams + Suspense 조합은 Next 16의 클라이언트
  //  전환에서 폼이 영영 렌더링되지 않는 버그가 있어, vanilla JS 때와 동일하게
  //  window.location.search를 직접 읽는 방식으로 우회합니다.)
  useEffect(() => {
    const presetType = new URLSearchParams(window.location.search).get("type");
    if (!presetType || !formRef.current) return;
    const radio = formRef.current.querySelector(`input[name="type"][value="${presetType}"]`);
    if (radio) radio.checked = true;
  }, []);

  // 폼 데이터를 서버(Server Action)로 보내서 실제로 서버가 받아 처리하게 합니다.
  // 브라우저는 submitContactForm을 "호출"하는 것처럼 보이지만, 실제로는
  // 네트워크 요청을 보내고 서버가 실행한 결과만 돌려받습니다.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    const data = new FormData(form);

    setIsSubmitting(true);
    setStatus("전송 중...");
    try {
      const result = await submitContactForm(data);
      if (result.ok) {
        setStatus("문의가 접수됐습니다. 빠른 시일 내에 연락드릴게요.");
        form.reset();
      } else {
        setStatus(result.error || "문제가 발생했어요. 잠시 후 다시 시도해주세요.");
      }
    } catch {
      setStatus("전송에 실패했어요. 네트워크 상태를 확인하고 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form id="contact-form" ref={formRef} className="form reveal" action="" method="POST" onSubmit={handleSubmit}>
      <div className="form__field">
        <span className="form__label">
          문의 유형<span className="req">*</span>
        </span>
        <div className="chips">
          <label className="chip">
            <input type="radio" name="type" value="project" data-label="프로젝트 의뢰" defaultChecked />
            <span>프로젝트 의뢰</span>
          </label>
          <label className="chip">
            <input type="radio" name="type" value="lecture" data-label="출강 · 강의" />
            <span>출강 · 강의</span>
          </label>
          <label className="chip">
            <input type="radio" name="type" value="collab" data-label="협업 제안" />
            <span>협업 제안</span>
          </label>
          <label className="chip">
            <input type="radio" name="type" value="etc" data-label="기타" />
            <span>기타</span>
          </label>
        </div>
      </div>

      <div className="form__row">
        <label className="form__field">
          <span className="form__label">
            이름 / 회사<span className="req">*</span>
          </span>
          <input className="form__input" type="text" name="name" placeholder="홍길동 / ○○컴퍼니" required />
        </label>
        <label className="form__field">
          <span className="form__label">
            이메일<span className="req">*</span>
          </span>
          <input className="form__input" type="email" name="email" placeholder="you@example.com" required />
        </label>
      </div>

      <div className="form__row">
        <label className="form__field">
          <span className="form__label">연락처</span>
          <input className="form__input" type="tel" name="phone" placeholder="010-0000-0000" />
        </label>
        <label className="form__field">
          <span className="form__label">예산 / 일정</span>
          <input className="form__input" type="text" name="budget" placeholder="예) 500만원 · 12월 중순 납품" />
        </label>
      </div>

      <label className="form__field">
        <span className="form__label">
          내용<span className="req">*</span>
        </span>
        <textarea
          className="form__textarea"
          name="message"
          placeholder="프로젝트 내용이나 강의 대상 · 인원 · 주제를 자유롭게 적어주세요."
          required
        />
      </label>

      <div className="form__foot">
        <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
          {isSubmitting ? "전송 중..." : "문의 보내기"} <span className="arrow">→</span>
        </button>
        <p className="form__status" role="status">
          {status}
        </p>
      </div>
    </form>
  );
}
