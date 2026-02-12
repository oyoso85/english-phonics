#!/usr/bin/env python3
"""
퀴즈/놀이 효과음 생성 스크립트
numpy만 필수 (pip install numpy)
pydub + ffmpeg 있으면 MP3 변환 (pip install pydub)
"""

import numpy as np
import os
import struct

AUDIO_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'assets', 'audio')
os.makedirs(AUDIO_DIR, exist_ok=True)

SAMPLE_RATE = 44100


def generate_tone(freq, duration, volume=0.5, fade_ms=30):
    """단일 사인파 톤 생성"""
    t = np.linspace(0, duration, int(SAMPLE_RATE * duration), False)
    tone = np.sin(2 * np.pi * freq * t) * volume
    fade_samples = int(SAMPLE_RATE * fade_ms / 1000)
    if fade_samples > 0 and len(tone) > fade_samples * 2:
        tone[:fade_samples] *= np.linspace(0, 1, fade_samples)
        tone[-fade_samples:] *= np.linspace(1, 0, fade_samples)
    return tone


def generate_sweep(freq_start, freq_end, duration, volume=0.5, fade_ms=30):
    """주파수 스윕 (올라가거나 내려가는 소리)"""
    t = np.linspace(0, duration, int(SAMPLE_RATE * duration), False)
    freqs = np.linspace(freq_start, freq_end, len(t))
    phase = np.cumsum(2 * np.pi * freqs / SAMPLE_RATE)
    tone = np.sin(phase) * volume
    fade_samples = int(SAMPLE_RATE * fade_ms / 1000)
    if fade_samples > 0 and len(tone) > fade_samples * 2:
        tone[:fade_samples] *= np.linspace(0, 1, fade_samples)
        tone[-fade_samples:] *= np.linspace(1, 0, fade_samples)
    return tone


def generate_noise_burst(duration, volume=0.3, fade_ms=5):
    """노이즈 버스트 (박수/탁 소리용)"""
    n_samples = int(SAMPLE_RATE * duration)
    noise = np.random.uniform(-1, 1, n_samples) * volume
    # 빠른 감쇠 (타격감)
    decay = np.exp(-np.linspace(0, 8, n_samples))
    noise *= decay
    fade_samples = int(SAMPLE_RATE * fade_ms / 1000)
    if fade_samples > 0 and len(noise) > fade_samples:
        noise[:fade_samples] *= np.linspace(0, 1, fade_samples)
    return noise


def generate_vibrato(freq, duration, volume=0.5, vib_freq=6, vib_depth=20, fade_ms=30):
    """비브라토 톤 (떨리는 소리)"""
    t = np.linspace(0, duration, int(SAMPLE_RATE * duration), False)
    freq_mod = freq + vib_depth * np.sin(2 * np.pi * vib_freq * t)
    phase = np.cumsum(2 * np.pi * freq_mod / SAMPLE_RATE)
    tone = np.sin(phase) * volume
    fade_samples = int(SAMPLE_RATE * fade_ms / 1000)
    if fade_samples > 0 and len(tone) > fade_samples * 2:
        tone[:fade_samples] *= np.linspace(0, 1, fade_samples)
        tone[-fade_samples:] *= np.linspace(1, 0, fade_samples)
    return tone


def silence(duration):
    """무음 구간"""
    return np.zeros(int(SAMPLE_RATE * duration))


def normalize(audio, peak=0.8):
    """오디오 정규화"""
    max_val = np.max(np.abs(audio))
    if max_val > 0:
        audio = audio * (peak / max_val)
    return audio


def save_wav(filename, audio_data):
    """numpy 배열을 WAV로 저장"""
    audio_data = normalize(audio_data)
    audio_int16 = np.int16(audio_data * 32767)
    filepath = os.path.join(AUDIO_DIR, filename)

    with open(filepath, 'wb') as f:
        num_samples = len(audio_int16)
        data_size = num_samples * 2
        f.write(b'RIFF')
        f.write(struct.pack('<I', 36 + data_size))
        f.write(b'WAVE')
        f.write(b'fmt ')
        f.write(struct.pack('<I', 16))
        f.write(struct.pack('<H', 1))   # PCM
        f.write(struct.pack('<H', 1))   # mono
        f.write(struct.pack('<I', SAMPLE_RATE))
        f.write(struct.pack('<I', SAMPLE_RATE * 2))
        f.write(struct.pack('<H', 2))
        f.write(struct.pack('<H', 16))
        f.write(b'data')
        f.write(struct.pack('<I', data_size))
        f.write(audio_int16.tobytes())

    print(f"  ✅ {filename} ({num_samples / SAMPLE_RATE:.2f}s)")


def convert_wav_to_mp3(wav_name, mp3_name):
    """WAV를 MP3로 변환 (pydub 사용)"""
    try:
        from pydub import AudioSegment
        wav_path = os.path.join(AUDIO_DIR, wav_name)
        mp3_path = os.path.join(AUDIO_DIR, mp3_name)
        audio = AudioSegment.from_wav(wav_path)
        audio.export(mp3_path, format="mp3")
        os.remove(wav_path)
        print(f"  🔄 {wav_name} → {mp3_name}")
        return True
    except ImportError:
        print(f"  ⚠️  pydub 없음 — {wav_name}을 그대로 사용 (pip install pydub)")
        return False
    except Exception as e:
        print(f"  ⚠️  MP3 변환 실패: {e} — WAV 유지")
        return False


# ==========================================
ALL_NAMES = []

print("🔊 퀴즈/놀이 효과음 생성 시작...\n")

# ========================================
# 1. correct — 밝은 2음 차임 (띵띵!)
# ========================================
print("🎵 1. correct (정답 차임)")
tone1 = generate_tone(523.25, 0.12, 0.6)   # C5
tone2 = generate_tone(783.99, 0.22, 0.6)   # G5
correct = np.concatenate([tone1, silence(0.04), tone2])
save_wav('correct.wav', correct)
ALL_NAMES.append('correct')

# ========================================
# 2. wrong — 낮은 버저 (뿡!)
# ========================================
print("🎵 2. wrong (오답 버저)")
t = np.linspace(0, 0.35, int(SAMPLE_RATE * 0.35), False)
# 사각파 느낌 (하모닉스 추가)
buzz = (np.sin(2 * np.pi * 180 * t)
        + 0.3 * np.sin(2 * np.pi * 360 * t)
        + 0.15 * np.sin(2 * np.pi * 540 * t)) * 0.4
decay = np.exp(-np.linspace(0, 4, len(t)))
wrong = buzz * decay
save_wav('wrong.wav', wrong)
ALL_NAMES.append('wrong')

# ========================================
# 3. complete — 상승 팡파레 (도레미솔도!)
# ========================================
print("🎵 3. complete (완료 팡파레)")
notes = [
    (523.25, 0.12),  # C5
    (587.33, 0.12),  # D5
    (659.25, 0.12),  # E5
    (783.99, 0.12),  # G5
    (1046.50, 0.30), # C6
]
parts = []
for freq, dur in notes:
    parts.append(generate_tone(freq, dur, 0.5))
    parts.append(silence(0.02))
complete = np.concatenate(parts)
save_wav('complete.wav', complete)
ALL_NAMES.append('complete')

# ========================================
# 4. fanfare — 빠방~! (트럼펫 느낌)
# ========================================
print("🎵 4. fanfare (빠방~!)")
t1 = np.linspace(0, 0.2, int(SAMPLE_RATE * 0.2), False)
t2 = np.linspace(0, 0.45, int(SAMPLE_RATE * 0.45), False)
# 트럼펫 = 기본음 + 강한 홀수 하모닉스
horn1 = (np.sin(2 * np.pi * 587.33 * t1)
         + 0.5 * np.sin(2 * np.pi * 587.33 * 2 * t1)
         + 0.3 * np.sin(2 * np.pi * 587.33 * 3 * t1)) * 0.4
horn2 = (np.sin(2 * np.pi * 880.00 * t2)
         + 0.5 * np.sin(2 * np.pi * 880.00 * 2 * t2)
         + 0.3 * np.sin(2 * np.pi * 880.00 * 3 * t2)) * 0.5
# 어택 + 서스테인 엔벨로프
env1 = np.minimum(np.linspace(0, 1, len(t1)) * 5, 1.0)
env2 = np.minimum(np.linspace(0, 1, len(t2)) * 5, 1.0) * np.exp(-np.linspace(0, 2, len(t2)))
fanfare = np.concatenate([horn1 * env1, silence(0.08), horn2 * env2])
save_wav('fanfare.wav', fanfare)
ALL_NAMES.append('fanfare')

# ========================================
# 5. boing — 뿡! (코믹 스프링)
# ========================================
print("🎵 5. boing (뿡!)")
boing = generate_sweep(400, 80, 0.35, 0.6, fade_ms=10)
# 스프링 느낌을 위한 진폭 변조
t_b = np.linspace(0, 0.35, len(boing), False)
boing *= (1 + 0.3 * np.sin(2 * np.pi * 25 * t_b))  # 울렁거림
boing *= np.exp(-np.linspace(0, 5, len(boing)))      # 감쇠
save_wav('boing.wav', boing)
ALL_NAMES.append('boing')

# ========================================
# 6. bark — 왕왕왕~~ (강아지)
# ========================================
print("🎵 6. bark (왕왕왕~~)")
barks = []
for i in range(3):
    # 각 "왕" = 짧은 하강 스윕 + 노이즈
    bark_tone = generate_sweep(600, 350, 0.12, 0.5, fade_ms=5)
    bark_noise = generate_noise_burst(0.12, 0.2) * 0.5
    single_bark = bark_tone + bark_noise[:len(bark_tone)]
    barks.append(single_bark)
    if i < 2:
        barks.append(silence(0.1))
bark = np.concatenate(barks)
save_wav('bark.wav', bark)
ALL_NAMES.append('bark')

# ========================================
# 7. quack — 꽥! (오리)
# ========================================
print("🎵 7. quack (꽥!)")
t_q = np.linspace(0, 0.2, int(SAMPLE_RATE * 0.2), False)
# 나잘(코 소리) 느낌 = 기본음 + 짝수 하모닉스 강조
quack_freq = 800
quack_tone = (np.sin(2 * np.pi * quack_freq * t_q)
              + 0.7 * np.sin(2 * np.pi * quack_freq * 2 * t_q)
              + 0.4 * np.sin(2 * np.pi * quack_freq * 3 * t_q)
              + 0.2 * np.sin(2 * np.pi * quack_freq * 4 * t_q)) * 0.3
# 빠른 어택 + 빠른 감쇠
env_q = np.minimum(np.linspace(0, 1, len(t_q)) * 20, 1.0)
env_q *= np.exp(-np.linspace(0, 8, len(t_q)))
quack = quack_tone * env_q
save_wav('quack.wav', quack)
ALL_NAMES.append('quack')

# ========================================
# 8. wow — 와~우! (감탄)
# ========================================
print("🎵 8. wow (와~우!)")
# "와" = 상승 스윕
wow_up = generate_sweep(300, 800, 0.3, 0.5, fade_ms=20)
# "우" = 하강 스윕 + 비브라토
t_w = np.linspace(0, 0.4, int(SAMPLE_RATE * 0.4), False)
wow_freq = np.linspace(800, 500, len(t_w)) + 30 * np.sin(2 * np.pi * 5 * t_w)
wow_phase = np.cumsum(2 * np.pi * wow_freq / SAMPLE_RATE)
wow_down = np.sin(wow_phase) * 0.5
wow_down *= np.exp(-np.linspace(0, 2, len(t_w)))
# 페이드
fade_s = int(SAMPLE_RATE * 0.02)
wow_down[-fade_s:] *= np.linspace(1, 0, fade_s)
wow = np.concatenate([wow_up, wow_down])
save_wav('wow.wav', wow)
ALL_NAMES.append('wow')

# ========================================
# 9. clap — 짝짝짝 (박수)
# ========================================
print("🎵 9. clap (짝짝짝)")
claps = []
for i in range(3):
    # 박수 = 필터링된 노이즈 버스트
    clap_noise = generate_noise_burst(0.08, 0.6, fade_ms=2)
    # 약간의 톤 섞기 (손바닥 울림)
    t_c = np.linspace(0, 0.08, len(clap_noise), False)
    clap_ring = np.sin(2 * np.pi * 2500 * t_c) * 0.1 * np.exp(-np.linspace(0, 15, len(t_c)))
    single_clap = clap_noise + clap_ring
    claps.append(single_clap)
    if i < 2:
        claps.append(silence(0.12))
clap = np.concatenate(claps)
save_wav('clap.wav', clap)
ALL_NAMES.append('clap')

# ========================================
# WAV → MP3 변환
# ========================================
print(f"\n🔄 MP3 변환 시도 ({len(ALL_NAMES)}개)...")
for name in ALL_NAMES:
    convert_wav_to_mp3(f'{name}.wav', f'{name}.mp3')

# ========================================
# 완료 요약
# ========================================
print("\n" + "=" * 50)
print("🎉 효과음 생성 완료!")
print("=" * 50)
print(f"📊 생성된 효과음: {len(ALL_NAMES)}개")
print()
print("  🎮 기본 효과음:")
print("    correct.mp3  — 정답 차임 (띵띵!)")
print("    wrong.mp3    — 오답 버저 (뿡)")
print("    complete.mp3 — 완료 팡파레 (도레미솔도)")
print()
print("  🎪 재미 효과음:")
print("    fanfare.mp3  — 빠방~! (트럼펫)")
print("    boing.mp3    — 뿡! (코믹 스프링)")
print("    bark.mp3     — 왕왕왕~~ (강아지)")
print("    quack.mp3    — 꽥! (오리)")
print("    wow.mp3      — 와~우! (감탄)")
print("    clap.mp3     — 짝짝짝 (박수)")
print()
print(f"📁 저장 위치: {os.path.abspath(AUDIO_DIR)}")
print("💡 pydub 없으면 WAV로 생성됩니다 (브라우저 재생 가능)")
print("=" * 50)
