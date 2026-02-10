# TTS 오디오 생성 스크립트

이 스크립트는 영어 파닉스 교육 프로그램에 필요한 모든 오디오 파일을 자동으로 생성합니다.

## 📦 설치

```bash
# scripts 디렉토리로 이동
cd scripts

# Python 패키지 설치
pip install -r requirements.txt
```

## 🚀 실행

```bash
# 스크립트 실행
python generate_audio.py
```

## 📊 생성되는 파일

### 오디오 파일 (111개)
- **알파벳**: 26개 (`alphabet-a.mp3` ~ `alphabet-z.mp3`)
- **단어**: 50개 (`word-apple.mp3`, `word-banana.mp3`, ...)
- **대화**: 35개 (`conv-greeting-1.mp3`, ...)

### JSON 데이터 파일 (3개)
- `src/data/alphabets.json` - 알파벳 데이터
- `src/data/vocabulary.json` - 단어 데이터 (카테고리별)
- `src/data/conversations.json` - 대화 데이터

## 📁 출력 위치

```
english-phonics/
├── public/assets/audio/  ← 오디오 파일 (111개)
└── src/data/             ← JSON 데이터 (3개)
```

## 🔧 단어 목록

### 식재료 (10개)
Apple, Banana, Carrot, Egg, Fish, Grape, Milk, Rice, Tomato, Water

### 요리 (10개)
Bowl, Cup, Fork, Knife, Plate, Pot, Spoon, Stove, Table, Chair

### 동물 (10개)
Cat, Dog, Bird, Fish, Lion, Elephant, Rabbit, Bear, Monkey, Tiger

### 탈것 (10개)
Car, Bus, Train, Airplane, Bike, Boat, Truck, Taxi, Ship, Helicopter

### 신체 (10개)
Head, Eye, Ear, Nose, Mouth, Hand, Foot, Arm, Leg, Hair

## 💬 대화 주제 (7개)

1. 친구와 인사
2. 친구와 역할놀이
3. 엄마에게 도움 요청
4. 아빠에게 도움 요청
5. 나의 감정 상태
6. XX 주세요 (물건 요청)
7. XX 해주세요 (행동 요청)

## ⚙️ 커스터마이징

단어나 대화 내용을 변경하려면 `generate_audio.py` 파일을 편집하세요.

## 📝 참고사항

- gTTS (Google Text-to-Speech)를 사용합니다
- 인터넷 연결이 필요합니다
- 생성에 약 2-3분 소요됩니다
- 음성은 영어(en) 느린 속도(slow=True)로 생성됩니다
