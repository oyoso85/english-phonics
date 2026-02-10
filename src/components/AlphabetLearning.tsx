import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadAlphabets } from '../utils/data';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import AudioIndicator from './AudioIndicator';
import AudioGesturePrompt from './AudioGesturePrompt';

export default function AlphabetLearning() {
  const navigate = useNavigate();
  const alphabets = loadAlphabets();
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = alphabets[currentIndex];

  const { playbackState, currentRepetition, totalRepetitions, play, stop, isPlaying, isCompleted, userGestureRequired, enableAudio } =
    useAudioPlayer({
      repetitions: 3,
      onComplete: () => {},
    });

  useEffect(() => {
    if (current) {
      play(current.audioFile);
    }
    return () => stop();
  }, [currentIndex]);

  const handleNext = () => {
    stop();
    if (currentIndex < alphabets.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleReplay = () => {
    if (current) play(current.audioFile);
  };

  const isLastAlphabet = currentIndex === alphabets.length - 1;
  const isFinished = isLastAlphabet && isCompleted;

  if (isFinished) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center max-w-md">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-purple-700 mb-2">잘했어요!</h2>
          <p className="text-gray-500 mb-6">알파벳을 모두 배웠어요!</p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => { setCurrentIndex(0); }}
              className="py-3 px-6 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-2xl"
            >
              다시 배우기
            </button>
            <button
              onClick={() => navigate('/select-category')}
              className="py-3 px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-2xl"
            >
              홈으로
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      {userGestureRequired && <AudioGesturePrompt onActivate={enableAudio} />}
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => { stop(); navigate('/select-category'); }}
            className="p-2 rounded-xl bg-white/80 hover:bg-white shadow-sm text-purple-600 text-xl"
          >
            &#8592;
          </button>
          <span className="text-sm text-gray-500 font-medium">
            {currentIndex + 1} / {alphabets.length}
          </span>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
          <div className="flex justify-center gap-6 mb-6">
            <span className="text-8xl font-bold text-purple-600">{current.uppercase}</span>
            <span className="text-8xl font-bold text-purple-400">{current.lowercase}</span>
          </div>

          <div className="mb-6">
            <img
              src={current.exampleImage}
              alt={current.exampleWord}
              className="w-32 h-32 mx-auto object-contain"
            />
            <p className="text-2xl font-bold text-gray-700 mt-2">{current.exampleWord}</p>
          </div>

          <div className="flex justify-center mb-6">
            <AudioIndicator
              state={playbackState}
              currentRepetition={currentRepetition}
              totalRepetitions={totalRepetitions}
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleReplay}
              disabled={isPlaying}
              className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-2xl disabled:opacity-40 transition-colors"
            >
              🔄 다시 듣기
            </button>
            <button
              onClick={handleNext}
              disabled={isPlaying}
              className="flex-1 py-3 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-2xl disabled:opacity-40 transition-colors"
            >
              다음 &#8594;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
