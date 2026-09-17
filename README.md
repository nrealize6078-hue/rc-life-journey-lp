# REALIZECLUB LP「LIFE JOURNEY」

社員が、自分の未来に希望を描ける会社へ。REALIZECLUB の法人向けランディングページ。

公開URL: https://nrealize6078-hue.github.io/rc-life-journey-lp/

## 構成

| ファイル | 内容 |
|---|---|
| `index.html` | 本文 |
| `styles.css` | スタイル一式 |
| `script.js` | 共有ボタン・LINEボタン代替表示・固定ボトムバーの制御 |
| `assets/family.webp` | ヒーロー / クロージングの写真 |
| `assets/mio-avatar.webp` | ミオ先生の丸アイコン（240角） |
| `assets/mio-sensei.webp` | ミオ先生の掲載写真（560x835） |

ビルド不要。ファイルをそのまま配信する。

## 編集メモ

- LINE友だち追加: `https://lin.ee/8jf4Da7`
  （ファーストビューの白ボタン / クロージングのLINEカード / 固定ボトムバーの金色ボタン）
- CSSを変えたら `index.html` の `styles.css?v=5` の数字を上げること。
  上げないとキャッシュが残って更新が届かない
- 本文の `<w-b>` は文節タグ。`python _apply_bunsetsu.py` で貼り直せる
  （スマホで語中改行させないための仕組み。再実行しても二重適用しない）
- ミオ先生の原本: `\192.168.0.100\共有\【白石】\📷写真素材\ミオ先生正面.jpg`
- 固定ボトムバー `#cta-bar` はヒーローを抜けた時点で表示。高さは CSS 変数 `--bar-h`
- `[hidden]{display:none!important}` は消さないこと。LINE公式ボタンの代替表示がこれに依存する
- 元は chatgpt.site 公開版（2026年9月17日取得）。以後の編集はこのリポジトリが正
