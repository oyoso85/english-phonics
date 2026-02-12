import { useState, useCallback, useRef, useEffect } from 'react';
import type { AudioPlaybackState } from '../types';
import { playAudio, stopAudio, getAudioDuration, wait } from '../utils/audio';

interface UseAudioPlayerOptions {
  repetitions?: number;
  onComplete?: () => void;
}

interface UseAudioPlayerReturn {
  playbackState: AudioPlaybackState;
  currentRepetition: number;
  totalRepetitions: number;
  waitDuration: number;
  play: (src: string) => Promise<void>;
  stop: () => void;
  isPlaying: boolean;
  isCompleted: boolean;
  userGestureRequired: boolean;
  enableAudio: () => void;
}

export function useAudioPlayer(options: UseAudioPlayerOptions = {}): UseAudioPlayerReturn {
  const { repetitions = 3, onComplete } = options;

  const [playbackState, setPlaybackState] = useState<AudioPlaybackState>('idle');
  const [currentRepetition, setCurrentRepetition] = useState(0);
  const [waitDuration, setWaitDuration] = useState(0);
  const [userGestureRequired, setUserGestureRequired] = useState(false);
  const cancelledRef = useRef(false);
  const pendingSrcRef = useRef<string | null>(null);

  const stop = useCallback(() => {
    cancelledRef.current = true;
    stopAudio();
    setPlaybackState('idle');
    setCurrentRepetition(0);
  }, []);

  const play = useCallback(async (src: string) => {
    cancelledRef.current = false;
    setPlaybackState('playing');

    try {
      for (let i = 0; i < repetitions; i++) {
        if (cancelledRef.current) return;

        setCurrentRepetition(i + 1);
        setPlaybackState('playing');

        await playAudio(src);

        if (cancelledRef.current) return;

        if (i < repetitions - 1) {
          let ms = 2000;
          try {
            const duration = await getAudioDuration(src);
            ms = duration * 2000;
          } catch { /* fallback 2s */ }
          setWaitDuration(ms);
          setPlaybackState('waiting');
          await wait(ms);
        }
      }

      if (!cancelledRef.current) {
        setPlaybackState('completed');
        onComplete?.();
      }
    } catch (error) {
      if (!cancelledRef.current) {
        // Only show gesture prompt for actual browser autoplay restriction
        if (error instanceof DOMException && error.name === 'NotAllowedError') {
          setUserGestureRequired(true);
          pendingSrcRef.current = src;
        }
        setPlaybackState('idle');
      }
    }
  }, [repetitions, onComplete]);

  const enableAudio = useCallback(() => {
    setUserGestureRequired(false);
    const src = pendingSrcRef.current;
    pendingSrcRef.current = null;
    if (src) {
      stopAudio();
      play(src);
    }
  }, [play]);

  useEffect(() => {
    return () => {
      cancelledRef.current = true;
      stopAudio();
    };
  }, []);

  return {
    playbackState,
    currentRepetition,
    totalRepetitions: repetitions,
    waitDuration,
    play,
    stop,
    isPlaying: playbackState === 'playing' || playbackState === 'waiting',
    isCompleted: playbackState === 'completed',
    userGestureRequired,
    enableAudio,
  };
}
