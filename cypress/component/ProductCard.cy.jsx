import ProductCard from '../../src/components/ProductCard'

const mockProduct = {
    id: 1,
    name: 'Laptop Pro X',
    price: 25990000,
    category: 'Electronics',
    rating: 4.8,
    stock: 12,
    image: '💻',
    description: 'Laptop hiệu năng cao.',
}

const outOfStockProduct = { ...mockProduct, stock: 0, id: 2 }

describe('ProductCard Component Tests', () => {
    it('TC01 - Render tên, giá, hình ảnh và mô tả sản phẩm', () => {
        cy.mount(<ProductCard product={mockProduct} onAddToCart={() => { }} />)
        cy.get('[data-testid=product-name]').should('contain', 'Laptop Pro X')
        cy.get('[data-testid=product-price]').should('contain', '25.990.000')
        cy.get('[data-testid=product-image]').should('contain', '💻')
        cy.get('[data-testid=product-desc]').should('contain', 'hiệu năng cao')
        cy.get('[data-testid=product-category]').should('contain', 'Electronics')
    })

    it('TC02 - Button "Thêm vào giỏ" gọi callback khi click', () => {
        const onAddToCart = cy.stub().as('addToCart')
        cy.mount(<ProductCard product={mockProduct} onAddToCart={onAddToCart} />)
        cy.get('[data-testid=add-to-cart-btn]').click()
        cy.get('@addToCart').should('have.been.calledOnce')
        cy.get('@addToCart').should('have.been.calledWith', mockProduct)
    })

    it('TC03 - Hiển thị đánh giá sao đúng số lượng', () => {
        cy.mount(<ProductCard product={mockProduct} onAddToCart={() => { }} />)
        cy.get('[data-testid=product-rating]').should('exist')
        cy.get('.star.filled').should('have.length', 4)
        cy.get('[data-testid=product-rating]').should('contain', '4.8')
    })

    it('TC04 - Sản phẩm hết hàng: button disabled và badge hiển thị', () => {
        cy.mount(<ProductCard product={outOfStockProduct} onAddToCart={() => { }} />)
        cy.get('[data-testid=add-to-cart-btn]').should('be.disabled')
        cy.get('[data-testid=add-to-cart-btn]').should('contain', 'Hết hàng')
        cy.get('[data-testid=out-of-stock]').should('be.visible')
    })

    it('TC05 - Callback KHÔNG được gọi khi sản phẩm hết hàng', () => {
        const onAddToCart = cy.stub().as('addToCart')
        cy.mount(<ProductCard product={outOfStockProduct} onAddToCart={onAddToCart} />)
        cy.get('[data-testid=add-to-cart-btn]').click({ force: true })
        cy.get('@addToCart').should('not.have.been.called')
    })
})
