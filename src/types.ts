// 알파벳 데이터 타입
export interface AlphabetData {
  letter: string;
  uppercase: string;
  lowercase: string;
  exampleWord: string;
  exampleImage: string;
  audioFile: string;
}

// 단어 데이터 타입
export interface VocabularyWord {
  id: string;
  spelling: string;
  image: string;
  audio: string;
}

export type VocabularyCategory =
  | 'food-ingredients'
  | 'cooking'
  | 'animals'
  | 'vehicles'
  | 'body-parts';

export interface VocabularyData {
  categories: Record<VocabularyCategory, VocabularyWord[]>;
}

// 대화 데이터 타입
export interface ConversationSentence {
  text: string;
  audio: string;
}

export interface ConversationSet {
  id: string;
  title: string;
  sentences: ConversationSentence[];
}

// 오디오 재생 상태
export type AudioPlaybackState = 'idle' | 'playing' | 'waiting' | 'completed';

export interface AudioPlayerState {
  state: AudioPlaybackState;
  currentRepetition: number;
  totalRepetitions: number;
}

// 사용자 프로필
export interface UserProfile {
  nickname: string;
  lastVisited: string;
}

// 학습 카테고리
export type LearningCategory = 'alphabet' | 'vocabulary' | 'conversation';

// 앱 전역 상태
export interface AppState {
  user: UserProfile | null;
  currentCategory: LearningCategory | null;
  selectedVocabularyCategory: VocabularyCategory | null;
}
