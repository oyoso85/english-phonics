import { Routes, Route, Navigate } from 'react-router-dom'

// TODO: 컴포넌트 구현 후 import 추가
// import NicknameInput from './components/NicknameInput'
// import CategorySelection from './components/CategorySelection'
// import VocabularyCategories from './components/VocabularyCategories'
// import AlphabetLearning from './components/AlphabetLearning'
// import VocabularyLearning from './components/VocabularyLearning'
// import ConversationLearning from './components/ConversationLearning'

// 임시 placeholder 컴포넌트
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-purple-600 mb-4">{title}</h1>
      <p className="text-gray-600">Coming soon...</p>
    </div>
  </div>
)

export const AppRoutes = () => {
  return (
    <Routes>
      {/* 홈 - 닉네임 입력 */}
      <Route path="/" element={<PlaceholderPage title="닉네임 입력" />} />

      {/* 카테고리 선택 */}
      <Route path="/select-category" element={<PlaceholderPage title="카테고리 선택" />} />

      {/* 단어 하위 카테고리 선택 */}
      <Route path="/vocabulary-categories" element={<PlaceholderPage title="단어 카테고리" />} />

      {/* 알파벳 학습 */}
      <Route path="/alphabet" element={<PlaceholderPage title="알파벳 학습" />} />

      {/* 단어 학습 (카테고리별) */}
      <Route path="/vocabulary/:category" element={<PlaceholderPage title="단어 학습" />} />

      {/* 대화 학습 */}
      <Route path="/conversation" element={<PlaceholderPage title="대화 학습" />} />

      {/* 404 - 홈으로 리다이렉트 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
