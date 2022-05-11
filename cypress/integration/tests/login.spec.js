///<reference types="cypress" />

const credentials = require('../../fixtures/credentials')
const messages = require('../../fixtures/messages.json')

beforeEach(()=> {
    cy.visit('https://www.saucedemo.com/');
})

describe(
    'Testing user logins', () => {
        it('Standard user login', () => {
            cy.login(credentials.standard_user, credentials.password);
            cy.url().should('eq', 'https://www.saucedemo.com/inventory.html');
            cy.logout();
        })

        it('Locked out user login', () => {
            cy.login(credentials.locked_out_user, credentials.password);
            cy.get('[data-test="error"]').should('be.visible');
            cy.get('[data-test="error"]').should('have.text', messages.locked_out);
        })

        it('Problematic user login', () => {
            cy.login(credentials.problem_user, credentials.password);
            cy.url().should('eq', 'https://www.saucedemo.com/inventory.html');
            cy.get('#item_4_img_link').find('img').should('have.attr', 'src', '/static/media/sl-404.168b1cce.jpg');
            cy.logout();
        })

        it('Performance glitch user login', () => {
            cy.login(credentials.standard_user, credentials.password);
            cy.url().should('eq', 'https://www.saucedemo.com/inventory.html');
            cy.logout();
        })
    }

    
)