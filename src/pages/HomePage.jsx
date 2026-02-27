import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const features = [
    { icon: '🔐', title: 'Authentication', desc: 'Đăng nhập, đăng ký, bảo vệ route' },
    { icon: '🛍️', title: 'Sản phẩm', desc: 'Tìm kiếm, lọc theo danh mục' },
    { icon: '🛒', title: 'Giỏ hàng', desc: 'Thêm, xóa, cập nhật số lượng' },
    { icon: '👤', title: 'Hồ sơ', desc: 'Xem và chỉnh sửa thông tin' },
]

const testStats = [
    { icon: '⚡', label: 'E2E Tests', value: '5 suites' },
    { icon: '🧩', label: 'Component Tests', value: '6 files' },
    { icon: '✅', label: 'Test Cases', value: '30+' },
    { icon: '🎯', label: 'Coverage', value: 'Full flow' },
]

export default function HomePage() {
    const { user } = useAuth()

    return (
        <div className="page" data-testid="home-page">
            {/* Hero section */}
            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Welcome to <span className="gradient-text">ShopTest</span>
                    </h1>
                    <p className="hero-subtitle">
                        Ứng dụng demo cho Cypress E2E &amp; Component Testing
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

            {/* Features + Testing info in a single framed box */}
            <section className="features-frame" data-testid="features-section">
                <div className="features-frame-header">
                    <span className="features-label">🧪 Cypress Testing Demo</span>
                    <h2>Tính năng được test</h2>
                    <p className="features-frame-sub">Toàn bộ luồng dưới đây đều có Cypress E2E &amp; Component test coverage</p>
                </div>

                <div className="features-grid">
                    {features.map((f) => (
                        <div className="feature-card" key={f.title} data-testid={`feature-${f.title}`}>
                            <div className="feature-icon">{f.icon}</div>
                            <h3>{f.title}</h3>
                            <p>{f.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="features-divider" />

                <div className="test-stats-grid">
                    {testStats.map((s) => (
                        <div className="test-stat" key={s.label}>
                            <span className="test-stat-icon">{s.icon}</span>
                            <span className="test-stat-value">{s.value}</span>
                            <span className="test-stat-label">{s.label}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
