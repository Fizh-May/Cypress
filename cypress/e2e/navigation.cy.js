describe('Navigation E2E Tests', () => {
    beforeEach(() => {
        cy.clearLocalStorage('cy_current_user')
    })

    it('TC01 - Header hiển thị các link điều hướng', () => {
        cy.visit('/')
        cy.get('[data-testid=header]').should('exist')
        cy.get('[data-testid=nav-home]').should('exist')
        cy.get('[data-testid=nav-products]').should('exist')
        cy.get('[data-testid=logo]').should('contain', 'ShopTest')
    })

    it('TC02 - Click logo về trang chủ', () => {
        cy.visit('/products')
        cy.get('[data-testid=logo]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/')
        cy.get('[data-testid=home-page]').should('exist')
    })

    it('TC03 - Route được bảo vệ redirect về login khi chưa đăng nhập', () => {
        cy.visit('/dashboard')
        cy.url().should('include', '/login')
        cy.visit('/cart')
        cy.url().should('include', '/login')
        cy.visit('/profile')
        cy.url().should('include', '/login')
    })

    it('TC04 - Sau khi đăng nhập, route bảo vệ hoạt động bình thường', () => {
        cy.login()
        cy.visit('/dashboard')
        cy.url().should('include', '/dashboard')
        cy.get('[data-testid=dashboard-page]').should('exist')
        cy.visit('/cart')
        cy.get('[data-testid=cart-page]').should('exist')
        cy.visit('/profile')
        cy.get('[data-testid=profile-page]').should('exist')
    })

    it('TC05 - Trang 404 hiển thị khi URL không hợp lệ', () => {
        cy.visit('/this-page-does-not-exist')
        cy.get('[data-testid=not-found-page]').should('be.visible')
        cy.get('[data-testid=go-home-btn]').should('exist')
    })
})
