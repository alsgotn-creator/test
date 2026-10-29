"use server";

/* =========================================================
   app/contact/actions.js — Contact 폼의 Server Action

   "use server" 가 파일 맨 위에 있으면, 이 파일 안의 export 함수들은
   브라우저가 아니라 서버에서만 실행됩니다. 클라이언트 컴포넌트(ContactForm)가
   이 함수를 "호출"하면, 실제로는 서버에 요청을 보내고 서버가 실행한 뒤
   결과만 돌려받는 방식입니다 — 별도 API 엔드포인트/URL을 직접 만들 필요가 없습니다.

   지금은 이메일 발송을 연결하지 않고 서버 로그로만 남깁니다.
   나중에 이메일을 보내려면(예: Resend) 이 함수 안, 표시해둔 자리에
   몇 줄만 추가하면 됩니다. API 키 같은 비밀값은 .env.local 에 넣고
   (이미 .gitignore 가 .env* 를 커밋에서 제외하도록 돼 있습니다)
   process.env.RESEND_API_KEY 처럼 꺼내 쓰면 됩니다.
   ========================================================= */

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
  // TODO: 이메일 발송을 연결하려면 여기서 Resend 등을 호출하세요. 예)
  //   import { Resend } from "resend";
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({ to: "v3v@kakao.com", subject: `[${submission.type}] ${name}님의 문의`, text: message });
  console.log("[Contact] 새 문의 접수:", submission);

  return { ok: true };
}
