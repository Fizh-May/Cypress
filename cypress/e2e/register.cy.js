describe('Register E2E Tests', () => {
    beforeEach(() => {
        cy.clearLocalStorage('cy_current_user')
        cy.clearLocalStorage('cy_users')
        cy.visit('/register')
    })

    it('TC01 - Hiển thị trang đăng ký đúng', () => {
        cy.get('[data-testid=register-page]').should('exist')
        cy.get('[data-testid=name-input]').should('be.visible')
        cy.get('[data-testid=email-input]').should('be.visible')
        cy.get('[data-testid=password-input]').should('be.visible')
        cy.get('[data-testid=confirm-input]').should('be.visible')
        cy.get('[data-testid=register-submit]').should('contain', 'Tạo tài khoản')
    })

    it('TC02 - Đăng ký thành công với thông tin hợp lệ', () => {
        cy.get('[data-testid=name-input]').type('Test User')
        cy.get('[data-testid=email-input]').type('newuser@test.com')
        cy.get('[data-testid=password-input]').type('NewPass@123')
        cy.get('[data-testid=confirm-input]').type('NewPass@123')
        cy.get('[data-testid=register-submit]').click()
        cy.get('[data-testid=toast]').should('contain', 'thành công')
        cy.url().should('include', '/login')
    })

    it('TC03 - Lỗi khi mật khẩu không khớp', () => {
        cy.get('[data-testid=name-input]').type('Test User')
        cy.get('[data-testid=email-input]').type('newuser2@test.com')
        cy.get('[data-testid=password-input]').type('NewPass@123')
        cy.get('[data-testid=confirm-input]').type('DifferentPass@123')
        cy.get('[data-testid=register-submit]').click()
        cy.get('[data-testid=confirm-error]').should('contain', 'không khớp')
        cy.url().should('include', '/register')
    })

    it('TC04 - Lỗi khi mật khẩu quá ngắn', () => {
        cy.get('[data-testid=name-input]').type('Test User')
        cy.get('[data-testid=email-input]').type('newuser3@test.com')
        cy.get('[data-testid=password-input]').type('123')
        cy.get('[data-testid=confirm-input]').type('123')
        cy.get('[data-testid=register-submit]').click()
        cy.get('[data-testid=password-error]').should('contain', 'ít nhất')
    })

    it('TC05 - Lỗi email đã tồn tại', () => {
        cy.get('[data-testid=name-input]').type('Duplicate User')
        cy.get('[data-testid=email-input]').type('john@test.com')
        cy.get('[data-testid=password-input]').type('NewPass@123')
        cy.get('[data-testid=confirm-input]').type('NewPass@123')
        cy.get('[data-testid=register-submit]').click()
        cy.get('[data-testid=email-error]').should('contain', 'đã được sử dụng')
    })

    it('TC06 - Validation khi để trống các trường', () => {
        cy.get('[data-testid=register-submit]').click()
        cy.get('[data-testid=name-error]').should('contain', 'không được để trống')
        cy.get('[data-testid=email-error]').should('be.visible')
        cy.get('[data-testid=password-error]').should('be.visible')
    })

    it('TC07 - Chuyển về trang đăng nhập', () => {
        cy.get('[data-testid=register-page]').find('[data-testid=login-link]').click()
        cy.url().should('include', '/login')
        cy.get('[data-testid=login-page]').should('exist')
    })
})
