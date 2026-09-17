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

ビルド不要。ファイルをそのまま配信する。

## 編集メモ

- LINE友だち追加: `https://lin.ee/Xkldeyi`（LINEカードと固定ボトムバーの2箇所・各2本ずつ）
- 固定ボトムバー `#cta-bar` はヒーローを抜けた時点で表示。高さは CSS 変数 `--bar-h`
- `[hidden]{display:none!important}` は消さないこと。LINE公式ボタンの代替表示がこれに依存する
- 元は chatgpt.site 公開版（2026年9月17日取得）。以後の編集はこのリポジトリが正
