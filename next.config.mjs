/** @type {import('next').NextConfig} */
const nextConfig = {
  // 이전 정적 사이트처럼 `next build` 결과를 순수 정적 파일(out/)로 뽑아내,
  // Node 서버 없이 어디서든(GitHub Pages, Netlify, S3 등) 그대로 올릴 수 있게 합니다.
  // 나중에 서버 기능(API route 등)이 필요해지면 이 줄만 지우면 됩니다.
  output: "export",
};

export default nextConfig;
