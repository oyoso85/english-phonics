import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import UserProfile from './UserProfile';
import type { LearningCategory } from '../types';

const categories: { id: LearningCategory; label: string; icon: string; color: string }[] = [
  { id: 'alphabet', label: 'ABC 알파벳', icon: '🔤', color: 'from-blue-400 to-blue-500' },
  { id: 'vocabulary', label: '단어 학습', icon: '📚', color: 'from-green-400 to-green-500' },
  { id: 'conversation', label: '대화 학습', icon: '💬', color: 'from-orange-400 to-orange-500' },
];

export default function CategorySelection() {
  const { setCategory } = useAppContext();
  const navigate = useNavigate();

  const handleSelect = (category: LearningCategory) => {
    setCategory(category);
    if (category === 'vocabulary') {
      navigate('/vocabulary-categories');
    } else if (category === 'alphabet') {
      navigate('/alphabet');
    } else {
      navigate('/conversation');
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-purple-700">무엇을 배울까요?</h1>
          <UserProfile />
        </div>

        <div className="flex flex-col gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              className={`flex items-center gap-4 p-6 bg-gradient-to-r ${cat.color} text-white rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95`}
            >
              <span className="text-4xl">{cat.icon}</span>
              <span className="text-2xl font-bold">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
