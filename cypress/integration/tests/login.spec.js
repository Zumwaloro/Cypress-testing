///<reference types="cypress" />

const credentials = require('../../fixtures/credentials')
const messages = require('../../fixtures/messages.json')

beforeEach(()=> {
    cy.visit('https://www.saucedemo.com/');
})

describe(
    'Testing user logins', () => {
        it('Standard user login', () => {
            cy.get('[data-test="username"]').type(credentials.standard_user);
            cy.get('[data-test="password"]').type(credentials.password);
            cy.get('[data-test="login-button"]').click();
            cy.url().should('eq', 'https://www.saucedemo.com/inventory.html');
            cy.get('#react-burger-menu-btn')
                .click()
                .get('#logout_sidebar_link')
                .click();
            cy.url().should('eq', 'https://www.saucedemo.com/');

        })

        it('Locked out user login', () => {
            cy.get('[data-test="username"]').type(credentials.locked_out_user);
            cy.get('[data-test="password"]').type(credentials.password);
            cy.get('[data-test="login-button"]').click();
            cy.get('[data-test="error"]').should('be.visible');
            cy.get('[data-test="error"]').should('have.text', messages.locked_out);
        })

        it('Problematic user login', () => {
            cy.get('[data-test="username"]').type(credentials.problem_user);
            cy.get('[data-test="password"]').type(credentials.password);
            cy.get('[data-test="login-button"]').click();
            cy.url().should('eq', 'https://www.saucedemo.com/inventory.html');
            cy.get('#item_4_img_link').find('img').should('have.attr', 'src', '/static/media/sl-404.168b1cce.jpg');
            cy.get('#react-burger-menu-btn')
                .click()
                .get('#logout_sidebar_link')
                .click();
            cy.url().should('eq', 'https://www.saucedemo.com/');
        })

        it('Performance glitch user login', () => {
            cy.get('[data-test="username"]').type(credentials.standard_user);
            cy.get('[data-test="password"]').type(credentials.password);
            cy.get('[data-test="login-button"]').click();
            cy.url().should('eq', 'https://www.saucedemo.com/inventory.html');
            cy.get('#react-burger-menu-btn')
                .click()
                .get('#logout_sidebar_link')
                .click();
            cy.url().should('eq', 'https://www.saucedemo.com/');
        })
    }

    
)