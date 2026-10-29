# Motion Designer Portfolio

모션 디자이너 포트폴리오 웹사이트. Next.js(App Router) + 순수 CSS.

**동적(dynamic) 사이트입니다** — Contact 폼이 Server Action(`app/contact/actions.js`)으로
서버에서 직접 요청을 처리하기 때문에, Node 서버가 계속 떠 있어야 합니다.
그래서 정적 호스팅(GitHub Pages 등)이 아니라 **Vercel**처럼 Next.js 서버를
실행해주는 곳에 배포해야 합니다. (정적 사이트로 되돌리려면 `next.config.mjs`에
`output: "export"`를 다시 추가하면 되지만, 그러면 Server Action은 못 씁니다.)

## 실행

```bash
npm install
npm run dev      # http://localhost:3000, 저장하면 바로 반영(HMR)
npm run build    # .next/ 에 프로덕션용으로 빌드 (서버 실행 전 단계)
npm run start    # build 결과를 실제 Node 서버로 띄움 (배포 환경과 동일하게 로컬 확인)
```

## 배포 (Vercel)

1. [vercel.com](https://vercel.com) 에서 이 GitHub 저장소(`alsgotn-creator/test`)를 Import
2. 프레임워크는 Next.js로 자동 인식됨 — 설정 변경 없이 Deploy
3. 이후 `main` 브랜치에 푸시할 때마다 자동으로 다시 배포됨
4. 이메일 발송 등 비밀 키가 필요해지면 Vercel 프로젝트 설정의 Environment Variables에 추가
   (로컬에서는 `.env.local` 파일 — `.gitignore`에 이미 `.env*`가 포함돼 있어 커밋되지 않음)

## 폴더 구조

```
motion-web/
├── app/
│   ├── layout.jsx         # 공통 레이아웃 (Header · Footer · RevealOnScroll)
│   ├── globals.css        # 전역 스타일 전부 (변수 · 헤더 · 갤러리 · 모달 · 페이지별 섹션)
│   ├── page.jsx            # Home  (/)
│   ├── works-2d3d/page.jsx # 2D·3D 작품 갤러리 (/works-2d3d)
│   ├── works-ai/page.jsx   # AI 작품 갤러리     (/works-ai)
│   ├── works-kt/page.jsx   # KT 작품 갤러리     (/works-kt)
│   ├── lecture/page.jsx    # 출강 · 강의        (/lecture)
│   └── contact/
│       ├── page.jsx        # 문의               (/contact)
│       └── actions.js      # Contact 폼의 Server Action (서버에서 폼 데이터 처리)
├── components/
│   ├── Header.jsx / Footer.jsx / FooterYear.jsx
│   ├── Hero.jsx            # 히어로 영상 배경 + GSAP 인터랙티브 헤드라인
│   ├── Gallery.jsx         # 풀블리드 갤러리 (세로 2단, 호버 회색/흑백, GSAP)
│   ├── Modal.jsx           # 작품 상세 · 영상 모달
│   ├── ToolIcons.jsx       # "이런 작업이 가능합니다" 툴 아이콘 행
│   ├── ContactForm.jsx     # 문의 폼 — actions.js의 Server Action 호출
│   └── RevealOnScroll.jsx  # 스크롤 등장 애니메이션(.reveal) 재동작
└── data/
    ├── works.js            # ★ 작품 데이터는 여기서 관리
    └── tools.js            # ★ 툴 아이콘 목록은 여기서 관리
```

## 바꿔야 할 것

1. **이름 · 연락처** — `data/works.js` 외의 이름/이메일/전화번호는 각 `app/**/page.jsx`, `components/Footer.jsx`, `components/ContactForm.jsx`에 흩어져 있습니다. 전역 `EMAIL`은 `components/ContactForm.jsx` 상단.
2. **SNS 링크** — 각 페이지 Footer/Contact의 `href="#"` 부분.
3. **작품** — `data/works.js` 의 `WORKS` 배열 (설명은 파일 상단 주석 참고). `section`에 따라 `works-2d3d` / `works-ai` / `works-kt` 페이지로 자동 분류됩니다.
4. **포인트 컬러 · 폰트** — `app/globals.css` 의 `:root` 안 `--c-accent`, `--font`.

## 작품 추가 예시

```js
{
  id: "my-new-work",
  title: "New Project",
  client: "클라이언트명",
  year: 2026,
  section: "2d3d",                                      // 2d3d | ai | kt
  category: "brand",                                    // brand | title | 3d | ui | social | ai
  thumb: "/assets/images/works/my-new-work.jpg",         // public/ 기준 절대경로, 없으면 그라디언트
  preview: "/assets/videos/my-new-work-loop.mp4",        // 선택 — 타일 호버 시 재생
  video: "https://player.vimeo.com/video/123456789",     // 유튜브 embed / 비메오 / mp4
  role: "Motion Design",
  tools: ["After Effects"],
  desc: "작품 설명",
  featured: true,                                        // Home 대표 작품에 노출
  color: ["#ff4d1c", "#ffb199"],                          // thumb 없을 때 그라디언트
},
```

썸네일·영상 이미지는 `public/assets/...` 경로에 넣고, 데이터의 `thumb`/`preview`/`video`는 `/assets/...`로 (맨 앞 슬래시) 적어주세요.
