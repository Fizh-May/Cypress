import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const CartContext = createContext(null)
const CART_KEY = 'cy_cart'

function loadCart() {
    try {
        const stored = localStorage.getItem(CART_KEY)
        return stored ? JSON.parse(stored) : []
    } catch {
        return []
    }
}

function saveCart(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items))
}

export function CartProvider({ children }) {
    const [items, setItems] = useState(loadCart)

    useEffect(() => {
        saveCart(items)
    }, [items])

    const addItem = useCallback((product, qty = 1) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.id === product.id)
            if (existing) {
                return prev.map((i) =>
                    i.id === product.id ? { ...i, qty: i.qty + qty } : i
                )
            }
            return [...prev, { ...product, qty }]
        })
    }, [])

    const removeItem = useCallback((id) => {
        setItems((prev) => prev.filter((i) => i.id !== id))
    }, [])

    const updateQty = useCallback((id, qty) => {
        if (qty < 1) return
        setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)))
    }, [])

    const clearCart = useCallback(() => {
        setItems([])
        localStorage.removeItem(CART_KEY)
    }, [])

    const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)
    const totalItems = items.reduce((sum, i) => sum + i.qty, 0)

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, total, totalItems }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error('useCart must be used within CartProvider')
    return ctx
}
