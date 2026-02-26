import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { loginAPI, logoutAPI, registerAPI, getCurrentUser, updateProfileAPI } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [authError, setAuthError] = useState('')

    useEffect(() => {
        const current = getCurrentUser()
        setUser(current)
        setLoading(false)
    }, [])

    const login = useCallback(async (email, password) => {
        setAuthError('')
        const loggedIn = await loginAPI(email, password)
        setUser(loggedIn)
        return loggedIn
    }, [])

    const register = useCallback(async (name, email, password) => {
        setAuthError('')
        const result = await registerAPI(name, email, password)
        return result
    }, [])

    const logout = useCallback(() => {
        logoutAPI()
        setUser(null)
    }, [])

    const updateProfile = useCallback(async (updates) => {
        const updated = await updateProfileAPI(user.id, updates)
        setUser(updated)
        return updated
    }, [user])

    return (
        <AuthContext.Provider value={{ user, loading, authError, setAuthError, login, logout, register, updateProfile }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used within AuthProvider')
    return ctx
}
