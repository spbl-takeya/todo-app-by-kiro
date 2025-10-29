import { useState, useEffect } from 'react'
import type { Task } from './types/Task'
import { TaskService } from './services/TaskService'
import { TaskForm } from './components/TaskForm'
import { TaskList } from './components/TaskList'
import './App.css'

/**
 * TODOアプリのメインコンポーネント
 * タスクの状態管理とTaskServiceとの連携を担当
 */
function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [taskService] = useState(() => new TaskService())

  // アプリケーション起動時にタスクを読み込み
  useEffect(() => {
    const loadedTasks = taskService.getTasks()
    setTasks(loadedTasks)
  }, [taskService])

  /**
   * 新しいタスクを追加
   * @param title タスクのタイトル
   */
  const handleAddTask = (title: string) => {
    const newTask = taskService.addTask(title)
    setTasks(taskService.getTasks())
  }

  /**
   * タスクの完了状態を切り替え
   * @param id タスクのID
   */
  const handleToggleTask = (id: string) => {
    taskService.toggleTask(id)
    setTasks(taskService.getTasks())
  }

  /**
   * タスクを削除
   * @param id タスクのID
   */
  const handleDeleteTask = (id: string) => {
    taskService.deleteTask(id)
    setTasks(taskService.getTasks())
  }

  /**
   * タスクを更新
   * @param id タスクのID
   * @param updates 更新内容
   */
  const handleUpdateTask = (id: string, updates: Partial<Task>) => {
    taskService.updateTask(id, updates)
    setTasks(taskService.getTasks())
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>TODOアプリ</h1>
      </header>
      
      <main className="app-main">
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
