import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function HomePage() {
    const { user } = useAuth()

    const features = [
        { icon: '🔐', title: 'Authentication', desc: 'Đăng nhập, đăng ký, bảo vệ route' },
        { icon: '🛍️', title: 'Sản phẩm', desc: 'Tìm kiếm, lọc theo danh mục' },
        { icon: '🛒', title: 'Giỏ hàng', desc: 'Thêm, xóa, cập nhật số lượng' },
        { icon: '👤', title: 'Hồ sơ', desc: 'Xem và chỉnh sửa thông tin' },
    ]

    return (
        <div className="page" data-testid="home-page">
            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Welcome to <span className="gradient-text">ShopTest</span>
                    </h1>
                    <p className="hero-subtitle">
                        Ứng dụng demo cho Cypress E2E & Component Testing
                    </p>
                    <div className="hero-actions">
                        {user ? (
                            <Link to="/dashboard" className="btn btn-primary btn-lg" data-testid="go-dashboard">
                                Vào Dashboard →
                            </Link>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-primary btn-lg" data-testid="hero-login">
                                    Đăng nhập
                                </Link>
                                <Link to="/register" className="btn btn-outline btn-lg" data-testid="hero-register">
                                    Đăng ký miễn phí
                                </Link>
                            </>
                        )}
                        <Link to="/products" className="btn btn-ghost btn-lg" data-testid="hero-products">
                            Xem sản phẩm
                        </Link>
                    </div>
                </div>
                <div className="hero-visual">🛒</div>
            </section>

            <section className="features" data-testid="features-section">
                <h2>Tính năng được test</h2>
                <div className="features-grid">
                    {features.map((f) => (
                        <div className="feature-card" key={f.title} data-testid={`feature-${f.title}`}>
                            <div className="feature-icon">{f.icon}</div>
                            <h3>{f.title}</h3>
                            <p>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
