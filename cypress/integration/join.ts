import faker from '@faker-js/faker';

describe('join test', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    afterEach(() => {
        cy.cleanupUser();
    });

    it('should allow you to register and login, then sign out', () => {
        const loginForm = {
            email: `${faker.internet.userName()}@example.com`,
            password: faker.internet.password(),
        };
        
        cy.then(() => ({ email: loginForm.email })).as('user');

        cy.visit('/');
        cy.findByRole('link', { name: /Login/i }).click();
        cy.findByRole('link', { name: /Sign up/i }).click();

        cy.findByRole('textbox', { name: /email/i }).type(loginForm.email);
        cy.findByLabelText(/password/i).type(loginForm.password);
        cy.findByRole('button', { name: /create account/i }).click();

        cy.findByRole('button', { name: /logout/i }).click();
    });
});
