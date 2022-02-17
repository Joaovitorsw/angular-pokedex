import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DAMAGE_RELATIONS } from 'app/database/damage-relations';
import { SHORT_POKEMONS } from 'app/database/short-pokemons';
import { ShortPokemon } from 'poke-api-models';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  Observable,
  ReplaySubject,
  startWith,
} from 'rxjs';

@Component({
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit, OnDestroy {
  hasWeakness: boolean = false;
  hasTypes: boolean = false;
  userScrollY: number;

  filtersGroup: FormGroup;
  customRangeGroup: FormGroup;

  searchFilter$ = new ReplaySubject<string>(1);
  rangeFilter$ = new ReplaySubject<string>(1);
  sortFilter$ = new ReplaySubject<string>(1);

  selectedTypeFilter$ = new ReplaySubject<string>(1);
  typeFilterOptions$ = new ReplaySubject<string[]>(1);

  selectedWeightFilter$ = new ReplaySubject<number>(1);
  weightFilterOptions$ = new ReplaySubject<number[]>(1);

  selectedHeightFilter$ = new ReplaySubject<number>(1);
  heightFilterOptions$ = new ReplaySubject<number[]>(1);

  weaknessFilterOptions$ = new ReplaySubject<string[]>(1);
  selectedWeaknessFilter$ = new ReplaySubject<string>(1);

  pokemonWeakness$: Observable<string>;
  pokemons: Array<ShortPokemon> = SHORT_POKEMONS;
  pokemons$$: BehaviorSubject<ShortPokemon[]>;

  generations: { [key: string]: { from: number; to: number } } = {
    'generation-1': { from: 1, to: 151 },
    'generation-2': { from: 152, to: 251 },
    'generation-3': { from: 252, to: 386 },
    'generation-4': { from: 387, to: 494 },
    'generation-5': { from: 495, to: 649 },
    'generation-6': { from: 650, to: 721 },
    'generation-7': { from: 722, to: 809 },
    'generation-8': { from: 810, to: 898 },
  };

  generationsKeys = Object.keys(this.generations);

  ngOnInit(): void {
    this.screenStatusControl();
  }

  screenStatusControl() {
    const FILTERS = [
      this.rangeFilter$,
      this.sortFilter$,
      this.selectedTypeFilter$,
      this.selectedWeightFilter$,
      this.selectedHeightFilter$,
      this.searchFilter$,
      this.selectedWeaknessFilter$,
    ];

    this.createFiltersGroup();

    this.customRangeGroup.valueChanges
      .pipe(debounceTime(1500))
      .subscribe(() => this.rangeFilter$.next('custom-range'));

    const typeOptions = this.typesOptions(SHORT_POKEMONS);
    this.typeFilterOptions$.next(typeOptions);
    this.weaknessFilterOptions$.next(typeOptions);

    combineLatest(FILTERS).subscribe((filtersGroup) => {
      const [
        selectedGeneration,
        selectedSort,
        selectedType,
        selectedWeight,
        selectedHeight,
        userSearch,
        selectedWeakness,
      ] = filtersGroup as [
        string,
        string,
        string,
        number,
        number,
        string,
        string
      ];
      const rangeInvalid =
        this.customRangeGroup.invalid && selectedGeneration === 'custom-range';

      if (rangeInvalid) return;

      let sortPredicated = this.sortFunction(selectedSort);

      const { from, to } =
        this.generations[selectedGeneration] ?? this.customRangeGroup.value;

      let filteredPokemons = SHORT_POKEMONS.slice(from - 1, to);

      if (!this.pokemons$$) {
        this.pokemons$$ = new BehaviorSubject(filteredPokemons);
        setTimeout(() => scrollTo(0, this.userScrollY), 1000);
      }

      this.pokemons = filteredPokemons;
      this.hasTypes = !!selectedType;
      this.hasWeakness = !!selectedWeakness;

      if (selectedWeakness) {
        const weakness = DAMAGE_RELATIONS.find(
          (relation) => relation.name === selectedWeakness
        )!;

        const weaknessTypes = weakness.damage_relations.double_damage_to;

        const weaknessPokemon = weaknessTypes!
          .map((type) => this.pokemonsTypeFilter(this.pokemons, type))
          .flatMap((pokemons) => pokemons);

        const pokemons = [...new Set(weaknessPokemon)];

        pokemons.sort(sortPredicated);

        const types = pokemons.map((pokemon) =>
          pokemon.types.map((slot) => slot.type.name)
        );

        const damageRelations = types.map((types, index) => {
          return {
            id: pokemons[index].id,
            types,
          };
        });

        const sortRelation = damageRelations.map((types) => {
          const hasWeakness = types.types.map((type) => {
            const weakness = DAMAGE_RELATIONS.find(
              (relation) => relation.name === type
            );
            return weakness?.damage_relations.double_damage_from.includes(
              selectedWeakness
            );
          });
          const hasQuadDamage =
            hasWeakness.every((weakness) => weakness) &&
            hasWeakness.length >= 2;

          return {
            id: types.id,
            hasQuadDamage,
          };
        });

        sortPredicated = (pokemonA: ShortPokemon, pokemonB: ShortPokemon) => {
          const sortRelationA = sortRelation.find(
            (relation) => relation.id === pokemonA.id
          )!;

          const sortRelationB = sortRelation.find(
            (relation) => relation.id === pokemonB.id
          )!;

          if (sortRelationA.hasQuadDamage && !sortRelationB.hasQuadDamage) {
            const order = selectedSort === 'ascending' ? -1 : 1;
            return order;
          }

          if (!sortRelationA.hasQuadDamage && sortRelationB.hasQuadDamage) {
            const order = selectedSort === 'ascending' ? 1 : -1;
            return order;
          }

          return 0;
        };

        this.pokemons = pokemons;

        filteredPokemons = this.pokemons;
      }

      if (selectedType) {
        this.pokemons = this.pokemons.filter((pokemon) => {
          const types = pokemon.types.map((type) => type.type.name);
          return types.some((type) => type === selectedType);
        });
        filteredPokemons = this.pokemons;
      }

      if (userSearch) {
        this.pokemons = this.pokemons.filter((pokemon) => {
          const name = pokemon.name.toLowerCase();
          return name.includes(userSearch.toLowerCase());
        });
        filteredPokemons = this.pokemons;
      }

      this.pokemons.sort(sortPredicated);

      const pokemonsWeightsOptions = this.createWeightsOptions(this.pokemons);
      const hasWeightOption = pokemonsWeightsOptions.includes(selectedWeight);

      const pokemonsHeightOptions = this.createHeightsOptions(this.pokemons);
      const hasHeightOption = pokemonsHeightOptions.includes(selectedHeight);

      if (!hasHeightOption && selectedHeight) {
        this.filtersGroup.controls['height'].setValue(null);
        return;
      }

      if (!hasWeightOption && selectedWeight) {
        this.filtersGroup.controls['weight'].setValue(null);
        return;
      }

      if (selectedHeight) {
        this.pokemons = this.pokemonsHeightFilter(
          this.pokemons,
          selectedHeight
        );
      }

      if (selectedWeight) {
        this.pokemons = this.pokemonsWeightFilter(
          this.pokemons,
          selectedWeight
        );
      }

      const pokemonsWeights = this.pokemonsWeightFilter(
        filteredPokemons,
        selectedWeight
      );

      const pokemonsHeights = this.pokemonsHeightFilter(
        filteredPokemons,
        selectedHeight
      );

      const heightsOptions = this.createHeightsOptions(pokemonsWeights);
      const weightsOptions = this.createWeightsOptions(pokemonsHeights);

      this.heightFilterOptions$.next(heightsOptions);
      this.weightFilterOptions$.next(weightsOptions);

      this.pokemons$$.next(this.pokemons);
    });
  }

  sortFunction(
    selectedSort: string
  ): (firstPokemon: ShortPokemon, secondPokemon: ShortPokemon) => number {
    const sortDescendingPredicate = (
      firstPokemon: ShortPokemon,
      secondPokemon: ShortPokemon
    ) => secondPokemon.id - firstPokemon.id;

    const sortAscendingPredicate = (
      firstPokemon: ShortPokemon,
      secondPokemon: ShortPokemon
    ) => firstPokemon.id - secondPokemon.id;

    const sortPredicate =
      selectedSort === 'ascending'
        ? sortAscendingPredicate
        : sortDescendingPredicate;

    return sortPredicate;
  }

  pokemonsHeightFilter(
    pokemons: ShortPokemon[],
    selectedHeight: number
  ): ShortPokemon[] {
    return pokemons.filter((pokemon) => {
      if (!selectedHeight) return pokemon;
      return pokemon.height === selectedHeight;
    });
  }

  pokemonsTypeFilter(
    pokemons: ShortPokemon[],
    selectedType: string
  ): ShortPokemon[] {
    return pokemons.filter((pokemon) => {
      if (!selectedType) return pokemon;
      const types = pokemon.types.map((type) => type.type.name);
      return types.some((type) => type === selectedType);
    });
  }

  pokemonsWeightFilter(
    pokemons: ShortPokemon[],
    selectedWeight: number
  ): ShortPokemon[] {
    return pokemons.filter((pokemon) => {
      if (!selectedWeight) return pokemon;
      return pokemon.weight === selectedWeight;
    });
  }

  createHeightsOptions(pokemons: ShortPokemon[]): number[] {
    const heights = pokemons
      .map((pokemon) => pokemon.height)
      .sort((a, b) => a - b);

    const removeDuplicatedHeights = [...new Set(heights)];
    return removeDuplicatedHeights;
  }

  createWeightsOptions(pokemons: ShortPokemon[]): number[] {
    const weights = pokemons
      .map((pokemon) => pokemon.weight)
      .sort((a, b) => a - b);

    const removeDuplicatedWeights = [...new Set(weights)];
    return removeDuplicatedWeights;
  }

  typesOptions(pokemons: ShortPokemon[]): string[] {
    const types = pokemons
      .map((pokemon) => pokemon.types)
      .reduce((acc, curr) => acc.concat(curr), [])
      .map((type) => type.type.name);

    const removedDuplicatedTypes = [...new Set(types)];

    return removedDuplicatedTypes;
  }

  createFiltersGroup() {
    const userCacheStringified = localStorage.getItem('userCache');

    this.customRangeGroup = new FormGroup({
      from: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(898),
      ]),
      to: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(898),
      ]),
    });

    this.filtersGroup = new FormGroup({
      search: new FormControl(null),
      range: new FormControl('generation-1'),
      sort: new FormControl('ascending'),
      type: new FormControl(null),
      weight: new FormControl(null),
      height: new FormControl(null),
      weakness: new FormControl(null),
    });

    if (userCacheStringified) {
      const userCache = JSON.parse(userCacheStringified);
      this.customRangeGroup = new FormGroup({
        from: new FormControl(userCache.customRange.from, [
          Validators.required,
          Validators.min(1),
          Validators.max(898),
        ]),
        to: new FormControl(userCache.customRange.to, [
          Validators.required,
          Validators.min(1),
          Validators.max(898),
        ]),
      });

      this.filtersGroup = new FormGroup({
        search: new FormControl(userCache.search),
        range: new FormControl(userCache.range),
        sort: new FormControl(userCache.sort),
        type: new FormControl(userCache.type),
        weight: new FormControl(userCache.weight),
        height: new FormControl(userCache.height),
        weakness: new FormControl(userCache.weakness),
      });

      this.userScrollY = userCache.scrollY;
    }

    const subscribeAndStreamValueChanges = (
      controlName: string,
      replaySubject: ReplaySubject<any>
    ) => {
      this.filtersGroup.controls[controlName].valueChanges
        .pipe(startWith(this.filtersGroup.controls[controlName].value))
        .subscribe(replaySubject);
    };

    this.filtersGroup.controls['search'].valueChanges
      .pipe(
        startWith(this.filtersGroup.controls['search'].value),
        debounceTime(1500)
      )
      .subscribe(this.searchFilter$);

    subscribeAndStreamValueChanges('range', this.rangeFilter$);
    subscribeAndStreamValueChanges('sort', this.sortFilter$);
    subscribeAndStreamValueChanges('type', this.selectedTypeFilter$);
    subscribeAndStreamValueChanges('weight', this.selectedWeightFilter$);
    subscribeAndStreamValueChanges('height', this.selectedHeightFilter$);
    subscribeAndStreamValueChanges('weakness', this.selectedWeaknessFilter$);
  }
  ngOnDestroy(): void {
    const filtersGroup = this.filtersGroup.value;
    const { from, to } =
      this.generations[this.filtersGroup.value.range] ??
      this.customRangeGroup.value;

    const userCache = {
      ...filtersGroup,
      customRange: {
        from,
        to,
      },
      scrollY,
    };
    const userCacheStringified = JSON.stringify(userCache);

    localStorage.setItem('userCache', userCacheStringified);
  }
}
