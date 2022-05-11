///<reference types="cypress" />

const credentials = require('../../fixtures/credentials')
const orders = require('../../fixtures/order')
const links = require('../../fixtures/links.json')

beforeEach(()=> {
    cy.visit(links.main);
})

describe(
    "Testing user actions", () => {
        it("Add product to cart", () => {
            cy.login(credentials.standard_user, credentials.password);
            cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
                .click()
                .get('.shopping_cart_badge')
                .should('have.text', 1);    
            cy.get('.shopping_cart_container').click();
            cy.url().should('eq', links.cart);
            cy.get('.title').should('have.text', orders.cart);
            cy.get('.inventory_item_price').should('have.text', orders.price);
        })

        it("Reset app state", () => {
            cy.login(credentials.standard_user, credentials.password);
            cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
                .click()
                .get('.shopping_cart_badge')
                .should('have.text', 1);    
            cy.get('#react-burger-menu-btn')
                .click()
                .get('#reset_sidebar_link')
                .click();
            cy.get('.shopping_cart_badge')
                .should('not.exist'); 
        })

        it("Checkout after shopping", () => {
            cy.login(credentials.standard_user, credentials.password);
            cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()   
            cy.get('.shopping_cart_container').click();
            cy.get('[data-test="checkout"]').click();
            cy.url().should('eq', links.checkOutOne);
            cy.get('[data-test="firstName"]').type('John');
            cy.get('[data-test="lastName"]').type('Smith');
            cy.get('[data-test="postalCode"]').type('5000');
            cy.get('[data-test="continue"]').click();
            cy.url().should('eq', links.checkOutTwo);
            cy.get('.summary_value_label').first().should('have.text', orders.card);
            cy.get('.summary_value_label').last().should('have.text', orders.delivery);
            cy.get('[data-test="finish"]').click();
            cy.get('.complete-header').last().should('have.text', orders.thankYou);
            cy.get('.pony_express').should('be.visible');
            cy.get('[data-test="back-to-products"]').click();
            cy.url().should('eq', links.userPage);
        })
    }
)