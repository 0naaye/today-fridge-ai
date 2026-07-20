# 오늘의 냉파 (Today's Fridge AI)

AI가 냉장고 속 재료로 맛있는 레시피를 만들어주는 요리 도우미 앱입니다.

## 주요 기능

### 1. AI 레시피 생성
- 보유한 재료를 입력하면 AI가 맞춤 레시피를 생성합니다.
- 요리 숙련도(초보/중수/고수) 선택으로 난이도 조절이 가능합니다.

### 2. 조건 필터
다양한 조건에 맞춰 레시피를 생성합니다:
- **비건**: 모든 동물성 재료 제외
- **매운맛 금지**: 고추, 고추장 등 매운 재료 제외
- **자취생용**: 전자레인지로 조리 가능한 레시피

### 3. 영양 분석
- 각 레시피의 칼로리와 탄단지 비중을 자동 계산합니다.
- 그래디언트 바 차트로 시각화합니다.

### 4. 멀티모달 사진 스캔
- 냉장고 내부 사진이나 마트 영수증을 업로드하면 자동으로 식재료를 추출합니다.
- 드래그 앤 드롭 또는 클릭으로 간편하게 업로드합니다.
- 추출된 재료는 자동으로 입력창에 채워집니다.

### 5. 레시피 영수증
- 예쁜 영수증 스타일로 레시피를 출력합니다.
- 이미지로 저장하거나 인쇄할 수 있습니다.

## 기술 스택

- **React 18** - 사용자 인터페이스
- **TypeScript** - 타입 안정성
- **Tailwind CSS** - 스타일링
- **Vite** - 빠른 개발 서버
- **GitHub Models - GPT-4o** - 멀티모달 이미지 인식 및 레시피 생성 API
- **html2canvas** - 이미지 저장 기능
- **Lucide React** - 아이콘

## 시작하기

### 환경 요구사항

- Node.js 18+
- GitHub Personal Access Token (GitHub Models API용)

### 설치

```bash
npm install
```

### 환경 변수 설정

`.env` 파일을 생성하고 다음 내용을 추가합니다:

```
VITE_GITHUB_TOKEN=your_github_personal_access_token
```

GitHub Personal Access Token 발급 방법:
1. GitHub 설정 → Developer settings → Personal access tokens
2. `models:read` 권한으로 토큰 생성
3. 생성된 토큰을 `.env` 파일에 입력

### 실행

```bash
npm run dev
```
서버가 구동되면 브라우저에서 http://localhost:5173 주소로 접속하여 앱을 사용할 수 있습니다.

### 빌드

```bash
npm run build
```

## 사용법

1. **재료 입력**: 직접 입력하거나 사진을 업로드하여 재료를 추출합니다.
2. **조건 선택**: 비건, 매운맛 금지, 자취생용 등 조건을 선택합니다.
3. **숙련도 선택**: 초보/중수/고수 중 선택합니다.
4. **레시피 생성**: '레시피 생성' 버튼을 클릭합니다.
5. **결과 확인**: 영수증 형태의 레시피와 영양 정보를 확인합니다.
6. **저장/인쇄**: 이미지로 저장하거나 인쇄합니다.

## 프로젝트 구조

```
src/
├── App.tsx                 # 메인 앱 컴포넌트
├── components/
│   ├── ImageScanner.tsx    # 사진 스캔 컴포넌트
│   ├── LoadingAnimation.tsx # 로딩 애니메이션
│   ├── RecipeForm.tsx      # 입력 폼 컴포넌트
│   └── RecipeReceipt.tsx   # 레시피 영수증 컴포넌트
└── utils/
    └── openaiClient.ts     # API 클라이언트
```
