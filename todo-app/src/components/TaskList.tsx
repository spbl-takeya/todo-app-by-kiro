import type { Task } from '../types/Task'

interface TaskListProps {
  /** 表示するタスクの配列 */
  tasks: Task[]
  /** タスクの完了状態切り替え時のコールバック */
  onToggleTask: (id: string) => void
  /** タスク削除時のコールバック */
  onDeleteTask: (id: string) => void
  /** タスク更新時のコールバック */
  onUpdateTask: (id: string, updates: Partial<Task>) => void
}

/**
 * タスク一覧を表示するコンポーネント
 * 空状態（タスクなし）の表示にも対応
 */
export function TaskList({ 
  tasks, 
  onToggleTask, 
  onDeleteTask, 
  onUpdateTask 
}: TaskListProps) {
  
  // 空状態の表示
  if (tasks.length === 0) {
    return (
      <div className="task-list task-list--empty">
        <div className="task-list-empty-state">
          <p className="task-list-empty-message">
            まだタスクがありません
          </p>
          <p className="task-list-empty-hint">
            上のフォームから新しいタスクを追加してみましょう
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h2 className="task-list-title">
          タスク一覧 ({tasks.length}件)
        </h2>
      </div>
      
      <ul className="task-list-items">
        {tasks.map((task) => (
          <li key={task.id} className="task-list-item">
            {/* TaskItemコンポーネントは次のタスクで実装予定 */}
            <div className="task-item-placeholder">
              <div className="task-item-content">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggleTask(task.id)}
                  className="task-item-checkbox"
                />
                <span 
                  className={`task-item-title ${task.completed ? 'task-item-title--completed' : ''}`}
                >
                  {task.title}
                </span>
              </div>
              <div className="task-item-meta">
                <span className="task-item-date">
                  {task.createdAt.toLocaleDateString('ja-JP')}
                </span>
                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="task-item-delete"
                  aria-label={`${task.title}を削除`}
                >
                  削除
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}