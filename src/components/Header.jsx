import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Header() {
    const { user, logout } = useAuth()
    const { totalItems } = useCart()
    const navigate = useNavigate()
    const location = useLocation()
    const [cartAlert, setCartAlert] = useState(false)

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const isActive = (path) => location.pathname === path

    const handleCartClick = (e) => {
        if (!user) {
            e.preventDefault()
            setCartAlert(true)
            setTimeout(() => setCartAlert(false), 3000)
        }
    }

    return (
        <>
            {/* Cart login alert popup */}
            {cartAlert && (
                <div className="cart-login-alert" role="alert" data-testid="cart-login-alert">
                    <span>🔐</span>
                    <span>Vui lòng <Link to="/login" onClick={() => setCartAlert(false)}>đăng nhập</Link> để xem giỏ hàng</span>
                    <button onClick={() => setCartAlert(false)} aria-label="Đóng">✕</button>
                </div>
            )}

            <header className="header" data-testid="header">
                <div className="header-inner">
                    {/* Logo */}
                    <Link to={user ? '/dashboard' : '/'} className="logo" data-testid="logo">
                        <span className="logo-icon">🛒</span>
                        <span>ShopTest</span>
                    </Link>

                    {/* Main Nav */}
                    <nav className="nav" data-testid="nav">
                        {user ? (
                            /* === LOGGED IN NAV === */
                            <>
                                <Link
                                    to="/dashboard"
                                    className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                                    data-testid="nav-dashboard"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/products"
                                    className={`nav-link ${isActive('/products') ? 'active' : ''}`}
                                    data-testid="nav-products"
                                >
                                    Sản phẩm
                                </Link>
                                <Link
                                    to="/cart"
                                    className={`nav-link nav-cart ${isActive('/cart') ? 'active' : ''}`}
                                    data-testid="cart-btn"
                                    onClick={handleCartClick}
                                >
                                    <span className="nav-cart-icon">🛒</span>
                                    <span className="nav-cart-label">Giỏ hàng</span>
                                    {totalItems > 0 && (
                                        <span className="cart-badge" data-testid="cart-badge">{totalItems}</span>
                                    )}
                                </Link>
                                <Link
                                    to="/"
                                    className={`nav-link ${isActive('/') ? 'active' : ''}`}
                                    data-testid="nav-home"
                                >
                                    Giới thiệu
                                </Link>
                                <Link
                                    to="/profile"
                                    className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
                                    data-testid="nav-profile"
                                >
                                    Hồ sơ
                                </Link>
                            </>
                        ) : (
                            /* === GUEST NAV === */
                            <>
                                <Link
                                    to="/"
                                    className={`nav-link ${isActive('/') ? 'active' : ''}`}
                                    data-testid="nav-home"
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/products"
                                    className={`nav-link ${isActive('/products') ? 'active' : ''}`}
                                    data-testid="nav-products"
                                >
                                    Sản phẩm
                                </Link>
                                <Link
                                    to="/cart"
                                    className={`nav-link nav-cart ${isActive('/cart') ? 'active' : ''}`}
                                    data-testid="cart-btn"
                                    onClick={handleCartClick}
                                >
                                    <span className="nav-cart-icon">🛒</span>
                                    <span className="nav-cart-label">Giỏ hàng</span>
                                    {totalItems > 0 && (
                                        <span className="cart-badge" data-testid="cart-badge">{totalItems}</span>
                                    )}
                                </Link>
                            </>
                        )}
                    </nav>

                    {/* User area */}
                    <div className="header-actions">
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
        </>
    )
}
