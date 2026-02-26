import Header from '../../src/components/Header'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../../src/context/AuthContext'
import { CartProvider } from '../../src/context/CartContext'

const mountHeader = (isLoggedIn = false) => {
    if (isLoggedIn) {
        localStorage.setItem('cy_current_user', JSON.stringify({
            id: 1, name: 'John Doe', email: 'john@test.com', role: 'user', avatar: 'JD'
        }))
    } else {
        localStorage.removeItem('cy_current_user')
    }
    cy.mount(
        <MemoryRouter initialEntries={['/']}>
            <AuthProvider>
                <CartProvider>
                    <Header />
                </CartProvider>
            </AuthProvider>
        </MemoryRouter>
    )
}

describe('Header Component Tests', () => {
    it('TC01 - Render header không đăng nhập: show login/register', () => {
        mountHeader(false)
        cy.get('[data-testid=header]').should('exist')
        cy.get('[data-testid=logo]').should('contain', 'ShopTest')
        cy.get('[data-testid=nav-home]').should('exist')
        cy.get('[data-testid=nav-products]').should('exist')
        cy.get('[data-testid=login-link]').should('exist')
        cy.get('[data-testid=register-link]').should('exist')
        cy.get('[data-testid=logout-btn]').should('not.exist')
    })

    it('TC02 - Render header đã đăng nhập: show user info và logout', () => {
        mountHeader(true)
        cy.get('[data-testid=user-name]').should('contain', 'John')
        cy.get('[data-testid=user-avatar]').should('contain', 'JD')
        cy.get('[data-testid=logout-btn]').should('exist')
        cy.get('[data-testid=login-link]').should('not.exist')
    })

    it('TC03 - Cart badge không hiển thị khi giỏ hàng trống', () => {
        mountHeader(false)
        cy.get('[data-testid=cart-badge]').should('not.exist')
        cy.get('[data-testid=cart-btn]').should('exist')
    })

    it('TC04 - Header hiển thị nav dashboard và profile khi đã đăng nhập', () => {
        mountHeader(true)
        cy.get('[data-testid=nav-dashboard]').should('exist')
        cy.get('[data-testid=nav-profile]').should('exist')
    })
})
