import { useState } from 'react'
import { DatePicker } from './DatePicker'

interface TaskFormProps {
  /** 新しいタスクが追加された時のコールバック */
  onAddTask: (title: string, dueDate?: Date) => void
}

/**
 * 新しいタスクを追加するためのフォームコンポーネント
 * 入力値のバリデーションとEnterキー送信に対応
 */
export function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined)
  const [error, setError] = useState('')
  const [isComposing, setIsComposing] = useState(false)

  /**
   * フォーム送信処理
   * @param e フォームイベント
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const trimmedTitle = title.trim()
    
    // バリデーション: 空のタイトルチェック
    if (!trimmedTitle) {
      setError('タスクのタイトルを入力してください')
      return
    }

    // 長さ制限チェック
    if (trimmedTitle.length > 100) {
      setError('タスクのタイトルは100文字以内で入力してください')
      return
    }

    // タスクを追加
    onAddTask(trimmedTitle, dueDate)
    
    // フォームをリセット
    setTitle('')
    setDueDate(undefined)
    setError('')
  }

  /**
   * 入力値変更処理
   * @param e 入力イベント
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    // 入力開始時にエラーをクリア
    if (error) {
      setError('')
    }
  }

  /**
   * IME入力開始処理
   */
  const handleCompositionStart = () => {
    setIsComposing(true)
  }

  /**
   * IME入力終了処理
   */
  const handleCompositionEnd = () => {
    setIsComposing(false)
  }

  /**
   * Enterキー押下処理
   * IME入力中（日本語変換中）の場合は無視
   * @param e キーボードイベント
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isComposing) {
      handleSubmit(e as any)
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form-input-group">
        <input
          type="text"
          className={`task-form-input ${error ? 'task-form-input--error' : ''}`}
          placeholder="新しいタスクを入力..."
          value={title}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          autoFocus
        />
        <DatePicker
          value={dueDate}
          onChange={setDueDate}
          placeholder="期限を設定（任意）"
        />
        <button 
          type="submit" 
          className="task-form-button"
          disabled={!title.trim()}
        >
          追加
        </button>
      </div>
      
      {error && (
        <div className="task-form-error">
          {error}
        </div>
      )}
    </form>
  )
}