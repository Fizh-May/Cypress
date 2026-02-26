export default function CartItem({ item, onUpdateQty, onRemove }) {
    const formatPrice = (p) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p)

    return (
        <div className="cart-item" data-testid="cart-item">
            <div className="cart-item-image" data-testid="cart-item-image">
                <span className="product-emoji">{item.image}</span>
            </div>
            <div className="cart-item-info">
                <p className="cart-item-name" data-testid="cart-item-name">
                    {item.name}
                </p>
                <p className="cart-item-price" data-testid="cart-item-price">
                    {formatPrice(item.price)}
                </p>
            </div>

            <div className="cart-item-qty" data-testid="cart-item-qty">
                <button
                    className="qty-btn"
                    onClick={() => onUpdateQty(item.id, item.qty - 1)}
                    disabled={item.qty <= 1}
                    data-testid="qty-decrease"
                >
                    −
                </button>
                <span className="qty-value" data-testid="qty-value">
                    {item.qty}
                </span>
                <button
                    className="qty-btn"
                    onClick={() => onUpdateQty(item.id, item.qty + 1)}
                    data-testid="qty-increase"
                >
                    +
                </button>
            </div>

            <div className="cart-item-subtotal" data-testid="cart-item-subtotal">
                {formatPrice(item.price * item.qty)}
            </div>

            <button
                className="remove-btn"
                onClick={() => onRemove(item.id)}
                data-testid="remove-item-btn"
                aria-label="Xóa sản phẩm"
            >
                ✕
            </button>
        </div>
    )
}
