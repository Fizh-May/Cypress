import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Header() {
    const { user, logout } = useAuth()
    const { totalItems } = useCart()
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const isActive = (path) => location.pathname === path

    return (
        <header className="header" data-testid="header">
            <div className="header-inner">
                <Link to="/" className="logo" data-testid="logo">
                    <span className="logo-icon">🛒</span>
                    <span>ShopTest</span>
                </Link>

                <nav className="nav" data-testid="nav">
                    <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} data-testid="nav-home">
                        Home
                    </Link>
                    <Link to="/products" className={`nav-link ${isActive('/products') ? 'active' : ''}`} data-testid="nav-products">
                        Sản phẩm
                    </Link>
                    {user && (
                        <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`} data-testid="nav-dashboard">
                            Dashboard
                        </Link>
                    )}
                    {user && (
                        <Link to="/profile" className={`nav-link ${isActive('/profile') ? 'active' : ''}`} data-testid="nav-profile">
                            Hồ sơ
                        </Link>
                    )}
                </nav>

                <div className="header-actions">
                    <Link to="/cart" className="cart-btn" data-testid="cart-btn">
                        🛒
                        {totalItems > 0 && (
                            <span className="cart-badge" data-testid="cart-badge">
                                {totalItems}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <div className="user-menu" data-testid="user-menu">
                            <span className="avatar" data-testid="user-avatar">{user.avatar}</span>
                            <span className="user-name" data-testid="user-name">{user.name}</span>
                            <button
                                className="btn btn-outline btn-sm"
                                onClick={handleLogout}
                                data-testid="logout-btn"
                            >
                                Đăng xuất
                            </button>
                        </div>
                    ) : (
                        <div className="auth-buttons">
                            <Link to="/login" className="btn btn-outline btn-sm" data-testid="login-link">
                                Đăng nhập
                            </Link>
                            <Link to="/register" className="btn btn-primary btn-sm" data-testid="register-link">
                                Đăng ký
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
