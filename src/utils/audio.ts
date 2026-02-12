let currentAudio: HTMLAudioElement | null = null;
let currentReject: (() => void) | null = null;

export function playAudio(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    stopAudio();
    currentAudio = new Audio(src);
    currentReject = () => reject(new Error('Audio stopped'));
    currentAudio.addEventListener('ended', () => {
      currentReject = null;
      resolve();
    });
    currentAudio.addEventListener('error', () => {
      currentReject = null;
      reject(new Error(`Failed to load audio: ${src}`));
    });
    currentAudio.play().catch((err) => {
      currentReject = null;
      reject(err);
    });
  });
}

export function stopAudio(): void {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  if (currentReject) {
    currentReject();
    currentReject = null;
  }
  speechSynthesis.cancel();
}

export function speakText(text: string, rate = 0.8): Promise<void> {
  return new Promise((resolve, reject) => {
    stopAudio();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = rate;
    currentReject = () => reject(new Error('Audio stopped'));
    utterance.onend = () => {
      currentReject = null;
      resolve();
    };
    utterance.onerror = () => {
      currentReject = null;
      reject(new Error(`Failed to speak: ${text}`));
    };
    speechSynthesis.speak(utterance);
  });
}

export function getAudioDuration(src: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const audio = new Audio(src);
    audio.addEventListener('loadedmetadata', () => resolve(audio.duration));
    audio.addEventListener('error', () => reject(new Error(`Failed to load: ${src}`)));
  });
}

export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function playWithRepeat(
  src: string,
  repetitions: number = 3,
  onRepetitionChange?: (current: number) => void
): Promise<void> {
  for (let i = 0; i < repetitions; i++) {
    onRepetitionChange?.(i + 1);
    await playAudio(src);
    if (i < repetitions - 1) {
      const duration = await getAudioDuration(src);
      await wait(duration * 2000);
    }
  }
}
