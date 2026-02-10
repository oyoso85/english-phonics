import type {
  AlphabetData,
  VocabularyData,
  VocabularyCategory,
  VocabularyWord,
  ConversationSet,
} from '../types';
import alphabetsJson from '../data/alphabets.json';
import vocabularyJson from '../data/vocabulary.json';
import conversationsJson from '../data/conversations.json';

const base = import.meta.env.BASE_URL;

function assetUrl(path: string): string {
  return base + path;
}

export function loadAlphabets(): AlphabetData[] {
  return (alphabetsJson as AlphabetData[]).map((a) => ({
    ...a,
    exampleImage: assetUrl(a.exampleImage),
    audioFile: assetUrl(a.audioFile),
  }));
}

export function loadVocabulary(): VocabularyData {
  const data = vocabularyJson as VocabularyData;
  const categories = Object.fromEntries(
    Object.entries(data.categories).map(([key, words]) => [
      key,
      words.map((w: VocabularyWord) => ({
        ...w,
        image: assetUrl(w.image),
        audio: assetUrl(w.audio),
      })),
    ])
  ) as VocabularyData['categories'];
  return { categories };
}

export function loadVocabularyByCategory(category: VocabularyCategory): VocabularyWord[] {
  const data = loadVocabulary();
  return data.categories[category] ?? [];
}

export function loadConversations(): ConversationSet[] {
  return (conversationsJson as ConversationSet[]).map((set) => ({
    ...set,
    sentences: set.sentences.map((s) => ({
      ...s,
      audio: assetUrl(s.audio),
    })),
  }));
}

export function getVocabularyCategoryLabel(category: VocabularyCategory): string {
  const labels: Record<VocabularyCategory, string> = {
    'food-ingredients': 'Food & Ingredients',
    'cooking': 'Cooking',
    'animals': 'Animals',
    'vehicles': 'Vehicles',
    'body-parts': 'Body Parts',
  };
  return labels[category];
}
