interface AudioGesturePromptProps {
  onActivate: () => void;
}

export default function AudioGesturePrompt({ onActivate }: AudioGesturePromptProps) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 mx-4 max-w-sm text-center shadow-xl">
        <div className="text-5xl mb-4">🔊</div>
        <h2 className="text-xl font-bold text-purple-700 mb-2">
          소리를 켜볼까요?
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          아래 버튼을 눌러 소리를 활성화하세요
        </p>
        <button
          onClick={onActivate}
          className="w-full py-3 px-6 bg-purple-500 hover:bg-purple-600 text-white text-lg font-bold rounded-2xl transition-colors active:scale-95"
        >
          소리 켜기
        </button>
      </div>
    </div>
  );
}
