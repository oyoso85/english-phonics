import type { AlphabetData, VocabularyWord, QuizQuestion, QuizSubject } from '../types';
import { loadAlphabets, loadVocabularyByCategory } from './data';
import { shuffle } from './shuffle';
import type { VocabularyCategory } from '../types';

function pickRandom<T>(arr: T[], count: number, exclude?: T[]): T[] {
  let pool = exclude ? arr.filter((item) => !exclude.includes(item)) : [...arr];
  return shuffle(pool).slice(0, count);
}

function alphabetToQuizItem(a: AlphabetData) {
  return { label: `${a.uppercase} ${a.lowercase}`, emoji: a.emoji, audio: a.audioFile, word: a.exampleWord };
}

function vocabToQuizItem(w: VocabularyWord) {
  return { label: w.spelling, emoji: w.emoji, audio: w.audio, word: w.spelling };
}

export function getSubjectData(subject: QuizSubject) {
  if (subject === 'alphabet') {
    const data = loadAlphabets();
    return data.map(alphabetToQuizItem);
  }
  const data = loadVocabularyByCategory(subject as VocabularyCategory);
  return data.map(vocabToQuizItem);
}

export function generateQuizQuestions(
  subject: QuizSubject,
  count: number = 5
): QuizQuestion[] {
  const items = getSubjectData(subject);
  const selected = shuffle(items).slice(0, Math.min(count, items.length));

  return selected.map((item, idx) => {
    const others = pickRandom(items, 2, [item]);
    const choices = shuffle([
      { label: item.label, emoji: item.emoji },
      ...others.map((o) => ({ label: o.label, emoji: o.emoji })),
    ]);

    return {
      id: `q-${idx}`,
      correctAnswer: { label: item.label, emoji: item.emoji, audio: item.audio },
      choices,
      displayEmoji: item.emoji,
      displayWord: item.word,
    };
  });
}

export function generateSpellingQuestions(
  subject: QuizSubject,
  count: number = 5
): QuizQuestion[] {
  const items = getSubjectData(subject);
  // Filter to words with at least 3 letters for spelling
  const eligible = items.filter((item) => item.word.length >= 3);
  const selected = shuffle(eligible).slice(0, Math.min(count, eligible.length));

  return selected.map((item, idx) => {
    const word = item.word;
    // Pick a random letter index to blank out (not first letter)
    const missingIndex = 1 + Math.floor(Math.random() * (word.length - 1));
    const correctLetter = word[missingIndex].toLowerCase();

    // Generate wrong letter choices
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const wrongLetters = shuffle(
      alphabet.split('').filter((l) => l !== correctLetter)
    ).slice(0, 3);
    const letterChoices = shuffle([correctLetter, ...wrongLetters]);

    return {
      id: `sp-${idx}`,
      correctAnswer: { label: item.label, emoji: item.emoji, audio: item.audio },
      choices: [],
      displayEmoji: item.emoji,
      displayWord: word,
      missingLetterIndex: missingIndex,
      letterChoices,
    };
  });
}

export function generateFirstSoundQuestions(
  subject: QuizSubject,
  count: number = 5
): QuizQuestion[] {
  const allAlphabets = loadAlphabets();
  const items = getSubjectData(subject);
  const selected = shuffle(items).slice(0, Math.min(count, items.length));

  return selected.map((item, idx) => {
    const firstLetter = item.word[0].toUpperCase();
    const correctAlpha = allAlphabets.find((a) => a.uppercase === firstLetter);
    const wrongAlphas = pickRandom(
      allAlphabets.filter((a) => a.uppercase !== firstLetter),
      2
    );
    const choices = shuffle([
      { label: firstLetter, emoji: firstLetter },
      ...wrongAlphas.map((a) => ({ label: a.uppercase, emoji: a.uppercase })),
    ]);

    return {
      id: `fs-${idx}`,
      correctAnswer: {
        label: firstLetter,
        emoji: firstLetter,
        audio: correctAlpha?.audioFile ?? '',
      },
      choices,
      displayEmoji: item.emoji,
      displayWord: item.word,
    };
  });
}

export function getSubjectLabel(subject: QuizSubject): string {
  const labels: Record<string, string> = {
    alphabet: '알파벳',
    'food-ingredients': '음식 재료',
    cooking: '요리',
    animals: '동물',
    vehicles: '탈것',
    'body-parts': '몸',
  };
  return labels[subject] ?? subject;
}

export const QUIZ_SUBJECTS: { id: QuizSubject; label: string; emoji: string }[] = [
  { id: 'alphabet', label: '알파벳', emoji: '🔤' },
  { id: 'food-ingredients', label: '음식 재료', emoji: '🍎' },
  { id: 'cooking', label: '요리', emoji: '🍳' },
  { id: 'animals', label: '동물', emoji: '🐶' },
  { id: 'vehicles', label: '탈것', emoji: '🚗' },
  { id: 'body-parts', label: '몸', emoji: '🖐️' },
];
