import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";
import SmoothScroll from "@/components/SmoothScroll";
import ChannelTalk from "@/components/ChannelTalk";

export const metadata = {
  title: {
    default: "Noitom — Motion Designer",
    template: "%s — Noitom — Motion Designer",
  },
  description: "모션 디자이너 Noitom의 포트폴리오. 2D/3D, AI 비주얼, 브랜딩 프로젝트, 출강 및 강의.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" data-scroll-behavior="smooth">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <RevealOnScroll />
        <SmoothScroll />
        <ChannelTalk />
      </body>
    </html>
  );
}
