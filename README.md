# Next.js 15 Admin Dashboard

Next.js 15를 사용한 관리자 대시보드 프로젝트입니다. JWT 인증, 사용자 관리 등의 기능을 포함합니다.

## 주요 기능

- JWT 기반 인증 시스템
  - 액세스 토큰 (15분 유효)
  - 리프레시 토큰 (7일 유효)
- 사용자 관리 페이지
- 반응형 사이드 메뉴
- 환경 변수 기반 목데이터 설정

## 기술 스택

- Next.js 15
- TypeScript
- Tailwind CSS
- JWT (jsonwebtoken)

## 시작하기

### 필수 조건

- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치

1. 저장소 클론
```bash
git clone [repository-url]
cd nextjs15-sample
```

2. 의존성 설치
```bash
npm install
# 또는
yarn install
```

3. 환경 변수 설정
`.env` 파일을 프로젝트 루트에 생성하고 다음 내용을 추가:
```env
JWT_ACCESS_SECRET=your-access-secret-key
JWT_REFRESH_SECRET=your-refresh-secret-key
USE_MOCK_DATA=true
```

### 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
```

## 프로젝트 구조

```
src/
├── app/
│   ├── api/
│   │   └── login/
│   │       └── route.ts      # 로그인 API 엔드포인트
│   ├── login/
│   │   └── page.tsx          # 로그인 페이지
│   ├── user-management/
│   │   └── page.tsx          # 사용자 관리 페이지
│   ├── layout.tsx            # 루트 레이아웃
│   └── page.tsx              # 홈페이지
├── components/               # 재사용 가능한 컴포넌트
└── styles/                   # 전역 스타일
```

## 기능 설명

### 인증 시스템

- 로그인 페이지에서 JWT 토큰 발급
- 액세스 토큰과 리프레시 토큰을 HTTP-only 쿠키로 저장
- 미인증 사용자는 자동으로 로그인 페이지로 리다이렉트

### 사용자 관리

- 사용자 목록 테이블 표시
- 사용자 정보 (ID, 사용자명, 이메일, 역할) 표시
- 목데이터 기반 사용자 정보 관리

### 목데이터 설정

- `USE_MOCK_DATA` 환경 변수로 목데이터 사용 여부 설정
- 기본 테스트 계정:
  - 사용자명: `test`
  - 비밀번호: `test`

## 보안

- HTTP-only 쿠키 사용
- 프로덕션 환경에서 secure 쿠키 사용
- SameSite 정책 적용
- 환경 변수를 통한 시크릿 키 관리

## 라이센스

MIT
