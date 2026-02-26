describe('Products E2E Tests', () => {
    beforeEach(() => {
        cy.clearLocalStorage('cy_current_user')
        cy.visit('/products')
    })

    it('TC01 - Hiển thị danh sách sản phẩm', () => {
        cy.get('[data-testid=products-page]').should('exist')
        cy.get('[data-testid=products-grid]').should('exist')
        cy.get('[data-testid=product-card]').should('have.length.greaterThan', 0)
        cy.get('[data-testid=product-count]').should('contain', 'sản phẩm')
    })

    it('TC02 - Tìm kiếm sản phẩm theo tên', () => {
        cy.get('[data-testid=search-input]').type('Laptop')
        cy.get('[data-testid=product-card]').should('have.length', 1)
        cy.get('[data-testid=product-name]').first().should('contain', 'Laptop')
    })

    it('TC03 - Tìm kiếm không ra kết quả', () => {
        cy.get('[data-testid=search-input]').type('xyznotexist123')
        cy.get('[data-testid=no-products]').should('be.visible')
        cy.get('[data-testid=product-card]').should('not.exist')
    })

    it('TC04 - Lọc theo danh mục', () => {
        cy.get('[data-testid=filter-sports]').click()
        // Wait for async filter to finish — Sports has exactly 2 products
        cy.get('[data-testid=product-card]').should('have.length', 2)
        cy.get('[data-testid=product-category]').each(($cat) => {
            expect($cat.text().trim()).to.equal('Sports')
        })
    })

    it('TC05 - Xóa bộ lọc search', () => {
        cy.get('[data-testid=search-input]').type('Laptop')
        cy.get('[data-testid=clear-search]').click()
        cy.get('[data-testid=search-input]').should('have.value', '')
        cy.get('[data-testid=product-card]').should('have.length.greaterThan', 1)
    })

    it('TC06 - Sản phẩm hết hàng có button disabled', () => {
        cy.get('[data-testid=out-of-stock]').first().parents('[data-testid=product-card]').within(() => {
            cy.get('[data-testid=add-to-cart-btn]').should('be.disabled')
        })
    })
})
