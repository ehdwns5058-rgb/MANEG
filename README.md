# 고객 관리 (MANEG)

간단한 고객 관리 웹 애플리케이션입니다. Next.js(App Router) + Prisma + SQLite로 만들었습니다.

## 기능

- 고객 목록 조회 (이름/전화번호/이메일/회사/태그 검색)
- 고객 등록
- 고객 상세 조회
- 고객 정보 수정
- 고객 삭제

## 시작하기

```bash
npm install
npx prisma migrate dev   # 최초 1회: DB 생성 및 스키마 적용
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 엽니다.

## 스택

- [Next.js](https://nextjs.org) (App Router, Server Actions)
- [Prisma](https://www.prisma.io) + SQLite (`@prisma/adapter-better-sqlite3`)
- Tailwind CSS
- TypeScript

## 프로젝트 구조

- `prisma/schema.prisma` — `Customer` 모델 정의
- `src/lib/prisma.ts` — Prisma Client 싱글턴
- `src/lib/actions.ts` — 등록/수정/삭제 Server Actions
- `src/app/page.tsx` — 고객 목록 + 검색
- `src/app/customers/new` — 고객 등록 폼
- `src/app/customers/[id]` — 고객 상세
- `src/app/customers/[id]/edit` — 고객 정보 수정 폼
