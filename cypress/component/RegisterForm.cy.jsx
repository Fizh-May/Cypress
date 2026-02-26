import RegisterPage from '../../src/pages/RegisterPage'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../../src/context/AuthContext'

const mountRegister = () => {
    cy.mount(
        <MemoryRouter initialEntries={['/register']}>
            <AuthProvider>
                <RegisterPage />
            </AuthProvider>
        </MemoryRouter>
    )
}

describe('RegisterForm Component Tests', () => {
    beforeEach(() => {
        cy.clearLocalStorage()
        mountRegister()
    })

    it('TC01 - Render đúng tất cả các trường', () => {
        cy.get('[data-testid=register-page]').should('exist')
        cy.get('[data-testid=name-input]').should('exist')
        cy.get('[data-testid=email-input]').should('exist')
        cy.get('[data-testid=password-input]').should('exist')
        cy.get('[data-testid=confirm-input]').should('exist')
        cy.get('[data-testid=register-submit]').should('contain', 'Tạo tài khoản')
    })

    it('TC02 - Hiển thị lỗi khi các trường trống', () => {
        cy.get('[data-testid=register-submit]').click()
        cy.get('[data-testid=name-error]').should('contain', 'không được để trống')
        cy.get('[data-testid=email-error]').should('be.visible')
        cy.get('[data-testid=password-error]').should('be.visible')
    })

    it('TC03 - Hiển thị thanh độ mạnh mật khẩu', () => {
        cy.get('[data-testid=strength-bar]').should('not.exist')
        cy.get('[data-testid=password-input]').type('weakpass')
        cy.get('[data-testid=strength-bar]').should('exist')
        cy.get('[data-testid=strength-text]').should('contain', 'Yếu')
    })

    it('TC04 - Hiển thị lỗi khi mật khẩu không khớp', () => {
        cy.get('[data-testid=name-input]').type('Test User')
        cy.get('[data-testid=email-input]').type('test@test.com')
        cy.get('[data-testid=password-input]').type('StrongPass@1')
        cy.get('[data-testid=confirm-input]').type('DifferentPass@1')
        cy.get('[data-testid=register-submit]').click()
        cy.get('[data-testid=confirm-error]').should('contain', 'không khớp')
    })

    it('TC05 - Xóa lỗi khi người dùng bắt đầu nhập lại', () => {
        cy.get('[data-testid=register-submit]').click()
        cy.get('[data-testid=name-error]').should('be.visible')
        cy.get('[data-testid=name-input]').type('A')
        cy.get('[data-testid=name-error]').should('not.exist')
    })
})
