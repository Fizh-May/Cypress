/* Mock user database */
const USERS_KEY = 'cy_users'
const CURRENT_USER_KEY = 'cy_current_user'

const defaultUsers = [
    {
        id: 1,
        name: 'Admin User',
        email: 'admin@test.com',
        password: 'Admin@123',
        role: 'admin',
        avatar: 'AU',
    },
    {
        id: 2,
        name: 'John Doe',
        email: 'john@test.com',
        password: 'Test@123',
        role: 'user',
        avatar: 'JD',
    },
]

function getUsers() {
    const stored = localStorage.getItem(USERS_KEY)
    return stored ? JSON.parse(stored) : defaultUsers
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function loginAPI(email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const users = getUsers()
            const user = users.find(
                (u) => u.email === email && u.password === password
            )
            if (user) {
                const { password: _, ...safeUser } = user
                localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser))
                resolve(safeUser)
            } else {
                reject(new Error('Email hoặc mật khẩu không đúng'))
            }
        }, 400)
    })
}

export function registerAPI(name, email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const users = getUsers()
            if (users.find((u) => u.email === email)) {
                reject(new Error('Email đã được sử dụng'))
                return
            }
            const newUser = {
                id: Date.now(),
                name,
                email,
                password,
                role: 'user',
                avatar: name.slice(0, 2).toUpperCase(),
            }
            saveUsers([...users, newUser])
            resolve({ message: 'Đăng ký thành công' })
        }, 400)
    })
}

export function logoutAPI() {
    localStorage.removeItem(CURRENT_USER_KEY)
}

export function getCurrentUser() {
    const stored = localStorage.getItem(CURRENT_USER_KEY)
    return stored ? JSON.parse(stored) : null
}

export function updateProfileAPI(userId, updates) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const users = getUsers()
            const idx = users.findIndex((u) => u.id === userId)
            if (idx !== -1) {
                users[idx] = { ...users[idx], ...updates }
                saveUsers(users)
                const { password: _, ...safeUser } = users[idx]
                localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser))
                resolve(safeUser)
            }
        }, 300)
    })
}
