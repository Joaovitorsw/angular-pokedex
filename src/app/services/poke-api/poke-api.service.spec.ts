import { TestBed } from '@angular/core/testing';
import PokeAPI from 'pokedex-promise-v2';
import { PokeAPIService } from './poke-api.service';

describe('PokeAPIService', () => {
  let service: PokeAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: PokeAPI, useValue: new PokeAPI() }],
    });
    service = TestBed.inject(PokeAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a pokemon', (done) => {
    const pokemonID = 1;
    const pokemonName = 'bulbasaur';
    service.getPokemonByNameOrID(pokemonID).subscribe((pokemon) => {
      expect(pokemon.name).toEqual(pokemonName);
      done();
    });
    service.getPokemonByNameOrID(pokemonName).subscribe((pokemon) => {
      expect(pokemon.name).toEqual(pokemonName);
      done();
    });
  });

  it('should return a list of pokemon', (done) => {
    const pokemonStringList = ['bulbasaur', 'ivysaur', 'venusaur'];
    const pokemonNumberList = [1, 2, 3];
    service.getPokemonsByList(pokemonStringList).subscribe((pokemons) => {
      expect(pokemons.length).toEqual(3);
      done();
    });
    service.getPokemonsByList(pokemonNumberList).subscribe((pokemons) => {
      expect(pokemons.length).toEqual(3);
      done();
    });
  });
});
