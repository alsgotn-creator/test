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

// Resend 도메인 인증 전(샌드박스 모드)엔 Resend 계정 소유자 이메일로만 발송이 허용됩니다.
// 도메인을 인증하면 원하는 수신 주소(alsgotn@naver.com 등)로 바꿔도 됩니다.
const CONTACT_TO = "alsgotn112@gmail.com";
// 도메인 인증 전까지는 Resend의 테스트 발신 주소(onboarding@resend.dev)를 씁니다.
// resend.com에서 본인 도메인을 인증하면 "Noitom <contact@내도메인.com>"처럼 바꾸세요.
const CONTACT_FROM = "Noitom 문의 <onboarding@resend.dev>";

const TYPE_LABELS = {
  project: "프로젝트 의뢰",
  lecture: "출강 · 강의",
  collab: "협업 제안",
  etc: "기타",
};

const ACCENT = "#ff4d1c";

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// 이메일 클라이언트 호환성 때문에 외부 CSS 없이 table + inline style로만 구성합니다.
function buildEmailHtml(submission) {
  const { type, name, email, phone, budget, message, receivedAt } = submission;
  const row = (label, value, href) => `
    <tr>
      <td style="padding:14px 0;border-bottom:1px solid #eee;width:110px;vertical-align:top;color:#8a8a8a;font-size:13px;font-weight:600;letter-spacing:.02em;">${label}</td>
      <td style="padding:14px 0;border-bottom:1px solid #eee;vertical-align:top;color:#141414;font-size:15px;font-weight:600;">${
        href ? `<a href="${href}" style="color:#141414;text-decoration:none;">${escapeHtml(value)}</a>` : escapeHtml(value)
      }</td>
    </tr>`;

  const formattedDate = new Date(receivedAt).toLocaleString("ko-KR", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Asia/Seoul",
  });

  return `
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Noitom 문의</title>
  </head>
  <body style="margin:0;padding:0;background:#f2f2f2;font-family:'Apple SD Gothic Neo','Malgun Gothic',sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2f2f2;padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="background:#0d0d0d;padding:36px 40px;">
                <div style="font-size:20px;font-weight:800;letter-spacing:-.02em;color:#ffffff;">
                  Noitom<span style="color:${ACCENT};">.</span>
                </div>
                <div style="margin-top:8px;font-size:14px;color:rgba(255,255,255,.55);">새로운 문의가 도착했습니다</div>
              </td>
            </tr>
            <tr>
              <td style="padding:36px 40px 8px;">
                <span style="display:inline-block;background:${ACCENT};color:#ffffff;font-size:12px;font-weight:700;letter-spacing:.04em;padding:7px 14px;border-radius:999px;">${escapeHtml(
                  type
                )}</span>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;border-collapse:collapse;">
                  ${row("이름 / 회사", name)}
                  ${row("이메일", email, `mailto:${email}`)}
                  ${row("연락처", phone)}
                  ${row("예산 / 일정", budget)}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 40px 36px;">
                <div style="font-size:13px;font-weight:600;color:#8a8a8a;margin-bottom:10px;">내용</div>
                <div style="background:#f6f6f6;border-radius:12px;padding:20px;font-size:15px;line-height:1.7;color:#141414;white-space:pre-wrap;">${escapeHtml(
                  message
                )}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 40px 32px;border-top:1px solid #eee;">
                <div style="font-size:13px;color:#8a8a8a;">${formattedDate} · Noitom 포트폴리오 사이트에서 접수됨</div>
                <div style="margin-top:6px;font-size:13px;color:#8a8a8a;">이 메일에 바로 답장하면 ${escapeHtml(
                  email
                )}로 전달됩니다.</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

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
      html: buildEmailHtml(submission),
      // html을 못 그리는 클라이언트를 위한 텍스트 버전
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
