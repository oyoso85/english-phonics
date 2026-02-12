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

      {/* 404 - 홈으로 리다이렉트 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
