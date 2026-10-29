/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export" 를 뺐습니다 — 이제 정적 파일이 아니라 Node 서버(Vercel 등)에서
  // 돌아가는 동적 사이트입니다. Server Action/Route Handler 같은 백엔드 기능을 쓰려면
  // 이 설정이어야 합니다. 대신 더 이상 "아무 정적 호스팅에나 올리기"는 안 되고,
  // Vercel처럼 Next.js 서버를 실행해주는 곳에 배포해야 합니다.
};

export default nextConfig;
