/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export" 를 뺐습니다 — 이제 정적 파일이 아니라 Node 서버(Vercel 등)에서
  // 돌아가는 동적 사이트입니다. Server Action/Route Handler 같은 백엔드 기능을 쓰려면
  // 이 설정이어야 합니다. 대신 더 이상 "아무 정적 호스팅에나 올리기"는 안 되고,
  // Vercel처럼 Next.js 서버를 실행해주는 곳에 배포해야 합니다.

  images: {
    // next/image는 외부 호스트 이미지를 기본적으로 거부합니다(아무 URL이나 우리 서버의
    // 이미지 최적화 자원으로 변환해주는 걸 막기 위함). 작품 썸네일을 유튜브·비메오
    // CDN에서 받아오므로 그 두 곳의 썸네일 경로만 열어둡니다.
    //
    // pathname을 /vi/** · /video/** 로 좁혀서, 해당 호스트의 썸네일 외에는
    // 최적화를 요청할 수 없게 했습니다. (query string은 허용 — 비메오 oEmbed가
    // 돌려주는 주소에 ?region=us 가 붙어 있어서, 막으면 그 주소가 400이 됩니다.)
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" },
      { protocol: "https", hostname: "i.vimeocdn.com", pathname: "/video/**" },
    ],
  },
};

export default nextConfig;
