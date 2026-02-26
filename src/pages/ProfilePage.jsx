import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Toast from '../components/Toast'

export default function ProfilePage() {
    const { user, updateProfile } = useAuth()
    const [editing, setEditing] = useState(false)
    const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '' })
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(null)
    const [errors, setErrors] = useState({})

    const validate = () => {
        const e = {}
        if (!form.name.trim()) e.name = 'Họ tên không được để trống'
        if (!form.email.trim()) e.email = 'Email không được để trống'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email không hợp lệ'
        return e
    }

    const handleSave = async (e) => {
        e.preventDefault()
        const v = validate()
        if (Object.keys(v).length > 0) { setErrors(v); return }
        setLoading(true)
        try {
            await updateProfile({ name: form.name, email: form.email })
            setToast({ message: 'Cập nhật hồ sơ thành công!', type: 'success' })
            setEditing(false)
        } catch {
            setToast({ message: 'Có lỗi xảy ra', type: 'error' })
        } finally {
            setLoading(false)
        }
    }

    const handleCancel = () => {
        setForm({ name: user.name, email: user.email })
        setErrors({})
        setEditing(false)
    }

    return (
        <div className="page" data-testid="profile-page">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            <div className="page-header">
                <h1>Hồ sơ cá nhân</h1>
            </div>

            <div className="profile-card" data-testid="profile-card">
                <div className="profile-hero">
                    <div className="avatar-xl" data-testid="profile-avatar">{user?.avatar}</div>
                    <div>
                        <h2 data-testid="profile-name">{user?.name}</h2>
                        <p data-testid="profile-email">{user?.email}</p>
                        <span className="badge badge-primary" data-testid="profile-role">{user?.role}</span>
                    </div>
                </div>

                {!editing ? (
                    <div className="profile-view" data-testid="profile-view">
                        <div className="info-row">
                            <label>Họ và tên</label>
                            <span data-testid="view-name">{user?.name}</span>
                        </div>
                        <div className="info-row">
                            <label>Email</label>
                            <span data-testid="view-email">{user?.email}</span>
                        </div>
                        <div className="info-row">
                            <label>Vai trò</label>
                            <span data-testid="view-role">{user?.role}</span>
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={() => setEditing(true)}
                            data-testid="edit-profile-btn"
                        >
                            ✏️ Chỉnh sửa hồ sơ
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSave} data-testid="profile-form" noValidate>
                        <div className="form-group">
                            <label htmlFor="profile-name">Họ và tên</label>
                            <input
                                id="profile-name"
                                type="text"
                                className={`form-input ${errors.name ? 'input-error' : ''}`}
                                value={form.name}
                                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                                data-testid="profile-name-input"
                            />
                            {errors.name && <p className="field-error" data-testid="name-error">{errors.name}</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="profile-email">Email</label>
                            <input
                                id="profile-email"
                                type="email"
                                className={`form-input ${errors.email ? 'input-error' : ''}`}
                                value={form.email}
                                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                                data-testid="profile-email-input"
                            />
                            {errors.email && <p className="field-error" data-testid="email-error">{errors.email}</p>}
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn btn-primary" disabled={loading} data-testid="save-profile-btn">
                                {loading ? 'Đang lưu...' : '💾 Lưu thay đổi'}
                            </button>
                            <button type="button" className="btn btn-outline" onClick={handleCancel} data-testid="cancel-edit-btn">
                                Huỷ
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}
