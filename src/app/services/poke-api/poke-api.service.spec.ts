import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  BULBASAUR,
  BULBASAUR_EVOLUTIONS,
  BULBASAUR_EVOLUTION_CHAIN,
  BULBASAUR_SPECIES,
  MEGA_CHARIZARD_X,
} from '@pokedex/mocks';
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
    const pokemonID = MEGA_CHARIZARD_X.id;
    const pokemonName = MEGA_CHARIZARD_X.name;

    service.getPokemonByNameOrID(pokemonID).subscribe((pokemon) => {
      expect(pokemon.name).toEqual(pokemonName);
      done();
    });
    service.getPokemonByNameOrID(pokemonName).subscribe((pokemon) => {
      expect(pokemon.name).toEqual(pokemonName);
      done();
    });

    const request = httpMock.expectOne(
      `${service.BASE_URL}${service.POKEMON_EXTENSION}${pokemonName}`
    );
    expect(request.request.method).toBe('GET');
    request.flush(MEGA_CHARIZARD_X);
  });

  it('should return a list of pokemon by name or id', (done) => {
    const pokemonStringList = [1, 2, 3];
    const pokemonNumberList = ['bulbasaur', 'ivysaur', 'venusaur'];
    service.getPokemonsByList(pokemonStringList).subscribe((pokemons) => {
      expect(pokemons.length).toEqual(3);
      done();
    });
    service.getPokemonsByList(pokemonNumberList).subscribe((pokemons) => {
      expect(pokemons.length).toEqual(3);
      done();
    });

    pokemonNumberList.forEach((pokemon) => {
      const request = httpMock.expectOne(
        `${service.BASE_URL}${service.POKEMON_EXTENSION}${pokemon}`
      );
      expect(request.request.method).toBe('GET');
      request.flush(pokemon);
    });
    pokemonStringList.forEach((pokemon) => {
      const request = httpMock.expectOne(
        `${service.BASE_URL}${service.POKEMON_EXTENSION}${pokemon}`
      );
      expect(request.request.method).toBe('GET');
      request.flush(pokemon);
    });
  });

  it('should return range list of pokemon by name or id', (done) => {
    const pokemonStart = 1;
    const pokemonEnd = 24;
    const sample = service.getPokemonsByCustomRange(pokemonStart, pokemonEnd);
    sample.subscribe((pokemons) => {
      expect(pokemons.length).toEqual(pokemonEnd);
      done();
    });

    const range = Array.from(
      { length: pokemonEnd },
      (_, index) => index + pokemonStart
    );
    range.forEach((pokemon) => {
      const request = httpMock.expectOne(
        `${service.BASE_URL}${service.POKEMON_EXTENSION}${pokemon}`
      );
      expect(request.request.method).toBe('GET');
      request.flush(pokemon);
    });
  });

  it('should return a pokemon next range', (done) => {
    const pokemonStart = 25;
    const pokemonEnd = 48;
    service
      .getPokemonsByCustomRange(pokemonStart, pokemonEnd)
      .subscribe((pokemons) => {
        expect(pokemons.length).toEqual(pokemonEnd);
        done();
      });

    const range = Array.from(
      { length: pokemonEnd },
      (_, index) => index + pokemonStart
    );
    range.forEach((pokemon) => {
      const request = httpMock.expectOne(
        `${service.BASE_URL}${service.POKEMON_EXTENSION}${pokemon}`
      );
      expect(request.request.method).toBe('GET');
      request.flush(pokemon);
    });
  });

  it('should return a pokemon species by name', (done) => {
    const pokemonName = BULBASAUR.name;
    service.getSpeciesByName(pokemonName).then((species) => {
      expect(species.name).toEqual(pokemonName);
      done();
    });
    const request = httpMock.expectOne(
      `${service.BASE_URL}${service.POKEMON_SPECIES_EXTENSION}${pokemonName}`
    );
    expect(request.request.method).toBe('GET');
    request.flush(BULBASAUR_SPECIES);
  });

  it('should return a pokemon evolution chain by id', (done) => {
    const pokemonID = 1;
    service.getEvolutionChainById(pokemonID).then((evolutionChain) => {
      expect(evolutionChain.chain.species.name).toEqual('bulbasaur');
      done();
    });

    const request = httpMock.expectOne(
      `${service.BASE_URL}${service.EVOLUTION_CHAIN_EXTENSION}${pokemonID}`
    );
    expect(request.request.method).toBe('GET');
    request.flush(BULBASAUR_EVOLUTION_CHAIN);
  });

  it('should return a pokemon evolution', (done) => {
    const bulbasaurEvolution = of(BULBASAUR_EVOLUTIONS);
    const promise = (async () => bulbasaurEvolution)();

    spyOn(service, 'getPokemonEvolutions').and.returnValue(promise);
    service.getPokemonEvolutions(BULBASAUR.name).then((evolution$) => {
      evolution$.subscribe((evolution) => {
        expect(evolution.evolutions[0].name).toEqual(BULBASAUR.name);
        done();
      });
    });
  });
});
