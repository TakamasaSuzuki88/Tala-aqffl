# 曼荼羅アーティストサイト - Figmaデザインシステム仕様書

## 🎯 プロジェクト概要
**名前**: 曼荼羅アーティスト_ポートフォリオサイト_v1.0  
**コンセプト**: 古文書調の温かみと現代的3Dインタラクションの融合  
**スタイル**: Vincent Gallo風アーティスティック + 和の美学

---

## 🎨 カラーパレット

### Primary Colors
```css
/* 古文書・温かい色調 */
--background-primary: #AA8F23;    /* 古文書ベース（現在使用中） */
--background-alt: #d4a574;        /* 提案された古文書色 */
--border-primary: #DC143C;        /* 深赤枠（現在使用中） */
--border-alt: #dc2626;           /* 提案された深赤 */

/* テキストカラー */
--text-primary: #1B2D5A;         /* 群青文字（現在の3Dボタン） */
--text-alt: #1e3a8a;            /* 提案された群青 */
--text-light: #FFFFFF;           /* 白文字 */
--text-gold: #FFD700;            /* ゴールドアクセント */

/* 3Dボタン基調色 */
--button-base: #FAF0E6;          /* ベージュ基調 */
```

### Functional Colors
```css
/* ダークテーマ */
--overlay-dark: rgba(15, 7, 6, 0.9);     /* 情報パネル背景 */
--overlay-light: rgba(255,255,255,0.1);  /* 軽いオーバーレイ */

/* エフェクト用 */
--shadow-chocolate: rgba(75, 45, 30, 0.5);  /* ダークチョコレート影 */
--glow-gold: rgba(255, 215, 0, 0.1);        /* ゴールド光彩 */

/* インタラクション */
--hover-accent: rgba(220, 20, 60, 0.1);     /* ホバー効果 */
--active-state: #DC143C;                    /* アクティブ状態 */
```

---

## 📝 タイポグラフィシステム

### 日本語フォント
```css
/* 和文メインフォント */
font-family: 'Noto Serif JP', serif;

/* 見出しスタイル */
.heading-xl {
  font-family: 'Cinzel', serif;
  font-size: 2.5rem;
  font-weight: 600;
  letter-spacing: 4px;
  color: #FFFFFF;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.heading-large {
  font-family: 'Cinzel', serif;
  font-size: 1.5rem;
  color: #FFD700;
  letter-spacing: 1px;
}

/* 3Dボタンテキスト */
.button-number {
  font-family: 'Arial', sans-serif;
  font-size: 90px;
  font-weight: bold;
  color: #1B2D5A;
  stroke: #FFFFFF 4px;
}

.button-label {
  font-family: 'Noto Serif JP', serif;
  font-size: 36px;
  font-weight: bold;
  color: #1B2D5A;
  stroke: #FFFFFF 4px;
}
```

### サブタイトル・キャプション
```css
.subtitle {
  font-size: 1.3rem;
  letter-spacing: 3px;
  color: #DC143C;
  font-weight: 700;
  text-transform: uppercase;
}

.caption {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  line-height: 1.6;
}
```

---

## 🧩 コンポーネントライブラリ

### 1. ナビゲーション3×3グリッド

#### Base Grid Container
```css
.mandala-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 0.1rem;
  width: 315px;  /* 3 × 105px */
  height: 315px;
  transform-style: preserve-3d;
}
```

#### Individual Grid Cell
```css
.grid-cell {
  width: 105px;
  height: 105px;
  background: #FAF0E6;
  border: 2px solid rgba(220, 20, 60, 0.3);
  position: relative;
  cursor: pointer;
  
  /* 3D効果 */
  transform-style: preserve-3d;
  transition: all 0.3s ease;
}

.grid-cell:hover {
  transform: translateZ(10px) rotateX(5deg) rotateY(5deg);
  border-color: #DC143C;
  box-shadow: 0 10px 20px rgba(75, 45, 30, 0.3);
}
```

#### セル状態バリエーション
```css
/* Default State */
.grid-cell--default { }

/* Active State */
.grid-cell--active {
  border-color: #DC143C;
  background: rgba(220, 20, 60, 0.1);
}

/* Hover State */
.grid-cell--hover {
  transform: translateZ(15px);
  border-color: #FFD700;
}
```

### 2. 古文書テクスチャ背景

#### メイン背景設定
```css
.ancient-document-bg {
  background: #AA8F23 url('./background.jpg') center center / cover no-repeat fixed;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

/* テクスチャオーバーレイ */
.texture-overlay {
  background: 
    radial-gradient(circle at 20% 50%, rgba(220, 20, 60, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.05) 0%, transparent 50%),
    linear-gradient(45deg, rgba(170, 143, 35, 0.1) 0%, transparent 50%);
}
```

### 3. コンテンツカード

#### ベーシックカード
```css
.content-card {
  width: 300px;
  height: 200px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(220, 20, 60, 0.3);
  border-radius: 8px;
  padding: 20px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.content-card:hover {
  border-color: #DC143C;
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(75, 45, 30, 0.2);
}
```

#### カード内テキスト
```css
.card-title {
  font-family: 'Cinzel', serif;
  font-size: 1.2rem;
  color: #FFD700;
  margin-bottom: 10px;
}

.card-content {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  line-height: 1.6;
}
```

### 4. ボタンコンポーネント

#### Primary Button
```css
.btn-primary {
  background: #DC143C;
  color: #FFFFFF;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 700;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: #B91C3C;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(220, 20, 60, 0.3);
}
```

#### Secondary Button
```css
.btn-secondary {
  background: transparent;
  color: #1B2D5A;
  border: 2px solid #1B2D5A;
  padding: 10px 22px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: #1B2D5A;
  color: #FFFFFF;
}
```

#### Play Button (円形)
```css
.btn-play {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 215, 0, 0.9);
  border: 2px solid #FFD700;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-play:hover {
  transform: scale(1.1);
  background: #FFD700;
  box-shadow: 0 5px 20px rgba(255, 215, 0, 0.4);
}
```

---

## 🎭 アニメーションライブラリ

### フェードイン効果
```css
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 3D回転効果
```css
@keyframes mandalaRotate {
  0% { transform: rotateZ(0deg); }
  100% { transform: rotateZ(360deg); }
}

.mandala-spin {
  animation: mandalaRotate 20s linear infinite;
}
```

### ホバー効果
```css
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-5px) translateZ(10px);
  box-shadow: 0 10px 25px rgba(75, 45, 30, 0.2);
}
```

---

## 📐 レイアウトシステム

### グリッドシステム
```css
.layout-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 40px;
}

.grid-3x3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 1rem;
}

.grid-center {
  display: grid;
  place-items: center;
  min-height: 100vh;
}
```

### フレックスレイアウト
```css
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

.flex-space-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

---

## 📱 レスポンシブデザイン

### ブレークポイント
```css
/* モバイル */
@media (max-width: 480px) {
  .mandala-grid {
    width: 240px;
    height: 240px;
  }
  
  .grid-cell {
    width: 75px;
    height: 75px;
  }
  
  .button-number { font-size: 60px; }
  .button-label { font-size: 24px; }
}

/* タブレット */
@media (max-width: 768px) {
  .mandala-grid {
    width: 280px;
    height: 280px;
  }
  
  .grid-cell {
    width: 90px;
    height: 90px;
  }
  
  .button-number { font-size: 75px; }
  .button-label { font-size: 30px; }
}

/* デスクトップ */
@media (min-width: 1200px) {
  .mandala-grid {
    width: 350px;
    height: 350px;
  }
  
  .grid-cell {
    width: 115px;
    height: 115px;
  }
}
```

---

## 🔧 実装ガイドライン

### Figmaでの作業手順

1. **新規ファイル作成**
   - 名前: 「曼荼羅アーティスト_ポートフォリオサイト_v1.0」
   - キャンバスサイズ: 1440×1024px

2. **カラーパレット登録**
   - 上記のカラーコードをLocal Stylesとして保存
   - Primary/Secondary/Functional別にグループ化

3. **テキストスタイル設定**
   - 全タイポグラフィをText Stylesとして登録
   - 日本語・英語・数字用に分類

4. **コンポーネント作成**
   - 3×3グリッドをメインコンポーネントとして作成
   - 各セルの状態バリエーション（Default/Hover/Active）を定義
   - ボタン・カード・パネル等をComponentsページで管理

5. **プロトタイプ設定**
   - 各セルのクリック遷移を設定
   - ホバー効果のアニメーション追加
   - オーバーレイパネルの表示/非表示設定

### デザイントークン
```json
{
  "colors": {
    "background": {
      "primary": "#AA8F23",
      "document": "#d4a574"
    },
    "text": {
      "primary": "#1B2D5A",
      "light": "#FFFFFF",
      "accent": "#FFD700"
    },
    "border": {
      "primary": "#DC143C",
      "secondary": "rgba(220, 20, 60, 0.3)"
    }
  },
  "typography": {
    "fontFamily": {
      "japanese": "Noto Serif JP",
      "decorative": "Cinzel",
      "ui": "Arial"
    },
    "fontSize": {
      "button-number": "90px",
      "button-label": "36px",
      "title": "2.5rem",
      "subtitle": "1.3rem"
    }
  }
}
```

---

## 🎯 次のステップ

1. ✅ カラーパレット確定
2. ✅ タイポグラフィシステム設計
3. ⏳ Figmaチャンネル「jyfbyerh」への参加
4. ⏳ コンポーネントライブラリ構築
5. ⏳ プロトタイプ作成
6. ⏳ デザインシステムの最終検証

---

*Created for Vincent Gallo-inspired artistic vision with Japanese aesthetic harmony*
