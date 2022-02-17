import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SHORT_POKEMONS } from 'app/database/short-pokemons';
import { Pokemon } from 'poke-api-models';
import { PokeApiService } from './poke-api.service';

describe('PokeAPIService', () => {
  let service: PokeApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PokeApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should return a pokemon by name or id', (done) => {
    const pokemon = SHORT_POKEMONS[0] as Pokemon;
    service.getPokemonByNameOrID(pokemon.name).subscribe((res) => {
      expect(res).toEqual(pokemon);
      done();
    });
    const req = httpMock.expectOne(
      `${service.BASE_URL}${service.POKEMON_EXTENSION}${pokemon.name}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(pokemon);
  });

  it('should return a list of pokemons by list', (done) => {
    const expectedPokemons = SHORT_POKEMONS.slice(0, 3) as Pokemon[];
    const pokemonsList = expectedPokemons.map((pokemon) => pokemon.name);
    service.getPokemonsByList(pokemonsList).subscribe((res) => {
      expect(res).toEqual(expectedPokemons);
      done();
    });

    expectedPokemons.forEach((pokemon) => {
      const req = httpMock.expectOne(
        `${service.BASE_URL}${service.POKEMON_EXTENSION}${pokemon.name}`
      );
      expect(req.request.method).toBe('GET');
      req.flush(pokemon);
    });
  });
});
