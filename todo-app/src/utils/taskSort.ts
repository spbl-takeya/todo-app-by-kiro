import type { Task } from '../types/Task'

export type SortOption = 'dueDate' | 'createdAt' | 'title' | 'completed'
export type SortOrder = 'asc' | 'desc'

/**
 * タスクをソートするユーティリティ関数
 * @param tasks ソート対象のタスク配列
 * @param sortOption ソートオプション
 * @param sortOrder ソート順序
 * @returns ソートされたタスク配列
 */
export function sortTasks(
  tasks: Task[], 
  sortOption: SortOption, 
  sortOrder: SortOrder
): Task[] {
  const sortedTasks = [...tasks].sort((a, b) => {
    let comparison = 0

    switch (sortOption) {
      case 'dueDate':
        // 期限なしのタスクは最後に配置
        if (!a.dueDate && !b.dueDate) comparison = 0
        else if (!a.dueDate) comparison = 1
        else if (!b.dueDate) comparison = -1
        else comparison = a.dueDate.getTime() - b.dueDate.getTime()
        break

      case 'createdAt':
        comparison = a.createdAt.getTime() - b.createdAt.getTime()
        break

      case 'title':
        comparison = a.title.localeCompare(b.title, 'ja')
        break

      case 'completed':
        // 未完了を先に、完了済みを後に
        if (a.completed === b.completed) {
          // 完了状態が同じ場合は作成日順
          comparison = b.createdAt.getTime() - a.createdAt.getTime()
        } else {
          comparison = a.completed ? 1 : -1
        }
        break

      default:
        comparison = 0
    }

    return sortOrder === 'asc' ? comparison : -comparison
  })

  return sortedTasks
}