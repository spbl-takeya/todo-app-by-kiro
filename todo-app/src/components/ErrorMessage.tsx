import { useEffect } from 'react'

interface ErrorMessageProps {
  /** エラーメッセージのテキスト */
  message: string
  /** エラーメッセージをクリアするコールバック */
  onClear: () => void
  /** 自動消去までの時間（ミリ秒）。デフォルトは5秒 */
  autoHideDelay?: number
  /** エラーの種類 */
  type?: 'error' | 'warning' | 'info'
}

/**
 * エラーメッセージを表示するコンポーネント
 * 自動消去機能付き
 */
export function ErrorMessage({ 
  message, 
  onClear, 
  autoHideDelay = 5000,
  type = 'error'
}: ErrorMessageProps) {
  
  // 自動消去タイマー
  useEffect(() => {
    if (autoHideDelay > 0) {
      const timer = setTimeout(() => {
        onClear()
      }, autoHideDelay)

      return () => clearTimeout(timer)
    }
  }, [onClear, autoHideDelay])

  /**
   * 閉じるボタンクリック処理
   */
  const handleClose = () => {
    onClear()
  }

  /**
   * エラータイプに応じたアイコンを取得
   */
  const getIcon = () => {
    switch (type) {
      case 'error':
        return '❌'
      case 'warning':
        return '⚠️'
      case 'info':
        return 'ℹ️'
      default:
        return '❌'
    }
  }

  return (
    <div className={`error-message error-message--${type}`} role="alert">
      <div className="error-message-content">
        <span className="error-message-icon">
          {getIcon()}
        </span>
        <span className="error-message-text">
          {message}
        </span>
      </div>
      
      <button
        onClick={handleClose}
        className="error-message-close"
        aria-label="エラーメッセージを閉じる"
        title="閉じる"
      >
        ✕
      </button>
    </div>
  )
}