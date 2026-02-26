// Shared commands for both E2E and Component tests
import '@testing-library/cypress/add-commands'

Cypress.Commands.add('clearAuthState', () => {
    cy.clearLocalStorage('cy_current_user')
    cy.clearLocalStorage('cy_cart')
})
