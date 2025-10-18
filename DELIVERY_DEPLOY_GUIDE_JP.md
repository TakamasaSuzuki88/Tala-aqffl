# 納品物設置・Vercelデプロイ手順

このドキュメントは、本Zipパッケージに含まれる Next.js プロジェクト「まるいそら - 3D Mandala Portfolio」を Vercel 環境へ設置・公開するための手順書です。Zip を展開した先のパスにいることを前提に説明します。

---

## 1. 同梱物の概要
- フレームワーク: Next.js 14 (App Router) + React 18 + TypeScript
- 3Dライブラリ: Three.js / GSAP
- ビルド先ホスティング: Vercel
- 重要フォルダ
  - `app/` … ルーティングとUIロジック
  - `components/` … 再利用コンポーネント
  - `public/` … 画像・静的アセット
  - `vercel.json` … Vercelヘッダ設定
  - `.vercel/` … Vercel CLI が生成するリンク情報（前回のプロジェクトIDが入っているので後述の手順で再リンクしてください）
- 生成物フォルダ（再生成推奨・Zipに残っている場合は削除可）
  - `node_modules/`
  - `.next/`

---

## 2. 事前準備
1. Node.js 18.17 以上（LTS 18.x または 20.x 推奨）  
   - バージョン確認: `node -v`
2. npm 9 以上（Node.js に同梱）  
   - バージョン確認: `npm -v`
3. Vercel アカウント（https://vercel.com）
4. Vercel CLI（後述の手順で `npx vercel` を使用する場合はインストール不要）

---

## 3. Zip 展開後のローカル確認
1. Zip を任意のフォルダに展開します。
2. 既存の `node_modules` と `.next` が含まれている場合は削除してから依存関係を再インストールするとクリーンです。  
   ```bash
   rm -rf node_modules .next
   ```
3. 依存インストール  
   ```bash
   npm install
   ```
4. 開発サーバー起動（確認用）  
   ```bash
   npm run dev
   ```
   ブラウザで `http://localhost:3000` を開き、画面が表示されれば準備OKです。終了する場合はターミナルで `Ctrl + C`。

---

## 4. Vercel へのデプロイ手順（Vercel CLI 利用）
Zip を納品する場合、ローカルから直接デプロイするのが最短です。以下では Vercel CLI を利用した流れを説明します。

### 4-1. Vercel CLI へのログイン
```bash
npx vercel login
```
メールまたはGitHub等でログインします。

### 4-2. プロジェクトの再リンク
Zip には `.vercel/project.json` が入っていますが、これは元の開発環境の Project ID を保持しています。新しい Vercel プロジェクトにリンクし直してください。
```bash
rm -f .vercel/project.json
npx vercel link
```
プロンプトが表示されるので、既存プロジェクトを選択するか、新規作成（`Create a new project`）を選んでください。  
※ オプションで `--project <新しいプロジェクト名>` を付けると対話なしで作成できます。

### 4-3. 環境変数の同期（必要に応じて）
本プロジェクトでは環境変数は利用していませんが、Vercel 側と同期する場合は以下で `.vercel/env.*` を生成します。
```bash
npx vercel pull
```

### 4-4. 動作確認ビルド
```bash
npm run build
```
エラーが出ないことを確認します。

### 4-5. デプロイ実行
テスト環境（Preview）へデプロイ:
```bash
npx vercel deploy --prebuilt
```
本番（Production）へ反映:
```bash
npx vercel deploy --prebuilt --prod
```
`package.json` に登録されている `npm run deploy` は `vercel --prod` を実行するショートカットです。

デプロイ完了後、表示されたURLでサイトを確認します。

---

## 5. Vercel ダッシュボードからのセットアップ（Git 連携を使う場合）
1. 任意のGitリポジトリ（GitHub / GitLab / Bitbucket）を新規作成し、展開済みフォルダをコミット・プッシュします。
2. Vercel ダッシュボードで `Add New... > Project` を選択し、対象リポジトリをインポートします。
3. Build & Output Settings はすべてデフォルトで問題ありません。  
   - Framework: `Next.js`  
   - Install Command: `npm install`  
   - Build Command: `npm run build`  
   - Output Directory: `.next`
4. `Environment Variables` は空欄で構いません。
5. `Deploy` を押すと自動でビルド・デプロイが実行されます。

---

## 6. 本番運用時のチェックリスト
- **キャッシュ設定**: `vercel.json` で `Cache-Control` ヘッダが設定済みです。追加調整が必要な場合はここを編集します。
- **カスタムドメイン**: Vercel ダッシュボードの `Settings > Domains` から独自ドメインを追加できます。
- **アクセス解析**: 必要であれば Vercel Analytics や他サービスを追加してください。
- **再デプロイ**: コンテンツ修正後は `npm run build` → `npx vercel deploy --prod` を実行するか、Git リポジトリに push すると自動デプロイされます。

---

## 7. トラブルシューティングメモ
- **ビルドが失敗する場合**: Node.js のバージョン違いや `node_modules` の破損が考えられます。`rm -rf node_modules .next` の後、`npm install` を再実行してください。
- **Vercel CLI が既存プロジェクトにリンクできない**: `.vercel` フォルダを削除してから `npx vercel link` をやり直します。
- **Next.js のバージョンが古いと警告される**: `package.json` の `next` バージョンに従って `npm install` を実行してください。互換性のない Node.js 16 系などはサポートされません。

以上で納品物を Vercel に設置して公開する手順は完了です。問題が発生した場合はログメッセージを添えてご相談ください。
