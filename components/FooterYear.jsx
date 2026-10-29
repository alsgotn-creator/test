"use client";

import { useEffect, useState } from "react";

// 빌드 시점이 아니라 "보는 시점"의 연도를 보여주기 위해 클라이언트에서 계산합니다.
// (정적 export라 빌드 이후엔 다시 렌더링되지 않으므로, 서버에서 고정값을 박아두면
//  해가 바뀌어도 재배포 전까지 작년 연도가 그대로 보이는 문제가 생깁니다.)
export default function FooterYear() {
  const [year, setYear] = useState(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return <span>{year ?? ""}</span>;
}
