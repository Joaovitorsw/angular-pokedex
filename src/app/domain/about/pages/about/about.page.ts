import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DAMAGE_RELATIONS } from '@pokedex/database';
import { PokeApiService } from '@pokedex/services';
import { IOptions, RecursivePartial } from 'ng-particles';
import { Ability, Move, Pokemon, PokemonSpecies } from 'poke-api-models';
import { map, Observable, tap } from 'rxjs';
import { particles, particlesAnimations } from '../..';
import { EXCLUDED_NAMES } from './about.page.variables';

@Component({
  selector: 'px-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit, OnDestroy {
  @HostBinding('attr.type') type: string;
  pokemon$: Observable<Pokemon>;
  hasChanged: boolean;
  particlesOptions: RecursivePartial<IOptions>;
  damagesRelations: any[];
  abilities: string;
  abilities$: Observable<Ability[]>;
  specie$: Observable<PokemonSpecies>;
  moves$: Observable<Move[]>;

  constructor(private route: ActivatedRoute, public pokeAPI: PokeApiService) {}

  ngOnInit(): void {
    scrollTo(0, 0);

    this.route.params.forEach(({ pokemonName }) => {
      this.hasChanged = false;
      this.pokemon$ = this.getPokemon(pokemonName);
    });
  }

  getPokemon(pokemonName: string) {
    return this.pokeAPI.getPokemonByNameOrID(pokemonName).pipe(
      tap((pokemon: Pokemon) => {
        this.setBodyClass(pokemon);
        this.getAnimation();

        this.damagesRelations = pokemon.types.map((type) => {
          const damageRelations = DAMAGE_RELATIONS.find(
            (damageRelations) => damageRelations.name === type.type.name
          )!;
          return damageRelations;
        });

        const abilitiesNames = pokemon.abilities.map((slot) => {
          if (slot.is_hidden) return `${slot.ability.name} (Hidden)`;
          return slot.ability.name;
        });

        const abilitiesUrls = pokemon.abilities.map(
          (slot) => slot.ability.url.split('/')[6]
        );

        this.abilities = abilitiesNames.join(' | ');

        let specieName = pokemon.name.replace(EXCLUDED_NAMES, '');

        const exceptionName =
          pokemon.name === 'mr-mime' ||
          pokemon.name === 'mime-jr' ||
          pokemon.name === 'mr-rime' ||
          pokemon.name === 'mr-mime-galar';

        if (exceptionName) specieName = pokemonName.replace('-galar', '');

        this.specie$ = this.getSpecieFilteredText(specieName);
        this.abilities$ = this.getPokemonAbilities(abilitiesUrls, pokemon);

        const movesID = pokemon.moves.map(
          (slot) => slot.move.url.split('/')[6]
        );

        this.moves$ = this.getMovesFilteredText(movesID);
      })
    );
  }

  getMovesFilteredText(urls: string[]) {
    return this.pokeAPI.getMovesByList(urls).pipe(
      map((moves) => {
        return moves.map((move) => {
          const flavorText = move.flavor_text_entries.filter(
            (flavorText) => flavorText.language.name === 'en'
          );
          const flavorIndex = flavorText.length - 1;
          move.flavor_text_entries = [flavorText[flavorIndex]];
          return move;
        });
      })
    );
  }

  getSpecieFilteredText(specieName: string) {
    return this.pokeAPI.getSpeciesByNameOrID(specieName).pipe(
      map((specie) => {
        const flavorText = specie.flavor_text_entries.filter(
          (flavorText) => flavorText.language.name === 'en'
        );
        const flavorIndex = flavorText.length - 1;
        specie.flavor_text_entries = [flavorText[flavorIndex]];
        return specie;
      })
    );
  }

  getPokemonAbilities(urls: string[], pokemon: Pokemon) {
    return this.pokeAPI.getAbilitiesByList(urls).pipe(
      map((ability) => {
        const data = ability.map((slot, index) => {
          if (pokemon.abilities[index].ability.name === slot.name) {
            const isHidden = pokemon.abilities[index].is_hidden;
            slot.name = isHidden ? `${slot.name} ( hidden )` : slot.name;
          }
          return slot;
        });
        return data;
      })
    );
  }

  ngOnDestroy(): void {
    const $body = document.body;
    $body.classList.remove(this.type);
  }

  setBodyClass(pokemon: Pokemon) {
    const $body = document.body;
    $body.classList.remove(this.type);
    this.type = pokemon.types[0].type.name;
    $body.classList.add(this.type);
  }

  getAnimation() {
    particlesAnimations[this.type]();
    this.particlesOptions = particles;
    this.hasChanged = true;
  }
}
