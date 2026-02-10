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
    <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/80 shadow-sm">
      {state === 'playing' && (
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-4 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-1.5 h-5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-1.5 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      )}
      {state === 'waiting' && (
        <div className="w-5 h-5 border-2 border-purple-300 border-t-purple-600 rounded-full animate-spin" />
      )}
      {state === 'completed' && (
        <span className="text-green-500 text-lg">&#10003;</span>
      )}
      <span className="text-sm font-medium text-gray-600">
        {state === 'playing' && `재생 중 ${currentRepetition}/${totalRepetitions}`}
        {state === 'waiting' && `대기 중...`}
        {state === 'completed' && '완료!'}
      </span>
    </div>
  );
}
