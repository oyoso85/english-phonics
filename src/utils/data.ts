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

export function loadAlphabets(): AlphabetData[] {
  return alphabetsJson as AlphabetData[];
}

export function loadVocabulary(): VocabularyData {
  return vocabularyJson as VocabularyData;
}

export function loadVocabularyByCategory(category: VocabularyCategory): VocabularyWord[] {
  const data = loadVocabulary();
  return data.categories[category] ?? [];
}

export function loadConversations(): ConversationSet[] {
  return conversationsJson as ConversationSet[];
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
