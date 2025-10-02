# Mandala 3D Website - Project Overview

## プロジェクト概要
**まるいそら** - 鈴木貴雅氏のマルチアーティスト活動を紹介する3D曼荼羅インタラクティブポートフォリオサイト

## 技術スタック
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **3D Graphics**: Three.js (CDN)
- **Animation**: GSAP
- **Build Tool**: Bun (CLAUDE.md指定)
- **Hosting**: Vercel
- **Type**: 静的サイト（SPAではない）

## プロジェクト構造
```
/
├── index.html          # メインページ（3D曼荼羅メニュー）
├── music-page.html     # 音楽ページ
├── movie/              # 映像ページ
├── painting/           # 絵画ページ
├── photo/              # 写真ページ
├── idea/               # 思想ページ
├── words/              # 言葉ページ
├── money/              # 販売ページ
├── game/               # ゲームページ
├── links/              # リンク集ページ
├── js/
│   ├── mandala-3d.js   # 3Dメニュー実装
│   ├── subpage.js      # サブページ共通機能
│   ├── video-page.js   # 映像ページ機能
│   └── youtube.js      # YouTube埋め込み
├── styles/
│   ├── main.css        # メインスタイル
│   ├── subpage.css     # サブページ共通スタイル
│   └── video.css       # 映像ページスタイル
├── content/            # JSONデータ
├── img/                # 画像アセット
└── mandala/            # 曼荼羅画像（01.jpg〜09.jpg）
```

## 主要機能
1. **3D曼荼羅ナビゲーション**: 9つのカテゴリを3D空間に配置
2. **インタラクティブメニュー**: マウス/タッチ操作での回転・ズーム
3. **レスポンシブデザイン**: PC/タブレット/スマホ対応
4. **アニメーション**: GSAPによるスムーズな遷移効果
5. **データ駆動型コンテンツ**: JSON管理による動的表示

## デザイン特徴
- **和紙調背景**: 日本的美意識の表現
- **半透明カード**: 上品で統一感のあるUI
- **黒基調セクション**: コントラストの効いた情報表示
- **Noto Serif JPフォント**: 読みやすさと和の雰囲気