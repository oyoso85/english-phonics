import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { VocabularyCategory } from '../types';
import { loadVocabularyByCategory, getVocabularyCategoryLabel } from '../utils/data';
import { shuffle } from '../utils/shuffle';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import AudioIndicator from './AudioIndicator';
import AudioGesturePrompt from './AudioGesturePrompt';

export default function VocabularyLearning() {
  const navigate = useNavigate();
  const { category } = useParams<{ category: string }>();
  const vocabCategory = category as VocabularyCategory;

  const words = useMemo(() => {
    const loaded = loadVocabularyByCategory(vocabCategory);
    return shuffle(loaded);
  }, [vocabCategory]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const current = words[currentIndex];

  const { playbackState, currentRepetition, totalRepetitions, play, stop, isPlaying, isCompleted, userGestureRequired, enableAudio } =
    useAudioPlayer({ repetitions: 3 });

  useEffect(() => {
    if (current) {
      play(current.audio);
    }
    return () => stop();
  }, [currentIndex]);

  const handleNext = () => {
    stop();
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleReplay = () => {
    if (current) play(current.audio);
  };

  const isLastWord = currentIndex === words.length - 1;
  const isFinished = isLastWord && isCompleted;

  if (!words.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">단어를 찾을 수 없어요</p>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center max-w-md">
          <div className="text-6xl mb-4">🌟</div>
          <h2 className="text-2xl font-bold text-purple-700 mb-2">훌륭해요!</h2>
          <p className="text-gray-500 mb-6">
            {getVocabularyCategoryLabel(vocabCategory)} 단어를 모두 배웠어요!
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate('/vocabulary-categories')}
              className="py-3 px-6 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-2xl"
            >
              다른 카테고리 선택
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
            onClick={() => { stop(); navigate('/vocabulary-categories'); }}
            className="p-2 rounded-xl bg-white/80 hover:bg-white shadow-sm text-purple-600 text-xl"
          >
            &#8592;
          </button>
          <span className="text-sm font-medium text-gray-500">
            {getVocabularyCategoryLabel(vocabCategory)}
          </span>
          <span className="text-sm text-gray-500">
            {currentIndex + 1} / {words.length}
          </span>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <img
              src={current.image}
              alt={current.spelling}
              className="w-40 h-40 mx-auto object-contain"
            />
          </div>

          <h2 className="text-4xl font-bold text-purple-700 mb-4">{current.spelling}</h2>

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
              className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-2xl disabled:opacity-40"
            >
              🔄 다시 듣기
            </button>
            <button
              onClick={handleNext}
              disabled={isPlaying}
              className="flex-1 py-3 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-2xl disabled:opacity-40"
            >
              다음 &#8594;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
