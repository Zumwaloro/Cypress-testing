///<reference types="cypress" />

const credentials = require('../../fixtures/main')

beforeEach(()=> {
    cy.visit('https://www.saucedemo.com/');
})

describe(
    "Testing if selected elements are present on the website", () => {
        it("Main page elements", () => {
            cy.get('.login_logo').should('be.visible');
            cy.get('.login_wrapper').should('be.visible');
            cy.get('.login-box').should('be.visible');
            cy.get('[data-test="username"]').should('be.visible');
            cy.get('[data-test="password"]').should('be.visible');
            cy.get('[data-test="login-button"]').should('be.visible');
            cy.get('.bot_column').should('be.visible');
            cy.get('.login_credentials_wrap').should('be.visible');
            cy.get('.login_credentials').find('h4').should('have.text', 'Accepted usernames are:');
            cy.get('.login_credentials')
            .should((e) => {
                expect(e.text()).to.equal(credentials.users);
            })
            cy.get('.login_password').find('h4').should('have.text', 'Password for all users:');
            cy.get('.login_password')
            .contains('secret_sauce').should((e) => {
                expect(e.text()).to.equal(credentials.password);
            });
            
        })
    }
)