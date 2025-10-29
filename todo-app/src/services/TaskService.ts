import type { Task } from "../types/Task";

/**
 * TODOタスクを管理するサービスクラス
 * CRUD操作とローカルストレージ連携を処理
 *
 * 対応要件:
 * - 6.1: システムは変更を自動的にローカルストレージに保存
 * - 6.2: システムはアプリケーション再開時に保存されたタスクデータを読み込み
 */
export class TaskService {
  private readonly STORAGE_KEY = "todos";

  /**
   * ユニークなIDを生成
   * @returns ランダムなUUID文字列
   */
  private generateId(): string {
    return crypto.randomUUID();
  }

  /**
   * タスクをローカルストレージに保存
   * @param tasks 保存するタスクの配列
   */
  private saveToStorage(tasks: Task[]): void {
    try {
      // DateオブジェクトをISO文字列に変換してJSON化
      const serializedTasks = tasks.map((task) => ({
        ...task,
        createdAt: task.createdAt.toISOString(),
        dueDate: task.dueDate?.toISOString(),
      }));
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(serializedTasks));
    } catch (error) {
      console.error("タスクの保存に失敗しました:", error);
    }
  }

  /**
   * ローカルストレージからタスクを読み込み
   * @returns ストレージから取得したタスクの配列
   */
  private loadFromStorage(): Task[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) {
        return [];
      }

      const parsed = JSON.parse(stored) as Array<
        Omit<Task, "createdAt" | "dueDate"> & { 
          createdAt: string;
          dueDate?: string;
        }
      >;
      // ISO文字列をDateオブジェクトに復元
      return parsed.map((task) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
      }));
    } catch (error) {
      console.error("タスクの読み込みに失敗しました:", error);
      return [];
    }
  }

  /**
   * 新しいタスクを追加
   * @param title 新しいタスクのタイトル
   * @param dueDate 期限日時（オプション）
   * @returns 作成されたタスク
   */
  addTask(title: string, dueDate?: Date): Task {
    const tasks = this.loadFromStorage();
    const newTask: Task = {
      id: this.generateId(),
      title: title.trim(),
      completed: false,
      createdAt: new Date(),
      dueDate: dueDate,
    };

    tasks.push(newTask);
    this.saveToStorage(tasks);
    return newTask;
  }

  /**
   * すべてのタスクを取得
   * @returns すべてのタスクの配列
   */
  getTasks(): Task[] {
    return this.loadFromStorage();
  }

  /**
   * 既存のタスクを更新
   * @param id 更新するタスクのID
   * @param updates 更新内容を含む部分的なタスクオブジェクト
   * @returns 更新されたタスク
   */
  updateTask(id: string, updates: Partial<Task>): Task {
    const tasks = this.loadFromStorage();
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      throw new Error(`ID ${id} のタスクが見つかりません`);
    }

    // createdAtとidは更新不可（分割代入で除外）
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { createdAt, id: taskId, ...allowedUpdates } = updates;
    tasks[taskIndex] = { ...tasks[taskIndex], ...allowedUpdates };

    this.saveToStorage(tasks);
    return tasks[taskIndex];
  }

  /**
   * タスクを削除
   * @param id 削除するタスクのID
   */
  deleteTask(id: string): void {
    const tasks = this.loadFromStorage();
    const filteredTasks = tasks.filter((task) => task.id !== id);

    if (filteredTasks.length === tasks.length) {
      throw new Error(`ID ${id} のタスクが見つかりません`);
    }

    this.saveToStorage(filteredTasks);
  }

  /**
   * タスクの完了状態を切り替え
   * @param id 切り替えるタスクのID
   * @returns 更新されたタスク
   */
  toggleTask(id: string): Task {
    const tasks = this.loadFromStorage();
    const task = tasks.find((task) => task.id === id);

    if (!task) {
      throw new Error(`ID ${id} のタスクが見つかりません`);
    }

    return this.updateTask(id, { completed: !task.completed });
  }
}
