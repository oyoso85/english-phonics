## Context

현재 앱은 알파벳/단어/대화 3개 카테고리의 학습(보기+듣기) 기능만 제공한다. `CategorySelection` → 주제 선택 → 카드 학습의 흐름이 일관되게 구성되어 있다. 상태 관리는 `AppContext`(useReducer), 오디오는 `useAudioPlayer` 훅, 데이터는 `src/data/*.json`에서 로드한다. 이 구조 위에 퀴즈(4유형)와 놀이(2유형)를 추가한다.

## Goals / Non-Goals

**Goals:**
- 퀴즈 4가지 유형과 놀이 2가지 유형을 기존 앱 패턴에 맞게 추가
- 기존 데이터(`alphabets.json`, `vocabulary.json`)를 최대한 재활용
- 기존 컴포넌트 패턴(카드 그리드 선택 → 학습 화면)을 일관되게 따름
- 터치/모바일 우선 인터랙션 지원

**Non-Goals:**
- 사용자 점수/히스토리 서버 저장 (localStorage만 사용)
- 새로운 데이터 파일 추가 (기존 JSON 재사용)
- 대화(conversation) 카테고리의 퀴즈화

## Decisions

### 1. 라우팅 구조

**결정**: 유형 선택 → 주제 선택 → 플레이의 3단계 흐름

```
/select-category
  → /quiz-types                        (퀴즈 유형 선택: 4가지)
    → /quiz/:type/categories           (주제 선택: alphabet, food 등)
      → /quiz/:type/:category          (퀴즈 플레이)
  → /play-types                        (놀이 유형 선택: 2가지)
    → /play/:type/categories           (주제 선택)
      → /play/:type/:category          (놀이 플레이)
```

**이유**: 기존 `/vocabulary-categories → /vocabulary/:category/cards → /vocabulary/:category` 패턴과 일관성을 유지. URL 파라미터로 유형과 주제를 전달하여 컴포넌트 재사용성을 높임.

**대안**: 모든 퀴즈를 단일 라우트에서 state로 관리하는 방식 → 뒤로가기/공유/새로고침 시 상태 유실 문제로 기각.

### 2. 퀴즈/놀이 주제 카테고리 통합

**결정**: 퀴즈와 놀이의 주제 선택 화면은 `QuizCategories`와 `PlayCategories`로 분리하되, 주제 목록은 공통 상수로 관리

```ts
// 퀴즈/놀이에서 사용하는 주제 카테고리
type QuizSubject = 'alphabet' | VocabularyCategory;
// 'alphabet' | 'food-ingredients' | 'cooking' | 'animals' | 'vehicles' | 'body-parts'
```

**이유**: 알파벳은 `AlphabetData[]`, 나머지는 `VocabularyWord[]`로 데이터 구조가 다르므로 통합 인터페이스가 필요. `QuizSubject`로 묶고 데이터 로딩 시 분기 처리.

### 3. 퀴즈 문제 생성 로직

**결정**: 각 퀴즈 유형별 문제 생성 유틸리티를 `src/utils/quiz.ts`에 집중

```ts
interface QuizQuestion {
  id: string;
  correctAnswer: { label: string; emoji: string; audio: string };
  choices: { label: string; emoji: string }[];  // 3개 (정답 포함)
  // 유형별 추가 필드
  displayEmoji?: string;       // 그림 보고 단어 고르기
  missingLetterIndex?: number; // 철자 맞추기
}
```

- 해당 주제에서 랜덤으로 5문제 선택 (`shuffle` 유틸 활용)
- 오답 선택지는 같은 주제의 다른 항목에서 2개 선택
- 알파벳 주제: `AlphabetData`를 `QuizQuestion` 형태로 변환

**이유**: 문제 생성 로직을 컴포넌트에서 분리하면 테스트 용이, 유형 추가 시 확장 쉬움.

### 4. 오디오 재생 전략

**결정**: 기존 `useAudioPlayer` 훅을 `repetitions: 2`로 재사용

- 소리 듣고 고르기: 문제 진입 시 자동 재생 (2회)
- 그림 보고 단어 고르기: 정답 시 발음 1회 재생
- 첫 소리 맞추기: 정답/오답 시 알파벳 발음 재생
- 철자 맞추기: 정답 시 전체 단어 발음 재생
- 효과음: 별도 `playAudio()` 직접 호출 (반복 불필요)

**이유**: 이미 autoplay 제한 처리, 취소, 반복 재생 로직이 `useAudioPlayer`에 구현되어 있음.

### 5. 효과음 처리

**결정**: `public/assets/audio/`에 3개 효과음 파일 추가

- `correct.mp3` — 정답 효과음 (짧은 성공음)
- `wrong.mp3` — 오답 효과음 (짧은 실패음)
- `complete.mp3` — 퀴즈 완료 효과음 (팡파레)

**이유**: Web Audio API로 프로그래매틱 생성도 가능하지만, mp3 파일이 일관된 품질과 간단한 구현을 제공. PWA 캐시 전략에도 자연스럽게 포함됨.

### 6. 드래그 앤 드롭 구현

**결정**: HTML5 Drag and Drop API + Touch Events 직접 구현 (라이브러리 없음)

- `onDragStart/onDragOver/onDrop` (데스크톱)
- `onTouchStart/onTouchMove/onTouchEnd` (모바일)
- 드래그 중 카드 위치를 `transform: translate()`로 시각적 피드백

**대안**: `@dnd-kit/core` 라이브러리 → 번들 크기 증가(~15KB) 대비 이 기능에서의 필요성이 단순하여 기각. 카드를 바구니 2개에 넣는 단순 동작이므로 직접 구현이 적합.

**이유**: 의존성 최소화, PWA 번들 크기 관리. 드래그 대상이 단순하고 복잡한 정렬/중첩이 불필요.

### 7. 매칭 게임 구현

**결정**: 4x3 그리드 (6쌍 = 12장 카드)

- 알파벳 주제: 대문자 ↔ 소문자 짝 맞추기
- 단어 주제: 이모지 ↔ 영어 단어 짝 맞추기
- 카드 상태: `hidden | revealed | matched`
- 2장 뒤집기 → 일치 시 `matched`, 불일치 시 1초 후 `hidden`으로 복원
- 결과: 시도 횟수, 소요 시간 표시

**이유**: 6쌍은 아이들에게 적당한 난이도. 모바일 화면에서 4x3 배치가 터치하기 편함.

### 8. 퀴즈 결과 화면

**결정**: 공통 `QuizResult` 컴포넌트 (퀴즈/놀이 모두 사용)

- 정답 수 / 총 문제 수 (퀴즈)
- 시도 횟수 (매칭 게임)
- 별점 표시: ★★★(5/5), ★★☆(3-4/5), ★☆☆(1-2/5)
- 완료 효과음 재생
- '다시 하기' / '뒤로' 버튼

### 9. 컴포넌트 구조

```
src/components/
  quiz/
    QuizTypes.tsx              # 퀴즈 유형 선택 (4가지 카드)
    QuizCategories.tsx         # 주제 선택 (alphabet, food 등)
    QuizListenAndChoose.tsx    # 유형1: 소리 듣고 고르기
    QuizImageToWord.tsx        # 유형2: 그림 보고 단어 고르기
    QuizFirstSound.tsx         # 유형3: 첫 소리 맞추기
    QuizSpelling.tsx           # 유형4: 철자 맞추기
  play/
    PlayTypes.tsx              # 놀이 유형 선택 (2가지 카드)
    PlayCategories.tsx         # 주제 선택
    PlayMatchingGame.tsx       # 유형5: 매칭 게임
    PlayDragAndDrop.tsx        # 유형6: 드래그 앤 드롭 분류
  shared/
    QuizResult.tsx             # 공통 결과 화면
```

**이유**: `quiz/`, `play/`, `shared/` 하위 폴더로 분리하여 기존 `components/` 디렉터리의 평면 구조가 지나치게 커지는 것을 방지. 기존 컴포넌트들은 이동하지 않음.

### 10. 상태 관리

**결정**: 퀴즈/놀이 진행 상태는 각 컴포넌트의 로컬 state로 관리 (AppContext 확장 최소화)

- AppContext 변경: `LearningCategory`에 `'quiz' | 'play'` 추가만
- 퀴즈 진행 상태 (현재 문제, 점수, 선택 등): 각 플레이 컴포넌트의 `useState`
- URL 파라미터(`:type`, `:category`)로 유형과 주제 전달

**이유**: 퀴즈 진행 상태는 페이지를 떠나면 리셋되는 것이 자연스러움. 글로벌 상태로 관리할 필요 없음.

## Risks / Trade-offs

- **터치 드래그 호환성**: HTML5 DnD API는 모바일에서 네이티브 지원이 제한적 → `touchstart/touchmove/touchend` 이벤트로 별도 구현 필요. 구현 복잡도가 예상보다 클 경우 `@dnd-kit` 도입 재검토.
- **효과음 파일 확보**: 무료 라이선스 효과음 파일 필요 → freesound.org 등에서 CC0 효과음 확보 또는 Web Audio API로 간단한 톤 생성으로 대체 가능.
- **알파벳 데이터 구조 차이**: 알파벳(`AlphabetData`)과 단어(`VocabularyWord`)의 필드가 달라 퀴즈 문제 생성 시 변환 로직 필요 → `QuizQuestion` 인터페이스로 통합하여 해결.
- **철자 맞추기 난이도**: 빈칸 위치와 선택지 수에 따라 너무 쉽거나 어려울 수 있음 → 단어 중간 글자 1개를 빈칸으로 하고 선택지 4~5개로 시작, 추후 조정.
