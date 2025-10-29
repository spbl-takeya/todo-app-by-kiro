# TODO App by Kiro 📝

Kiro の AI アシスタントを使って、**SDD（Spec-Driven Development）**で開発したモダンな TODO アプリケーションです。

## 🎯 プロジェクトについて

このプロジェクトは、**Kiro IDE**の AI 機能を活用して、仕様駆動開発（SDD）のベストプラクティスを実践したものです。要件定義から設計、実装、テストまでの全工程を体系的に進めました。

### 🤖 Kiro AI との協働開発

- **要件定義**: EARS 形式での明確な受け入れ基準
- **設計文書**: アーキテクチャとコンポーネント設計
- **実装計画**: 段階的なタスク分解と進捗管理
- **コード実装**: TypeScript + React での型安全な開発

## ✨ 機能

### 📋 基本機能

- ✅ タスクの追加・編集・削除
- ✅ 完了状態の切り替え
- ✅ データの永続化（ローカルストレージ）

### ⏰ 期限管理

- ✅ 期限の設定・表示・編集
- ✅ 期限切れ・期限間近のアラート表示
- ✅ 期限順ソート機能

### 🎨 UI/UX

- ✅ レスポンシブデザイン（デスクトップ・タブレット・モバイル）
- ✅ ダークモード対応
- ✅ 日本語入力対応（IME 問題解決）
- ✅ 直感的なソート機能（4 種類）

## 🛠️ 技術スタック

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: CSS3（レスポンシブ・アニメーション）
- **Data Storage**: ローカルストレージ API
- **Development**: Kiro IDE + AI Assistant

## 📚 SDD 文書

このプロジェクトでは、実装前に完全な仕様書を作成しました：

- **[要件文書](/.kiro/specs/todo-app/requirements.md)**: 7 つの機能要件（EARS 形式）
- **[設計文書](/.kiro/specs/todo-app/design.md)**: アーキテクチャとコンポーネント設計
- **[実装計画](/.kiro/specs/todo-app/tasks.md)**: 11 のタスクと進捗管理

## 🚀 セットアップ

### 前提条件

- Node.js 18 以上
- npm または yarn

### インストール・実行

```bash
# リポジトリをクローン
git clone https://github.com/spbl-takeya/todo-app-by-kiro.git
cd todo-app-by-kiro

# 依存関係をインストール
cd todo-app
npm install

# 開発サーバーを起動
npm run dev
```

### ビルド

```bash
# 本番用ビルド
npm run build

# ビルド結果をプレビュー
npm run preview
```

## 🎓 SDD（Spec-Driven Development）について

このプロジェクトで実践した SDD は以下の流れで進めました：

1. **📋 要件定義**: ユーザーストーリーと受け入れ基準の明確化
2. **🎨 設計**: アーキテクチャとコンポーネント設計
3. **📝 実装計画**: タスクの分解と優先順位付け
4. **⚡ 実装**: 段階的な機能開発
5. **🔄 反復**: フィードバックに基づく改善

### SDD の利点

- **品質向上**: 事前の設計により実装品質が向上
- **効率化**: 明確な仕様により開発効率が向上
- **保守性**: 文書化により保守・拡張が容易
- **コミュニケーション**: チーム間の認識齐一

## 🤝 Kiro IDE について

[Kiro](https://kiro.ai)は、AI 機能を内蔵した次世代の IDE（統合開発環境）です：

- **AI Assistant**: コード生成・レビュー・リファクタリング
- **Spec Management**: 仕様書の作成・管理・実装追跡
- **Smart Completion**: コンテキストを理解したコード補完
- **Collaborative Development**: AI との協働開発体験

## 📄 ライセンス

MIT License

このプロジェクトは学習・デモ目的で作成されました。

## 🙏 謝辞

このプロジェクトは、Kiro IDE の AI 機能を活用して開発されました。SDD（Spec-Driven Development）の実践例として、要件定義から実装まで体系的に進めることができました。
