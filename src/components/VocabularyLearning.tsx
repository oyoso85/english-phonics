import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Volume2, ArrowLeft, RotateCcw, Home } from 'lucide-react';
import type { VocabularyCategory } from '../types';
import { loadVocabularyByCategory, getVocabularyCategoryLabel } from '../utils/data';
import { shuffle } from '../utils/shuffle';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import AudioIndicator from './AudioIndicator';
import AudioGesturePrompt from './AudioGesturePrompt';

const categoryBgMap: Record<VocabularyCategory, string> = {
  'food-ingredients': 'bg-cat-red',
  'cooking': 'bg-cat-yellow',
  'animals': 'bg-cat-green',
  'vehicles': 'bg-cat-blue',
  'body-parts': 'bg-cat-purple',
};

const categoryColorMap: Record<VocabularyCategory, string> = {
  'food-ingredients': 'text-red-600',
  'cooking': 'text-yellow-600',
  'animals': 'text-green-600',
  'vehicles': 'text-blue-600',
  'body-parts': 'text-purple-600',
};

const categoryBadgeBg: Record<VocabularyCategory, string> = {
  'food-ingredients': 'bg-cat-red text-red-600',
  'cooking': 'bg-cat-yellow text-yellow-600',
  'animals': 'bg-cat-green text-green-600',
  'vehicles': 'bg-cat-blue text-blue-600',
  'body-parts': 'bg-cat-purple text-purple-600',
};

export default function VocabularyLearning() {
  const navigate = useNavigate();
  const { category } = useParams<{ category: string }>();
  const vocabCategory = category as VocabularyCategory;

  const words = useMemo(() => {
    const loaded = loadVocabularyByCategory(vocabCategory);
    return shuffle(loaded);
  }, [vocabCategory]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const current = words[currentIndex];

  const { playbackState, currentRepetition, totalRepetitions, play, stop, isPlaying, isCompleted, userGestureRequired, enableAudio } =
    useAudioPlayer({ repetitions: 3 });

  useEffect(() => {
    if (current) {
      play(current.audio);
    }
    return () => stop();
  }, [currentIndex]);

  const navigateWord = (direction: 'prev' | 'next') => {
    if (isAnimating) return;
    stop();
    setIsAnimating(true);
    setTimeout(() => {
      if (direction === 'next' && currentIndex < words.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else if (direction === 'prev' && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
      setIsAnimating(false);
    }, 200);
  };

  const handleReplay = () => {
    if (current) play(current.audio);
  };

  const isLastWord = currentIndex === words.length - 1;
  const isFinished = isLastWord && isCompleted;

  if (!words.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">단어를 찾을 수 없어요</p>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-card rounded-3xl shadow-2xl p-8 md:p-12 text-center max-w-md w-full animate-bounce-in animate-fill-both">
          <div className="text-6xl mb-6 animate-star-burst">🌟</div>
          <h2 className="text-3xl font-bold text-foreground mb-2">훌륭해요!</h2>
          <p className="text-muted-foreground mb-8">
            {getVocabularyCategoryLabel(vocabCategory)} 단어를 모두 배웠어요!
          </p>
          <div className="flex gap-4 w-full">
            <button
              onClick={() => navigate('/vocabulary-categories')}
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-2xl transition-all hover:scale-105 active:scale-95"
            >
              <RotateCcw className="w-5 h-5" />
              다른 카테고리
            </button>
            <button
              onClick={() => navigate('/select-category')}
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-muted hover:bg-muted/80 text-foreground font-bold rounded-2xl transition-all hover:scale-105 active:scale-95"
            >
              <Home className="w-5 h-5" />
              홈으로
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-6">
      {userGestureRequired && <AudioGesturePrompt onActivate={enableAudio} />}

      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-2xl mb-4">
        <button
          onClick={() => { stop(); navigate('/vocabulary-categories'); }}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors px-4 py-3 rounded-2xl hover:bg-muted active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-lg font-medium">돌아가기</span>
        </button>
        <span className={`text-lg font-medium px-4 py-2 rounded-full ${categoryBadgeBg[vocabCategory]}`}>
          {getVocabularyCategoryLabel(vocabCategory)}
        </span>
        <span className="text-lg font-medium text-muted-foreground px-4 py-2">
          {currentIndex + 1}/{words.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-2xl h-2 bg-muted rounded-full mb-6 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out bg-primary"
          style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
        />
      </div>

      {/* Flashcard */}
      <div className="flex-1 flex items-center justify-center w-full max-w-2xl">
        <div className="relative w-full">
          {/* Left Arrow */}
          <button
            onClick={() => navigateWord('prev')}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-card shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-transform disabled:opacity-30"
          >
            <ChevronLeft className="w-7 h-7 text-muted-foreground" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => navigateWord('next')}
            disabled={isLastWord}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-card shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-transform disabled:opacity-30"
          >
            <ChevronRight className="w-7 h-7 text-muted-foreground" />
          </button>

          {/* Card */}
          <div
            className={`bg-card rounded-3xl shadow-xl p-8 mx-10 flex flex-col items-center transition-all duration-200 ${
              isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            {/* Emoji */}
            <div className={`w-48 h-48 md:w-56 md:h-56 rounded-3xl ${categoryBgMap[vocabCategory]} flex items-center justify-center mb-6 shadow-md`}>
              <span className="text-8xl md:text-9xl">{current.emoji}</span>
            </div>

            {/* Word */}
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${categoryColorMap[vocabCategory]}`}>
              {current.spelling}
            </h2>

            {/* Audio Indicator */}
            <div className="flex justify-center mb-6">
              <AudioIndicator
                state={playbackState}
                currentRepetition={currentRepetition}
                totalRepetitions={totalRepetitions}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 w-full">
              <button
                onClick={handleReplay}
                disabled={isPlaying}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-muted hover:bg-muted/80 text-foreground font-bold rounded-2xl disabled:opacity-40 transition-all hover:scale-105 active:scale-95"
              >
                <Volume2 className="w-5 h-5" />
                다시 듣기
              </button>
              <button
                onClick={() => navigateWord('next')}
                disabled={isPlaying || isLastWord}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-2xl disabled:opacity-40 transition-all hover:scale-105 active:scale-95"
              >
                다음
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
