///<reference types="cypress" />

const identifiers = require('../../fixtures/main')
const credentials = require('../../fixtures/credentials')
const links = require('../../fixtures/links')

beforeEach(()=> {
    cy.visit(links.main);
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
                    expect(e.text()).to.equal(identifiers.users);
                })
            cy.get('.login_password').find('h4').should('have.text', 'Password for all users:');
            cy.get('.login_password')
                .contains('secret_sauce').should((e) => {
                    expect(e.text()).to.equal(identifiers.password);
                });
            
        })

        it("User page elements", () => {
            cy.login(credentials.standard_user, credentials.password);
            cy.get('#react-burger-menu-btn').should('be.visible');
            cy.get('.shopping_cart_container').should('be.visible');
            cy.get('.app_logo').should('be.visible');
            cy.get('.inventory_list')
                .children()
                .should('have.length', 6);
            cy.get('.footer').should('be.visible');
            cy.findMedia('.social_twitter');
            cy.findMedia('.social_facebook');
            cy.findMedia('.social_linkedin');
            cy.get('.footer_robot').should('be.visible');            
        })
    }
)