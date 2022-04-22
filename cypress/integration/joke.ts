import {mockJoke} from '../../mocks/mockText';

describe('joke', () => { 
    it('should show a joke from our mocked api', () => {
        cy.visit('/');
        cy.findByText(mockJoke.joke).should('exist');
    })
 })