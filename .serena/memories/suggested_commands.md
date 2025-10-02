# Mandala 3D Website - 推奨コマンド

## 開発コマンド（Bun使用）
```bash
# 依存関係インストール
bun install

# 開発サーバー起動
bun run dev
# または
npx serve .

# ビルド（静的サイトのため不要）
bun run build

# プレビュー
bun run preview

# サーバー起動（ポート3000）
bun run start
```

## デプロイメント
```bash
# Vercelへの本番デプロイ
bun run deploy
# または
vercel --prod
```

## テストページ
```bash
# テスト用HTMLファイル
# - test-images.html: 画像表示テスト
# - test-texture.html: テクスチャテスト
```

## Git操作
```bash
# ステータス確認
git status

# ブランチ確認
git branch

# 変更確認
git diff

# コミット履歴
git log --oneline -10
```

## ファイル操作（macOS/Darwin）
```bash
# ディレクトリ一覧
ls -la

# ファイル検索
find . -name "*.js" -type f

# テキスト検索（ripgrep推奨）
rg "pattern" --type js

# ファイル監視
fswatch -o . | xargs -n1 -I{} echo "File changed"
```

## 開発時の確認事項
1. Bunを優先使用（Node.js/npm/pnpmより）
2. 静的サイトのためビルド不要
3. .envは自動読み込み（dotenv不要）
4. HTMLインポートでReact/CSS/Tailwind対応可能