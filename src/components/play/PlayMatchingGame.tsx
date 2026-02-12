import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { QuizSubject } from '../../types';
import { getSubjectData, getSubjectLabel } from '../../utils/quiz';
import { shuffle } from '../../utils/shuffle';
import { playCorrectSound, playWrongSound } from '../../utils/soundEffects';

interface Card {
  id: string;
  pairId: string;
  content: string;
  type: 'emoji' | 'text';
  status: 'hidden' | 'revealed' | 'matched';
}

export default function PlayMatchingGame() {
  const navigate = useNavigate();
  const { category } = useParams<{ type: string; category: string }>();
  const subject = category as QuizSubject;

  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<string[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [matchedCount, setMatchedCount] = useState(0);
  const [checking, setChecking] = useState(false);
  const totalPairs = 6;

  useEffect(() => {
    if (!subject) return;
    const items = getSubjectData(subject);
    const selected = shuffle(items).slice(0, totalPairs);

    let cardPairs: Card[];
    if (subject === 'alphabet') {
      // Uppercase ↔ Lowercase
      cardPairs = selected.flatMap((item, idx) => {
        const word = item.word;
        return [
          { id: `a-${idx}`, pairId: `p-${idx}`, content: word[0].toUpperCase(), type: 'text' as const, status: 'hidden' as const },
          { id: `b-${idx}`, pairId: `p-${idx}`, content: word[0].toLowerCase(), type: 'text' as const, status: 'hidden' as const },
        ];
      });
    } else {
      // Emoji ↔ Word
      cardPairs = selected.flatMap((item, idx) => [
        { id: `a-${idx}`, pairId: `p-${idx}`, content: item.emoji, type: 'emoji' as const, status: 'hidden' as const },
        { id: `b-${idx}`, pairId: `p-${idx}`, content: item.label, type: 'text' as const, status: 'hidden' as const },
      ]);
    }

    setCards(shuffle(cardPairs));
  }, [subject]);

  const handleFlip = useCallback((cardId: string) => {
    if (checking) return;
    const card = cards.find((c) => c.id === cardId);
    if (!card || card.status !== 'hidden' || flipped.includes(cardId)) return;

    const newFlipped = [...flipped, cardId];
    setFlipped(newFlipped);

    // Reveal card
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, status: 'revealed' } : c))
    );

    if (newFlipped.length === 2) {
      setChecking(true);
      setAttempts((a) => a + 1);

      const [firstId, secondId] = newFlipped;
      const first = cards.find((c) => c.id === firstId)!;
      const second = cards.find((c) => c.id === secondId)!;

      setTimeout(() => {
        if (first.pairId === second.pairId) {
          // Match!
          playCorrectSound();
          setCards((prev) =>
            prev.map((c) =>
              c.pairId === first.pairId ? { ...c, status: 'matched' } : c
            )
          );
          setMatchedCount((m) => m + 1);
        } else {
          // No match
          playWrongSound();
          setCards((prev) =>
            prev.map((c) =>
              newFlipped.includes(c.id) ? { ...c, status: 'hidden' } : c
            )
          );
        }
        setFlipped([]);
        setChecking(false);
      }, 800);
    }
  }, [cards, flipped, checking]);

  useEffect(() => {
    if (matchedCount === totalPairs && matchedCount > 0) {
      setTimeout(() => {
        navigate('/quiz-result', {
          state: { score: totalPairs, total: totalPairs, attempts, backTo: `/play/matching/categories` },
        });
      }, 500);
    }
  }, [matchedCount, totalPairs, attempts, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <div className="text-center mb-6">
        <p className="text-sm text-muted-foreground mb-1">
          {getSubjectLabel(subject)} · 매칭 게임
        </p>
        <h2 className="text-2xl font-bold text-foreground">
          짝을 맞춰보세요! 🃏
        </h2>
        <p className="text-muted-foreground mt-1">시도: {attempts}번 · {matchedCount}/{totalPairs} 쌍</p>
      </div>

      <div className="grid grid-cols-4 gap-3 w-full max-w-md">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleFlip(card.id)}
            disabled={card.status === 'matched'}
            className={`aspect-square rounded-2xl shadow-md flex items-center justify-center font-bold transition-all duration-300 ${
              card.status === 'hidden'
                ? 'bg-primary text-primary-foreground hover:scale-105 active:scale-95 text-2xl cursor-pointer'
                : card.status === 'matched'
                ? 'bg-green-100 text-green-700 scale-95 opacity-70'
                : 'bg-white text-foreground scale-105 shadow-lg'
            } ${card.type === 'emoji' && card.status !== 'hidden' ? 'text-3xl' : 'text-sm sm:text-base'}`}
          >
            {card.status === 'hidden' ? '?' : card.content}
          </button>
        ))}
      </div>

      <button
        onClick={() => navigate('/play/matching/categories')}
        className="mt-8 px-6 py-3 rounded-full bg-muted text-muted-foreground font-semibold hover:bg-gray-200 transition-colors"
      >
        ← 뒤로
      </button>
    </div>
  );
}
