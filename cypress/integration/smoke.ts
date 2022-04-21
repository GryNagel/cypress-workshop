// describe('smoke tests', () => {
//     beforeEach(() => {
//         cy.visit('/');
//     });

//     it('should have application header', () => {
//         cy.get('heading').contains('Hello cypress');
//     });

//     it('should have Posts header', () => {
//         cy.get('heading').contains('Posts');
//     });
// });

describe('smoke tests', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should have application header', () => {
        cy.findByRole('heading', {name: /Hello cypress/i}).should('exist'); 

    });

    it('should have Posts header', () => {
        cy.findByRole('heading', {name: /Posts/i }).should('exist');
    });
});