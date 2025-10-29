import { useState, useEffect } from 'react'
import type { Task } from './types/Task'
import { TaskService } from './services/TaskService'
import { TaskForm } from './components/TaskForm'
import { TaskList } from './components/TaskList'
import { ErrorMessage } from './components/ErrorMessage'
import './App.css'

/**
 * TODOアプリのメインコンポーネント
 * タスクの状態管理とTaskServiceとの連携を担当
 */
function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [taskService] = useState(() => new TaskService())
  const [error, setError] = useState<string>('')

  // アプリケーション起動時にタスクを読み込み
  useEffect(() => {
    const loadedTasks = taskService.getTasks()
    setTasks(loadedTasks)
  }, [taskService])

  /**
   * 新しいタスクを追加
   * @param title タスクのタイトル
   * @param dueDate 期限日時（オプション）
   */
  const handleAddTask = (title: string, dueDate?: Date) => {
    try {
      // バリデーション: 空のタイトルチェック
      const trimmedTitle = title.trim()
      if (!trimmedTitle) {
        setError('タスクのタイトルを入力してください')
        return
      }

      // 長さ制限チェック
      if (trimmedTitle.length > 100) {
        setError('タスクのタイトルは100文字以内で入力してください')
        return
      }

      taskService.addTask(trimmedTitle, dueDate)
      setTasks(taskService.getTasks())
      setError('') // 成功時はエラーをクリア
    } catch (err) {
      setError('タスクの追加に失敗しました')
      console.error('タスク追加エラー:', err)
    }
  }

  /**
   * タスクの完了状態を切り替え
   * @param id タスクのID
   */
  const handleToggleTask = (id: string) => {
    try {
      taskService.toggleTask(id)
      setTasks(taskService.getTasks())
      setError('')
    } catch (err) {
      setError('タスクの状態変更に失敗しました')
      console.error('タスク状態変更エラー:', err)
    }
  }

  /**
   * タスクを削除
   * @param id タスクのID
   */
  const handleDeleteTask = (id: string) => {
    try {
      taskService.deleteTask(id)
      setTasks(taskService.getTasks())
      setError('')
    } catch (err) {
      setError('タスクの削除に失敗しました')
      console.error('タスク削除エラー:', err)
    }
  }

  /**
   * タスクを更新
   * @param id タスクのID
   * @param updates 更新内容
   */
  const handleUpdateTask = (id: string, updates: Partial<Task>) => {
    try {
      // タイトル更新時のバリデーション
      if (updates.title !== undefined) {
        const trimmedTitle = updates.title.trim()
        if (!trimmedTitle) {
          setError('タスクのタイトルを入力してください')
          return
        }
        if (trimmedTitle.length > 100) {
          setError('タスクのタイトルは100文字以内で入力してください')
          return
        }
        updates.title = trimmedTitle
      }

      taskService.updateTask(id, updates)
      setTasks(taskService.getTasks())
      setError('')
    } catch (err) {
      setError('タスクの更新に失敗しました')
      console.error('タスク更新エラー:', err)
    }
  }

  /**
   * エラーメッセージをクリア
   */
  const handleClearError = () => {
    setError('')
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>TODOアプリ</h1>
      </header>
      
      <main className="app-main">
        {error && (
          <ErrorMessage 
            message={error}
            onClear={handleClearError}
            type="error"
          />
        )}
        
        <TaskForm onAddTask={handleAddTask} />
        
        <TaskList 
          tasks={tasks}
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTask}
          onUpdateTask={handleUpdateTask}
        />
      </main>
    </div>
  )
}

export default App
