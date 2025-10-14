# Mandala 3D Website - Product Requirements Document (PRD)

## Executive Summary

### Product Vision
Create an immersive web platform that democratizes 3D mandala art creation, enabling users to generate, customize, and share stunning geometric patterns through an intuitive browser-based interface.

### Target Audience
- **Primary**: Digital artists, designers, and creative professionals (ages 25-45)
- **Secondary**: Art enthusiasts, meditation practitioners, educators
- **Tertiary**: Casual users interested in creative expression

### Success Metrics
- 10,000+ monthly active users within 6 months
- 50,000+ mandalas created in first year
- 3+ minute average session duration
- 30% monthly retention rate
- 4.5+ app store rating

## Navigation Structure

### Top Menu Configuration

```
┌─────────────────────────────────────────────────────────────────┐
│  [Logo]  Create  Explore  Templates  Community  Learn  [User]   │
└─────────────────────────────────────────────────────────────────┘
```

#### 1. Logo/Brand
- **Position**: Far left
- **Action**: Click returns to homepage
- **Design**: 3D animated mandala icon + "Mandala3D" text

#### 2. Create (Primary CTA)
- **Sub-menu**:
  - Quick Start (guided creation)
  - From Template
  - Advanced Editor
  - Import Design
- **Highlight**: Primary button styling
- **Access**: Free with limitations, full access for registered users

#### 3. Explore
- **Sub-menu**:
  - Trending Now
  - Featured Artists
  - Categories
    - Geometric
    - Floral
    - Abstract
    - Traditional
  - Collections
  - Recent
- **Filters**: Style, complexity, colors, date

#### 4. Templates
- **Sub-menu**:
  - Beginner Friendly
  - Popular Templates
  - Seasonal
  - By Style
  - Community Templates
- **Features**: Preview on hover, one-click customization

#### 5. Community
- **Sub-menu**:
  - Activity Feed
  - Challenges
  - Artists Spotlight
  - Forums
  - Events
- **Engagement**: Comments, likes, shares, follows

#### 6. Learn
- **Sub-menu**:
  - Getting Started
  - Video Tutorials
  - Tips & Tricks
  - Mandala History
  - API Documentation
- **Content**: Interactive tutorials, documentation

#### 7. User Menu (Right)
- **Logged Out**:
  - Sign In
  - Sign Up
  - Try Demo
- **Logged In**:
  - Profile avatar
  - My Creations
  - Favorites
  - Settings
  - Upgrade (if free tier)
  - Sign Out

### Mobile Navigation
```
┌─────────────────────────┐
│ ☰  Mandala3D    [User]  │  <- Hamburger menu
└─────────────────────────┘
```

## Core Features

### 1. 3D Mandala Creator

#### Feature Requirements
- **Real-time 3D Preview**: Instant visual feedback
- **Parameter Controls**:
  - Complexity (1-10 scale)
  - Symmetry (3-24 fold)
  - Layers (1-10 layers)
  - Depth (2D/2.5D/3D)
  - Animation speed
- **Tools**:
  - Shape library (50+ base shapes)
  - Pattern brushes
  - Color palettes
  - Texture mapping
  - Lighting controls

#### User Interface
```
┌──────────────────────────────────────────────────┐
│  Toolbar                                         │
├──────────┬───────────────────────────────────────┤
│          │                                       │
│  Tools   │         3D Viewport                   │
│  Panel   │                                       │
│          │                                       │
├──────────┼───────────────────────────────────────┤
│          │  Parameters Panel                     │
└──────────┴───────────────────────────────────────┘
```

### 2. User Dashboard

#### Sections
1. **My Creations**
   - Grid/List view toggle
   - Sort by: Date, Popularity, Name
   - Quick actions: Edit, Share, Delete, Duplicate
   - Folders/Collections organization

2. **Analytics**
   - Total views
   - Likes and shares
   - Trending creations
   - Follower growth

3. **Activity Feed**
   - New followers
   - Comments on creations
   - Mentions
   - Challenge invitations

### 3. Social Features

#### Interaction Model
- **Like**: Single click, animated heart
- **Share**: Social media integration, embed codes
- **Comment**: Threaded discussions, @mentions
- **Follow**: Artist following system
- **Remix**: Fork and modify others' creations

#### Community Features
- **Challenges**: Weekly/monthly themed contests
- **Collaborations**: Real-time co-creation
- **Groups**: Interest-based communities
- **Showcases**: Virtual exhibitions

### 4. Template System

#### Template Categories
1. **Starter Templates** (10 free)
2. **Premium Templates** (50+ for pro users)
3. **Seasonal Templates** (rotating selection)
4. **Community Templates** (user-submitted)

#### Template Features
- One-click customization
- Parameter presets
- Style transfer
- Batch variations

## User Flows

### 1. First-Time User Flow
```
Landing Page → Try Demo → Create First Mandala → 
→ Sign Up Prompt → Save Creation → Share → Explore Gallery
```

### 2. Creation Flow
```
Click Create → Choose Method → 
├─ Quick Start → Guided Tutorial → Parameter Selection → Generate
├─ From Template → Select Template → Customize → Generate
└─ Advanced → Full Editor → Manual Creation → Generate
→ Preview → Fine-tune → Save → Share/Export
```

### 3. Discovery Flow
```
Explore → Browse/Search → Filter Results → 
→ View Mandala → Interact (Like/Comment) → 
→ View Artist Profile → Follow → View More Works
```

### 4. Social Interaction Flow
```
View Creation → Like → Comment → Share → 
→ Remix → Create Variation → 
→ Post to Community → Receive Feedback
```

## Feature Specifications

### Creation Tools

#### Basic Tools (Free Tier)
- 5 complexity levels
- 8-fold symmetry maximum
- 3 layers maximum
- Basic color palettes (10)
- Standard shapes (20)
- PNG export (1080p)

#### Advanced Tools (Pro Tier)
- 10 complexity levels
- 24-fold symmetry
- 10 layers
- Custom color palettes
- All shapes (50+)
- Custom shape upload
- Vector export (SVG)
- 4K export
- GLB/GLTF export
- Animation export (MP4)

### Export Options

#### Formats
1. **Image**: PNG, JPG, WebP
2. **Vector**: SVG, PDF
3. **3D**: GLB, GLTF, OBJ
4. **Animation**: MP4, GIF, WebM
5. **Code**: JSON parameters, JavaScript

#### Resolutions
- **Free**: Up to 1080p
- **Pro**: Up to 8K
- **Custom**: User-defined dimensions

### Collaboration Features

#### Real-time Collaboration
- Multiple cursors
- Live parameter sync
- Voice chat integration
- Change history
- Version control

#### Asynchronous Collaboration
- Comments on specific elements
- Suggested edits
- Fork and merge
- Approval workflows

## User Personas

### 1. Creative Professional - "Sarah"
- **Age**: 32
- **Occupation**: Graphic Designer
- **Goals**: Create unique patterns for client projects
- **Pain Points**: Expensive software, steep learning curves
- **Features Needed**: High-res exports, commercial license, API access

### 2. Art Enthusiast - "Michael"
- **Age**: 45
- **Occupation**: Teacher
- **Goals**: Explore and create art for relaxation
- **Pain Points**: Limited artistic skills, time constraints
- **Features Needed**: Templates, guided creation, tutorials

### 3. Social Creator - "Emma"
- **Age**: 28
- **Occupation**: Content Creator
- **Goals**: Share unique content, build following
- **Pain Points**: Content saturation, engagement
- **Features Needed**: Social features, trends, challenges

## Accessibility Requirements

### WCAG 2.1 AA Compliance
- **Keyboard Navigation**: Full functionality without mouse
- **Screen Reader Support**: ARIA labels, semantic HTML
- **Color Contrast**: 4.5:1 minimum ratio
- **Focus Indicators**: Visible focus states
- **Alternative Text**: Descriptions for all visual elements

### Accessibility Features
- **Reduced Motion**: Option to disable animations
- **High Contrast Mode**: Alternative color schemes
- **Text Scaling**: Support up to 200% zoom
- **Voice Control**: Basic voice commands
- **Simplified Mode**: Reduced complexity interface

## Performance Requirements

### Load Times
- **Initial Load**: <3 seconds on 3G
- **Time to Interactive**: <5 seconds
- **3D Scene Load**: <2 seconds
- **Export Generation**: <10 seconds for 4K

### Rendering Performance
- **Frame Rate**: 60fps on modern devices
- **Mobile**: 30fps minimum on mid-range phones
- **Memory Usage**: <500MB for typical session
- **Battery Impact**: <10% drain per hour on mobile

## Business Model

### Pricing Tiers

#### Free Tier
- 10 mandalas per month
- Basic tools and shapes
- 1080p exports
- Community features
- Watermarked exports

#### Pro Tier ($9.99/month)
- Unlimited creations
- All tools and shapes
- 4K exports
- No watermarks
- Priority support
- Commercial license

#### Team Tier ($29.99/month)
- Everything in Pro
- 5 team members
- Collaboration tools
- Admin dashboard
- API access
- Custom branding

### Revenue Streams
1. **Subscriptions**: Monthly/annual plans
2. **One-time Exports**: Pay-per-export for free users
3. **Premium Templates**: Marketplace for designers
4. **API Access**: Developer tier for integrations
5. **White Label**: Custom deployments for enterprises

## Success Criteria

### Launch (Month 1)
- [ ] 1,000 registered users
- [ ] 500 mandalas created
- [ ] 50 social shares
- [ ] 4.0+ user satisfaction

### Growth (Month 6)
- [ ] 10,000 registered users
- [ ] 5% paid conversion
- [ ] 10,000 mandalas created
- [ ] 1,000 daily active users

### Scale (Year 1)
- [ ] 50,000 registered users
- [ ] 10% paid conversion
- [ ] 100,000 mandalas created
- [ ] 5,000 daily active users
- [ ] Break-even on operational costs

## Risk Mitigation

### Technical Risks
- **Browser Compatibility**: Progressive enhancement strategy
- **Performance Issues**: Aggressive optimization, CDN usage
- **Scalability**: Microservices architecture, auto-scaling

### Business Risks
- **Low Adoption**: Free tier, viral features, influencer partnerships
- **Competition**: Unique features, community focus, rapid iteration
- **Monetization**: Multiple revenue streams, iterative pricing

## Implementation Priorities

### Phase 1: MVP (Weeks 1-8)
1. Core 3D engine
2. Basic creation tools
3. User authentication
4. Save/load functionality
5. Basic sharing

### Phase 2: Social (Weeks 9-12)
1. User profiles
2. Gallery/exploration
3. Social interactions
4. Comments system
5. Following system

### Phase 3: Monetization (Weeks 13-16)
1. Payment integration
2. Subscription management
3. Premium features
4. Export options
5. Template marketplace

### Phase 4: Scale (Weeks 17-20)
1. Performance optimization
2. Mobile app
3. API development
4. Analytics dashboard
5. Enterprise features

## Competitive Analysis

### Direct Competitors
1. **Mandala Maker Online**
   - Strengths: Simple, free
   - Weaknesses: 2D only, limited features
   - Opportunity: 3D capabilities, social features

2. **Sacred Geometry Generator**
   - Strengths: Mathematical precision
   - Weaknesses: Complex UI, expensive
   - Opportunity: User-friendly, affordable

### Indirect Competitors
1. **Canva**: General design tool
2. **Adobe Illustrator**: Professional vector graphics
3. **Procreate**: Digital art creation

### Competitive Advantages
1. **3D Visualization**: Unique in mandala space
2. **Browser-Based**: No installation required
3. **Social Features**: Community-driven platform
4. **Accessibility**: Beginner to professional
5. **Fair Pricing**: Affordable subscription model

## Conclusion

The Mandala 3D Website represents a unique opportunity to democratize geometric art creation through innovative 3D visualization and social features. By focusing on user experience, community engagement, and technical excellence, we can establish a leading position in the digital mandala creation space.

## 開発履歴・実装記録

### 2024年9月9日 - 3D Menu改善 & Figma統合試行

#### ✅ 完了済み機能
1. **3D Mandala Menu 最適化**
   - 画像マッピング実装 (`/mandala/01.jpg` ~ `/mandala/09.jpg`)
   - シャドウエフェクト簡素化・最適化
   - テキストスタイル改善 (Navy Blue #1B2D5A + 白アウトライン)
   - カメラ移動制限実装

2. **技術基盤整備**
   - Three.js テクスチャマッピング
   - Canvas API グラデーション生成
   - GSAP アニメーション最適化

#### ❌ 未完了・技術的制約
1. **Figma MCP統合**
   - WebSocketプロトコル互換性問題
   - `data.id undefined` エラー未解決
   - 代替手動デザイン作成ガイド提供済み

#### 📊 技術スペック
- **ファイル**: `js/mandala-3d.js` (550+ lines, 修正済み)
- **アセット**: 9個のJPG画像 + 9個のSVG
- **レンダリング**: WebGL/Three.js, 60fps
- **ブラウザ互換性**: Modern browsers (Chrome, Firefox, Safari)

#### 🔮 次期開発推奨事項
1. **パフォーマンス**: WebP変換、遅延読み込み
2. **モバイル対応**: レスポンシブ3Dビューポート
3. **アクセシビリティ**: キーボードナビゲーション

詳細は `DEVELOPMENT_LOG.md` を参照。

### 2025年9月18日 - 音楽/映像ページ刷新とサブページ共通化

#### ✅ 完了済みタスク
1. **映像ページ「Filmography」刷新**
   - ヒーロー、セクション、カードを音楽ページのデザイン言語に統一。
   - 代表映像、全映像グリッド、チャンネル一覧を半透明カード＋和紙調フレームで再構成。
   - YouTubeサムネ自動取得・タグフィルタ・チャンネルリスト表示を `content/video.json` と `js/video-page.js` でデータ駆動化。
2. **サブページ共通要素整備**
   - 絵画/写真/思想/言葉/販売/ゲーム/リンク集ページを一括作成。
   - 背景画像を各ページ固有に指定しつつ、ヒーローのタイポグラフィとフェード演出を統一。
   - フッターを音楽ページと同じ3カラム構成・カラートーンへ統一。
3. **ナビゲーション改善**
   - 右上曼荼羅ナビに各番号のリンク先を紐づけ、200msフェードで遷移可能に。
   - 「曼荼羅ホーム」ラベルをクリック/Enterでトップメニューへ戻れるよう実装。
   - 3Dメニューの映像ボタン遷移先調整（`movie/index.html`）と全ページのフェード速度統一。

#### ❌ 保留・課題
1. **映像ページの実データ拡充**
   - `content/video.json` のプレースホルダ（Excerpt/Short等）に実URLが未設定。
2. **グローバルアクセシビリティ**
   - サブページ本文コンテンツが未整備。カードのみ構成のため、今後テキスト/CTAの整備が必要。

#### 📊 変更影響
- **追加ファイル**: `content/video.json`, `styles/video.css`, `js/video-page.js`, 各セクション用HTML。
- **主要変更**: `music-page.html`, `js/subpage.js`, `styles/subpage.css`, `js/mandala-3d.js`。
- **確認事項**: 200msフェード遷移、フィルタ機能、フッターのカラー/幅が全ページで統一されているか。

### 2025年9月21日 - 映像データ統合とナビゲーション改称

#### ✅ 完了済みタスク
1. **映像ページの静的＋動的構成統合**
   - 上部に映画予告編と各プレイリストの紹介カードを追加。
   - `content/video.json` の `featured`/`items` を再編成し、予告編・MV・プレイリスト・公式チャンネルを集約。
   - `js/video-page.js` のタグを `Trailer/Playlist/Channel` などに更新し、チャンネル専用セクションを廃止。
2. **音楽ページ再調整**
   - 旧「MV」セクションを削除し、ライブビデオプレイリストのみを紹介するカードへ刷新。
3. **グローバル表記更新**
   - サイト内の「マネタイズ」を「販売」に改称（ナビゲーション、3Dメニュー、ドキュメント、テストページ）。

#### 🔍 残課題
- `Channel` タグのカード向けに専用サムネイルを用意する（現在は予告編サムネイルを流用）。
- `content/video.json` に今後追加する動画のタグ運用ルールをREADMEか運用メモに追記する。

### 2025年9月22日 - メインメニュー透かし強化とタイポグラフィ統一

#### ✅ 完了済みタスク
1. **トップメニュー透かしの品質向上**
   - 影の半径と不透明度を再設計し、「A案（濃度アップ）」と「B案（面積拡大）」を合わせて実装。
   - 和紙地になじむブラー（6px）のまま輪郭がぼやけないよう勾配カーブを調整。
2. **カテゴリ表記の統一**
   - 3Dメニューと各サブページのナビゲーションから番号を撤廃し、カテゴリ名のみを表示。
   - ラベルのフォントサイズ・スプライト倍率・テクスチャ透明度を見直し、読みやすさと上品さを両立。
3. **サブページナビとの質感調整**
   - 音楽ページと共通スタイルで枠線の不透明度を引き下げ（0.6→0.4）、トップメニューと質感を共通化。
   - React版 `MandalaGrid` コンポーネントでもラベルスタイルを更新し、将来のNext移行時に同じ見た目を再現可能に。
4. **モバイル可読性の最適化**
   - ビューポート幅768px以下の場合にラベルフォントを約20%拡大し、白縁を太く調整。
   - スプライト倍率をモバイル時のみ1.08倍へ引き上げ、小画面でもカテゴリ名が判読しやすい表示に。
5. **思想ページ背景の統一**
   - `body.page-idea` の背景をトップページと同じ `background.jpg` に変更し、ブランドイメージの一貫性を確保。

#### 📊 影響範囲
- **変更ファイル**: `js/mandala-3d.js`, `music-page.html`, `styles/subpage.css`, `components/MandalaGrid.tsx`。
- **確認ポイント**: 各ページ右下（または右上）のナビラベルがすべてカテゴリ名のみで表示され、影がにじまないこと。
- **デプロイ**: `https://mandala-3d-website-58ft0gmkr-louis-projects-c066f8cc.vercel.app` に反映済み。

### 2025年9月24日 - VR体験導線拡充とリンク集グループ掲載

#### ✅ 完了済みタスク
1. **3Dメニューの文字視認性を再調整**
   - `js/mandala-3d.js` のラベル描画をリファクタリングし、Webフォント読み込み完了後にスプライトを再生成する仕組みを導入。
   - フォントは `Noto Serif JP` 700へ統一し、塗りを #040914 に設定。白アウトラインは4pxで維持し、濃さを担保しつつ太さを抑制。
   - フォント読み込み待機を700ウェイトに絞り、フォールバック描画が発生しないようリトライ制御を実装。
2. **ゲームページのVR紹介を拡張**
   - 音楽/映像ページと同じカードレイアウト (`styles/video.css`) を適用し、VR体験カードを再構成。
   - 鈴木たかまさVR美術館カードに代表スクリーンショットを追加し、活動履歴・展示点数・使用機材・BGM情報を記載。
   - clusterワールドへの導線をボタン化し、アプリインストール案内と横スクロール式ギャラリーを追加。
3. **リンク集ページにFacebookグループを掲載**
   - ヒーローテキストに改行を挿入し、コピーの可読性を改善。
   - Facebookグループ（三件）をカード形式で紹介するセクションを新設。コミュニティの活動内容が把握できる説明文を追加。

#### ❌ 保留・課題
1. **VRギャラリー画像の軽量化**
   - `img/game/*.jpeg` は高解像度のまま。WebP変換とリサイズを検討。
2. **Facebookグループ文面の確定**
   - クライアント確認後、必要に応じて説明文・順序を再調整予定。

#### 📊 変更影響
- **主要変更ファイル**: `js/mandala-3d.js`, `game/index.html`, `styles/video.css`, `links/index.html`, `styles/subpage.css`。
- **確認ポイント**: 3Dメニューの文字濃度／アウトライン、ゲームページのCTAとVRギャラリー、リンク集カードのレイアウト。

### 2025年9月30日 - トップページ黒基調フィードセクション仮実装

#### ✅ 完了済みタスク
1. **トピック/ニュース/クレジットセクションの静的配置**
   - 3Dヒーロー直下に黒ベースのカードレイアウトを追加し、参照サイトに合わせた色味とタイポグラフィを適用。
   - ピン留め・公開予定・外部リンクなどのラベル挙動を静的データで再現し、フォーカスリングとホバー振る舞いを確認可能に。
2. **余白とレイヤー調整**
   - Hero影が隠れないよう `hero-spacer` を再定義し、セクション間の間隔をモバイル/PC両方で最適化。
   - クレジットを独立セクションとして配置し、サイト下部の黒帯に自然に収まるようスタイルを統一。

#### 📌 次のステップ
- 現行見た目の合意後、同コンポーネントをNext.js構成へ移植しデータソース化する。
- PC/スマホ実機での余白・コントラストの最終確認をクライアント側で実施。

### 2025年10月2日 - 絵画/写真ギャラリー再構築・販売ページ更新

#### ✅ 完了済みタスク
1. **絵画ギャラリーの二層構造実装**
   - `painting/index.html` に代表作/アーカイブのタブ切り替えを導入し、`content/paintings.json` を生成して番号とタイトルを一元管理。
   - `styles/subpage.css` へ透明度・角丸無し・黒タブなど映画ページ準拠のスタイル調整を反映。
2. **写真ギャラリーのデータ駆動化**
   - `img/写真` 配下の画像から `content/photos.json` を再生成し、`F-###` IDと `Flux ###` ラベルで整理。
   - `photo/index.html` に絵画ページと同フォーマットのタブUI、黒ボタン、透明カード、行分けコピーを適用。
   - 「さらに表示」ボタンを黒基調の直角ボタンへ変更。
3. **販売ページリンク整備**
   - `money/index.html` に音楽ダウンロードカードを追加し、Apple Music／レコチョク／mora／dミュージックへの導線を掲載。
   - グッズ枠を「COMING SOON」表示で追加し、将来更新に備えた。
4. **アセット整備**
   - HEIC形式だった絵画画像（P-077/P-080）をJPG化し、`content/paintings.json` の参照パスを更新。
5. **写真ギャラリーの表示安定化**
   - 遅延読み込み用のラッパーを撤去し、カード構造を絵画ギャラリーと同じ軽量構成へ整理。ホバー時の番号重複表示と未読込問題を解消。
   - ラベル表示を `F-###` の単行コードに統一し、絵画ページと同じキャプション構成へ揃えた。

#### 📌 次のステップ
- 絵画・写真ギャラリー両ページをブラウザで再確認し、Lazy Load挙動や画像表示をユーザー側で検証。
- グッズ情報確定後、販売ページに商品カードを追加予定。

### 2025年10月5日 - 思想/言葉コンテンツ更新と映像導線強化

#### ✅ 完了済みタスク
1. **思想ページの本番テキスト反映**
   - `idea/index.html` にソラ氏から提供されたアーティストステートメントと年表・横断メモを掲載。
   - 新設した `idea-section` 系スタイルを `styles/subpage.css` に追加し、長文でも可読性を保てるレイアウトを整備。
2. **ブログ名称の統一とフッター類の同期**
   - 「Sharp Snow」表記を全ページで「旧まるいそら音楽出版／同アーカイブ」に差し替え、`words/index.html` と各サブページのフッターを更新。
   - 言葉ページのヒーロー文言を2行構成に変更し、クライアント memo と一致させた。
3. **トップページのレイアウト調整**
   - `styles/main.css` のヒーロースペーサーと `info-section` マージンを拡張し、PC表示時にトピックとニュースが重ならないよう修正。
4. **音楽ページのライブビデオ更新**
   - 指定3本の YouTube プレイリスト（`PLDOzaZxFAdjruP60mFkCw1VNY1Duz3huN` など）をカード化し、oEmbed API からサムネイルとタイトルを取得して自動表示。
   - フォールバック画像とローディングアニメーションを実装し、`content/video.json` にタグ「Film」追加などデータ構造も同期。
5. **映像ページの映画・MVセクション再構成**
   - 予告編に続けて日本語/英語字幕本編カードを追加し、ライブビデオとミュージックビデオのプレイリスト導線を整理。
   - 映像ページのライブビデオサムネイルも oEmbed で取得し、プレイリストと同一サムネイルを使用。

#### 📌 次のステップ
- ライブビデオカードの動的サムネイルが本番環境でも正しく取得できるか、ネットワーク遮断時のフォールバック表示をあわせて確認。
- 映像ページの本編カード追加に伴うアクセス解析や再生フローへの影響をモニタリング。

### 2025年10月10日 - ナビゲーション修正・TOPIC/NEWSリンク無効化・レイアウト最適化

#### ✅ 完了済みタスク
1. **3Dマンダラナビゲーションの修正**
   - `public/js/mandala-3d.js` の transition overlay 参照を修正し、`page-overlay` へのフォールバック機能を追加。
   - 全てのサブページへのhrefパスを絶対パス（`/painting/index.html` など）に統一。
   - `next.config.mjs` に rewrites 設定を追加し、静的HTMLファイルの適切なルーティングを確保。
2. **TOPIC/NEWSセクションのリンク無効化**
   - `public/legacy-index.html` のTOPICセクション全6記事のリンクを `<div class="home-feed__link--static">` に変更してクリック不可に。
   - NEWSセクションの内部リンク7件を無効化、外部リンク（note.com）のみ有効のまま維持。
   - 「もっと見る」リンクをTOPIC/NEWS両セクションから削除。
3. **レイアウトスペーシングの最適化**
   - `.hero-spacer` の高さを 30px → 20px に調整し、TOPICセクションをページ上部に寄せた。
   - `.home-feed + .home-feed` のマージンを 30px → 0 に変更し、TOPICとNEWSブロックを密着。
   - `.home-feed__container` のマージンを `0 auto` → `0` に変更して左端寄せを実現。
   - `.home-footer` のスペーシングを最小化：`margin-top: 12px`、`padding: 24px 0 20px`。
   - `.footer-grid` の余白を縮小：`margin-bottom: 16px`、`padding-top: 12px`、`gap: 24px`。
4. **フッターブログリンクの名称統一**
   - 全ページのフッターで3つのブログリンク名を最終仕様に統一：
     - 「まるいそらブログ」
     - 「Sharp Snow ART Houseブログ」
     - 「旧まるいそら音楽出版アーカイブ」
5. **フッタータイトルの左寄せ修正**
   - `public/styles/subpage.css` と `public/styles/main.css` の `.footer-section h3` に `text-align: left` を追加。
   - `public/music-page.html` のインラインCSSも同様に修正。

#### 📊 変更影響
- **主要変更ファイル**:
  - `public/js/mandala-3d.js` - ナビゲーション修正
  - `public/legacy-index.html` - TOPIC/NEWSリンク無効化
  - `public/styles/main.css` - レイアウトスペーシング最適化
  - `next.config.mjs` - 静的HTMLルーティング追加
  - `components/FooterSocials.tsx` - Reactコンポーネントのフッターリンク名更新
  - 全HTMLファイル（10ファイル）- フッターブログリンク名の一括更新
- **確認ポイント**:
  - トップページMandalaボタンから各サブページへの遷移動作
  - TOPIC/NEWSセクションの記事がクリック不可（note.comリンクを除く）
  - セクション間の余白が最小化され、左端寄せになっていること
  - フッターの余白が詰まり、ブログリンク名が統一されていること
- **デプロイ**: Production URL で確認可能（ビルド完了後）

#### 📌 次のステップ
- Vercelデプロイ完了後、本番環境で全ナビゲーションとレイアウトの最終確認。
- Gitリポジトリの画像ファイル履歴クリーンアップ（12コミット先行問題の解決）。
