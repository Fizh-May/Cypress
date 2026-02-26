export default function ProductCard({ product, onAddToCart }) {
    const formatPrice = (p) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p)

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < Math.floor(rating) ? 'star filled' : 'star'}>
                ★
            </span>
        ))
    }

    return (
        <div className="product-card" data-testid="product-card">
            <div className="product-image" data-testid="product-image">
                <span className="product-emoji">{product.image}</span>
                {product.stock === 0 && (
                    <div className="out-of-stock-badge" data-testid="out-of-stock">
                        Hết hàng
                    </div>
                )}
            </div>

            <div className="product-body">
                <span className="product-category" data-testid="product-category">
                    {product.category}
                </span>
                <h3 className="product-name" data-testid="product-name">
                    {product.name}
                </h3>
                <p className="product-desc" data-testid="product-desc">
                    {product.description}
                </p>

                <div className="product-rating" data-testid="product-rating">
                    {renderStars(product.rating)}
                    <span className="rating-value">({product.rating})</span>
                </div>

                <div className="product-footer">
                    <span className="product-price" data-testid="product-price">
                        {formatPrice(product.price)}
                    </span>
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={() => onAddToCart(product)}
                        disabled={product.stock === 0}
                        data-testid="add-to-cart-btn"
                    >
                        {product.stock === 0 ? 'Hết hàng' : 'Thêm vào giỏ'}
                    </button>
                </div>
            </div>
        </div>
    )
}
