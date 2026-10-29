"use server";

import { Resend } from "resend";

/* =========================================================
   app/contact/actions.js — Contact 폼의 Server Action

   "use server" 가 파일 맨 위에 있으면, 이 파일 안의 export 함수들은
   브라우저가 아니라 서버에서만 실행됩니다. 클라이언트 컴포넌트(ContactForm)가
   이 함수를 "호출"하면, 실제로는 서버에 요청을 보내고 서버가 실행한 뒤
   결과만 돌려받는 방식입니다 — 별도 API 엔드포인트/URL을 직접 만들 필요가 없습니다.

   Resend로 이메일을 보냅니다. RESEND_API_KEY가 .env.local(로컬) 또는
   Vercel 프로젝트 환경 변수(배포)에 없으면, 발송 없이 서버 로그로만 남기고
   정상 처리된 것처럼 응답합니다 — 키 없이도 로컬에서 폼 자체는 테스트할 수 있게요.
   ========================================================= */

const CONTACT_TO = "v3v@kakao.com";
// 도메인 인증 전까지는 Resend의 테스트 발신 주소(onboarding@resend.dev)를 씁니다.
// resend.com에서 본인 도메인을 인증하면 "Noitom <contact@내도메인.com>"처럼 바꾸세요.
const CONTACT_FROM = "Noitom 문의 <onboarding@resend.dev>";

const TYPE_LABELS = {
  project: "프로젝트 의뢰",
  lecture: "출강 · 강의",
  collab: "협업 제안",
  etc: "기타",
};

export async function submitContactForm(formData) {
  const name = formData.get("name")?.toString().trim() || "";
  const email = formData.get("email")?.toString().trim() || "";
  const phone = formData.get("phone")?.toString().trim() || "";
  const budget = formData.get("budget")?.toString().trim() || "";
  const message = formData.get("message")?.toString().trim() || "";
  const type = formData.get("type")?.toString() || "etc";

  // 서버 쪽 최소 검증 — 브라우저의 required만 믿지 않고 서버에서도 한 번 더 확인합니다
  // (폼을 안 거치고 직접 요청을 보내는 경우까지 막아주기 위함)
  if (!name || !email || !message) {
    return { ok: false, error: "이름/이메일/내용은 필수 항목입니다." };
  }

  const submission = {
    type: TYPE_LABELS[type] || type,
    name,
    email,
    phone: phone || "-",
    budget: budget || "-",
    message,
    receivedAt: new Date().toISOString(),
  };

  // ---- 여기부터가 "진짜 서버 로직"입니다 ----
  if (!process.env.RESEND_API_KEY) {
    console.log("[Contact] RESEND_API_KEY 없음 — 발송 생략, 로그만 남김:", submission);
    return { ok: true };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      replyTo: email,
      subject: `[${submission.type}] ${name}님의 문의`,
      text: [
        `문의 유형: ${submission.type}`,
        `이름/회사: ${name}`,
        `이메일: ${email}`,
        `연락처: ${submission.phone}`,
        `예산/일정: ${submission.budget}`,
        "",
        "내용:",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("[Contact] Resend 발송 실패:", error);
      return { ok: false, error: "메일 전송에 실패했어요. 잠시 후 다시 시도해주세요." };
    }
  } catch (err) {
    console.error("[Contact] Resend 호출 중 오류:", err);
    return { ok: false, error: "메일 전송에 실패했어요. 잠시 후 다시 시도해주세요." };
  }

  return { ok: true };
}
