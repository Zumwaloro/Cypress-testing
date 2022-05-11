Cypress.Commands.add('login', (user, password) => {
    cy.get('[data-test="username"]').type(user);
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-button"]').click();
})

Cypress.Commands.add('logout', () => {
    cy.get('#react-burger-menu-btn')
        .click()
        .get('#logout_sidebar_link')
        .click();
    cy.url().should('eq', 'https://www.saucedemo.com/');
})

Cypress.Commands.add('findMedia', (media) => {
    cy.get('.footer>.social')
        .find(media)
        .should('be.visible');
})