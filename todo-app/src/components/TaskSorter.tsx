import type { SortOption, SortOrder } from "../utils/taskSort";

interface TaskSorterProps {
  /** ソート変更時のコールバック */
  onSortChange: (option: SortOption, order: SortOrder) => void;
  /** 現在のソートオプション */
  currentSort: SortOption;
  /** 現在のソート順序 */
  currentOrder: SortOrder;
}

/**
 * タスクソート機能コンポーネント
 * 期限順、作成日順、タイトル順、完了状態順のソート機能を提供
 */
export function TaskSorter({
  onSortChange,
  currentSort,
  currentOrder,
}: TaskSorterProps) {
  /**
   * ソートオプション変更処理
   * @param option 新しいソートオプション
   */
  const handleSortOptionChange = (option: SortOption) => {
    // 同じオプションを選択した場合は順序を切り替え
    if (option === currentSort) {
      const newOrder = currentOrder === "asc" ? "desc" : "asc";
      onSortChange(option, newOrder);
    } else {
      // 新しいオプションの場合はデフォルト順序で開始
      const defaultOrder = option === "title" ? "asc" : "desc";
      onSortChange(option, defaultOrder);
    }
  };

  /**
   * ソートオプションの表示名を取得
   * @param option ソートオプション
   */
  const getSortLabel = (option: SortOption): string => {
    switch (option) {
      case "dueDate":
        return "期限順";
      case "createdAt":
        return "作成日順";
      case "title":
        return "タイトル順";
      case "completed":
        return "完了状態順";
      default:
        return "";
    }
  };

  /**
   * ソート順序のアイコンを取得
   * @param option ソートオプション
   */
  const getSortIcon = (option: SortOption): string => {
    if (option !== currentSort) return "↕️";
    return currentOrder === "asc" ? "↑" : "↓";
  };

  const sortOptions: SortOption[] = [
    "dueDate",
    "createdAt",
    "title",
    "completed",
  ];

  return (
    <div className="task-sorter">
      <div className="task-sorter-label">並び順:</div>

      <div className="task-sorter-options">
        {sortOptions.map((option) => (
          <button
            key={option}
            onClick={() => handleSortOptionChange(option)}
            className={`task-sorter-button ${
              option === currentSort ? "task-sorter-button--active" : ""
            }`}
            title={`${getSortLabel(option)}で並び替え`}
          >
            <span className="task-sorter-button-text">
              {getSortLabel(option)}
            </span>
            <span className="task-sorter-button-icon">
              {getSortIcon(option)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
