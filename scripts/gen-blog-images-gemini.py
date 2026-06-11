#!/usr/bin/env python3
"""DoSee Wellness Note — ブログ用ヒーロー画像を Google Gemini API で一括生成。

必要なもの:
  - Google AI Studio (https://aistudio.google.com/apikey) で発行した API キー
  - 環境変数 GEMINI_API_KEY、または .env.local に GEMINI_API_KEY=... を記載

使い方:
  GEMINI_API_KEY=xxxx python3 scripts/gen-blog-images-gemini.py
  # または .env.local に書いておけば:
  python3 scripts/gen-blog-images-gemini.py

モデル:
  既定は Imagen 3 (imagen-3.0-generate-002)。Imagen は課金有効なプロジェクトが必要。
  使えない場合は Gemini ネイティブ画像生成へ自動フォールバック。
  環境変数 IMAGE_MODEL で明示指定も可能。
"""
import base64
import json
import os
import subprocess
import sys
import tempfile
import time

OUT_DIR = "public/images/blog"
IMAGEN_MODEL = os.environ.get("IMAGE_MODEL", "imagen-4.0-generate-001")
GEMINI_IMAGE_MODEL = "gemini-2.5-flash-image"
BASE = "https://generativelanguage.googleapis.com/v1beta/models"

POSTS = [
    ("matcha-japanese-culture",
     "A serene Japanese tea ceremony scene, a bowl (chawan) of freshly whisked bright green "
     "matcha on a tatami mat, bamboo whisk (chasen) beside it, soft natural side light from a "
     "shoji screen, minimalist composition with generous negative space, muted earthy tones with "
     "deep green accent, calm and meditative mood, fine art photography, shallow depth of field, "
     "16:9 wide composition"),
    ("matcha-hojicha-time",
     "Two latte cups side by side on a wooden table, one vibrant green matcha latte and one warm "
     "amber hojicha latte, soft morning light transitioning to evening warmth, clean minimalist "
     "Japanese aesthetic, natural linen textures, deep green brand accent, lifestyle photography, "
     "cozy and inviting, 16:9 wide composition"),
    ("drinkable-skincare",
     "A glass of matcha latte on a bright windowsill, soft diffused morning light, fresh green tea "
     "leaves and a few water droplets nearby, clean beauty editorial style, dewy and fresh "
     "atmosphere, pastel and natural tones with green accent, healthy lifestyle photography, "
     "16:9 wide composition"),
    ("theanine-caffeine",
     "A calm work desk scene, hands holding a warm matcha latte beside an open notebook and a "
     "laptop, soft focused daylight, minimal and tidy workspace, muted neutral palette with green "
     "accent, sense of quiet focus and clarity, lifestyle photography, shallow depth of field, "
     "16:9 wide composition"),
    ("wellness-habit",
     "A peaceful morning lifestyle scene, a person in soft loungewear holding a warm drink by a "
     "sunlit window, plants and simple ceramics around, warm gentle light, calm and unhurried "
     "mood, natural earthy tones with green accent, authentic lifestyle photography, "
     "16:9 wide composition"),
    ("hojicha-night",
     "A cozy evening scene, a warm hojicha latte in a ceramic mug on a side table, soft warm lamp "
     "light, a folded blanket and a book nearby, amber and brown tones, intimate and relaxing "
     "nighttime mood, calm lifestyle photography, shallow depth of field, 16:9 wide composition"),
]


def load_key() -> str:
    key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    if key:
        return key.strip()
    # .env.local からの読み込み
    for fname in (".env.local", ".env"):
        if os.path.exists(fname):
            with open(fname) as f:
                for line in f:
                    line = line.strip()
                    if line.startswith("GEMINI_API_KEY=") or line.startswith("GOOGLE_API_KEY="):
                        return line.split("=", 1)[1].strip().strip('"').strip("'")
    sys.exit("✗ GEMINI_API_KEY が見つかりません。環境変数か .env.local に設定してください。")


class HTTPError(Exception):
    def __init__(self, code: int, body: str):
        self.code = code
        self.body = body
        super().__init__(f"HTTP {code}: {body[:300]}")


def post(url: str, payload: dict) -> dict:
    """curl 経由で POST（macOS の Python が CA 証明書を持たない問題を回避）。"""
    with tempfile.NamedTemporaryFile("w", suffix=".json", delete=False) as f:
        json.dump(payload, f)
        body_path = f.name
    try:
        proc = subprocess.run(
            [
                "curl", "-sS", "-m", "180",
                "-w", "\n%{http_code}",
                "-H", "Content-Type: application/json",
                "--data", f"@{body_path}",
                url,
            ],
            capture_output=True, text=True, timeout=200,
        )
    finally:
        os.unlink(body_path)

    out = proc.stdout
    nl = out.rfind("\n")
    raw, code = (out[:nl], out[nl + 1:].strip()) if nl != -1 else (out, "")
    if code and code != "200":
        raise HTTPError(int(code), raw)
    return json.loads(raw)


def gen_imagen(key: str, prompt: str) -> bytes | None:
    url = f"{BASE}/{IMAGEN_MODEL}:predict?key={key}"
    payload = {
        "instances": [{"prompt": prompt}],
        "parameters": {"sampleCount": 1, "aspectRatio": "16:9"},
    }
    res = post(url, payload)
    preds = res.get("predictions") or []
    if preds and preds[0].get("bytesBase64Encoded"):
        return base64.b64decode(preds[0]["bytesBase64Encoded"])
    return None


def gen_gemini(key: str, prompt: str) -> bytes | None:
    url = f"{BASE}/{GEMINI_IMAGE_MODEL}:generateContent?key={key}"
    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"responseModalities": ["TEXT", "IMAGE"]},
    }
    res = post(url, payload)
    for cand in res.get("candidates", []):
        for part in cand.get("content", {}).get("parts", []):
            inline = part.get("inlineData") or part.get("inline_data")
            if inline and inline.get("data"):
                return base64.b64decode(inline["data"])
    return None


def imagen_with_retry(key: str, prompt: str, retries: int = 4) -> bytes | None:
    """Imagen 4 を 429 バックオフ付きで試す。成功すれば 16:9 のバイト列を返す。"""
    for attempt in range(retries):
        try:
            return gen_imagen(key, prompt)
        except HTTPError as e:
            if e.code == 429 and attempt < retries - 1:
                wait = 15 * (attempt + 1)
                print(f"  … Imagen レート制限(429)。{wait}s 待って再試行 ({attempt + 1}/{retries})")
                time.sleep(wait)
                continue
            print(f"  ! Imagen 失敗（{e.code}）: {e.body[:160]}")
            return None
        except Exception as e:
            print(f"  ! Imagen エラー: {e}")
            return None
    return None


def main():
    key = load_key()
    os.makedirs(OUT_DIR, exist_ok=True)
    ok = 0

    for i, (slug, prompt) in enumerate(POSTS):
        out = os.path.join(OUT_DIR, f"{slug}.png")
        print(f"▶ 生成中: {slug}")
        img = imagen_with_retry(key, prompt)
        source = "Imagen4(16:9)"

        if img is None:
            try:
                img = gen_gemini(key, prompt)
                source = "Gemini(1:1)"
            except Exception as e:
                print(f"  ✗ 生成失敗: {e}")
                continue

        if img:
            with open(out, "wb") as f:
                f.write(img)
            print(f"  ✓ 保存: {out} ({len(img)//1024} KB / {source})")
            ok += 1
        else:
            print("  ✗ 画像データが返りませんでした")

        if i < len(POSTS) - 1:
            time.sleep(8)  # レート制限緩和のため間隔をあける

    print(f"\n完了: {ok}/{len(POSTS)} 枚生成。public/images/blog/ を確認してください。")


if __name__ == "__main__":
    main()
