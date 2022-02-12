import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  BULBASAUR_ABILITIES,
  BULBASAUR_EVOLUTIONS,
  BULBASAUR_EVOLUTION_CHAIN,
  BULBASAUR_MOVES,
  BULBASAUR_SPECIES,
} from '@pokedex/mocks';
import { POKEMONS } from '@pokedex/pages';
import { environment } from 'environments/environment';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { of } from 'rxjs';
import { PokeAPIService } from './poke-api.service';

describe('PokeAPIService', () => {
  let service: PokeAPIService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgxIndexedDBModule.forRoot(environment.dbConfig),
      ],
    });
    service = TestBed.inject(PokeAPIService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should return a pokemon by name or id', (done) => {
    const pokemon = POKEMONS[0];
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
    const expectedPokemons = POKEMONS.slice(0, 3);
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

  it('should return a list of pokemons by custom range', (done) => {
    const expectedPokemons = POKEMONS.slice(0, 3);

    service.getPokemonsByCustomRange(1, 3).subscribe((res) => {
      expect(res).toEqual(expectedPokemons);
      done();
    });

    expectedPokemons.forEach((pokemon) => {
      const req = httpMock.expectOne(
        `${service.BASE_URL}${service.POKEMON_EXTENSION}${pokemon.id}`
      );
      expect(req.request.method).toBe('GET');
      req.flush(pokemon);
    });
  });

  it('should return a pokemon specie by name', (done) => {
    const { name } = POKEMONS[0];
    service.getSpeciesByName(name).subscribe((res) => {
      expect(res).toEqual(BULBASAUR_SPECIES);
      done();
    });
    const req = httpMock.expectOne(
      `${service.BASE_URL}${service.POKEMON_SPECIES_EXTENSION}${name}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(BULBASAUR_SPECIES);
  });

  it('should return a pokemon evolution chain by id', (done) => {
    const { id } = POKEMONS[0];
    service.getEvolutionChainById(id).subscribe((res) => {
      expect(res).toEqual(BULBASAUR_EVOLUTION_CHAIN);
      done();
    });
    const req = httpMock.expectOne(
      `${service.BASE_URL}${service.EVOLUTION_CHAIN_EXTENSION}${id}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(BULBASAUR_EVOLUTION_CHAIN);
  });

  it('should return a pokemon move by id', (done) => {
    const { id } = POKEMONS[0];
    const move = BULBASAUR_MOVES[0];

    service.getMoveByID(`${id}`).subscribe((res) => {
      expect(res).toEqual(move);
      done();
    });
    const req = httpMock.expectOne(
      `${service.BASE_URL}${service.MOVE_EXTENSION}${id}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(move);
  });

  it('should return a list of moves by list', (done) => {
    const expectedMoves = BULBASAUR_MOVES.slice(0, 3);
    const movesList = expectedMoves.map((move) => `${move.id}`);

    service.getMovesByIDS(movesList).subscribe((res) => {
      expect(res).toEqual(expectedMoves);
      done();
    });

    expectedMoves.forEach((move) => {
      const req = httpMock.expectOne(
        `${service.BASE_URL}${service.MOVE_EXTENSION}${move.id}`
      );
      expect(req.request.method).toBe('GET');
      req.flush(move);
    });
  });

  it('should return a pokemon ability', (done) => {
    const { id } = POKEMONS[0];
    const ability = BULBASAUR_ABILITIES[0];

    service.getAbilityByID(`${id}`).subscribe((res) => {
      expect(res).toEqual(ability);
      done();
    });
    const req = httpMock.expectOne(
      `${service.BASE_URL}${service.ABILITY_EXTENSION}${id}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(ability);
  });

  it('should return a list of abilities by list', (done) => {
    const expectedAbilities = BULBASAUR_ABILITIES.slice(0, 2);
    const abilitiesList = expectedAbilities.map((ability) => `${ability.id}`);

    service.getPokemonAbilitiesByIDS(abilitiesList).subscribe((res) => {
      expect(res).toEqual(expectedAbilities);
      done();
    });

    expectedAbilities.forEach((ability) => {
      const req = httpMock.expectOne(
        `${service.BASE_URL}${service.ABILITY_EXTENSION}${ability.id}`
      );
      expect(req.request.method).toBe('GET');
      req.flush(ability);
    });
  });

  it('should return a pokemon evolution', (done) => {
    const { name } = POKEMONS[0];
    spyOn(service, 'getPokemonEvolutionsByName').and.returnValue(
      of(BULBASAUR_EVOLUTIONS)
    );

    service.getPokemonEvolutionsByName(name).subscribe((res) => {
      expect(res).toEqual(BULBASAUR_EVOLUTIONS);
      done();
    });
  });
});
