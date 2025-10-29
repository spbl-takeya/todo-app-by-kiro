/**
 * データ永続化の動作確認テスト
 * ブラウザのコンソールで実行可能
 */

// TaskServiceをテスト
import { TaskService } from './services/TaskService.js';

console.log('=== データ永続化テスト開始 ===');

// 1. 新しいTaskServiceインスタンスを作成
const taskService = new TaskService();

// 2. 初期状態の確認
console.log('初期タスク数:', taskService.getTasks().length);

// 3. テストタスクを追加
const testTask1 = taskService.addTask('テストタスク1');
const testTask2 = taskService.addTask('テストタスク2');
console.log('タスク追加後:', taskService.getTasks().length);

// 4. タスクの完了状態を変更
taskService.toggleTask(testTask1.id);
console.log('完了状態変更後:', taskService.getTasks());

// 5. ローカルストレージの内容を確認
const storedData = localStorage.getItem('todos');
console.log('ローカルストレージの内容:', storedData);

// 6. 新しいTaskServiceインスタンスでデータ復元テスト
const newTaskService = new TaskService();
const restoredTasks = newTaskService.getTasks();
console.log('復元されたタスク数:', restoredTasks.length);
console.log('復元されたタスク:', restoredTasks);

// 7. データの整合性確認
const originalTasks = taskService.getTasks();
const isDataConsistent = originalTasks.length === restoredTasks.length &&
  originalTasks.every((task, index) => 
    task.id === restoredTasks[index].id &&
    task.title === restoredTasks[index].title &&
    task.completed === restoredTasks[index].completed
  );

console.log('データ整合性:', isDataConsistent ? '✅ 正常' : '❌ 異常');

// 8. クリーンアップ
taskService.deleteTask(testTask1.id);
taskService.deleteTask(testTask2.id);
console.log('クリーンアップ後のタスク数:', taskService.getTasks().length);

console.log('=== データ永続化テスト完了 ===');