import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import Toast from '../components/Toast'
import { useCart } from '../context/CartContext'
import { getProductsAPI, CATEGORIES } from '../services/productService'

export default function ProductsPage() {
    const [products, setProducts] = useState([])
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('All')
    const [loading, setLoading] = useState(true)
    const [toast, setToast] = useState(null)
    const { addItem } = useCart()

    const fetchProducts = async () => {
        setLoading(true)
        const data = await getProductsAPI(search, category)
        setProducts(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchProducts()
    }, [search, category])

    const handleAddToCart = (product) => {
        addItem(product)
        setToast({ message: `Đã thêm "${product.name}" vào giỏ hàng!`, type: 'success' })
    }

    return (
        <div className="page" data-testid="products-page">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="page-header">
                <h1>Sản phẩm</h1>
                <p className="text-muted">Khám phá bộ sưu tập của chúng tôi</p>
            </div>

            <div className="filters" data-testid="filters">
                <div className="search-box">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        className="form-input search-input"
                        placeholder="Tìm kiếm sản phẩm..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        data-testid="search-input"
                    />
                    {search && (
                        <button className="clear-search" onClick={() => setSearch('')} data-testid="clear-search">
                            ✕
                        </button>
                    )}
                </div>

                <div className="category-filters" data-testid="category-filters">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            className={`filter-btn ${category === cat ? 'active' : ''}`}
                            onClick={() => setCategory(cat)}
                            data-testid={`filter-${cat.toLowerCase()}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="products-meta" data-testid="products-meta">
                <span data-testid="product-count">{products.length} sản phẩm</span>
            </div>

            {loading ? (
                <div className="products-loading" data-testid="products-loading">
                    <div className="spinner" />
                    <p>Đang tải sản phẩm...</p>
                </div>
            ) : products.length === 0 ? (
                <div className="empty-state" data-testid="no-products">
                    <span>😕</span>
                    <p>Không tìm thấy sản phẩm nào</p>
                    <button className="btn btn-outline" onClick={() => { setSearch(''); setCategory('All') }}>
                        Xoá bộ lọc
                    </button>
                </div>
            ) : (
                <div className="products-grid" data-testid="products-grid">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={handleAddToCart}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
