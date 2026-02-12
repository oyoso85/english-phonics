## ADDED Requirements

### Requirement: Play category button on main screen
카테고리 선택 화면에 '놀이'(🎮) 버튼이 표시되어야 한다. 선택 시 놀이 유형 선택 화면으로 이동한다.

#### Scenario: User selects play category
- **WHEN** 사용자가 카테고리 선택 화면에서 '놀이' 버튼을 탭한다
- **THEN** `/play-types` 화면으로 이동한다

### Requirement: Play type selection screen
놀이 유형 선택 화면(`/play-types`)에서 2가지 놀이 유형을 카드 형태로 표시한다.
- 매칭 게임 🃏
- 드래그 앤 드롭 분류 🎯

#### Scenario: Display play types
- **WHEN** 사용자가 놀이 유형 선택 화면에 진입한다
- **THEN** 2가지 놀이 유형 카드가 표시된다
- **THEN** 각 카드에 아이콘과 한글 이름이 표시된다
- **THEN** '돌아가기' 버튼이 표시되어 카테고리 선택 화면으로 돌아갈 수 있다

#### Scenario: Select a play type
- **WHEN** 사용자가 놀이 유형 카드 중 하나를 탭한다
- **THEN** 해당 유형의 주제 선택 화면(`/play/:type/categories`)으로 이동한다

### Requirement: Play subject selection screen
놀이 주제 선택 화면(`/play/:type/categories`)에서 6가지 주제를 카드로 표시한다: 알파벳(🔤), 음식(🍎), 요리(🍳), 동물(🐶), 탈것(🚗), 몸(🖐️).

#### Scenario: Display play subjects
- **WHEN** 사용자가 놀이 주제 선택 화면에 진입한다
- **THEN** 6가지 주제 카드가 그리드로 표시된다
- **THEN** '돌아가기' 버튼이 표시되어 놀이 유형 선택 화면으로 돌아갈 수 있다

#### Scenario: Select a subject
- **WHEN** 사용자가 주제 카드를 탭한다
- **THEN** 해당 주제와 유형의 놀이 플레이 화면(`/play/:type/:category`)으로 이동한다

### Requirement: Matching game
매칭 게임은 뒤집힌 카드들 중 짝이 맞는 2장을 찾는 메모리 게임이다. 4x3 그리드에 6쌍(12장)의 카드를 배치한다.

#### Scenario: Game board setup
- **WHEN** 매칭 게임 화면이 로드된다
- **THEN** 해당 주제에서 랜덤으로 6개 항목을 선택한다
- **THEN** 알파벳 주제: 대문자 카드 6장 + 소문자 카드 6장 = 12장을 생성한다
- **THEN** 단어 주제: 이모지 카드 6장 + 영어 단어 카드 6장 = 12장을 생성한다
- **THEN** 12장의 카드를 랜덤 순서로 4x3 그리드에 뒤집어 배치한다
- **THEN** 시도 횟수 카운터를 0으로 초기화한다

#### Scenario: Flip first card
- **WHEN** 사용자가 뒤집힌 카드 1장을 탭한다
- **THEN** 해당 카드가 앞면으로 뒤집히는 애니메이션이 재생된다
- **THEN** 카드의 내용(이모지, 글자, 또는 단어)이 표시된다

#### Scenario: Flip second card - match
- **WHEN** 사용자가 2번째 카드를 탭하고 두 카드가 짝이 맞는다
- **THEN** 정답 효과음이 재생된다
- **THEN** 두 카드 모두 앞면 상태로 유지된다 (matched 상태)
- **THEN** 시도 횟수가 1 증가한다

#### Scenario: Flip second card - no match
- **WHEN** 사용자가 2번째 카드를 탭하고 두 카드가 짝이 맞지 않는다
- **THEN** 오답 효과음이 재생된다
- **THEN** 1초 후 두 카드 모두 뒷면으로 되돌아간다
- **THEN** 시도 횟수가 1 증가한다

#### Scenario: All pairs matched
- **WHEN** 6쌍 모두 매칭이 완료된다
- **THEN** 완료 효과음이 재생된다
- **THEN** 결과 화면으로 이동한다 (시도 횟수 표시)

#### Scenario: Prevent invalid taps
- **WHEN** 이미 매칭된 카드 또는 이미 앞면인 카드를 탭한다
- **THEN** 아무 동작도 하지 않는다

### Requirement: Drag and drop sorting game
드래그 앤 드롭 분류 게임은 단어 카드를 올바른 카테고리 바구니로 끌어다 놓는 게임이다.

#### Scenario: Game setup
- **WHEN** 드래그 앤 드롭 분류 화면이 로드된다
- **THEN** 2개의 카테고리 바구니가 화면 하단에 표시된다 (예: 동물 🐾 / 음식 🍽️)
- **THEN** 바구니의 카테고리는 선택한 주제 + 랜덤으로 선택된 다른 주제 1개로 구성된다
- **THEN** 두 카테고리에서 각 3~4개씩 총 6~8개의 단어 카드가 화면 중앙에 랜덤 순서로 표시된다

#### Scenario: Drag card to correct basket
- **WHEN** 사용자가 카드를 올바른 카테고리 바구니로 드래그한다
- **THEN** 정답 효과음이 재생된다
- **THEN** 카드가 바구니로 흡수되는 애니메이션이 재생된다
- **THEN** 해당 카드가 화면에서 사라진다

#### Scenario: Drag card to wrong basket
- **WHEN** 사용자가 카드를 잘못된 카테고리 바구니로 드래그한다
- **THEN** 오답 효과음이 재생된다
- **THEN** 카드가 원래 위치로 되돌아가는 애니메이션이 재생된다

#### Scenario: Drop outside baskets
- **WHEN** 사용자가 카드를 바구니가 아닌 영역에 드롭한다
- **THEN** 카드가 원래 위치로 되돌아간다

#### Scenario: All cards sorted
- **WHEN** 모든 카드가 올바른 바구니에 분류된다
- **THEN** 완료 효과음이 재생된다
- **THEN** 결과 화면으로 이동한다

#### Scenario: Touch device support
- **WHEN** 터치 디바이스에서 카드를 길게 누르고 이동한다
- **THEN** 카드가 손가락을 따라 이동한다 (touchstart/touchmove/touchend)
- **THEN** 드래그 중 카드가 반투명하게 표시된다

#### Scenario: Alphabet subject drag and drop
- **WHEN** 알파벳 주제가 선택된다
- **THEN** 바구니는 대문자 그룹 / 소문자 그룹으로 구성된다
- **THEN** 알파벳 카드를 해당하는 대/소문자 바구니로 분류한다

### Requirement: Play result screen
놀이 완료 후 결과 화면을 표시한다.

#### Scenario: Matching game result
- **WHEN** 매칭 게임이 완료된다
- **THEN** 완료 효과음이 재생된다
- **THEN** 시도 횟수가 표시된다
- **THEN** 별점이 표시된다: ★★★(6~7회), ★★☆(8~10회), ★☆☆(11회 이상)
- **THEN** '다시 하기' / '돌아가기' 버튼이 표시된다

#### Scenario: Drag and drop result
- **WHEN** 드래그 앤 드롭 분류가 완료된다
- **THEN** 완료 효과음이 재생된다
- **THEN** 정답 수 / 총 카드 수가 표시된다 (첫 시도 정답 기준)
- **THEN** 별점이 표시된다: ★★★(전부 정답), ★★☆(70% 이상), ★☆☆(70% 미만)
- **THEN** '다시 하기' / '돌아가기' 버튼이 표시된다
