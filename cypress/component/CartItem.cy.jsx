import CartItem from '../../src/components/CartItem'

const mockItem = {
    id: 1,
    name: 'Laptop Pro X',
    price: 25990000,
    qty: 2,
    image: '💻',
}

describe('CartItem Component Tests', () => {
    it('TC01 - Render đúng thông tin sản phẩm trong giỏ', () => {
        cy.mount(<CartItem item={mockItem} onUpdateQty={() => { }} onRemove={() => { }} />)
        cy.get('[data-testid=cart-item-name]').should('contain', 'Laptop Pro X')
        cy.get('[data-testid=cart-item-price]').should('contain', '25.990.000')
        cy.get('[data-testid=qty-value]').should('contain', '2')
        cy.get('[data-testid=cart-item-subtotal]').should('contain', '51.980.000')
        cy.get('[data-testid=cart-item-image]').should('contain', '💻')
    })

    it('TC02 - Click tăng số lượng gọi handler với qty+1', () => {
        const onUpdateQty = cy.stub().as('updateQty')
        cy.mount(<CartItem item={mockItem} onUpdateQty={onUpdateQty} onRemove={() => { }} />)
        cy.get('[data-testid=qty-increase]').click()
        cy.get('@updateQty').should('have.been.calledOnceWith', mockItem.id, mockItem.qty + 1)
    })

    it('TC03 - Click giảm số lượng gọi handler với qty-1', () => {
        const onUpdateQty = cy.stub().as('updateQty')
        cy.mount(<CartItem item={mockItem} onUpdateQty={onUpdateQty} onRemove={() => { }} />)
        cy.get('[data-testid=qty-decrease]').click()
        cy.get('@updateQty').should('have.been.calledOnceWith', mockItem.id, mockItem.qty - 1)
    })

    it('TC04 - Button giảm bị disabled khi qty = 1', () => {
        const itemQty1 = { ...mockItem, qty: 1 }
        cy.mount(<CartItem item={itemQty1} onUpdateQty={() => { }} onRemove={() => { }} />)
        cy.get('[data-testid=qty-decrease]').should('be.disabled')
        cy.get('[data-testid=qty-increase]').should('not.be.disabled')
    })

    it('TC05 - Click xóa gọi onRemove với đúng id', () => {
        const onRemove = cy.stub().as('removeItem')
        cy.mount(<CartItem item={mockItem} onUpdateQty={() => { }} onRemove={onRemove} />)
        cy.get('[data-testid=remove-item-btn]').click()
        cy.get('@removeItem').should('have.been.calledOnceWith', mockItem.id)
    })
})
