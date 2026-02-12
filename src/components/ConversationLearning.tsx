import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Volume2, ChevronRight, Home, MessageCircle } from 'lucide-react';
import { loadConversations } from '../utils/data';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import AudioIndicator from './AudioIndicator';
import AudioGesturePrompt from './AudioGesturePrompt';

export default function ConversationLearning() {
  const navigate = useNavigate();
  const location = useLocation();
  const conversations = loadConversations();
  const startSetIndex = (location.state as { startSetIndex?: number })?.startSetIndex ?? 0;
  const [setIndex, setSetIndex] = useState(startSetIndex);
  const [sentenceIndex, setSentenceIndex] = useState(0);

  const currentSet = conversations[setIndex];
  const currentSentence = currentSet?.sentences[sentenceIndex];
  const visibleSentences = currentSet?.sentences.slice(0, sentenceIndex + 1) ?? [];

  const { playbackState, currentRepetition, totalRepetitions, waitDuration, play, stop, isPlaying, isCompleted, userGestureRequired, enableAudio } =
    useAudioPlayer({
      repetitions: 1,
      onComplete: () => {
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

  const handleReplay = () => {
    if (currentSentence) play(currentSentence.audio);
  };

  const isLastSentence = sentenceIndex === (currentSet?.sentences.length ?? 0) - 1;
  const isSetCompleted = isLastSentence && isCompleted;

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-6">
      {userGestureRequired && <AudioGesturePrompt onActivate={enableAudio} />}

      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-2xl mb-4">
        <button
          onClick={() => { stop(); navigate('/conversation-cards'); }}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors px-4 py-3 rounded-2xl hover:bg-muted active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-lg font-medium">돌아가기</span>
        </button>
        <span className="text-lg font-medium px-4 py-2 rounded-full bg-cat-orange text-orange-600">
          <MessageCircle className="w-4 h-4 inline mr-1" />
          대화
        </span>
        <span className="text-lg font-medium text-muted-foreground px-4 py-2">
          {setIndex + 1}/{conversations.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-2xl h-2 bg-muted rounded-full mb-6 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out bg-orange-500"
          style={{ width: `${((sentenceIndex + 1) / (currentSet?.sentences.length ?? 1)) * 100}%` }}
        />
      </div>

      {/* Main Card */}
      <div className="w-full max-w-2xl">
        <div className="bg-card rounded-3xl shadow-xl p-6 animate-fade-in">
          <h2 className="text-xl font-bold text-foreground mb-1 text-center">
            {currentSet.title}
          </h2>
          <p className="text-xs text-muted-foreground text-center mb-4">
            문장 {sentenceIndex + 1} / {currentSet.sentences.length}
          </p>

          <div className="space-y-3 mb-6 min-h-[200px]">
            {visibleSentences.map((sentence, i) => (
              <div
                key={i}
                className={`p-4 rounded-2xl transition-all ${
                  i === sentenceIndex
                    ? 'bg-primary/10 border-2 border-primary shadow-sm animate-pop'
                    : 'bg-muted'
                }`}
              >
                <p className={`text-lg ${i === sentenceIndex ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
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
              waitDuration={waitDuration}
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleReplay}
              disabled={isPlaying}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-muted hover:bg-muted/80 text-foreground font-bold rounded-2xl disabled:opacity-40 transition-all hover:scale-105 active:scale-95"
            >
              <Volume2 className="w-5 h-5" />
              다시 듣기
            </button>
            {isSetCompleted && (
              <button
                onClick={() => { stop(); navigate('/conversation-cards'); }}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-2xl transition-all hover:scale-105 active:scale-95"
              >
                <Home className="w-5 h-5" />
                목록으로
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
