import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  BULBASAUR,
  BULBASAUR_ABILITIES,
  BULBASAUR_EVOLUTION_CHAIN,
  BULBASAUR_MOVES,
  BULBASAUR_SPECIES,
} from '@pokedex/mocks';
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

  it('should return a pokemon species by name or id', (done) => {
    service.getSpeciesByNameOrID(BULBASAUR.name).subscribe((res) => {
      expect(res).toEqual(BULBASAUR_SPECIES);
      done();
    });
    const req = httpMock.expectOne(
      `${service.BASE_URL}${service.POKEMON_SPECIES_EXTENSION}${BULBASAUR.name}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(BULBASAUR_SPECIES);
  });

  it('should return a list of pokemons species by list', (done) => {
    const pokemons = [BULBASAUR];
    const expectedSpecies = [BULBASAUR_SPECIES];
    const pokemonsList = pokemons.map((pokemon) => pokemon.name);
    service.getSpeciesByList(pokemonsList).subscribe((res) => {
      expect(res).toEqual(expectedSpecies);
      done();
    });

    pokemons.forEach((pokemon) => {
      const req = httpMock.expectOne(
        `${service.BASE_URL}${service.POKEMON_SPECIES_EXTENSION}${pokemon.name}`
      );
      expect(req.request.method).toBe('GET');
      req.flush(BULBASAUR_SPECIES);
    });
  });

  it('should return a evolution chain of pokemon by name or id', (done) => {
    service.getEvolutionChainById(BULBASAUR.id).subscribe((res) => {
      expect(res).toEqual(BULBASAUR_EVOLUTION_CHAIN);
      done();
    });
    const req = httpMock.expectOne(
      `${service.BASE_URL}${service.EVOLUTION_CHAIN_EXTENSION}${BULBASAUR.id}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(BULBASAUR_EVOLUTION_CHAIN);
  });

  it('should return a pokemon ability by name or id', (done) => {
    service
      .getAbilityByNameOrID(BULBASAUR.abilities[0].ability.name)
      .subscribe((res) => {
        expect(res).toEqual(BULBASAUR_ABILITIES[0]);
        done();
      });
    const req = httpMock.expectOne(
      `${service.BASE_URL}${service.ABILITY_EXTENSION}${BULBASAUR.abilities[0].ability.name}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(BULBASAUR_ABILITIES[0]);
  });

  it('should return a list of pokemons abilities by list', (done) => {
    const abilities = BULBASAUR.abilities.map(
      (ability) => ability.ability.name
    );
    service.getAbilitiesByList(abilities).subscribe((res) => {
      expect(res).toEqual(BULBASAUR_ABILITIES);
      done();
    });

    abilities.forEach((ability, index) => {
      const req = httpMock.expectOne(
        `${service.BASE_URL}${service.ABILITY_EXTENSION}${ability}`
      );
      expect(req.request.method).toBe('GET');
      req.flush(BULBASAUR_ABILITIES[index]);
    });
  });

  it('should return a pokemon move by name or id', (done) => {
    service.getMoveByNameOrID(BULBASAUR.moves[0].move.name).subscribe((res) => {
      expect(res).toEqual(BULBASAUR_MOVES[0]);
      done();
    });
    const req = httpMock.expectOne(
      `${service.BASE_URL}${service.MOVE_EXTENSION}${BULBASAUR.moves[0].move.name}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(BULBASAUR_MOVES[0]);
  });

  it('should return a list of pokemons moves by list', (done) => {
    const moves = BULBASAUR.moves.map((move) => move.move.name);
    service.getMovesByList(moves).subscribe((res) => {
      expect(res).toEqual(BULBASAUR_MOVES);
      done();
    });

    moves.forEach((move, index) => {
      const req = httpMock.expectOne(
        `${service.BASE_URL}${service.MOVE_EXTENSION}${move}`
      );
      expect(req.request.method).toBe('GET');
      req.flush(BULBASAUR_MOVES[index]);
    });
  });
});
