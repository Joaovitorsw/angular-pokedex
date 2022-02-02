import { BooleanInput } from '@angular/cdk/coercion';
import {
  Component,
  EventEmitter,
  HostBinding,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  eIndexDBKeys,
  IndexedDbService,
  PokeAPIService,
} from '@pokedex/services';
import { particles, particlesAnimations } from '@pokedex/shared';
import { CustomErrorStateMatcher } from 'app/directives/show-validation-error';
import { Container, IOptions, RecursivePartial } from 'ng-particles';
import { Pokemon } from 'poke-api-models';
import {
  BehaviorSubject,
  combineLatest,
  concat,
  forkJoin,
  merge,
  Observable,
  of,
  ReplaySubject,
  Subject,
  zip,
} from 'rxjs';
import {
  concatMap,
  debounceTime,
  startWith,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { POKEMONS } from '.';
import { CustomValidators } from '../../../validators';
import {
  DefaultUser,
  eGenerations,
  GENERATIONS,
  TYPES,
  userGeneration,
} from './home.page.models';

@Component({
  selector: 'px-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
@UntilDestroy()
export class HomePage implements OnInit, OnDestroy {
  @HostBinding('class.loading') hasLoading = true;

  particlesEvent: EventEmitter<Container> = new EventEmitter();
  particlesOptions: RecursivePartial<IOptions>;
  container: Container;
  id = 'home-page';

  user: DefaultUser = userGeneration;
  pokemons$ = new BehaviorSubject<Pokemon[]>([]);
  filteredPokemons$ = new BehaviorSubject<Pokemon[]>([]);

  generationFilter$ = new ReplaySubject<string>(1);
  sortFilter$ = new ReplaySubject<string>(1);

  selectedTypeFilter$ = new ReplaySubject<string>(1);
  typeFilterOptions$ = new ReplaySubject<string[]>(1);

  selectedWeightFilter$ = new ReplaySubject<number | null>(1);
  weightFilterOptions$ = new ReplaySubject<number[]>(1);

  selectedHeightFilter$ = new ReplaySubject<number | null>(1);
  heightFilterOptions$ = new ReplaySubject<number[]>(1);

  morePokemons: BooleanInput = false;
  morePokemonsOption: Boolean = false;
  filtersGroup: FormGroup;
  searchControl: FormControl;
  rangeGroup: FormGroup;
  matcher = new CustomErrorStateMatcher();

  constructor(
    public pokeAPI: PokeAPIService,
    private indexDB: IndexedDbService
  ) {}

  ngOnInit(): void {
    particlesAnimations.homePage();
    this.particlesOptions = particles;
    this.createRangeForm();
    this.createSearchForm();
    this.createPokemons();
    this.createFilters();

    this.rangeGroup.controls.selectedGeneration.valueChanges
      .pipe(untilDestroyed(this), startWith(this.user.generation.selected))
      .subscribe(this.generationFilter$);

    this.filtersGroup.controls.sort.valueChanges
      .pipe(
        untilDestroyed(this),
        startWith(this.filtersGroup.controls.sort.value)
      )
      .subscribe(this.sortFilter$);

    this.filtersGroup.controls.type.valueChanges
      .pipe(
        untilDestroyed(this),
        startWith(this.filtersGroup.controls.type.value)
      )
      .subscribe(this.selectedTypeFilter$);

    this.filtersGroup.controls.weight.valueChanges
      .pipe(
        untilDestroyed(this),
        startWith(this.filtersGroup.controls.weight.value)
      )
      .subscribe(this.selectedWeightFilter$);

    this.filtersGroup.controls.height.valueChanges
      .pipe(
        untilDestroyed(this),
        startWith(this.filtersGroup.controls.height.value)
      )
      .subscribe(this.selectedHeightFilter$);

    combineLatest([
      this.generationFilter$,
      this.sortFilter$,
      this.selectedTypeFilter$,
      this.selectedWeightFilter$,
      this.selectedHeightFilter$,
    ]).subscribe(
      ([
        selectedGeneration,
        selectedSort,
        selectedType,
        selectedWeight,
        selectedHeight,
      ]) => {
        const sortDescendingPredicate = (
          firstPokemon: Pokemon,
          secondPokemon: Pokemon
        ) => secondPokemon.id - firstPokemon.id;

        const sortAscendingPredicate = (
          firstPokemon: Pokemon,
          secondPokemon: Pokemon
        ) => firstPokemon.id - secondPokemon.id;

        const sortPredicate =
          selectedSort === 'ascending'
            ? sortAscendingPredicate
            : sortDescendingPredicate;

        if (this.user.generation.selected !== selectedGeneration) {
          if (selectedGeneration === eGenerations.CUSTOM_GENERATION) return;
          scrollTo(0, 0);
        }

        const { from, to } =
          GENERATIONS[selectedGeneration] ?? this.user.generation;

        this.updateUserGeneration(selectedGeneration, from, to);

        this.rangeGroup.controls.from.setValue(from, { emitEvent: false });
        this.rangeGroup.controls.to.setValue(to, { emitEvent: false });

        const pokemons = this.pokeAPI.pokemons.slice(from - 1, to);

        const customGenerations =
          selectedGeneration === eGenerations.CUSTOM_GENERATION;
        this.setMorePokemonsOptions(customGenerations, customGenerations);

        const types = pokemons
          .map((pokemon) => pokemon.types)
          .reduce((acc, curr) => acc.concat(curr), [])
          .map((type) => type.type.name);

        this.typeFilterOptions$.next([...new Set(types)]);

        const pokemonsTypesFiltered = pokemons.filter((pokemon) => {
          if (!selectedType) return pokemon;
          const types = pokemon.types.map((type) => type.type.name);
          return types.some((type) => type === selectedType);
        });

        pokemonsTypesFiltered.sort(sortPredicate);

        const weights = pokemonsTypesFiltered
          .map((pokemon) => pokemon.weight)
          .sort((a, b) => a - b);

        const removeDuplicatedWeights = [...new Set(weights)];
        this.weightFilterOptions$.next(removeDuplicatedWeights);

        const hasWeightOption = removeDuplicatedWeights.some(
          (weight) => weight === selectedWeight
        );

        if (!hasWeightOption) selectedWeight = null;

        const pokemonsWeightFiltered = pokemonsTypesFiltered.filter(
          (pokemon) => {
            if (!selectedWeight) return pokemon;
            return pokemon.weight === selectedWeight;
          }
        );

        const heights = pokemonsWeightFiltered
          .map((pokemon) => pokemon.height)
          .sort((a, b) => a - b);

        const removeDuplicatedHeights = [...new Set(heights)];

        this.heightFilterOptions$.next(removeDuplicatedHeights);

        const hasHeightOption = removeDuplicatedHeights.some(
          (height) => height === selectedHeight
        );

        if (!hasHeightOption) selectedHeight = null;

        const pokemonsHeightFiltered = pokemonsWeightFiltered.filter(
          (pokemon) => {
            if (!selectedHeight) return pokemon;
            return pokemon.height === selectedHeight;
          }
        );

        this.filteredPokemons$.next(pokemonsHeightFiltered);
        this.pokemons$.next(pokemonsHeightFiltered);

        if (!selectedHeight) {
          if (this.filtersGroup.controls.height.value !== null)
            this.filtersGroup.controls.height.setValue(null);
        }

        if (!selectedWeight) {
          if (this.filtersGroup.controls.weight.value !== null)
            this.filtersGroup.controls.weight.setValue(null);
        }
      }
    );
  }

  particlesLoaded(container: Container) {
    this.container = container;
    this.particlesEvent.emit(container);
  }

  createPokemons() {
    this.getUser().subscribe((user) => {
      this.user = user;
      const customGeneration =
        user.generation.selected === eGenerations.CUSTOM_GENERATION;
      this.rangeGroup.controls.selectedGeneration.setValue(
        user.generation.selected
      );
      this.updateFromAndToControls(
        this.user.generation.from,
        this.user.generation.to
      );
      this.updateUserGeneration(
        this.user.generation.selected,
        this.user.generation.from,
        this.user.generation.to
      );
      this.setMorePokemonsOptions(this.user.morePokemons, customGeneration);
      this.hasLoading = false;
      this.scrollAfterLoading(0, user.scroll);
    });
  }
  createFilters() {
    this.filtersGroup = new FormGroup({
      sort: new FormControl('ascending'),
      type: new FormControl(undefined),
      weight: new FormControl(undefined),
      height: new FormControl(undefined),
      weakness: new FormControl(undefined),
    });
  }

  createRangeForm() {
    this.rangeGroup = new FormGroup(
      {
        selectedGeneration: new FormControl(this.user.generation.selected, [
          Validators.required,
        ]),
        from: new FormControl(1, [
          Validators.required,
          Validators.min(1),
          Validators.max(898),
        ]),
        to: new FormControl(24, [
          Validators.required,
          Validators.min(1),
          Validators.max(898),
        ]),
      },
      [
        CustomValidators.range({
          previousControl: 'from',
          nexControl: 'to',
        }),
      ]
    );

    this.rangeGroup.valueChanges
      .pipe(debounceTime(2000), untilDestroyed(this))
      .subscribe(({ selectedGeneration, from, to }) => {
        const customRange =
          selectedGeneration === eGenerations.CUSTOM_GENERATION ||
          this.rangeGroup.valid;
        if (!customRange) return;
        this.updateUserGeneration(selectedGeneration, from, to);
        this.generationFilter$.next(selectedGeneration);
      });
  }

  createSearchForm() {
    const from = this.user.generation.from;
    const to = this.user.generation.to;
    this.searchControl = new FormControl('', [
      CustomValidators.pokemonNameForGeneration(from, to),
    ]);

    const searchPredicate = (search: string) => {
      if (search === '') {
        const resetPokemons = this.pokemons$.value;
        this.filteredPokemons$.next(resetPokemons);
        return;
      }
      if (this.searchControl.invalid || this.rangeGroup.invalid) return;

      const pokemons = this.filteredPokemons$.value.filter((pokemon) => {
        const name = pokemon.name.toLowerCase();
        const searchValue = search.toLowerCase();
        return name.includes(searchValue);
      });

      this.filteredPokemons$.next(pokemons);
    };

    this.searchControl.valueChanges
      .pipe(untilDestroyed(this), debounceTime(2000))
      .subscribe(searchPredicate);
  }

  updateFromAndToControls(from: number, to: number) {
    const maxPokemons = 898;

    if (to >= maxPokemons) to = maxPokemons;

    this.rangeGroup.controls.from.setValue(from);
    this.rangeGroup.controls.to.setValue(to);
  }

  getUser(): Observable<DefaultUser> {
    return of(this.user).pipe(
      untilDestroyed(this),
      switchMap((user) => {
        return this.indexDB.getByKey(eIndexDBKeys.USER, eIndexDBKeys.USER).pipe(
          untilDestroyed(this),
          switchMap((userDB) => {
            if (userDB) return of(userDB);
            return of(user);
          })
        );
      })
    );
  }

  createUser() {
    const { generation } = this.user;
    return this.indexDB.update(eIndexDBKeys.USER, {
      uid: eIndexDBKeys.USER,
      generation,
      scroll: scrollY,
      morePokemons: this.morePokemons,
    });
  }

  updateUserGeneration(generation: string, from: number, to: number) {
    this.user.generation.selected = generation;
    this.user.generation.from = from;
    this.user.generation.to = to;
    this.searchControl.setValidators([
      CustomValidators.pokemonNameForGeneration(from, to),
    ]);
  }

  setMorePokemonsOptions(morePokemons: boolean, morePokemonsOption: boolean) {
    this.morePokemons = morePokemons;
    this.morePokemonsOption = morePokemonsOption;
  }

  updateMorePokemons(event: MatSlideToggleChange) {
    if (!this.morePokemonsOption) return;

    this.morePokemons = event.checked;

    if (event.checked) this.endScroll();
  }

  scrollAfterLoading(scrollX: number, scrollY: number) {
    setTimeout(() => scrollTo(scrollX, scrollY), 500);
  }

  endScroll() {
    const pokemonsLength = this.filteredPokemons$.value.length;

    if (!this.morePokemons || pokemonsLength >= 898) {
      this.pokeAPI.request$$.next(false);
      return;
    }

    this.pokeAPI.request$$.next(true);
    const { from, to } = this.user.generation;
    const nextPokemons = pokemonsLength === to - from + 1;
    const maxPokemons = 898;
    const increment = 24;

    if (nextPokemons) {
      const userNext = this.user.generation.to + increment;
      const nextValue = userNext >= maxPokemons ? maxPokemons : to + increment;

      this.user.generation.to = nextValue;
      const pokemons = this.pokeAPI.pokemons.slice(from - 1, nextValue);
      this.rangeGroup.controls.to.setValue(nextValue, { emitEvent: false });
      this.rangeGroup.controls.from.setValue(from, { emitEvent: false });
      this.pokemons$.next(pokemons);
      this.filteredPokemons$.next(pokemons);
      this.pokeAPI.request$$.next(false);
      return;
    }
    this.pokeAPI.request$$.next(false);
  }

  trackByFn(index: number, item: any) {
    return item.id || index;
  }

  ngOnDestroy(): void {
    this.createUser().subscribe();
  }
}
