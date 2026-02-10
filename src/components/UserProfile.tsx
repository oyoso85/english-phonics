import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
  const { state, clearUser } = useAppContext();
  const navigate = useNavigate();

  if (!state.user) return null;

  const handleChangeName = () => {
    clearUser();
    navigate('/');
  };

  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <span className="text-lg">😊</span>
      <span className="font-medium text-purple-700">{state.user.nickname}</span>
      <button
        onClick={handleChangeName}
        className="text-xs text-gray-400 hover:text-gray-600 ml-1"
      >
        변경
      </button>
    </div>
  );
}
