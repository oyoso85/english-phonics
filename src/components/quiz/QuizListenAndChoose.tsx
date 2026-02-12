import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { QuizQuestion, QuizSubject } from '../../types';
import { generateQuizQuestions, getSubjectLabel } from '../../utils/quiz';
import { playAudio, stopAudio } from '../../utils/audio';
import { playCorrectSound, playWrongSound } from '../../utils/soundEffects';

export default function QuizListenAndChoose() {
  const navigate = useNavigate();
  const { category } = useParams<{ type: string; category: string }>();
  const subject = category as QuizSubject;

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedCorrect, setSelectedCorrect] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  useEffect(() => {
    if (subject) {
      setQuestions(generateQuizQuestions(subject, 5));
    }
    return () => stopAudio();
  }, [subject]);

  const currentQ = questions[currentIndex];

  const playQuestion = useCallback(async () => {
    if (!currentQ) return;
    try {
      await playAudio(currentQ.correctAnswer.audio);
      await new Promise((r) => setTimeout(r, 500));
      await playAudio(currentQ.correctAnswer.audio);
    } catch { /* ignore */ }
  }, [currentQ]);

  useEffect(() => {
    if (currentQ && !answered) {
      playQuestion();
    }
  }, [currentIndex, currentQ, answered, playQuestion]);

  if (!currentQ) return null;

  const handleChoice = async (choice: { label: string; emoji: string }) => {
    if (answered) return;

    if (choice.label === currentQ.correctAnswer.label) {
      setAnswered(true);
      setSelectedCorrect(true);
      setShowEmoji(true);
      setScore((s) => s + 1);
      playCorrectSound();

      setTimeout(() => {
        if (currentIndex + 1 < questions.length) {
          setCurrentIndex((i) => i + 1);
          setAnswered(false);
          setSelectedCorrect(false);
          setShowEmoji(false);
        } else {
          navigate(`/quiz-result`, {
            state: { score: score + 1, total: questions.length, backTo: `/quiz/listen-and-choose/categories` },
          });
        }
      }, 1200);
    } else {
      playWrongSound();
      playQuestion();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8">
      <div className="text-center mb-4">
        <p className="text-sm text-muted-foreground mb-1">
          {getSubjectLabel(subject)} · {currentIndex + 1} / {questions.length}
        </p>
        <h2 className="text-2xl font-bold text-foreground">
          소리를 듣고 맞는 것을 고르세요 🔊
        </h2>
      </div>

      <div className="my-8">
        <button
          onClick={playQuestion}
          className="w-32 h-32 rounded-3xl bg-white shadow-xl flex items-center justify-center text-6xl transition-transform hover:scale-105 active:scale-95 animate-bounce-in animate-fill-both"
        >
          {showEmoji ? currentQ.correctAnswer.emoji : '❓'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
        {currentQ.choices.map((choice, idx) => (
          <button
            key={idx}
            onClick={() => handleChoice(choice)}
            disabled={answered}
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-md text-lg font-semibold transition-all duration-200 ${
              answered && choice.label === currentQ.correctAnswer.label
                ? 'bg-green-100 text-green-700 scale-105'
                : answered && selectedCorrect
                ? 'opacity-50'
                : 'bg-white hover:bg-gray-50 hover:scale-102 active:scale-95 text-foreground'
            }`}
          >
            <span className="text-3xl">{choice.emoji}</span>
            <span>{choice.label}</span>
          </button>
        ))}
      </div>

      <button
        onClick={() => navigate(`/quiz/listen-and-choose/categories`)}
        className="mt-8 px-6 py-3 rounded-full bg-muted text-muted-foreground font-semibold hover:bg-gray-200 transition-colors"
      >
        ← 뒤로
      </button>
    </div>
  );
}
