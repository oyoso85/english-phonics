import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { loadConversations } from '../utils/data';

const conversationEmojis: Record<string, string> = {
  'greeting': '👋',
  'role-play': '🎭',
  'help-mom': '👩',
  'help-dad': '👨',
  'feelings': '😊',
  'request-item': '🎁',
  'request-action': '🙏',
};

export default function ConversationCards() {
  const navigate = useNavigate();
  const conversations = loadConversations();

  const handleSelect = (index: number) => {
    navigate('/conversation', { state: { startSetIndex: index } });
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
        <span className="text-lg font-medium px-4 py-2 rounded-full bg-cat-orange text-orange-600">
          💬 대화
        </span>
        <div className="w-24" />
      </div>

      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2 animate-bounce-in animate-fill-both">
          대화를 골라보세요!
        </h2>
        <p className="text-muted-foreground">카드를 터치하면 대화를 들을 수 있어요</p>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-3xl">
        {conversations.map((conv, index) => (
          <button
            key={conv.id}
            onClick={() => handleSelect(index)}
            className="group flex flex-col items-center bg-card rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 animate-bounce-in animate-fill-both"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-cat-orange flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <span className="text-5xl md:text-6xl">{conversationEmojis[conv.id] ?? '💬'}</span>
            </div>
            <span className="text-base md:text-lg font-bold text-foreground text-center">
              {conv.title}
            </span>
            <span className="text-xs text-muted-foreground mt-1">
              {conv.sentences.length}문장
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
