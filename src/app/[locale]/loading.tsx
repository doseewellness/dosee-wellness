export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 to-stone-100">
      <div className="text-center">
        {/* スピナー */}
        <div className="relative mb-6">
          {/* 外側の円 */}
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-700 mx-auto"></div>
          
          {/* 内側の円（逆回転） */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin-reverse rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"></div>
        </div>
        
        {/* ローディングテキスト */}
        <p className="text-stone-600 font-light animate-pulse">
          読み込み中...
        </p>
      </div>
    </div>
  );
}