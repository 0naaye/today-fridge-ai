# 오늘의 냉파 AI - 셋업 가이드

## 1. 프로젝트 설치

```bash
npm install
```

## 2. GitHub Models API 토큰 설정

### 2-1. GitHub에서 토큰(API Key) 발급
GitHub Models Marketplace 방문 및 로그인

원하는 모델(예: GPT-4o) 선택 후 Get started 클릭

Generate a new personal access token 링크를 통해 토큰 생성

생성된 ghp_...로 시작하는 토큰 값을 복사

### 2-2. 환경 변수 설정

프로젝트 루트 디렉토리에 `.env` 파일이 있습니다.

파일을 열어서 `VITE_GITHUB_TOKEN` 값을 다음과 같이 수정하세요:

```env
VITE_GITHUB_TOKEN=your_girhub_token_here
```

**주의:** API 키는 절대 다른 사람과 공유하지 마세요! Git에 커밋할 때 `.env` 파일은 포함되지 않도록 이미 설정되어 있습니다.

## 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`을 열어 앱을 테스트하세요.

## 4. 주요 기능

- **멀티모달 사진 스캔**: 냉장고 안 사진을 업로드하면 GPT-4o가 식재료를 자동으로 추출하여 입력창에 완성
- **재료 입력**: 원하는 요리에 필요한 재료를 쉼표로 구분해서 입력
- **조건별 맞춤 필터**: 초보/중수/고수 중 선택
- **영양 차트**: 요리의 칼로리와 탄단지 비중을 대시보드 형태의 차트로 한눈에 보여줍니다.
- **이미지 저장**: 생성된 레시피를 PNG 이미지로 다운로드
- **인쇄 기능**: 레시피를 직접 인쇄

## 5. 빌드 및 배포

```bash
npm run build
```

`dist` 폴더에 최적화된 빌드 파일이 생성됩니다.

## 6. 문제 해결

### API 키 오류가 나는 경우
- `.env` 파일에 `VITE_GITHUB_TOKEN`이 정확히 입력되어 있는지 확인
- 개발 서버를 재시작 (Ctrl+C 후 `npm run dev`)

## 7. 기술 스택

- **React 18** - 사용자 인터페이스
- **TypeScript** - 타입 안정성
- **Tailwind CSS** - 스타일링
- **Vite** - 빠른 개발 서버
- **GitHub Models - GPT-4o** - 멀티모달 이미지 인식 및 레시피 생성 API
- **html2canvas** - 이미지 저장 기능
- **Lucide React** - 아이콘

즐거운 요리 되세요!
