# 고객 관리 (MANEG)

간단한 고객 관리 웹 애플리케이션입니다. Next.js(App Router) + Prisma + PostgreSQL로 만들었습니다.

## 기능

- 고객 목록 조회 (이름/전화번호/이메일/회사/태그 검색)
- 고객 등록
- 고객 상세 조회
- 고객 정보 수정
- 고객 삭제

## 로컬에서 실행하기

1. PostgreSQL 데이터베이스를 준비합니다 (예: [Neon](https://neon.tech) 무료 플랜).
2. `.env.example`을 `.env`로 복사하고 `DATABASE_URL`을 실제 연결 문자열로 채웁니다.
3. 아래 명령을 실행합니다.

```bash
npm install
npx prisma migrate deploy   # 최초 1회: 테이블 생성
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 엽니다.

## 배포하기 (Vercel)

1. [Vercel](https://vercel.com)에 GitHub 계정으로 로그인합니다.
2. "Add New Project" → 이 저장소(MANEG)를 선택해 Import 합니다.
3. Vercel 프로젝트의 **Storage** 탭에서 Postgres(Neon) 데이터베이스를 생성하고 프로젝트에 연결합니다. (자동으로 `DATABASE_URL` 환경 변수가 추가됩니다.)
4. Deploy를 누르면 빌드 과정에서 `prisma migrate deploy`가 자동으로 실행되어 테이블이 생성됩니다.
5. 배포가 끝나면 발급된 주소로 아이패드/아이폰/PC 어디서든 접속해 사용할 수 있습니다.

## 스택

- [Next.js](https://nextjs.org) (App Router, Server Actions)
- [Prisma](https://www.prisma.io) + PostgreSQL (`@prisma/adapter-neon`)
- Tailwind CSS
- TypeScript

## 프로젝트 구조

- `prisma/schema.prisma` — `Customer` 모델 정의
- `src/lib/prisma.ts` — Prisma Client 싱글턴 (Neon 드라이버 어댑터)
- `src/lib/actions.ts` — 등록/수정/삭제 Server Actions
- `src/app/page.tsx` — 고객 목록 + 검색
- `src/app/customers/new` — 고객 등록 폼
- `src/app/customers/[id]` — 고객 상세
- `src/app/customers/[id]/edit` — 고객 정보 수정 폼
