#!/usr/bin/env bash
# DoSee Wellness Note — ブログ用ヒーロー画像を Pollinations.ai（無料・キー不要）で一括生成。
#
# 使い方:
#   bash scripts/gen-blog-images.sh
#
# 共有データセンターIPだとレート制限に当たるため、必ず「自分のPC（家庭用回線）」で実行すること。
# もしそれでも "Queue full" が返る場合は、auth.pollinations.ai で無料トークンを取得し、
# 環境変数 POLLINATIONS_TOKEN にセットしてから再実行する:
#   POLLINATIONS_TOKEN=xxxxx bash scripts/gen-blog-images.sh

set -euo pipefail

OUT_DIR="public/images/blog"
mkdir -p "$OUT_DIR"

W=1600
H=900
MODEL="flux"
TOKEN_PARAM=""
if [[ -n "${POLLINATIONS_TOKEN:-}" ]]; then
  TOKEN_PARAM="&token=${POLLINATIONS_TOKEN}"
fi

# slug|プロンプト（英語）
POSTS=(
  "matcha-japanese-culture|A serene Japanese tea ceremony scene, a bowl (chawan) of freshly whisked bright green matcha on a tatami mat, bamboo whisk (chasen) beside it, soft natural side light from a shoji screen, minimalist composition with generous negative space, muted earthy tones with deep green accent, calm and meditative mood, fine art photography, shallow depth of field"
  "matcha-hojicha-time|Two latte cups side by side on a wooden table, one vibrant green matcha latte and one warm amber hojicha latte, soft morning light transitioning to evening warmth, clean minimalist Japanese aesthetic, natural linen textures, deep green brand accent, lifestyle photography, cozy and inviting"
  "drinkable-skincare|A glass of matcha latte on a bright windowsill, soft diffused morning light, fresh green tea leaves and a few water droplets nearby, clean beauty editorial style, dewy and fresh atmosphere, pastel and natural tones with green accent, healthy lifestyle photography"
  "theanine-caffeine|A calm work desk scene, hands holding a warm matcha latte beside an open notebook and a laptop, soft focused daylight, minimal and tidy workspace, muted neutral palette with green accent, sense of quiet focus and clarity, lifestyle photography, shallow depth of field"
  "wellness-habit|A peaceful morning lifestyle scene, a person in soft loungewear holding a warm drink by a sunlit window, plants and simple ceramics around, warm gentle light, calm and unhurried mood, natural earthy tones with green accent, authentic lifestyle photography"
  "hojicha-night|A cozy evening scene, a warm hojicha latte in a ceramic mug on a side table, soft warm lamp light, a folded blanket and a book nearby, amber and brown tones, intimate and relaxing nighttime mood, calm lifestyle photography, shallow depth of field"
)

urlencode() {
  python3 -c "import urllib.parse,sys;print(urllib.parse.quote(sys.argv[1]))" "$1"
}

for entry in "${POSTS[@]}"; do
  slug="${entry%%|*}"
  prompt="${entry#*|}"
  out="${OUT_DIR}/${slug}.jpg"
  enc="$(urlencode "$prompt")"
  url="https://image.pollinations.ai/prompt/${enc}?width=${W}&height=${H}&model=${MODEL}&nologo=true${TOKEN_PARAM}"

  echo "▶ 生成中: ${slug}.jpg"
  tmp="$(mktemp)"
  curl -sS -m 120 -o "$tmp" "$url" || { echo "  ✗ 通信エラー"; rm -f "$tmp"; continue; }

  if file "$tmp" | grep -qiE "image|JPEG|PNG"; then
    mv "$tmp" "$out"
    echo "  ✓ 保存: $out"
  else
    echo "  ✗ 画像が返りませんでした（レート制限の可能性）:"
    head -c 200 "$tmp"; echo
    rm -f "$tmp"
  fi
done

echo "完了。public/images/blog/ を確認してください。"
