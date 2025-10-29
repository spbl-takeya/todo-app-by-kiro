import { useState } from 'react'

interface TaskFormProps {
  /** 新しいタスクが追加された時のコールバック */
  onAddTask: (title: string) => void
}

/**
 * 新しいタスクを追加するためのフォームコンポーネント
 * 入力値のバリデーションとEnterキー送信に対応
 */
export function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')

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

    // タスクを追加
    onAddTask(trimmedTitle)
    
    // フォームをリセット
    setTitle('')
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
   * Enterキー押下処理
   * @param e キーボードイベント
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
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
          autoFocus
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