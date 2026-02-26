import Toast from '../../src/components/Toast'

describe('Toast Component Tests', () => {
    it('TC01 - Render Toast kiểu success', () => {
        cy.mount(<Toast message="Thành công!" type="success" onClose={() => { }} />)
        cy.get('[data-testid=toast]').should('have.class', 'toast-success')
        cy.get('[data-testid=toast-message]').should('contain', 'Thành công!')
        cy.get('[data-testid=toast-icon]').should('contain', '✅')
    })

    it('TC02 - Render Toast kiểu error', () => {
        cy.mount(<Toast message="Có lỗi xảy ra!" type="error" onClose={() => { }} />)
        cy.get('[data-testid=toast]').should('have.class', 'toast-error')
        cy.get('[data-testid=toast-message]').should('contain', 'Có lỗi xảy ra!')
        cy.get('[data-testid=toast-icon]').should('contain', '❌')
    })

    it('TC03 - Button close gọi callback onClose', () => {
        const onClose = cy.stub().as('onClose')
        cy.mount(<Toast message="Test message" type="info" onClose={onClose} />)
        cy.get('[data-testid=toast-close]').click()
        cy.wait(400)
        cy.get('@onClose').should('have.been.calledOnce')
    })

    it('TC04 - Toast tự động dismiss sau duration', () => {
        const onClose = cy.stub().as('onClose')
        cy.mount(<Toast message="Auto dismiss" type="warning" onClose={onClose} duration={500} />)
        cy.get('[data-testid=toast]').should('be.visible')
        cy.wait(1000)
        cy.get('@onClose').should('have.been.calledOnce')
    })
})
