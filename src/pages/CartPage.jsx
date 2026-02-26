import { Link } from 'react-router-dom'
import CartItem from '../components/CartItem'
import Toast from '../components/Toast'
import { useCart } from '../context/CartContext'
import { useState } from 'react'

export default function CartPage() {
    const { items, removeItem, updateQty, clearCart, total } = useCart()
    const [toast, setToast] = useState(null)

    const formatPrice = (p) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p)

    const handleCheckout = () => {
        clearCart()
        setToast({ message: 'Đặt hàng thành công! Cảm ơn bạn đã mua sắm.', type: 'success' })
    }

    return (
        <div className="page" data-testid="cart-page">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="page-header">
                <h1>Giỏ hàng</h1>
            </div>

            {items.length === 0 ? (
                <div className="empty-state" data-testid="empty-cart">
                    <span>🛒</span>
                    <h2>Giỏ hàng trống</h2>
                    <p>Hãy thêm sản phẩm vào giỏ hàng của bạn!</p>
                    <Link to="/products" className="btn btn-primary" data-testid="shop-now-btn">
                        Mua sắm ngay
                    </Link>
                </div>
            ) : (
                <div className="cart-layout">
                    <div className="cart-list">
                        <div className="cart-header-row">
                            <span>Sản phẩm</span>
                            <span>Số lượng</span>
                            <span>Thành tiền</span>
                            <span></span>
                        </div>
                        {items.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onUpdateQty={updateQty}
                                onRemove={removeItem}
                            />
                        ))}
                        <div className="cart-actions">
                            <button
                                className="btn btn-outline btn-sm"
                                onClick={clearCart}
                                data-testid="clear-cart-btn"
                            >
                                🗑️ Xoá tất cả
                            </button>
                            <Link to="/products" className="btn btn-outline btn-sm" data-testid="continue-shopping">
                                ← Tiếp tục mua sắm
                            </Link>
                        </div>
                    </div>

                    <div className="cart-summary" data-testid="cart-summary">
                        <h3>Tóm tắt đơn hàng</h3>
                        <div className="summary-row">
                            <span>Tạm tính</span>
                            <span data-testid="subtotal">{formatPrice(total)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Phí vận chuyển</span>
                            <span className="text-success">Miễn phí</span>
                        </div>
                        <div className="summary-divider" />
                        <div className="summary-row summary-total">
                            <span>Tổng cộng</span>
                            <span data-testid="cart-total">{formatPrice(total)}</span>
                        </div>
                        <button
                            className="btn btn-primary btn-full"
                            onClick={handleCheckout}
                            data-testid="checkout-btn"
                        >
                            Đặt hàng ngay
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
