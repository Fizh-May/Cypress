import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function DashboardPage() {
    const { user } = useAuth()
    const { total, totalItems } = useCart()

    const formatPrice = (p) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p)

    const stats = [
        { label: 'Sản phẩm trong giỏ', value: totalItems, icon: '📦', testId: 'stat-items' },
        { label: 'Tổng giá trị giỏ hàng', value: formatPrice(total), icon: '💰', testId: 'stat-total' },
        { label: 'Danh mục yêu thích', value: 'Electronics', icon: '⭐', testId: 'stat-category' },
        { label: 'Trạng thái tài khoản', value: user?.role === 'admin' ? 'Admin' : 'User', icon: '👤', testId: 'stat-role' },
    ]

    return (
        <div className="page" data-testid="dashboard-page">
            <div className="dashboard-hero">
                <div className="welcome-block">
                    <div className="avatar-lg" data-testid="dashboard-avatar">{user?.avatar}</div>
                    <div>
                        <h1 data-testid="welcome-message">Xin chào, {user?.name}! 👋</h1>
                        <p className="text-muted" data-testid="user-email">{user?.email}</p>
                        <span className="badge badge-primary" data-testid="user-role">{user?.role}</span>
                    </div>
                </div>
            </div>

            <div className="stats-grid" data-testid="stats-grid">
                {stats.map((s) => (
                    <div className="stat-card" key={s.label} data-testid={s.testId}>
                        <div className="stat-icon">{s.icon}</div>
                        <div className="stat-body">
                            <p className="stat-label">{s.label}</p>
                            <p className="stat-value">{s.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="quick-links" data-testid="quick-links">
                <h2>Truy cập nhanh</h2>
                <div className="quick-links-grid">
                    <Link to="/products" className="quick-card" data-testid="quick-products">
                        <span className="quick-icon">🛍️</span>
                        <span>Xem sản phẩm</span>
                    </Link>
                    <Link to="/cart" className="quick-card" data-testid="quick-cart">
                        <span className="quick-icon">🛒</span>
                        <span>Giỏ hàng ({totalItems})</span>
                    </Link>
                    <Link to="/profile" className="quick-card" data-testid="quick-profile">
                        <span className="quick-icon">👤</span>
                        <span>Hồ sơ cá nhân</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
