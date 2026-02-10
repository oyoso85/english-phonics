import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadConversations } from '../utils/data';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import AudioIndicator from './AudioIndicator';
import AudioGesturePrompt from './AudioGesturePrompt';

export default function ConversationLearning() {
  const navigate = useNavigate();
  const conversations = loadConversations();
  const [setIndex, setSetIndex] = useState(0);
  const [sentenceIndex, setSentenceIndex] = useState(0);

  const currentSet = conversations[setIndex];
  const currentSentence = currentSet?.sentences[sentenceIndex];
  const visibleSentences = currentSet?.sentences.slice(0, sentenceIndex + 1) ?? [];

  const { playbackState, currentRepetition, totalRepetitions, play, stop, isPlaying, isCompleted, userGestureRequired, enableAudio } =
    useAudioPlayer({
      repetitions: 1,
      onComplete: () => {
        // Auto-advance to next sentence after delay
        if (sentenceIndex < currentSet.sentences.length - 1) {
          setTimeout(() => {
            setSentenceIndex((prev) => prev + 1);
          }, 3000);
        }
      },
    });

  useEffect(() => {
    if (currentSentence) {
      play(currentSentence.audio);
    }
    return () => stop();
  }, [setIndex, sentenceIndex]);

  const handleNextSet = () => {
    stop();
    if (setIndex < conversations.length - 1) {
      setSetIndex(setIndex + 1);
      setSentenceIndex(0);
    }
  };

  const handleReplay = () => {
    if (currentSentence) play(currentSentence.audio);
  };

  const isLastSentence = sentenceIndex === (currentSet?.sentences.length ?? 0) - 1;
  const isLastSet = setIndex === conversations.length - 1;
  const isSetCompleted = isLastSentence && isCompleted;
  const isAllFinished = isLastSet && isSetCompleted;

  if (isAllFinished) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center max-w-md">
          <div className="text-6xl mb-4">🎊</div>
          <h2 className="text-2xl font-bold text-purple-700 mb-2">대단해요!</h2>
          <p className="text-gray-500 mb-6">모든 대화를 배웠어요!</p>
          <button
            onClick={() => navigate('/select-category')}
            className="w-full py-3 px-6 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-2xl"
          >
            홈으로
          </button>
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
          <span className="text-sm font-medium text-gray-500">
            대화 {setIndex + 1} / {conversations.length}
          </span>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6">
          <h2 className="text-xl font-bold text-purple-700 mb-1 text-center">
            💬 {currentSet.title}
          </h2>
          <p className="text-xs text-gray-400 text-center mb-4">
            문장 {sentenceIndex + 1} / {currentSet.sentences.length}
          </p>

          <div className="space-y-3 mb-6 min-h-[200px]">
            {visibleSentences.map((sentence, i) => (
              <div
                key={i}
                className={`p-4 rounded-2xl transition-all ${
                  i === sentenceIndex
                    ? 'bg-purple-50 border-2 border-purple-300 shadow-sm'
                    : 'bg-gray-50'
                }`}
              >
                <p className={`text-lg ${i === sentenceIndex ? 'text-purple-700 font-bold' : 'text-gray-500'}`}>
                  {sentence.text}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mb-4">
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
            {isSetCompleted && !isLastSet && (
              <button
                onClick={handleNextSet}
                className="flex-1 py-3 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-2xl"
              >
                다음 대화 &#8594;
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
