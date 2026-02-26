import LoginPage from '../../src/pages/LoginPage'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../../src/context/AuthContext'

const mountLogin = () => {
    cy.mount(
        <MemoryRouter initialEntries={['/login']}>
            <AuthProvider>
                <LoginPage />
            </AuthProvider>
        </MemoryRouter>
    )
}

describe('LoginForm Component Tests', () => {
    beforeEach(() => {
        cy.clearLocalStorage('cy_current_user')
        mountLogin()
    })

    it('TC01 - Render đúng tất cả các trường form', () => {
        cy.get('[data-testid=login-page]').should('exist')
        cy.get('[data-testid=email-input]').should('exist')
        cy.get('[data-testid=password-input]').should('exist')
        cy.get('[data-testid=toggle-password]').should('exist')
        cy.get('[data-testid=remember-me]').should('exist')
        cy.get('[data-testid=login-submit]').should('exist')
        cy.get('[data-testid=register-link]').should('exist')
    })

    it('TC02 - Hiển thị lỗi khi email trống', () => {
        cy.get('[data-testid=password-input]').type('Test@123')
        cy.get('[data-testid=login-submit]').click()
        cy.get('[data-testid=error-message]').should('contain', 'Email không được để trống')
    })

    it('TC03 - Hiển thị lỗi khi email không hợp lệ', () => {
        cy.get('[data-testid=email-input]').type('invalidemail')
        cy.get('[data-testid=password-input]').type('Test@123')
        cy.get('[data-testid=login-submit]').click()
        cy.get('[data-testid=error-message]').should('contain', 'không hợp lệ')
    })

    it('TC04 - Toggle hiển thị mật khẩu hoạt động', () => {
        cy.get('[data-testid=password-input]').type('mysecretpassword')
        cy.get('[data-testid=password-input]').should('have.attr', 'type', 'password')
        cy.get('[data-testid=toggle-password]').click()
        cy.get('[data-testid=password-input]').should('have.attr', 'type', 'text')
    })

    it('TC05 - Checkbox "Nhớ đăng nhập" có thể check/uncheck', () => {
        cy.get('[data-testid=remember-me]').should('not.be.checked')
        cy.get('[data-testid=remember-me]').check()
        cy.get('[data-testid=remember-me]').should('be.checked')
        cy.get('[data-testid=remember-me]').uncheck()
        cy.get('[data-testid=remember-me]').should('not.be.checked')
    })

    it('TC06 - Loading state khi submit', () => {
        cy.get('[data-testid=email-input]').type('john@test.com')
        cy.get('[data-testid=password-input]').type('Test@123')
        cy.get('[data-testid=login-submit]').click()
        cy.get('[data-testid=login-submit]').should('be.disabled')
    })
})
