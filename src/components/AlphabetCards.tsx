import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { loadAlphabets } from '../utils/data';

export default function AlphabetCards() {
  const navigate = useNavigate();
  const alphabets = loadAlphabets();

  const handleSelect = (index: number) => {
    navigate('/alphabet', { state: { startIndex: index } });
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-4xl mb-6">
        <button
          onClick={() => navigate('/select-category')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors px-4 py-3 rounded-2xl hover:bg-muted active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-lg font-medium">뒤로</span>
        </button>
        <span className="text-lg font-medium px-4 py-2 rounded-full bg-cat-blue text-blue-600">
          🔤 알파벳
        </span>
        <div className="w-24" />
      </div>

      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2 animate-bounce-in animate-fill-both">
          알파벳을 골라보세요!
        </h2>
        <p className="text-muted-foreground">카드를 터치하면 발음을 들을 수 있어요</p>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 w-full max-w-4xl">
        {alphabets.map((alpha, index) => (
          <button
            key={alpha.letter}
            onClick={() => handleSelect(index)}
            className="group flex flex-col items-center bg-card rounded-2xl p-4 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 animate-bounce-in animate-fill-both"
            style={{ animationDelay: `${index * 30}ms` }}
          >
            {/* Emoji */}
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-cat-blue flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <span className="text-4xl md:text-5xl">{alpha.emoji}</span>
            </div>
            {/* Letter */}
            <div className="flex items-baseline gap-1">
              <span className="text-2xl md:text-3xl font-bold text-primary">{alpha.uppercase}</span>
              <span className="text-xl md:text-2xl font-bold text-primary/50">{alpha.lowercase}</span>
            </div>
            {/* Word */}
            <span className="text-xs md:text-sm text-muted-foreground mt-1 truncate w-full text-center">
              {alpha.exampleWord}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
