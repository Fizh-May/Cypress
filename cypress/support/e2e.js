// E2E Support file
import './commands'

// Login helper command
Cypress.Commands.add('login', (email = 'john@test.com', password = 'Test@123') => {
    cy.visit('/login')
    cy.get('[data-testid=email-input]').type(email)
    cy.get('[data-testid=password-input]').type(password)
    cy.get('[data-testid=login-submit]').click()
    cy.url().should('include', '/dashboard')
})

Cypress.Commands.add('logout', () => {
    cy.get('[data-testid=logout-btn]').click()
    cy.url().should('include', '/login')
})
