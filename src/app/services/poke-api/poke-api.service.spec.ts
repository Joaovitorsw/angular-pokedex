import { TestBed } from '@angular/core/testing';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import PokeAPI from 'pokedex-promise-v2';
import { environment } from 'src/environments/environment';
import { PokeAPIService } from './poke-api.service';

describe('PokeAPIService', () => {
  let service: PokeAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxIndexedDBModule.forRoot(environment.dbConfig)],
      providers: [{ provide: PokeAPI, useValue: new PokeAPI() }],
    });
    service = TestBed.inject(PokeAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a pokemon by name or id', (done) => {
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

  it('should return a list of pokemon by name or id', (done) => {
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

  it('should return range list of pokemon by name or id', (done) => {
    const pokemonStart = 1;
    const pokemonEnd = 24;
    const sample = service.getPokemonsByRange(pokemonStart, pokemonEnd);
    sample.subscribe((pokemons) => {
      expect(pokemons.length).toEqual(pokemonEnd);
      done();
    });
  });

  it('should return a evolutions of pokemon ', (done) => {
    const pokemonName = 'bulbasaur';
    service.getPokemonEvolutions(pokemonName).then((evolutions$) => {
      evolutions$.subscribe((pokemons) => {
        expect(pokemons.evolutions.length).toEqual(3);
        done();
      });
    });
  });

  it('should return a pokemon first range', (done) => {
    const pokemonStart = 1;
    const pokemonEnd = 24;
    service
      .getPokemonsByRange(pokemonStart, pokemonEnd)
      .subscribe((pokemons) => {
        expect(pokemons.length).toEqual(pokemonEnd);
        done();
      });
  });

  it('should return a pokemon next range', (done) => {
    const pokemonStart = 25;
    const pokemonEnd = 48;
    service
      .getPokemonsByRange(pokemonStart, pokemonEnd)
      .subscribe((pokemons) => {
        expect(pokemons.length).toEqual(pokemonEnd);
        done();
      });
  });

  it('should return a pokemon species by name', (done) => {
    const pokemonName = 'bulbasaur';
    service.getSpeciesByName(pokemonName).then((species) => {
      expect(species.name).toEqual(pokemonName);
      done();
    });
  });

  it('should return a pokemon evolution chain by id', (done) => {
    const pokemonID = 1;
    service.getEvolutionChainById(pokemonID).then((evolutionChain) => {
      expect(evolutionChain.chain.species.name).toEqual('bulbasaur');
      done();
    });
  });
});
