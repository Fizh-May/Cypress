import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Toast from '../components/Toast'

const PASSWORD_MIN = 8

export default function RegisterPage() {
    const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(null)
    const { register } = useAuth()
    const navigate = useNavigate()

    const passwordStrength = (pw) => {
        let score = 0
        if (pw.length >= PASSWORD_MIN) score++
        if (/[A-Z]/.test(pw)) score++
        if (/[0-9]/.test(pw)) score++
        if (/[^A-Za-z0-9]/.test(pw)) score++
        return score
    }

    const strengthLabel = ['', 'Yếu', 'Trung bình', 'Khá', 'Mạnh']
    const strengthClass = ['', 'weak', 'fair', 'good', 'strong']
    const strength = passwordStrength(form.password)

    const validate = () => {
        const e = {}
        if (!form.name.trim()) e.name = 'Họ tên không được để trống'
        if (!form.email.trim()) e.email = 'Email không được để trống'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email không hợp lệ'
        if (!form.password) e.password = 'Mật khẩu không được để trống'
        else if (form.password.length < PASSWORD_MIN) e.password = `Mật khẩu phải có ít nhất ${PASSWORD_MIN} ký tự`
        if (!form.confirm) e.confirm = 'Vui lòng xác nhận mật khẩu'
        else if (form.confirm !== form.password) e.confirm = 'Mật khẩu không khớp'
        return e
    }

    const handleChange = (field) => (e) => {
        setForm((f) => ({ ...f, [field]: e.target.value }))
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const v = validate()
        if (Object.keys(v).length > 0) { setErrors(v); return }
        setLoading(true)
        try {
            await register(form.name, form.email, form.password)
            setToast({ message: 'Đăng ký thành công! Vui lòng đăng nhập.', type: 'success' })
            setTimeout(() => navigate('/login'), 1200)
        } catch (err) {
            setErrors({ email: err.message })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-page" data-testid="register-page">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            <div className="auth-card auth-card-wide">
                <div className="auth-header">
                    <div className="auth-logo">✨</div>
                    <h1>Tạo tài khoản</h1>
                    <p>Tham gia cùng chúng tôi ngay hôm nay!</p>
                </div>

                <form onSubmit={handleSubmit} data-testid="register-form" noValidate>
                    <div className="form-group">
                        <label htmlFor="name">Họ và tên</label>
                        <input
                            id="name"
                            type="text"
                            className={`form-input ${errors.name ? 'input-error' : ''}`}
                            placeholder="Nguyễn Văn A"
                            value={form.name}
                            onChange={handleChange('name')}
                            data-testid="name-input"
                        />
                        {errors.name && <p className="field-error" data-testid="name-error">{errors.name}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="reg-email">Email</label>
                        <input
                            id="reg-email"
                            type="email"
                            className={`form-input ${errors.email ? 'input-error' : ''}`}
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={handleChange('email')}
                            data-testid="email-input"
                        />
                        {errors.email && <p className="field-error" data-testid="email-error">{errors.email}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="reg-password">Mật khẩu</label>
                        <input
                            id="reg-password"
                            type="password"
                            className={`form-input ${errors.password ? 'input-error' : ''}`}
                            placeholder="Tối thiểu 8 ký tự"
                            value={form.password}
                            onChange={handleChange('password')}
                            data-testid="password-input"
                        />
                        {form.password && (
                            <div className="strength-bar" data-testid="strength-bar">
                                <div className={`strength-fill strength-${strengthClass[strength]}`} style={{ width: `${strength * 25}%` }} />
                                <span className="strength-text" data-testid="strength-text">{strengthLabel[strength]}</span>
                            </div>
                        )}
                        {errors.password && <p className="field-error" data-testid="password-error">{errors.password}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm">Xác nhận mật khẩu</label>
                        <input
                            id="confirm"
                            type="password"
                            className={`form-input ${errors.confirm ? 'input-error' : ''}`}
                            placeholder="Nhập lại mật khẩu"
                            value={form.confirm}
                            onChange={handleChange('confirm')}
                            data-testid="confirm-input"
                        />
                        {errors.confirm && <p className="field-error" data-testid="confirm-error">{errors.confirm}</p>}
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-full"
                        disabled={loading}
                        data-testid="register-submit"
                    >
                        {loading ? <span className="btn-loading"><span className="spinner-sm" /> Đang xử lý...</span> : 'Tạo tài khoản'}
                    </button>
                </form>

                <p className="auth-footer">
                    Đã có tài khoản?{' '}
                    <Link to="/login" data-testid="login-link">Đăng nhập</Link>
                </p>
            </div>
        </div>
    )
}
