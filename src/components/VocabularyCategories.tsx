import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import type { VocabularyCategory } from '../types';
import { getVocabularyCategoryLabel } from '../utils/data';

const vocabCategories: { id: VocabularyCategory; icon: string; color: string }[] = [
  { id: 'food-ingredients', icon: '🍎', color: 'from-red-400 to-red-500' },
  { id: 'cooking', icon: '🍳', color: 'from-yellow-400 to-yellow-500' },
  { id: 'animals', icon: '🐶', color: 'from-green-400 to-green-500' },
  { id: 'vehicles', icon: '🚗', color: 'from-blue-400 to-blue-500' },
  { id: 'body-parts', icon: '🖐️', color: 'from-purple-400 to-purple-500' },
];

export default function VocabularyCategories() {
  const { setVocabularyCategory } = useAppContext();
  const navigate = useNavigate();

  const handleSelect = (category: VocabularyCategory) => {
    setVocabularyCategory(category);
    navigate(`/vocabulary/${category}`);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate('/select-category')}
            className="p-2 rounded-xl bg-white/80 hover:bg-white shadow-sm text-purple-600 text-xl"
          >
            &#8592;
          </button>
          <h1 className="text-2xl font-bold text-purple-700">단어 카테고리</h1>
        </div>

        <div className="flex flex-col gap-3">
          {vocabCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              className={`flex items-center gap-4 p-5 bg-gradient-to-r ${cat.color} text-white rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95`}
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-xl font-bold">{getVocabularyCategoryLabel(cat.id)}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
