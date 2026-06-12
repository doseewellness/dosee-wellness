import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 to-stone-100">
      <div className="text-center px-6">
        {/* 404 数字 */}
        <h1 className="text-8xl md:text-9xl font-light text-stone-300 mb-4">
          404
        </h1>
        
        {/* メッセージ */}
        <h2 className="text-2xl md:text-3xl font-light text-stone-800 mb-3">
          ページが見つかりませんでした
        </h2>
        
        <p className="text-stone-600 mb-8 max-w-md mx-auto">
          お探しのページは存在しないか、移動または削除された可能性があります。
        </p>
        
        {/* ボタン */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 bg-green-700 text-white rounded-full hover:bg-green-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            ← トップページへ戻る
          </Link>
          
          <Link 
            href="/wellcha"
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-green-700 border-2 border-green-700 rounded-full hover:bg-green-50 transition-all duration-300"
          >
            WellCha を見る
          </Link>
        </div>
        
        {/* 装飾的な要素 */}
        <div className="mt-12 text-stone-400 text-sm">
          <p>または、以下のページをお探しですか？</p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <Link href="/about" className="hover:text-green-700 transition-colors">
              会社概要
            </Link>
            <span className="text-stone-300">|</span>
            <Link href="/faq" className="hover:text-green-700 transition-colors">
              よくある質問
            </Link>
            <span className="text-stone-300">|</span>
            <Link href="/contact" className="hover:text-green-700 transition-colors">
              お問い合わせ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}