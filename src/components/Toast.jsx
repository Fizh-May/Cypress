import { useEffect, useState } from 'react'

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        if (!message) return
        const timer = setTimeout(() => {
            setVisible(false)
            setTimeout(onClose, 300)
        }, duration)
        return () => clearTimeout(timer)
    }, [message, duration, onClose])

    const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' }

    return (
        <div
            className={`toast toast-${type} ${visible ? 'toast-in' : 'toast-out'}`}
            data-testid="toast"
            role="alert"
        >
            <span className="toast-icon" data-testid="toast-icon">{icons[type]}</span>
            <span className="toast-message" data-testid="toast-message">{message}</span>
            <button
                className="toast-close"
                onClick={() => { setVisible(false); setTimeout(onClose, 300) }}
                data-testid="toast-close"
                aria-label="Đóng thông báo"
            >
                ✕
            </button>
        </div>
    )
}
