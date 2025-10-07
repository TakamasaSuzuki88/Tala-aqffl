# まるいそら - 3D Mandala Portfolio

## 概要
3D曼荼羅インタラクティブポートフォリオサイト

## 技術スタック
- Next.js 14 (App Router)
- React 18 + TypeScript
- Three.js / GSAP
- Global CSS (Google Fonts + 既存スタイル)
- Vercel Hosting

## ローカル開発
```bash
# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev
# http://localhost:3000 でアクセス
```

## デプロイ
```bash
# Vercelへデプロイ
npm run deploy
```

## 構成
- `app/page.tsx` - Next.js ホームエントリ
- `components/MandalaExperience.tsx` - 3D曼荼羅／UIロジック
- `app/globals.css` - 全体スタイル（Google Fonts + 既存CSSの取り込み）
- `public/` - 背景画像や既存HTML/アセットの公開ディレクトリ
- `vercel.json` - ヘッダ設定

## セクション構成
1. 音楽
2. 映像
3. 絵画
4. 写真
5. 思想（中央）
6. 言葉
7. 販売
8. ゲーム
9. リンク集

## Author
鈴木貴雅 (まるいそら)
