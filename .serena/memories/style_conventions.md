# Mandala 3D Website - スタイルとコーディング規約

## JavaScriptコーディング規約
- **命名規則**: camelCase（関数・変数）、PascalCase（クラス）
- **インデント**: スペース2つ
- **セミコロン**: 必須
- **引用符**: シングルクォート優先
- **const/let**: varは使用しない
- **アロー関数**: 可能な限り使用
- **async/await**: Promiseチェーンより優先

## CSSスタイル規約
- **命名規則**: kebab-case
- **クラス名**: BEM風（block__element--modifier）
- **順序**: ポジション → ボックスモデル → タイポグラフィ → 装飾
- **変数**: CSS変数を活用（--primary-color等）
- **単位**: rem優先、px許可、em控えめに

## HTMLマークアップ規約
- **セマンティック**: header, nav, main, section, article使用
- **アクセシビリティ**: alt属性、ARIA labels必須
- **data属性**: カスタムデータはdata-*形式

## ファイル構成
- **1ファイル1責任**: 機能ごとに分割
- **モジュール化**: 再利用可能なコンポーネント
- **命名**: 機能を明確に表す名前（video-page.js等）

## Three.js特有の規約
- **リソース管理**: 不要なオブジェクトはdispose()
- **パフォーマンス**: 60fps維持、メモリ使用量監視
- **テクスチャ**: 2の累乗サイズ推奨

## デザイントーン
- **カラー**:
  - Primary: Navy Blue (#1B2D5A)
  - Background: 和紙調（#f5f2ed）
  - Dark sections: #040914
  - Accent: 半透明白（rgba(255,255,255,0.9)）
- **フォント**: Noto Serif JP（700/500/400）
- **影**: 柔らかい影（blur 6px〜20px）
- **アニメーション**: 200ms〜600msの自然な遷移