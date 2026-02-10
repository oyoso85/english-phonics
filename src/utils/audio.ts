let currentAudio: HTMLAudioElement | null = null;

export function playAudio(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    stopAudio();
    currentAudio = new Audio(src);
    currentAudio.addEventListener('ended', () => resolve());
    currentAudio.addEventListener('error', () =>
      reject(new Error(`Failed to load audio: ${src}`))
    );
    currentAudio.play().catch(reject);
  });
}

export function stopAudio(): void {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
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
