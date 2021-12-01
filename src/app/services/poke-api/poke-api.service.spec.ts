import { TestBed } from '@angular/core/testing';
import { PokeAPIService } from './poke-api.service';

describe('PokeAPIService', () => {
  let service: PokeAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokeAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return a pokemon', () => {
    service.getPokemonByNameOrID(1).subscribe((pokemon) => {
      expect(pokemon.name).toEqual('bulbasaur');
    });
  });
  it('should return a list of pokemon', () => {
    const pokemonStringList = ['bulbasaur', 'ivysaur', 'venusaur'];
    const pokemonNumberList = [1, 2, 3];
    service.getPokemonsByList(pokemonStringList).subscribe((pokemons) => {
      expect(pokemons.length).toBeGreaterThan(3);
    });
    service.getPokemonsByList(pokemonNumberList).subscribe((pokemons) => {
      expect(pokemons.length).toBeGreaterThan(3);
    });
  });
});
