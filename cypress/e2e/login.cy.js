describe('Login E2E Tests', () => {
    beforeEach(() => {
        cy.clearLocalStorage('cy_current_user')
        cy.visit('/login')
    })

    it('TC01 - Hiển thị trang đăng nhập đúng', () => {
        cy.get('[data-testid=login-page]').should('exist')
        cy.get('[data-testid=email-input]').should('be.visible')
        cy.get('[data-testid=password-input]').should('be.visible')
        cy.get('[data-testid=login-submit]').should('contain', 'Đăng nhập')
        cy.get('[data-testid=register-link]').should('exist')
    })

    it('TC02 - Đăng nhập thành công với thông tin hợp lệ', () => {
        cy.get('[data-testid=email-input]').type('john@test.com')
        cy.get('[data-testid=password-input]').type('Test@123')
        cy.get('[data-testid=login-submit]').click()
        cy.url().should('include', '/dashboard')
        cy.get('[data-testid=dashboard-page]').should('exist')
        cy.get('[data-testid=user-name]').should('contain', 'John')
    })

    it('TC03 - Đăng nhập thất bại với mật khẩu sai', () => {
        cy.get('[data-testid=email-input]').type('john@test.com')
        cy.get('[data-testid=password-input]').type('wrongpassword')
        cy.get('[data-testid=login-submit]').click()
        cy.get('[data-testid=error-message]').should('be.visible')
        cy.get('[data-testid=error-message]').should('contain', 'không đúng')
        cy.url().should('include', '/login')
    })

    it('TC04 - Đăng nhập thất bại với email không tồn tại', () => {
        cy.get('[data-testid=email-input]').type('notexist@test.com')
        cy.get('[data-testid=password-input]').type('Test@123')
        cy.get('[data-testid=login-submit]').click()
        cy.get('[data-testid=error-message]').should('be.visible')
    })

    it('TC05 - Validation khi để trống email', () => {
        cy.get('[data-testid=password-input]').type('Test@123')
        cy.get('[data-testid=login-submit]').click()
        cy.get('[data-testid=error-message]').should('contain', 'Email không được để trống')
        cy.url().should('include', '/login')
    })

    it('TC06 - Validation khi để trống mật khẩu', () => {
        cy.get('[data-testid=email-input]').type('john@test.com')
        cy.get('[data-testid=login-submit]').click()
        cy.get('[data-testid=error-message]').should('contain', 'Mật khẩu không được để trống')
    })

    it('TC07 - Toggle hiển thị/ẩn mật khẩu', () => {
        cy.get('[data-testid=password-input]').should('have.attr', 'type', 'password')
        cy.get('[data-testid=toggle-password]').click()
        cy.get('[data-testid=password-input]').should('have.attr', 'type', 'text')
        cy.get('[data-testid=toggle-password]').click()
        cy.get('[data-testid=password-input]').should('have.attr', 'type', 'password')
    })

    it('TC08 - Chuyển sang trang đăng ký', () => {
        cy.get('[data-testid=register-link]').first().click()
        cy.url().should('include', '/register')
        cy.get('[data-testid=register-page]').should('exist')
    })
})
