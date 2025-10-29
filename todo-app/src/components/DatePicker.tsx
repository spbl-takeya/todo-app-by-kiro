import { useState } from 'react'

interface DatePickerProps {
  /** 現在の日時値 */
  value?: Date
  /** 日時変更時のコールバック */
  onChange: (date: Date | undefined) => void
  /** プレースホルダーテキスト */
  placeholder?: string
  /** 必須入力かどうか */
  required?: boolean
}

/**
 * 日付・時刻選択コンポーネント
 * 期限設定用のDatePicker
 */
export function DatePicker({ 
  value, 
  onChange, 
  placeholder = "期限を設定...",
  required = false 
}: DatePickerProps) {
  const [showWarning, setShowWarning] = useState(false)

  /**
   * 日時文字列をDate型に変換
   * @param dateTimeString datetime-local形式の文字列
   */
  const parseDateTime = (dateTimeString: string): Date => {
    return new Date(dateTimeString)
  }

  /**
   * Date型をdatetime-local形式の文字列に変換
   * @param date Dateオブジェクト
   */
  const formatDateTime = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  /**
   * 日時変更処理
   * @param e 入力イベント
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateTimeString = e.target.value
    
    if (!dateTimeString) {
      onChange(undefined)
      setShowWarning(false)
      return
    }

    const selectedDate = parseDateTime(dateTimeString)
    const now = new Date()
    
    // 過去日時の警告チェック
    if (selectedDate < now) {
      setShowWarning(true)
    } else {
      setShowWarning(false)
    }

    onChange(selectedDate)
  }

  /**
   * 期限クリア処理
   */
  const handleClear = () => {
    onChange(undefined)
    setShowWarning(false)
  }

  return (
    <div className="date-picker">
      <div className="date-picker-input-group">
        <input
          type="datetime-local"
          value={value ? formatDateTime(value) : ''}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          className={`date-picker-input ${showWarning ? 'date-picker-input--warning' : ''}`}
        />
        
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="date-picker-clear"
            aria-label="期限をクリア"
            title="期限をクリア"
          >
            ✕
          </button>
        )}
      </div>

      {showWarning && (
        <div className="date-picker-warning">
          ⚠️ 過去の日時が設定されています
        </div>
      )}
    </div>
  )
}