describe('About page', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      url: 'https://pokeapi.co/api/v2/pokemon/*',
    }).as('pokemon');

    cy.intercept({
      method: 'GET',
      url: 'https://pokeapi.co/api/v2/pokemon-species/*',
    }).as('species');

    cy.intercept({
      method: 'GET',
      url: 'https://pokeapi.co/api/v2/ability/*',
    }).as('ability');

    cy.intercept({
      method: 'GET',
      url: 'https://pokeapi.co/api/v2/move/*',
    }).as('move');
    cy.intercept({
      method: 'GET',
      url: 'https://pokeapi.co/api/v2/evolution-chain/*',
    }).as('evolution-chain');
  });
  it('should enter in bulbasaur about page', () => {
    cy.visit('/about/bulbasaur');
    cy.wait('@pokemon').its('response.statusCode').should('eq', 200);
    cy.wait('@species').its('response.statusCode').should('eq', 200);
    cy.wait('@ability').its('response.statusCode').should('eq', 200);
    cy.wait('@move').its('response.statusCode').should('eq', 200);
    cy.wait('@evolution-chain').its('response.statusCode').should('eq', 200);
    cy.get('h1').should('contain', 'Bulbasaur');
  });
});
