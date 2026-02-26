import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return (
            <div className="loading-screen" data-testid="loading">
                <div className="spinner" />
                <p>Đang tải...</p>
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children
}
