"use client";

import { useEffect } from "react";

// console.channel.io → 설정 → 설치 에서 발급받는 플러그인 키.
// 공개적으로 브라우저에 노출되는 값이라 NEXT_PUBLIC_ 접두사를 씁니다(민감 정보 아님).
const PLUGIN_KEY = process.env.NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY;

export default function ChannelTalk() {
  useEffect(() => {
    if (!PLUGIN_KEY) {
      console.warn(
        "[ChannelTalk] NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY가 없어 채널톡 위젯을 불러오지 않습니다."
      );
      return;
    }

    // 채널톡 공식 설치 스니펫(channel.io) — 중복 로드 방지 + 비동기 스크립트 삽입
    (function () {
      const w = window;
      if (w.ChannelIO) return;
      const ch = function () {
        ch.c(arguments);
      };
      ch.q = [];
      ch.c = function (args) {
        ch.q.push(args);
      };
      w.ChannelIO = ch;

      function load() {
        if (w.ChannelIOInitialized) return;
        w.ChannelIOInitialized = true;
        const s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://cdn.channel.io/plugin/ch-plugin-web.js";
        const x = document.getElementsByTagName("script")[0];
        if (x && x.parentNode) x.parentNode.insertBefore(s, x);
      }

      if (document.readyState === "complete") {
        load();
      } else {
        w.addEventListener("DOMContentLoaded", load);
        w.addEventListener("load", load);
      }
    })();

    window.ChannelIO("boot", { pluginKey: PLUGIN_KEY });

    return () => {
      if (window.ChannelIO) window.ChannelIO("shutdown");
    };
  }, []);

  return null;
}
