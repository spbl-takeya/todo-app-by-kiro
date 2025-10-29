import { useState } from "react";
import type { Task } from "../types/Task";

interface TaskItemProps {
  /** 表示するタスク */
  task: Task;
  /** タスクの完了状態切り替え時のコールバック */
  onToggle: (id: string) => void;
  /** タスク削除時のコールバック */
  onDelete: (id: string) => void;
  /** タスク更新時のコールバック */
  onUpdate: (id: string, updates: Partial<Task>) => void;
}

/**
 * 個別タスクを表示するコンポーネント
 * チェックボックスによる完了状態切り替え、インライン編集、視覚的区別に対応
 */
export function TaskItem({
  task,
  onToggle,
  onDelete,
  onUpdate,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [isComposing, setIsComposing] = useState(false);

  /**
   * チェックボックス変更処理
   */
  const handleToggle = () => {
    onToggle(task.id);
  };

  /**
   * 削除ボタンクリック処理
   * 確認ダイアログを表示してから削除
   */
  const handleDelete = () => {
    const confirmed = window.confirm(`「${task.title}」を削除しますか？`);
    if (confirmed) {
      onDelete(task.id);
    }
  };

  /**
   * ダブルクリックで編集モードに切り替え
   */
  const handleDoubleClick = () => {
    if (!task.completed) {
      setIsEditing(true);
      setEditTitle(task.title);
    }
  };

  /**
   * 編集を保存
   */
  const handleSaveEdit = () => {
    const trimmedTitle = editTitle.trim();

    // バリデーション: 空のタイトルチェック
    if (!trimmedTitle) {
      // 空の場合は元のタイトルに戻す
      setEditTitle(task.title);
      setIsEditing(false);
      return;
    }

    // 長さ制限チェック
    if (trimmedTitle.length > 100) {
      // 長すぎる場合は元のタイトルに戻す
      setEditTitle(task.title);
      setIsEditing(false);
      return;
    }

    // 変更がある場合のみ更新
    if (trimmedTitle !== task.title) {
      onUpdate(task.id, { title: trimmedTitle });
    }
    setIsEditing(false);
  };

  /**
   * 編集をキャンセル
   */
  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  /**
   * IME入力開始処理
   */
  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  /**
   * IME入力終了処理
   */
  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  /**
   * 編集中のキーボード操作
   * IME入力中（日本語変換中）の場合はEnterキーを無視
   */
  const handleEditKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isComposing) {
      handleSaveEdit();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  /**
   * 編集中の入力値変更
   */
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };

  /**
   * 作成日時をフォーマット
   * @param date 日時オブジェクト
   * @returns フォーマットされた日時文字列
   */
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  /**
   * 期限のステータスを取得
   * @param dueDate 期限日時
   * @returns 期限ステータス
   */
  const getDueStatus = (dueDate?: Date) => {
    if (!dueDate) return null;

    const now = new Date();
    const timeDiff = dueDate.getTime() - now.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);

    if (timeDiff < 0) {
      return "overdue"; // 期限切れ
    } else if (hoursDiff <= 24) {
      return "due-soon"; // 期限間近（24時間以内）
    }
    return "normal"; // 通常
  };

  const dueStatus = getDueStatus(task.dueDate);

  return (
    <div
      className={`task-item ${task.completed ? "task-item--completed" : ""}`}
    >
      <div className="task-item-content">
        <label className="task-item-checkbox-label">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggle}
            className="task-item-checkbox"
          />
          <span className="task-item-checkbox-custom"></span>
        </label>

        <div className="task-item-text">
          {isEditing ? (
            <div className="task-item-edit">
              <input
                type="text"
                value={editTitle}
                onChange={handleEditChange}
                onKeyDown={handleEditKeyDown}
                onCompositionStart={handleCompositionStart}
                onCompositionEnd={handleCompositionEnd}
                onBlur={handleSaveEdit}
                className="task-item-edit-input"
                autoFocus
              />
              <div className="task-item-edit-hint">
                Enterで保存、Escapeでキャンセル
              </div>
            </div>
          ) : (
            <span
              className={`task-item-title ${
                task.completed ? "task-item-title--completed" : ""
              }`}
              onDoubleClick={handleDoubleClick}
              title={task.completed ? "" : "ダブルクリックで編集"}
            >
              {task.title}
            </span>
          )}
          <div className="task-item-dates">
            <span className="task-item-created-date">
              作成: {formatDate(task.createdAt)}
            </span>
            {task.dueDate && (
              <span
                className={`task-item-due-date task-item-due-date--${dueStatus}`}
              >
                期限: {formatDate(task.dueDate)}
                {dueStatus === "overdue" && " (期限切れ)"}
                {dueStatus === "due-soon" && " (期限間近)"}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="task-item-actions">
        {!task.completed && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="task-item-edit-button"
            aria-label={`${task.title}を編集`}
            title="タスクを編集"
          >
            <span className="task-item-edit-icon">✏️</span>
          </button>
        )}

        <button
          onClick={handleDelete}
          className="task-item-delete-button"
          aria-label={`${task.title}を削除`}
          title="タスクを削除"
        >
          <span className="task-item-delete-icon">🗑️</span>
        </button>
      </div>
    </div>
  );
}
