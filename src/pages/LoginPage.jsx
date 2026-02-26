import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Toast from '../components/Toast'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [toast, setToast] = useState(null)

    const { login } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/dashboard'

    const validate = () => {
        if (!email.trim()) return 'Email không được để trống'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Email không hợp lệ'
        if (!password) return 'Mật khẩu không được để trống'
        if (password.length < 6) return 'Mật khẩu phải có ít nhất 6 ký tự'
        return ''
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationError = validate()
        if (validationError) {
            setError(validationError)
            return
        }
        setError('')
        setLoading(true)
        try {
            await login(email, password)
            setToast({ message: 'Đăng nhập thành công!', type: 'success' })
            setTimeout(() => navigate(from, { replace: true }), 600)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-page" data-testid="login-page">
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-logo">🔐</div>
                    <h1>Đăng nhập</h1>
                    <p>Chào mừng bạn quay trở lại!</p>
                </div>

                {error && (
                    <div className="alert alert-error" data-testid="error-message" role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} data-testid="login-form" noValidate>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="form-input"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            data-testid="email-input"
                            autoComplete="email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu</label>
                        <div className="input-wrapper">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                className="form-input"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                data-testid="password-input"
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                className="toggle-pw"
                                onClick={() => setShowPassword(!showPassword)}
                                data-testid="toggle-password"
                                aria-label="Toggle password visibility"
                            >
                                {showPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                    </div>

                    <div className="form-row">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                data-testid="remember-me"
                            />
                            <span>Nhớ đăng nhập</span>
                        </label>
                        <a href="#" className="forgot-link">Quên mật khẩu?</a>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-full"
                        disabled={loading}
                        data-testid="login-submit"
                    >
                        {loading ? (
                            <span className="btn-loading"><span className="spinner-sm" /> Đang xử lý...</span>
                        ) : (
                            'Đăng nhập'
                        )}
                    </button>
                </form>

                <p className="auth-footer">
                    Chưa có tài khoản?{' '}
                    <Link to="/register" data-testid="register-link">
                        Đăng ký ngay
                    </Link>
                </p>

                <div className="demo-accounts">
                    <p>Tài khoản demo:</p>
                    <code>admin@test.com / Admin@123</code>
                    <code>john@test.com / Test@123</code>
                </div>
            </div>
        </div>
    )
}
