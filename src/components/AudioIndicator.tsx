import { Volume2, Loader2, CheckCircle2 } from 'lucide-react';
import type { AudioPlaybackState } from '../types';

interface AudioIndicatorProps {
  state: AudioPlaybackState;
  currentRepetition: number;
  totalRepetitions: number;
}

export default function AudioIndicator({
  state,
  currentRepetition,
  totalRepetitions,
}: AudioIndicatorProps) {
  if (state === 'idle') return null;

  return (
    <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-card shadow-md border border-muted">
      {state === 'playing' && (
        <Volume2 className="w-5 h-5 text-primary animate-wiggle" />
      )}
      {state === 'waiting' && (
        <Loader2 className="w-5 h-5 text-primary animate-spin" />
      )}
      {state === 'completed' && (
        <CheckCircle2 className="w-5 h-5 text-green-500" />
      )}
      <span className="text-sm font-medium text-muted-foreground">
        {state === 'playing' && `재생 중 ${currentRepetition}/${totalRepetitions}`}
        {state === 'waiting' && `대기 중...`}
        {state === 'completed' && '완료!'}
      </span>
    </div>
  );
}
