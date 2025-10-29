# 設計文書

## 概要

TODOアプリケーションは、シンプルなWebアプリケーションとして実装します。フロントエンドのみの構成で、ローカルストレージを使用してデータを永続化します。モダンなJavaScript（ES6+）、HTML5、CSS3を使用してレスポンシブなユーザーインターフェースを構築します。

## アーキテクチャ

### 全体構成
- **フロントエンドのみ**: 静的なWebアプリケーション
- **データストレージ**: ブラウザのローカルストレージ
- **フレームワーク**: React with Vite（開発効率とモダンな開発体験のため）
- **アーキテクチャパターン**: コンポーネントベースアーキテクチャ

### 技術スタック
- **React 18**: コンポーネントベースのUI構築
- **Vite**: 高速な開発サーバーとビルドツール
- **TypeScript**: 型安全性と開発体験の向上
- **CSS Modules**: スコープ化されたスタイリング
- **ローカルストレージAPI**: データの永続化

### フレームワーク選択の理由
- **React**: コンポーネントの再利用性と状態管理の簡素化
- **Vite**: 高速な開発サーバーとHMR（Hot Module Replacement）
- **TypeScript**: バグの早期発見と保守性の向上
- **軽量構成**: Next.jsのような重いフレームワークは不要（SSRやルーティングが不要なため）

## コンポーネントとインターフェース

### 1. Task Type (`types/Task.ts`)
タスクデータの型定義

```typescript
interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;  // 期限日時（オプション）
}
```

### 2. TaskService (`services/TaskService.ts`)
タスクの CRUD 操作とローカルストレージとの連携を管理

**主要メソッド:**
- `addTask(title: string): Task`: 新しいタスクを作成
- `getTasks(): Task[]`: すべてのタスクを取得
- `updateTask(id: string, updates: Partial<Task>): Task`: タスクを更新
- `deleteTask(id: string): void`: タスクを削除
- `toggleTask(id: string): Task`: タスクの完了状態を切り替え

### 3. React Components

#### App (`App.tsx`)
アプリケーションのメインコンポーネント
- タスクの状態管理（useState）
- TaskServiceとの連携

#### TaskForm (`components/TaskForm.tsx`)
新しいタスクを追加するフォームコンポーネント
- 入力値の管理
- バリデーション
- タスク作成の処理

#### TaskList (`components/TaskList.tsx`)
タスクの一覧表示コンポーネント
- タスクの表示
- 空状態の処理

#### TaskItem (`components/TaskItem.tsx`)
個別のタスクを表示するコンポーネント
- 完了状態の切り替え
- 編集モード
- 削除機能

#### ErrorMessage (`components/ErrorMessage.tsx`)
エラーメッセージ表示用コンポーネント

#### DatePicker (`components/DatePicker.tsx`)
期限日時選択用コンポーネント
- 日付・時刻の入力
- バリデーション（過去日時の警告）
- クリア機能

#### TaskSorter (`components/TaskSorter.tsx`)
タスクソート機能コンポーネント
- 期限順、作成日順、タイトル順のソート
- 昇順・降順の切り替え

## データモデル

### Task オブジェクト
```javascript
{
  id: string,           // 一意識別子（UUID v4）
  title: string,        // タスクのタイトル
  completed: boolean,   // 完了状態
  createdAt: Date,     // 作成日時
  dueDate?: Date       // 期限日時（オプション）
}
```

### ローカルストレージ構造
```javascript
{
  "todos": [
    {
      "id": "uuid-string",
      "title": "タスクのタイトル",
      "completed": false,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "dueDate": "2024-01-15T23:59:59.000Z"  // オプション
    }
  ]
}
```

## エラーハンドリング

### 1. 入力検証エラー
- **空のタイトル**: 「タスクのタイトルを入力してください」
- **重複タスク**: 同じタイトルのタスクが既に存在する場合の警告

### 2. ストレージエラー
- **ローカルストレージ無効**: ブラウザでローカルストレージが無効な場合の代替処理
- **容量制限**: ストレージ容量が不足した場合の警告

### 3. 操作エラー
- **存在しないタスク**: 削除や更新対象のタスクが見つからない場合
- **ネットワークエラー**: 将来的な拡張に備えた基本的なエラーハンドリング

## テスト戦略

### 1. 単体テスト
- **Task クラス**: コンストラクタとプロパティの検証
- **TaskManager**: CRUD操作の正確性
- **ローカルストレージ操作**: 保存と読み込みの整合性

### 2. 統合テスト
- **UI とデータの連携**: ユーザー操作がデータに正しく反映されるか
- **ページリロード**: データの永続化が正しく動作するか

### 3. ユーザビリティテスト
- **レスポンシブデザイン**: 異なる画面サイズでの動作確認
- **アクセシビリティ**: キーボード操作とスクリーンリーダー対応

## ファイル構造

```
todo-app/
├── public/
│   └── index.html      # HTMLテンプレート
├── src/
│   ├── components/     # Reactコンポーネント
│   │   ├── TaskForm.tsx
│   │   ├── TaskList.tsx
│   │   ├── TaskItem.tsx
│   │   └── ErrorMessage.tsx
│   ├── services/       # ビジネスロジック
│   │   └── TaskService.ts
│   ├── types/          # TypeScript型定義
│   │   └── Task.ts
│   ├── styles/         # CSSファイル
│   │   ├── App.module.css
│   │   └── components/
│   ├── App.tsx         # メインアプリコンポーネント
│   └── main.tsx        # エントリーポイント
├── package.json        # 依存関係とスクリプト
├── tsconfig.json       # TypeScript設定
├── vite.config.ts      # Vite設定
└── README.md           # プロジェクト説明
```

## UI/UX 設計

### レイアウト
- **ヘッダー**: アプリケーションタイトル
- **入力エリア**: 新しいタスクの追加フォーム
- **タスクリスト**: 既存タスクの一覧表示
- **フッター**: 統計情報（総タスク数、完了数など）

### インタラクション
- **タスク追加**: Enterキーまたはボタンクリック
- **完了切り替え**: チェックボックスクリック
- **編集**: タスクタイトルのダブルクリック
- **削除**: 削除ボタンクリック

### レスポンシブデザイン
- **デスクトップ**: 最大幅800pxの中央配置
- **タブレット**: 画面幅に応じた調整
- **モバイル**: タッチフレンドリーなボタンサイズ