interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorMessage({
  message = '앗! 문제가 생겼어요',
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 text-center max-w-sm">
        <div className="text-5xl mb-4">😢</div>
        <h2 className="text-xl font-bold text-gray-700 mb-2">{message}</h2>
        <p className="text-gray-400 text-sm mb-4">다시 시도해보세요</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="py-3 px-6 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-2xl"
          >
            다시 시도
          </button>
        )}
      </div>
    </div>
  );
}
