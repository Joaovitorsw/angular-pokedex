import { eValidationErrorMessage } from 'app/directives/show-validation-error/validations';

const dataTestIDfilterContent = '[data-testid="filter-content"]';
const dataTestIDfilterDrawer = '[data-testid=filter-drawer]';
const dataTestIDsearch = '[data-testid=search]';
const dataTestIDShortPokemonCard = '[data-testid=short-pokemon-card]';
const dataTestIDtype = '[data-testid=type]';
const sortTestID = '[data-testid=sort]';
const rangeTestID = '[data-testid=range]';
const notFoundID = '[data-testid=not-found]';
const fromTestID = '[data-testid=from]';
const toTestID = '[data-testid=to]';
const customRangeErrorTestID = '[data-testid=custom-range-error]';
const weaknessTestID = '[data-testid=weakness]';
const heightTestID = '[data-testid=height]';
const weightTestID = '[data-testid=weight]';

const getFilterContent = () => cy.get(dataTestIDfilterContent);
const getFilterDrawer = () => cy.get(dataTestIDfilterDrawer);
const getSearchInput = () => cy.get(dataTestIDsearch);
const getShortPokemonCard = () => cy.get(dataTestIDShortPokemonCard);
const getType = () => cy.get<HTMLSelectElement>(dataTestIDtype);
const getSort = () => cy.get<HTMLSelectElement>(sortTestID);
const getRange = () => cy.get<HTMLSelectElement>(rangeTestID);
const getNotFound = () => cy.get(notFoundID);
const getFrom = () => cy.get(fromTestID);
const getTo = () => cy.get(toTestID);
const getCustomRangeError = () => cy.get(customRangeErrorTestID);
const getWeakness = () => cy.get<HTMLSelectElement>(weaknessTestID);
const getHeight = () => cy.get<HTMLSelectElement>(heightTestID);
const getWeight = () => cy.get<HTMLSelectElement>(weightTestID);

const select = (
  select: () => Cypress.Chainable<JQuery<HTMLSelectElement>>,
  value: string
) =>
  select()
    .click()
    .then(() => {
      cy.get('mat-option').contains(value).click();
    });

describe('Home page', () => {
  describe('page filters', () => {
    beforeEach(() => {
      cy.visit('/');
    });
    it('search show error message', () => {
      getFilterDrawer().click();
      getSearchInput().type('dsfds');
      getFilterContent().click();
      getSearchInput()
        .get('mat-error')
        .should('contain.html', eValidationErrorMessage.POKEMON_NAME);
    });
    it('search charmander', () => {
      getFilterDrawer().click();
      getSearchInput().type('charmander');
      getFilterDrawer().click();
      getShortPokemonCard()
        .should('have.length', 1)
        .children()
        .contains('Charmander');
    });

    it('sorting pokemons descent', () => {
      getFilterDrawer().click();
      select(getSort, 'Descending');
      getShortPokemonCard()
        .should('have.length', 151)
        .children()
        .contains('Mew');
      select(getSort, 'Ascending');
      getShortPokemonCard()
        .should('have.length', 151)
        .children()
        .contains('Bulbasaur');
    });

    it('search all pokemon generations', () => {
      const checkGen = (
        generation: string,
        generationLength: number,
        generationPokemon: string
      ) => {
        getFilterDrawer().click();
        select(getRange, generation);
        getFilterDrawer().click();
        getShortPokemonCard()
          .should('have.length', generationLength)
          .children()
          .contains(generationPokemon);
      };

      checkGen('Generation 1', 151, 'Bulbasaur');
      checkGen('Generation 2', 100, 'Chikorita');
      checkGen('Generation 3', 135, 'Treecko');
      checkGen('Generation 4', 108, 'Turtwig');
      checkGen('Generation 5', 155, 'Snivy');
      checkGen('Generation 6', 72, 'Chespin');
      checkGen('Generation 7', 88, 'Rowlet');
      checkGen('Generation 8', 89, 'Grookey');
    });

    it('search charmander and filter by fire', () => {
      cy.visit('/');
      getFilterDrawer().click();
      getSearchInput().type('charmander');
      select(getType, 'Fire');

      getWeakness()
        .find('mat-select')
        .should('have.class', 'mat-select-disabled');

      getShortPokemonCard()
        .should('have.length', 1)
        .children()
        .contains('Charmander');
    });

    it('search first generation pokemons by fire type', () => {
      getFilterDrawer().click();
      select(getType, 'Fire');

      getWeakness()
        .find('mat-select')
        .should('have.class', 'mat-select-disabled');

      getShortPokemonCard()
        .should('have.length', 12)
        .children()
        .contains('Charmander');
    });

    it('search first generation pokemons by water type', () => {
      getFilterDrawer().click();
      select(getType, 'Water');

      getWeakness()
        .find('mat-select')
        .should('have.class', 'mat-select-disabled');

      getShortPokemonCard()
        .should('have.length', 32)
        .children()
        .contains('Squirtle');
    });

    it('search first generation pokemons by grass type', () => {
      getFilterDrawer().click();
      select(getType, 'Grass');

      getWeakness()
        .find('mat-select')
        .should('have.class', 'mat-select-disabled');

      getShortPokemonCard()
        .should('have.length', 14)
        .children()
        .contains('Bulbasaur');
    });

    it('search first generation pokemons by dark type', () => {
      getFilterDrawer().click();
      select(getType, 'Dark');

      getWeakness()
        .find('mat-select')
        .should('have.class', 'mat-select-disabled');

      getFilterDrawer().click();
      getNotFound().should('be.visible');
    });

    it('search custom range pokemons ', () => {
      getFilterDrawer().click();
      select(getRange, 'Custom');
      getTo().clear().type('24');
      getShortPokemonCard()
        .should('have.length', 24)
        .children()
        .contains('Bulbasaur');
    });

    it('search custom range pokemons with from invalid values', () => {
      getFilterDrawer().click();
      select(getRange, 'Custom');
      getFrom().clear().type('-1');
      getCustomRangeError().should('contain.html', eValidationErrorMessage.MIN);
    });

    it('search custom range pokemons with to invalid values', () => {
      getFilterDrawer().click();
      select(getRange, 'Custom');
      getTo().clear().type('899');
      getCustomRangeError().should('contain.html', eValidationErrorMessage.MAX);
    });

    it('search custom range pokemons with from and to invalid values', () => {
      getFilterDrawer().click();
      select(getRange, 'Custom');
      getFrom().clear().type('25');
      getTo().clear().type('20');
      getCustomRangeError().should(
        'contain.html',
        eValidationErrorMessage.RANGE
      );
    });

    it('search first generation pokemons by weakness type fire', () => {
      getFilterDrawer().click();
      select(getWeakness, 'Fire');

      getType().find('mat-select').should('have.class', 'mat-select-disabled');

      getShortPokemonCard()
        .should('have.length', 31)
        .children()
        .contains('Paras');
    });

    it('search first generation pokemons by height', () => {
      getShortPokemonCard()
        .should('have.length', 151)
        .children()
        .contains('Bulbasaur');
      getFilterDrawer().click();
      select(getHeight, '30 cm');
      getWeight()
        .click()
        .children()
        .get('mat-option')
        .should('have.length', 10);

      getShortPokemonCard()
        .should('have.length', 10)
        .children()
        .contains('Caterpie');
    });

    it('search first generation pokemons by weight', () => {
      getShortPokemonCard()
        .should('have.length', 151)
        .children()
        .contains('Bulbasaur');
      getFilterDrawer().click();

      select(getWeight, '1.0Kg');

      getHeight().click().children().get('mat-option').should('have.length', 2);

      getShortPokemonCard()
        .should('have.length', 1)
        .children()
        .contains('Koffing');
    });

    it('search first generation pokemons by height and weight', () => {
      getShortPokemonCard()
        .should('have.length', 151)
        .children()
        .contains('Bulbasaur');
      getFilterDrawer().click();
      select(getHeight, '30 cm');
      select(getWeight, '2.0Kg');

      getWeight().children().get('mat-option').should('have.length', 10);

      getShortPokemonCard()
        .should('have.length', 1)
        .children()
        .contains('Spearow');
    });
  });
});
