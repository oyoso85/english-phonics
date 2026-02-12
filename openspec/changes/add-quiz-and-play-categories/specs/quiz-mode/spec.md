## ADDED Requirements

### Requirement: Quiz category button on main screen
카테고리 선택 화면에 '퀴즈'(🧩) 버튼이 표시되어야 한다. 선택 시 퀴즈 유형 선택 화면으로 이동한다.

#### Scenario: User selects quiz category
- **WHEN** 사용자가 카테고리 선택 화면에서 '퀴즈' 버튼을 탭한다
- **THEN** `/quiz-types` 화면으로 이동한다

### Requirement: Quiz type selection screen
퀴즈 유형 선택 화면(`/quiz-types`)에서 4가지 퀴즈 유형을 카드 형태로 표시한다. 각 카드에는 아이콘과 한글 이름을 포함한다.
- 소리 듣고 고르기 🔊
- 그림 보고 단어 고르기 🖼️
- 첫 소리 맞추기 🔤
- 철자 맞추기 ✏️

#### Scenario: Display quiz types
- **WHEN** 사용자가 퀴즈 유형 선택 화면에 진입한다
- **THEN** 4가지 퀴즈 유형 카드가 그리드로 표시된다
- **THEN** 각 카드에 아이콘과 한글 이름이 표시된다
- **THEN** '돌아가기' 버튼이 표시되어 카테고리 선택 화면으로 돌아갈 수 있다

#### Scenario: Select a quiz type
- **WHEN** 사용자가 퀴즈 유형 카드 중 하나를 탭한다
- **THEN** 해당 유형의 주제 선택 화면(`/quiz/:type/categories`)으로 이동한다

### Requirement: Quiz subject selection screen
퀴즈 주제 선택 화면(`/quiz/:type/categories`)에서 6가지 주제를 카드로 표시한다: 알파벳(🔤), 음식(🍎), 요리(🍳), 동물(🐶), 탈것(🚗), 몸(🖐️).

#### Scenario: Display quiz subjects
- **WHEN** 사용자가 주제 선택 화면에 진입한다
- **THEN** 6가지 주제 카드가 그리드로 표시된다
- **THEN** '돌아가기' 버튼이 표시되어 퀴즈 유형 선택 화면으로 돌아갈 수 있다

#### Scenario: Select a subject
- **WHEN** 사용자가 주제 카드를 탭한다
- **THEN** 해당 주제와 유형의 퀴즈 플레이 화면(`/quiz/:type/:category`)으로 이동한다

### Requirement: Quiz common rules
모든 퀴즈 유형은 다음 공통 규칙을 따른다:
- 해당 주제에서 랜덤으로 5문제를 출제한다
- 각 문제는 정답 1개 + 오답 2개 = 3개의 선택지를 제공한다 (철자 맞추기는 4~5개)
- 오답 선택지는 같은 주제의 다른 항목에서 선택한다
- 정답 시 효과음(`correct.mp3`)을 재생하고 다음 문제로 넘어간다
- 오답 시 효과음(`wrong.mp3`)을 재생하고 재도전할 수 있다
- 5문제 완료 후 결과 화면으로 이동한다

#### Scenario: Generate 5 random questions
- **WHEN** 퀴즈 플레이 화면이 로드된다
- **THEN** 해당 주제의 데이터에서 랜덤으로 5개 항목을 선택하여 문제를 생성한다
- **THEN** 각 문제의 선택지는 정답을 포함하여 랜덤 순서로 배치된다

#### Scenario: Correct answer
- **WHEN** 사용자가 정답 선택지를 탭한다
- **THEN** 정답 효과음이 재생된다
- **THEN** 정답 카운트가 1 증가한다
- **THEN** 다음 문제로 전환된다

#### Scenario: Wrong answer
- **WHEN** 사용자가 오답 선택지를 탭한다
- **THEN** 오답 효과음이 재생된다
- **THEN** 관련 소리를 다시 재생하여 재도전 기회를 제공한다
- **THEN** 정답을 맞힐 때까지 다음 문제로 넘어가지 않는다

### Requirement: Quiz type 1 - Listen and choose
'소리 듣고 고르기' 유형은 음성을 듣고 해당하는 항목을 3개 중에서 선택하는 퀴즈이다.

#### Scenario: Question display and audio playback
- **WHEN** 문제가 시작된다
- **THEN** 화면 상단에 '소리를 듣고 맞는 것을 고르세요' 안내가 표시된다
- **THEN** 화면 중앙에 물음표(❓) 카드가 표시된다
- **THEN** 정답 항목의 음성이 자동으로 2번 재생된다
- **THEN** 화면 하단에 3개의 선택지(이모지 + 텍스트)가 표시된다

#### Scenario: Correct answer reveals card
- **WHEN** 사용자가 정답을 선택한다
- **THEN** 중앙의 물음표 카드가 정답 이모지로 전환된다 (애니메이션 포함)
- **THEN** 정답 효과음이 재생된다

#### Scenario: Wrong answer replays audio
- **WHEN** 사용자가 오답을 선택한다
- **THEN** 오답 효과음이 재생된다
- **THEN** 정답 항목의 음성이 다시 재생된다

### Requirement: Quiz type 2 - Image to word
'그림 보고 단어 고르기' 유형은 이모지를 보고 해당하는 영어 단어를 3개 중에서 선택하는 퀴즈이다.

#### Scenario: Question display
- **WHEN** 문제가 시작된다
- **THEN** 화면 상단에 '그림을 보고 맞는 단어를 고르세요' 안내가 표시된다
- **THEN** 화면 중앙에 정답 항목의 이모지 카드가 크게 표시된다
- **THEN** 화면 하단에 3개의 영어 단어 선택지가 표시된다

#### Scenario: Correct answer plays pronunciation
- **WHEN** 사용자가 정답 단어를 선택한다
- **THEN** 정답 효과음이 재생된다
- **THEN** 해당 단어의 발음 음성이 재생된다

#### Scenario: Wrong answer plays correct pronunciation
- **WHEN** 사용자가 오답 단어를 선택한다
- **THEN** 오답 효과음이 재생된다
- **THEN** 정답 단어의 발음 음성이 재생된다

### Requirement: Quiz type 3 - First sound
'첫 소리 맞추기' 유형은 그림과 단어를 보고 해당 단어의 첫 알파벳을 3개 중에서 선택하는 퀴즈이다.

#### Scenario: Question display
- **WHEN** 문제가 시작된다
- **THEN** 화면 상단에 '이 단어는 어떤 소리로 시작할까?' 안내가 표시된다
- **THEN** 화면 중앙에 이모지와 영어 단어가 함께 표시된다
- **THEN** 화면 하단에 3개의 알파벳 대문자 선택지가 표시된다

#### Scenario: Correct answer plays alphabet sound
- **WHEN** 사용자가 정답 알파벳을 선택한다
- **THEN** 정답 효과음이 재생된다
- **THEN** 해당 알파벳의 발음 음성이 재생된다

#### Scenario: Wrong answer plays correct alphabet sound
- **WHEN** 사용자가 오답 알파벳을 선택한다
- **THEN** 오답 효과음이 재생된다
- **THEN** 정답 알파벳의 발음 음성이 재생된다

### Requirement: Quiz type 4 - Spelling
'철자 맞추기' 유형은 그림과 빈칸이 포함된 단어를 보고 빈칸에 들어갈 알맞은 글자를 선택하는 퀴즈이다.

#### Scenario: Question display
- **WHEN** 문제가 시작된다
- **THEN** 화면 상단에 '빈칸에 들어갈 글자를 고르세요' 안내가 표시된다
- **THEN** 화면 중앙에 이모지와 빈칸이 포함된 단어가 표시된다 (예: `A _ p l e`)
- **THEN** 빈칸 위치는 단어의 중간 글자 중 하나가 랜덤으로 선택된다
- **THEN** 화면 하단에 4~5개의 알파벳 글자 선택지가 표시된다

#### Scenario: Correct letter fills blank
- **WHEN** 사용자가 정답 글자를 선택한다
- **THEN** 빈칸이 정답 글자로 채워진다 (애니메이션 포함)
- **THEN** 정답 효과음이 재생된다
- **THEN** 완성된 단어의 발음이 재생된다

#### Scenario: Wrong letter shakes
- **WHEN** 사용자가 오답 글자를 선택한다
- **THEN** 오답 효과음이 재생된다
- **THEN** 빈칸 영역이 흔들림 애니메이션을 표시한다

### Requirement: Quiz result screen
퀴즈 완료 후 결과 화면을 표시한다.

#### Scenario: Display quiz result
- **WHEN** 5문제를 모두 완료한다
- **THEN** 완료 효과음(`complete.mp3`)이 재생된다
- **THEN** 정답 수 / 총 문제 수 (예: 4/5)가 표시된다
- **THEN** 별점이 표시된다: ★★★(5/5), ★★☆(3~4/5), ★☆☆(1~2/5)
- **THEN** '다시 하기' 버튼이 표시된다 (같은 유형/주제로 재시작)
- **THEN** '돌아가기' 버튼이 표시된다 (주제 선택 화면으로 이동)
