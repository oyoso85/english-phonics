import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import UserProfile from './UserProfile';
import type { LearningCategory } from '../types';

const categories: { id: LearningCategory; label: string; icon: string; bgColor: string; textColor: string }[] = [
  { id: 'alphabet', label: 'ABC 알파벳', icon: '🔤', bgColor: 'bg-cat-blue', textColor: 'text-blue-600' },
  { id: 'vocabulary', label: '단어 학습', icon: '📚', bgColor: 'bg-cat-green', textColor: 'text-green-600' },
  { id: 'conversation', label: '대화 학습', icon: '💬', bgColor: 'bg-cat-orange', textColor: 'text-orange-600' },
];

export default function CategorySelection() {
  const { setCategory } = useAppContext();
  const navigate = useNavigate();

  const handleSelect = (category: LearningCategory) => {
    setCategory(category);
    if (category === 'vocabulary') {
      navigate('/vocabulary-categories');
    } else if (category === 'alphabet') {
      navigate('/alphabet-cards');
    } else {
      navigate('/conversation');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3 animate-bounce-in animate-fill-both">
          English Phonics
        </h1>
        <p className="text-xl text-muted-foreground">어떤 것을 배울까요?</p>
      </div>

      <div className="flex justify-center mb-6">
        <UserProfile />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full max-w-2xl">
        {categories.map((cat, index) => (
          <button
            key={cat.id}
            onClick={() => handleSelect(cat.id)}
            className={`group flex flex-col items-center justify-center ${cat.bgColor} rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 animate-bounce-in animate-fill-both`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <span className="text-5xl mb-3 group-hover:animate-float transition-transform">
              {cat.icon}
            </span>
            <span className={`text-xl font-bold ${cat.textColor}`}>
              {cat.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
