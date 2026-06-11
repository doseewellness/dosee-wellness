import { getPurchaseUrl, type ProductKey } from '@/lib/constants/shop'

/**
 * DoSee Wellness Note — カスタマー教育ブログの記事データ。
 * 本文は薬機法に配慮し、効果効能の断定を避けた体験・文化・成分の一般的説明に留める。
 */

export type BlogBlock =
  | { type: 'lead'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'callout'; title?: string; text: string }
  | { type: 'quote'; text: string }

export interface BlogPost {
  slug: string
  title: string
  subtitle: string
  category: string
  /** ISO date */
  publishedAt: string
  readingMinutes: number
  excerpt: string
  keywords: string[]
  heroImage: string
  heroAlt: string
  /** 画像生成AI（Midjourney / Firefly / DALL·E 等）にそのまま使える英語プロンプト */
  imagePrompt: string
  productTie?: { key: ProductKey; label: string; lead: string }
  body: BlogBlock[]
  /** 薬機法など編集上の注意（公開はされない・社内メモ） */
  editorNote?: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'matcha-japanese-culture',
    title: '抹茶という日本文化 — 一服に宿る「もてなし」と「余白」',
    subtitle: '飲み物である前に、暮らしの作法だった。',
    category: 'CULTURE',
    publishedAt: '2026-06-11',
    readingMinutes: 6,
    excerpt:
      '抹茶はただの飲み物ではなく、数百年かけて磨かれた日本の「整える文化」そのもの。茶の湯に宿る余白の美学と、現代の一杯へのつながりをたどります。',
    keywords: ['抹茶 文化', '茶道 意味', '日本茶 歴史', '一期一会', '抹茶とは', 'わびさび'],
    heroImage: '/images/blog/matcha-japanese-culture.png',
    heroAlt: '静かな和室で点てられる一服の抹茶',
    imagePrompt:
      'A serene Japanese tea ceremony scene, a bowl (chawan) of freshly whisked bright green matcha on a tatami mat, bamboo whisk (chasen) beside it, soft natural side light from a shoji screen, minimalist composition with generous negative space, muted earthy tones with deep green accent, calm and meditative mood, fine art photography, shallow depth of field, 16:9',
    productTie: {
      key: 'matchaLatte',
      label: 'Matcha Latte を見る',
      lead: '茶の湯の静けさを、忙しい毎日でも続けられる一杯に。',
    },
    body: [
      {
        type: 'lead',
        text: '抹茶を口にするとき、私たちは飲み物だけでなく、数百年にわたって磨かれてきた「整える時間」の作法をも受け取っています。',
      },
      { type: 'h2', text: '一杯の前に、まず「整える」' },
      {
        type: 'p',
        text: '抹茶のルーツは、鎌倉時代に禅とともに日本へ伝わったとされます。修行僧が眠気をはらい、心を一点に向けるために茶を用いたという背景は、抹茶が最初から「集中」や「静けさ」と結びついていたことを物語ります。',
      },
      {
        type: 'p',
        text: 'やがて茶は「茶の湯」として発展し、千利休によって精神性を伴う文化へと昇華されました。湯を沸かし、茶を点て、相手に差し出す。その一連の所作のすべてが、心を落ち着け、いまこの瞬間に立ち戻るための装置だったのです。',
      },
      { type: 'h2', text: '「もてなし」とは、相手の時間を整えること' },
      {
        type: 'p',
        text: '茶の湯の核にあるのは「もてなし」の心です。それは豪華さではなく、相手のためにどれだけ静かに、丁寧に時間を用意できるかという姿勢のこと。一服の抹茶には、相手の心身をそっと整えてもらいたいという願いが込められています。',
      },
      {
        type: 'quote',
        text: '一期一会 — 同じ時間は二度と訪れない。だからこそ、この一杯を丁寧に。',
      },
      { type: 'h2', text: '「余白」という日本的な豊かさ' },
      {
        type: 'p',
        text: 'わびさびに代表されるように、日本の美意識は「満たすこと」よりも「余白を残すこと」に価値を置いてきました。茶室の簡素さ、所作の間（ま）、沈黙の時間。そのすべてが、心に余白をつくるためにデザインされています。',
      },
      {
        type: 'p',
        text: '現代の私たちは、予定で埋め尽くされた一日を生きています。だからこそ、抹茶の文化が大切にしてきた「あえて何もしない、整えるだけの時間」は、いまむしろ新しい意味を持ちはじめています。',
      },
      { type: 'h2', text: '茶室の作法を、日常の一杯へ' },
      {
        type: 'p',
        text: '茶室に入らなくても、その精神は受け継げます。お湯を注ぎ、香りを感じ、ひと呼吸おいてから口にする。たったそれだけで、慌ただしい日常のなかに小さな余白が生まれます。',
      },
      {
        type: 'callout',
        title: 'おうちで始める「整える一杯」',
        text: 'まずは飲む前に三回、ゆっくり呼吸してみてください。香りを確かめ、最初のひと口を味わう。作法を覚える必要はありません。「丁寧に向き合う」その姿勢こそが、茶の湯が伝えてきたものです。',
      },
      {
        type: 'p',
        text: 'DoSee Wellness の WellCha は、この「整える文化」を、忙しい現代でも続けられる形にしたものです。茶筅も茶室もいらない。けれど、一服に宿ってきた静けさは、そのままあなたの毎日へ。',
      },
    ],
    editorNote: '文化・歴史記事。効能表現なし。薬機法リスク低。',
  },
  {
    slug: 'matcha-hojicha-time',
    title: '抹茶とほうじ茶、時間帯で選ぶ一杯',
    subtitle: 'どちらが良いか、ではなく「いつ飲むか」。',
    category: 'GUIDE',
    publishedAt: '2026-06-09',
    readingMinutes: 5,
    excerpt:
      '抹茶ラテとほうじ茶ラテ、どちらを選べばいい？答えは「時間帯」にあります。日中と夜、それぞれのシーンに寄り添う一杯の選び方を紹介します。',
    keywords: ['抹茶 ほうじ茶 違い', 'カフェイン 時間帯', '抹茶 飲むタイミング', 'ほうじ茶 夜', '日本茶 選び方'],
    heroImage: '/images/blog/matcha-hojicha-time.png',
    heroAlt: '抹茶ラテとほうじ茶ラテが並んだテーブル',
    imagePrompt:
      'Two latte cups side by side on a wooden table, one vibrant green matcha latte and one warm amber hojicha latte, soft morning light transitioning to evening warmth, clean minimalist Japanese aesthetic, natural linen textures, deep green brand accent, lifestyle photography, cozy and inviting, 16:9',
    productTie: {
      key: 'matchaLatte',
      label: 'WellCha のラインを見る',
      lead: '朝の抹茶、夜のほうじ茶。一日のリズムに寄り添う二杯。',
    },
    body: [
      {
        type: 'lead',
        text: '「抹茶とほうじ茶、どっちを選べばいい？」よくいただく質問ですが、私たちの答えはいつも同じ。優劣ではなく、飲む時間帯で選んでみてください。',
      },
      { type: 'h2', text: '朝〜日中は、抹茶ラテ' },
      {
        type: 'p',
        text: '抹茶には、カフェインとともにテアニンというアミノ酸が含まれます。シャキッとしたいけれど、急かされる感じは避けたい。そんな日中の時間に、抹茶ラテはちょうどいい一杯です。',
      },
      {
        type: 'list',
        items: [
          '集中して取り組みたい午前中に',
          '午後のひと息、リフレッシュしたいときに',
          'コーヒーの代わりの一杯として',
        ],
      },
      { type: 'h2', text: '夕方〜夜は、ほうじ茶ラテ' },
      {
        type: 'p',
        text: 'ほうじ茶は茶葉を高温で焙煎してつくられ、一般的に抹茶よりカフェインが穏やかとされています。香ばしい香りと、まろやかな口当たり。一日を静かに閉じていく時間に寄り添います。',
      },
      {
        type: 'list',
        items: [
          '夕食後のくつろぎの時間に',
          '就寝前、カフェインが気になるときの一杯に',
          '温かいものでほっとしたい夜に',
        ],
      },
      { type: 'h2', text: 'カフェイン量のめやす' },
      {
        type: 'p',
        text: 'あくまで一般的な傾向ですが、日本茶のカフェインは「抹茶 ＞ 煎茶 ＞ ほうじ茶」の順とされることが多いです。日中はしっかりめ、夜は穏やかめ、と覚えておくと選びやすくなります。',
      },
      {
        type: 'callout',
        title: '両方を一日に取り入れる',
        text: '朝は抹茶ラテで一日のスイッチを入れ、夜はほうじ茶ラテでクールダウン。二杯を時間帯で使い分けることで、一日のリズムそのものが整っていきます。',
      },
    ],
    editorNote: 'カフェインは「一般的傾向」と明記。睡眠・覚醒の効能断定は避ける。',
  },
  {
    slug: 'drinkable-skincare',
    title: '「飲むスキンケア」って何？ 抹茶の抗酸化を正しく知る',
    subtitle: '肌は、塗るだけのものじゃない。',
    category: 'SCIENCE',
    publishedAt: '2026-06-06',
    readingMinutes: 6,
    excerpt:
      '「飲むスキンケア」という言葉の背景には、抹茶に含まれる成分の話があります。カテキンやビタミンとは何か、抗酸化という言葉の意味を、断定せずやさしく整理します。',
    keywords: ['飲むスキンケア', '抹茶 美容', '抗酸化 食べ物', 'カテキン とは', '抹茶 ビタミン', 'インナーケア'],
    heroImage: '/images/blog/drinkable-skincare.png',
    heroAlt: '光の差し込む窓辺に置かれた抹茶ラテ',
    imagePrompt:
      'A glass of matcha latte on a bright windowsill, soft diffused morning light, fresh green tea leaves and a few water droplets nearby, clean beauty editorial style, dewy and fresh atmosphere, pastel and natural tones with green accent, healthy lifestyle photography, 16:9',
    productTie: {
      key: 'matchaLatte',
      label: 'Matcha Latte を見る',
      lead: '内側から整える習慣として、毎日の一杯を。',
    },
    body: [
      {
        type: 'lead',
        text: 'スキンケアというと「塗るもの」を思い浮かべます。でも近年、食べるもの・飲むものから肌を支える「インナーケア」という考え方が広がっています。',
      },
      { type: 'h2', text: '抹茶に含まれる成分の話' },
      {
        type: 'p',
        text: '抹茶は茶葉をまるごと粉にして飲むため、お湯に溶け出す成分だけでなく、葉そのものに含まれる成分も取り入れられるのが特徴です。代表的なのが「カテキン」と呼ばれるポリフェノールの一種です。',
      },
      {
        type: 'p',
        text: 'また抹茶には、ビタミンC・ビタミンE・β-カロテンなど、植物由来の成分も含まれます。これらは野菜や果物にも含まれる、私たちにとってなじみ深い栄養素です。',
      },
      { type: 'h2', text: '「抗酸化」という言葉の意味' },
      {
        type: 'p',
        text: '「抗酸化」とは、文字通り「酸化に抗（あらが）う」こと。私たちのからだは生きているだけで酸化のプロセスにさらされており、抗酸化成分はそれを和らげる働きで知られています。これは食品成分の一般的な性質として語られるもので、特定の効果を保証するものではありません。',
      },
      {
        type: 'callout',
        title: '大切なのは「続けること」',
        text: '一杯飲んだら肌が変わる、という話ではありません。野菜を食べ続けることと同じで、抗酸化成分を含む食品を日々の習慣に無理なく取り入れること。それがインナーケアの考え方です。',
      },
      { type: 'h2', text: '「飲むスキンケア」を日常に置き換える' },
      {
        type: 'p',
        text: '特別なことをする必要はありません。いつものコーヒーやジュースの一杯を、抹茶ラテに置き換えてみる。それだけで、無理なくインナーケアの習慣がはじまります。',
      },
      {
        type: 'p',
        text: 'WellCha の Matcha Latte は、こうした「内側から整える」発想を、忙しい毎日でも続けやすい形にした一杯です。',
      },
    ],
    editorNote: '重要：肌改善・美白等の効能断定NG。成分の一般的説明＋「習慣として」に限定。',
  },
  {
    slug: 'theanine-caffeine',
    title: 'コーヒーとどう違う？ テアニン×カフェインの穏やかな集中',
    subtitle: '「ガツン」ではなく「すっと」。',
    category: 'SCIENCE',
    publishedAt: '2026-06-03',
    readingMinutes: 5,
    excerpt:
      'コーヒーを飲んだ後のソワソワ感が気になる人へ。抹茶に含まれるテアニンとカフェインの関係から、日本茶ならではの「穏やかな集中」の感覚を読み解きます。',
    keywords: ['抹茶 コーヒー 違い', 'テアニン カフェイン', '集中 飲み物', 'テアニン とは', '抹茶 集中力'],
    heroImage: '/images/blog/theanine-caffeine.png',
    heroAlt: 'デスクで作業をしながら抹茶ラテを飲む手元',
    imagePrompt:
      'A calm work desk scene, hands holding a warm matcha latte beside an open notebook and a laptop, soft focused daylight, minimal and tidy workspace, muted neutral palette with green accent, sense of quiet focus and clarity, lifestyle photography, shallow depth of field, 16:9',
    productTie: {
      key: 'matchaLatte',
      label: 'Matcha Latte を見る',
      lead: '切り替えたい時間に、すっと寄り添う一杯。',
    },
    body: [
      {
        type: 'lead',
        text: 'コーヒーを飲むとシャキッとするけれど、しばらくするとソワソワしたり、夕方にどっと疲れたり。そんな経験はありませんか。',
      },
      { type: 'h2', text: 'コーヒーの「ガツン」の正体' },
      {
        type: 'p',
        text: 'コーヒーの覚醒感は主にカフェインによるもの。立ち上がりが速い一方で、人によっては心拍の高まりや落ち着かなさを感じることもあります。これはカフェインが単独で強く働きやすいためと考えられています。',
      },
      { type: 'h2', text: '抹茶にはテアニンがある' },
      {
        type: 'p',
        text: '抹茶にもカフェインは含まれますが、同時に「テアニン」というアミノ酸が豊富なのが特徴です。テアニンは緑茶のうまみ・甘みのもとであり、穏やかな印象と結びつけて語られることの多い成分です。',
      },
      {
        type: 'p',
        text: 'カフェインとテアニンがともに含まれることで、抹茶は「シャキッとしつつも落ち着いている」という、コーヒーとは異なる体感をもたらすと言われています。あくまで感じ方には個人差があります。',
      },
      {
        type: 'callout',
        title: '「すっと」整う感覚',
        text: '急に押し上げられるのではなく、静かにスイッチが入る。集中したいけれど焦りたくない。そんな時間に、抹茶ラテは心地よく寄り添います。',
      },
      { type: 'h2', text: '使い分けるという選択' },
      {
        type: 'p',
        text: 'コーヒーをやめる必要はありません。朝の一杯はコーヒー、集中して向き合いたい時間は抹茶ラテ、というように切り替える。飲み物を選ぶことは、自分のコンディションを選ぶことでもあります。',
      },
    ],
    editorNote: 'テアニンの効能は断定せず「〜と言われる」「個人差」を明記。',
  },
  {
    slug: 'wellness-habit',
    title: '続かないウェルネスの正体 — 「義務」を「習慣」に変える設計',
    subtitle: '頑張らないと続かないなら、設計が間違っている。',
    category: 'PHILOSOPHY',
    publishedAt: '2026-05-30',
    readingMinutes: 6,
    excerpt:
      'サプリも運動も三日坊主。続かないのは意志が弱いからではありません。ウェルネスを「義務」から「習慣」へ変える、小さな設計のコツをDoSee Wellnessの視点から。',
    keywords: ['ウェルネス 続かない', '習慣化 コツ', '自分を大切にする', '健康習慣 続ける', 'ルーティン'],
    heroImage: '/images/blog/wellness-habit.png',
    heroAlt: '朝の光の中で一杯を手に取る穏やかな日常',
    imagePrompt:
      'A peaceful morning lifestyle scene, a person in soft loungewear holding a warm drink by a sunlit window, plants and simple ceramics around, warm gentle light, calm and unhurried mood, natural earthy tones with green accent, authentic lifestyle photography, 16:9',
    productTie: {
      key: 'matchaLatte',
      label: 'DoSee Wellness を見る',
      lead: '「整えなきゃ」ではなく「整えたい」から始める一杯。',
    },
    body: [
      {
        type: 'lead',
        text: 'ジム、サプリ、早起き、瞑想。よいと分かっていても続かない。でもそれは、あなたの意志が弱いからではありません。',
      },
      { type: 'h2', text: 'なぜウェルネスは続かないのか' },
      {
        type: 'p',
        text: '多くの健康習慣は「頑張ること」を前提に設計されています。時間をつくり、努力し、自分を律する。けれど忙しい日々のなかで、その負荷はやがて重荷になり、続けられない自分への小さな罪悪感だけが残ります。',
      },
      {
        type: 'quote',
        text: '「整えなきゃ」という義務感は、いつの間にかウェルネスを苦しいものに変えてしまう。',
      },
      { type: 'h2', text: '「義務」を外すという発想' },
      {
        type: 'p',
        text: '私たちが大切にしているのは、「整えなきゃ」ではなく「自分を大切にしたい」という気持ちから始めること。動機が義務だと続かず、いたわりだと続く。同じ行動でも、出発点が違えば景色は変わります。',
      },
      { type: 'h2', text: '小さな単位に分解する' },
      {
        type: 'p',
        text: '習慣化のコツは、行動を「これ以上ないほど小さく」することです。30分の運動より、一杯のお茶。大きな決意より、すでにある日常への置き換え。小ささは、続けやすさそのものです。',
      },
      {
        type: 'list',
        items: [
          'すでにある習慣（朝のコーヒーなど）に「乗せる」',
          '成果ではなく「やったこと」を自分に許す',
          'できない日があっても、また戻ればいいと考える',
        ],
      },
      {
        type: 'callout',
        title: '一杯に置き換えるだけ',
        text: 'DoSee Wellness の発想はシンプルです。新しい努力を足すのではなく、いつもの一杯を置き換えるだけ。リチュアル（小さな儀式）として日常に溶け込むから、頑張らなくても続いていきます。',
      },
      {
        type: 'p',
        text: 'ウェルネスは、自分を追い込むためのものではありません。ほんの少しの余白で、自分にやさしくなれる。その積み重ねが、いちばん遠くまで続いていきます。',
      },
    ],
    editorNote: 'ブランド哲学記事。商品効能には触れずライフスタイル文脈で。',
  },
  {
    slug: 'hojicha-night',
    title: 'ほうじ茶が「夜の一杯」に選ばれる理由',
    subtitle: '焙煎の香りが、一日をそっと閉じていく。',
    category: 'GUIDE',
    publishedAt: '2026-05-26',
    readingMinutes: 5,
    excerpt:
      '夜にコーヒーは飲めないけれど、温かいものでほっとしたい。そんな時間に選ばれるのがほうじ茶ラテ。焙煎・穏やかなカフェイン・温もりという三つの理由を紐解きます。',
    keywords: ['ほうじ茶 カフェイン', '夜 飲み物', 'ほうじ茶 リラックス', 'ほうじ茶ラテ', 'ノンカフェイン 寄り'],
    heroImage: '/images/blog/hojicha-night.png',
    heroAlt: '夜の灯りのもとに置かれた温かいほうじ茶ラテ',
    imagePrompt:
      'A cozy evening scene, a warm hojicha latte in a ceramic mug on a side table, soft warm lamp light, a folded blanket and a book nearby, amber and brown tones, intimate and relaxing nighttime mood, calm lifestyle photography, shallow depth of field, 16:9',
    productTie: {
      key: 'hojichaLatte',
      label: 'Hojicha Latte を見る',
      lead: '一日を静かに閉じる、夜のための一杯。',
    },
    body: [
      {
        type: 'lead',
        text: '夜、コーヒーは飲みたくない。でも温かいもので、ほっとひと息つきたい。そんな時間にほうじ茶ラテが選ばれるのには、理由があります。',
      },
      { type: 'h2', text: '理由1｜穏やかなカフェイン' },
      {
        type: 'p',
        text: 'ほうじ茶は、一般的に日本茶のなかでもカフェインが穏やかとされています。高温の焙煎を経ることで、すっきりと飲みやすい味わいに。夜のカフェインが気になる方にも選ばれやすいお茶です。',
      },
      { type: 'h2', text: '理由2｜焙煎が生む香り' },
      {
        type: 'p',
        text: 'ほうじ茶最大の魅力は、なんといっても香ばしい香り。茶葉を炒ることで生まれるこの香りは、それ自体が深いリラックスの時間と結びついて語られてきました。香りは、心のスイッチを切り替える大切な要素です。',
      },
      { type: 'h2', text: '理由3｜温もりという安心' },
      {
        type: 'p',
        text: '温かい飲み物を両手で包む。その何気ない動作には、不思議と心をほどく力があります。湯気の立つ一杯は、一日の緊張をゆるめ、自分を労わる時間そのものになります。',
      },
      {
        type: 'callout',
        title: '一日を閉じるスイッチに',
        text: '寝る前のスマートフォンを置いて、ほうじ茶ラテを一杯。香りを感じ、ゆっくり味わう数分間が、明日への切り替えスイッチになります。',
      },
      {
        type: 'p',
        text: 'WellCha の Hojicha Latte は、忙しい一日の終わりにそっと寄り添う、夜のための一杯です。',
      },
    ],
    editorNote: 'カフェインは「一般的に穏やか」と表現。睡眠改善の断定はNG。',
  },
]

export function getAllPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function getProductUrlForPost(post: BlogPost): string | null {
  return post.productTie ? getPurchaseUrl(post.productTie.key) : null
}
