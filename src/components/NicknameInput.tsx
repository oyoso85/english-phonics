import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function NicknameInput() {
  const { state, setUser } = useAppContext();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState(state.user?.nickname ?? '');
  const [error, setError] = useState('');

  // Auto-login if user already exists
  if (state.user && !nickname) {
    navigate('/select-category', { replace: true });
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nickname.trim();

    if (trimmed.length < 1 || trimmed.length > 20) {
      setError('이름은 1~20자로 입력해주세요');
      return;
    }

    setUser(trimmed);
    navigate('/select-category');
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md text-center">
        <div className="text-6xl mb-4">👋</div>
        <h1 className="text-3xl font-bold text-purple-700 mb-2">
          Hello!
        </h1>
        <p className="text-gray-500 mb-6">이름을 알려주세요</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
              setError('');
            }}
            placeholder="이름을 입력하세요"
            maxLength={20}
            className="w-full px-6 py-4 text-xl text-center border-2 border-purple-200 rounded-2xl focus:border-purple-500 focus:outline-none mb-2"
            autoFocus
          />
          {error && (
            <p className="text-red-400 text-sm mb-2">{error}</p>
          )}
          <button
            type="submit"
            className="w-full mt-4 py-4 bg-purple-500 hover:bg-purple-600 text-white text-xl font-bold rounded-2xl transition-colors active:scale-95"
          >
            시작하기
          </button>
        </form>
      </div>
    </div>
  );
}
