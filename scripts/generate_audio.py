#!/usr/bin/env python3
"""
영어 파닉스 교육 프로그램 - TTS 오디오 생성 스크립트
알파벳, 단어, 대화 오디오를 생성합니다.
"""

from gtts import gTTS
import os
import json

# 출력 디렉토리 설정
AUDIO_DIR = '../public/assets/audio'
DATA_DIR = '../src/data'

# 디렉토리 생성
os.makedirs(AUDIO_DIR, exist_ok=True)
os.makedirs(DATA_DIR, exist_ok=True)

print("🎙️ 영어 파닉스 TTS 오디오 생성 시작...\n")

# ========================================
# 1. 알파벳 오디오 생성 (26개)
# ========================================
print("📝 1. 알파벳 오디오 생성 중...")

alphabet_data = []

alphabet_words = {
    'A': 'Apple', 'B': 'Ball', 'C': 'Cat', 'D': 'Dog', 'E': 'Elephant',
    'F': 'Fish', 'G': 'Grape', 'H': 'Hat', 'I': 'Ice cream', 'J': 'Juice',
    'K': 'Kite', 'L': 'Lion', 'M': 'Monkey', 'N': 'Nose', 'O': 'Orange',
    'P': 'Pig', 'Q': 'Queen', 'R': 'Rabbit', 'S': 'Sun', 'T': 'Tiger',
    'U': 'Umbrella', 'V': 'Van', 'W': 'Water', 'X': 'Xylophone', 'Y': 'Yellow', 'Z': 'Zebra'
}

for letter, word in alphabet_words.items():
    # 텍스트: "A. Apple"
    text = f"{letter}. {word}"

    # 오디오 생성 (천천히)
    tts = gTTS(text=text, lang='en', slow=True)
    audio_path = f'{AUDIO_DIR}/alphabet-{letter.lower()}.mp3'
    tts.save(audio_path)

    # 데이터 저장
    alphabet_data.append({
        'letter': letter,
        'uppercase': letter,
        'lowercase': letter.lower(),
        'exampleWord': word,
        'exampleImage': f'/assets/images/{word.lower().replace(" ", "-")}.png',
        'audioFile': f'/assets/audio/alphabet-{letter.lower()}.mp3'
    })

    print(f"  ✅ {letter} - {word}")

print(f"✨ 알파벳 26개 오디오 생성 완료!\n")

# ========================================
# 2. 단어 오디오 생성 (100개 - 각 카테고리 20개)
# ========================================
print("📚 2. 단어 오디오 생성 중...")

vocabulary_data = {
    'food-ingredients': [
        'Apple', 'Banana', 'Carrot', 'Egg', 'Fish',
        'Grape', 'Milk', 'Rice', 'Tomato', 'Water',
        'Bread', 'Cheese', 'Chicken', 'Corn', 'Lemon',
        'Meat', 'Orange', 'Potato', 'Salt', 'Sugar'
    ],
    'cooking': [
        'Bowl', 'Cup', 'Fork', 'Knife', 'Plate',
        'Pot', 'Spoon', 'Stove', 'Table', 'Chair',
        'Chopsticks', 'Glass', 'Kettle', 'Oven', 'Pan',
        'Bottle', 'Napkin', 'Dish', 'Tray', 'Lid'
    ],
    'animals': [
        'Cat', 'Dog', 'Bird', 'Fish', 'Lion',
        'Elephant', 'Rabbit', 'Bear', 'Monkey', 'Tiger',
        'Cow', 'Pig', 'Sheep', 'Horse', 'Duck',
        'Frog', 'Giraffe', 'Panda', 'Fox', 'Wolf'
    ],
    'vehicles': [
        'Car', 'Bus', 'Train', 'Airplane', 'Bike',
        'Boat', 'Truck', 'Taxi', 'Ship', 'Helicopter',
        'Motorcycle', 'Subway', 'Scooter', 'Rocket', 'Ambulance',
        'Van', 'Police car', 'Fire truck', 'Tram', 'Yacht'
    ],
    'body-parts': [
        'Head', 'Eye', 'Ear', 'Nose', 'Mouth',
        'Hand', 'Foot', 'Arm', 'Leg', 'Hair',
        'Finger', 'Toe', 'Knee', 'Elbow', 'Shoulder',
        'Neck', 'Back', 'Chest', 'Stomach', 'Face'
    ]
}

vocabulary_json = {'categories': {}}

for category, words in vocabulary_data.items():
    print(f"\n  📂 {category}")
    vocabulary_json['categories'][category] = []

    for word in words:
        # 오디오 생성
        tts = gTTS(text=word, lang='en', slow=True)
        word_id = word.lower().replace(' ', '-')
        audio_path = f'{AUDIO_DIR}/word-{word_id}.mp3'
        tts.save(audio_path)

        # 데이터 저장
        vocabulary_json['categories'][category].append({
            'id': word_id,
            'spelling': word,
            'image': f'/assets/images/{word_id}.png',
            'audio': f'/assets/audio/word-{word_id}.mp3'
        })

        print(f"    ✅ {word}")

print(f"\n✨ 단어 100개 오디오 생성 완료!\n")

# ========================================
# 3. 대화 오디오 생성 (7개 세트, 각 15문장)
# ========================================
print("💬 3. 대화 오디오 생성 중...")

conversations = [
    {
        'id': 'greeting',
        'title': '친구와 인사',
        'sentences': [
            'Hello!',
            'Hi! How are you?',
            'I am fine, thank you.',
            'What is your name?',
            'My name is Tom.',
            'Nice to meet you!',
            'Nice to meet you too.',
            'How old are you?',
            'I am five years old.',
            'Where do you live?',
            'I live near the park.',
            'Do you want to play?',
            'Yes, let\'s play!',
            'See you later!',
            'Goodbye!'
        ]
    },
    {
        'id': 'role-play',
        'title': '친구와 역할놀이',
        'sentences': [
            'Let\'s play together!',
            'You are the doctor.',
            'I am the patient.',
            'What should I do?',
            'Please sit down.',
            'Open your mouth, please.',
            'Say "Ah".',
            'Does it hurt here?',
            'No, it doesn\'t hurt.',
            'You are very brave!',
            'Here is your medicine.',
            'Take this three times a day.',
            'Thank you, doctor!',
            'You will feel better soon.',
            'Come back next week.'
        ]
    },
    {
        'id': 'help-mom',
        'title': '엄마에게 도움 요청',
        'sentences': [
            'Mom, can you help me?',
            'I need your help.',
            'Can you open this?',
            'Thank you, Mom!',
            'I love you, Mom.',
            'Can you tie my shoes?',
            'I can\'t reach the shelf.',
            'Can you get it for me?',
            'This is too heavy for me.',
            'Can you carry this?',
            'I don\'t know how to do this.',
            'Can you show me?',
            'I spilled some water.',
            'Can you help me clean it?',
            'You are the best mom!'
        ]
    },
    {
        'id': 'help-dad',
        'title': '아빠에게 도움 요청',
        'sentences': [
            'Dad, can you help me?',
            'I can\'t reach it.',
            'Can you get it for me?',
            'Thank you, Dad!',
            'You are the best, Dad.',
            'Can you fix my toy?',
            'It is broken.',
            'Can you help me build this?',
            'I need to put this together.',
            'Can you teach me?',
            'I want to learn how to do it.',
            'Can we play outside?',
            'Let\'s play ball!',
            'Can you push me on the swing?',
            'This is so much fun!'
        ]
    },
    {
        'id': 'feelings',
        'title': '나의 감정 상태',
        'sentences': [
            'I am happy today.',
            'I feel sad.',
            'I am excited!',
            'I am tired.',
            'I love this!',
            'I am scared.',
            'Don\'t worry, it\'s okay.',
            'I feel angry.',
            'I need a hug.',
            'I am so proud!',
            'This makes me smile.',
            'I feel much better now.',
            'I am surprised!',
            'That was fun!',
            'I feel sleepy.'
        ]
    },
    {
        'id': 'request-item',
        'title': 'XX 주세요',
        'sentences': [
            'Can I have some water, please?',
            'May I have a cookie?',
            'Can you give me the ball?',
            'I want some juice, please.',
            'Can I have more, please?',
            'May I have a snack?',
            'Can you pass me the toy?',
            'I would like some milk.',
            'Can I have a napkin?',
            'Please give me the pencil.',
            'May I have some fruit?',
            'Can I get a tissue?',
            'I need my backpack, please.',
            'Can you hand me that book?',
            'May I have another one?'
        ]
    },
    {
        'id': 'request-action',
        'title': 'XX 해주세요',
        'sentences': [
            'Please read me a book.',
            'Can you sing a song?',
            'Please play with me.',
            'Can you tie my shoes?',
            'Please help me draw.',
            'Can you turn on the light?',
            'Please open the door.',
            'Can you close the window?',
            'Please wait for me.',
            'Can you hold my hand?',
            'Please tell me a story.',
            'Can you show me how?',
            'Please come here.',
            'Can you listen to me?',
            'Please stay with me.'
        ]
    }
]

conversation_json = []

for conv in conversations:
    print(f"\n  💬 {conv['title']}")

    conv_data = {
        'id': conv['id'],
        'title': conv['title'],
        'sentences': []
    }

    for idx, sentence in enumerate(conv['sentences'], 1):
        # 오디오 생성
        tts = gTTS(text=sentence, lang='en', slow=True)
        audio_path = f"{AUDIO_DIR}/conv-{conv['id']}-{idx}.mp3"
        tts.save(audio_path)

        # 데이터 저장
        conv_data['sentences'].append({
            'text': sentence,
            'audio': f"/assets/audio/conv-{conv['id']}-{idx}.mp3"
        })

        print(f"    ✅ [{idx:2d}/15] {sentence}")

    conversation_json.append(conv_data)

print(f"\n✨ 대화 7개 세트 (105문장) 오디오 생성 완료!\n")

# ========================================
# 4. JSON 데이터 파일 저장
# ========================================
print("💾 JSON 데이터 파일 저장 중...")

# alphabets.json
with open(f'{DATA_DIR}/alphabets.json', 'w', encoding='utf-8') as f:
    json.dump(alphabet_data, f, indent=2, ensure_ascii=False)
print("  ✅ alphabets.json")

# vocabulary.json
with open(f'{DATA_DIR}/vocabulary.json', 'w', encoding='utf-8') as f:
    json.dump(vocabulary_json, f, indent=2, ensure_ascii=False)
print("  ✅ vocabulary.json")

# conversations.json
with open(f'{DATA_DIR}/conversations.json', 'w', encoding='utf-8') as f:
    json.dump(conversation_json, f, indent=2, ensure_ascii=False)
print("  ✅ conversations.json")

# ========================================
# 완료 요약
# ========================================
print("\n" + "="*50)
print("🎉 TTS 오디오 생성 완료!")
print("="*50)
print(f"📊 생성된 파일:")
print(f"  - 알파벳 오디오: 26개")
print(f"  - 단어 오디오: 100개 (각 카테고리 20개)")
print(f"  - 대화 오디오: 105개 (7세트 × 15문장)")
print(f"  - JSON 데이터: 3개")
print(f"  💿 총 오디오 파일: 231개")
print(f"\n📁 저장 위치:")
print(f"  - 오디오: {AUDIO_DIR}/")
print(f"  - 데이터: {DATA_DIR}/")
print("="*50)
