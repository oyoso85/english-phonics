## 1. 타입 및 기반 구조

- [ ] 1.1 `src/types.ts`에 `LearningCategory`에 `'quiz' | 'play'` 추가, `QuizType`, `PlayType`, `QuizSubject`, `QuizQuestion` 등 타입 정의
- [ ] 1.2 `src/context/AppContext.tsx`에서 `LearningCategory` 확장에 따른 `setCategory` 동작 확인
- [ ] 1.3 `src/utils/quiz.ts` 생성 — 퀴즈 문제 생성 유틸리티 (`generateQuizQuestions`, 알파벳/단어 데이터 → `QuizQuestion` 변환, 오답 선택지 생성)
- [ ] 1.4 효과음 파일 추가 (`public/assets/audio/correct.mp3`, `wrong.mp3`, `complete.mp3`)

## 2. 카테고리 선택 화면 수정

- [ ] 2.1 `src/components/CategorySelection.tsx`에 '퀴즈'(🧩) 및 '놀이'(🎮) 버튼 추가, 클릭 시 각각 `/quiz-types`, `/play-types`로 이동

## 3. 퀴즈 — 유형/주제 선택 화면

- [ ] 3.1 `src/components/quiz/QuizTypes.tsx` 생성 — 4가지 퀴즈 유형 카드 그리드 (소리 듣고 고르기, 그림 보고 단어 고르기, 첫 소리 맞추기, 철자 맞추기)
- [ ] 3.2 `src/components/quiz/QuizCategories.tsx` 생성 — 6가지 주제 카드 그리드 (알파벳/음식/요리/동물/탈것/몸), URL 파라미터 `:type` 활용

## 4. 퀴즈 — 플레이 컴포넌트

- [ ] 4.1 `src/components/quiz/QuizListenAndChoose.tsx` 생성 — 소리 듣고 고르기 (❓ 카드, 음성 2회 재생, 3지선다, 정답 시 이모지 전환)
- [ ] 4.2 `src/components/quiz/QuizImageToWord.tsx` 생성 — 그림 보고 단어 고르기 (이모지 카드, 영어 단어 3지선다, 정답 시 발음 재생)
- [ ] 4.3 `src/components/quiz/QuizFirstSound.tsx` 생성 — 첫 소리 맞추기 (이모지+단어 표시, 알파벳 3지선다, 정답/오답 시 알파벳 발음 재생)
- [ ] 4.4 `src/components/quiz/QuizSpelling.tsx` 생성 — 철자 맞추기 (빈칸 단어, 글자 4~5개 선택지, 정답 시 빈칸 채움, 오답 시 흔들림)

## 5. 공통 결과 화면

- [ ] 5.1 `src/components/shared/QuizResult.tsx` 생성 — 정답 수/총 문제, 별점(★), 시도 횟수(매칭), 완료 효과음, '다시 하기'/'돌아가기' 버튼

## 6. 놀이 — 유형/주제 선택 화면

- [ ] 6.1 `src/components/play/PlayTypes.tsx` 생성 — 2가지 놀이 유형 카드 (매칭 게임, 드래그 앤 드롭 분류)
- [ ] 6.2 `src/components/play/PlayCategories.tsx` 생성 — 6가지 주제 카드 그리드, URL 파라미터 `:type` 활용

## 7. 놀이 — 플레이 컴포넌트

- [ ] 7.1 `src/components/play/PlayMatchingGame.tsx` 생성 — 4x3 카드 그리드, 뒤집기 애니메이션, 짝 매칭 로직 (대문자↔소문자 / 이모지↔단어), 시도 횟수 카운팅
- [ ] 7.2 `src/components/play/PlayDragAndDrop.tsx` 생성 — 2개 바구니, HTML5 DnD + Touch Events, 드래그 시각 피드백, 정답/오답 애니메이션

## 8. 라우팅

- [ ] 8.1 `src/routes.tsx`에 퀴즈 라우트 추가 (`/quiz-types`, `/quiz/:type/categories`, `/quiz/:type/:category`)
- [ ] 8.2 `src/routes.tsx`에 놀이 라우트 추가 (`/play-types`, `/play/:type/categories`, `/play/:type/:category`)

## 9. 스타일 및 애니메이션

- [ ] 9.1 `src/index.css`에 카드 뒤집기 애니메이션 (`animate-flip`), 흔들림 애니메이션 (`animate-shake`), 카드 흡수 애니메이션 추가
- [ ] 9.2 퀴즈/놀이용 Tailwind 커스텀 색상 추가 (예: `bg-cat-pink`, `bg-cat-cyan`)

## 10. 빌드 및 검증

- [ ] 10.1 `npm run build` 성공 확인 (타입 에러 없음)
- [ ] 10.2 `npm run lint` 통과 확인
- [ ] 10.3 전체 플로우 수동 테스트 (퀴즈 4유형 × 주제, 놀이 2유형 × 주제, 결과 화면, 뒤로가기)
