import { Routes, Route, Navigate } from 'react-router-dom'
import NicknameInput from './components/NicknameInput'
import CategorySelection from './components/CategorySelection'
import VocabularyCategories from './components/VocabularyCategories'
import VocabularyWordCards from './components/VocabularyWordCards'
import AlphabetCards from './components/AlphabetCards'
import AlphabetLearning from './components/AlphabetLearning'
import VocabularyLearning from './components/VocabularyLearning'
import ConversationCards from './components/ConversationCards'
import ConversationLearning from './components/ConversationLearning'
import QuizTypes from './components/quiz/QuizTypes'
import QuizCategories from './components/quiz/QuizCategories'
import QuizListenAndChoose from './components/quiz/QuizListenAndChoose'
import QuizImageToWord from './components/quiz/QuizImageToWord'
import QuizFirstSound from './components/quiz/QuizFirstSound'
import QuizSpelling from './components/quiz/QuizSpelling'
import QuizResult from './components/shared/QuizResult'
import PlayTypes from './components/play/PlayTypes'
import PlayCategories from './components/play/PlayCategories'
import PlayMatchingGame from './components/play/PlayMatchingGame'
import PlayDragAndDrop from './components/play/PlayDragAndDrop'

export const AppRoutes = () => {
  return (
    <Routes>
      {/* 홈 - 닉네임 입력 */}
      <Route path="/" element={<NicknameInput />} />

      {/* 카테고리 선택 */}
      <Route path="/select-category" element={<CategorySelection />} />

      {/* 단어 하위 카테고리 선택 */}
      <Route path="/vocabulary-categories" element={<VocabularyCategories />} />

      {/* 단어 카드 선택 */}
      <Route path="/vocabulary/:category/cards" element={<VocabularyWordCards />} />

      {/* 알파벳 카드 선택 */}
      <Route path="/alphabet-cards" element={<AlphabetCards />} />

      {/* 알파벳 학습 */}
      <Route path="/alphabet" element={<AlphabetLearning />} />

      {/* 단어 학습 (카테고리별) */}
      <Route path="/vocabulary/:category" element={<VocabularyLearning />} />

      {/* 대화 카드 선택 */}
      <Route path="/conversation-cards" element={<ConversationCards />} />

      {/* 대화 학습 */}
      <Route path="/conversation" element={<ConversationLearning />} />

      {/* 퀴즈 */}
      <Route path="/quiz-types" element={<QuizTypes />} />
      <Route path="/quiz/:type/categories" element={<QuizCategories />} />
      <Route path="/quiz/listen-and-choose/:category" element={<QuizListenAndChoose />} />
      <Route path="/quiz/image-to-word/:category" element={<QuizImageToWord />} />
      <Route path="/quiz/first-sound/:category" element={<QuizFirstSound />} />
      <Route path="/quiz/spelling/:category" element={<QuizSpelling />} />
      <Route path="/quiz-result" element={<QuizResult />} />

      {/* 놀이 */}
      <Route path="/play-types" element={<PlayTypes />} />
      <Route path="/play/:type/categories" element={<PlayCategories />} />
      <Route path="/play/matching/:category" element={<PlayMatchingGame />} />
      <Route path="/play/drag-and-drop/:category" element={<PlayDragAndDrop />} />

      {/* 404 - 홈으로 리다이렉트 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
