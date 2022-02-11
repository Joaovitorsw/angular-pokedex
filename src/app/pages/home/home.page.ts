import { BooleanInput } from '@angular/cdk/coercion';
import {
  Component,
  EventEmitter,
  HostBinding,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  Observable,
  of,
  ReplaySubject,
} from 'rxjs';
import { debounceTime, startWith, switchMap } from 'rxjs/operators';
import { CustomValidators } from '../../../validators';
import { DAMAGE_RELATIONS } from './home.page-damage-relations';
import {
  DefaultUser,
  eGenerations,
  eSort,
  GENERATIONS,
  userGeneration,
  UsersFilters,
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

  private pokemons: Pokemon[];
  private filteredPokemons: Pokemon[];

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

  weaknessFilterOptions$ = new ReplaySubject<string[]>(1);
  selectedWeaknessFilter$ = new ReplaySubject<string>(1);

  userSearchFilter$ = new ReplaySubject<string>(1);

  morePokemons: BooleanInput = false;
  morePokemonsOption: Boolean = false;

  filtersGroup: FormGroup;
  searchControl: FormControl;
  firstLoading: boolean = true;
  rangeGroup: FormGroup;

  eSort = eSort;

  matcher = new CustomErrorStateMatcher();

  constructor(
    public pokeAPI: PokeAPIService,
    private indexDB: IndexedDbService
  ) {}

  ngOnInit(): void {
    particlesAnimations.homePage();
    this.particlesOptions = particles;
    this.createPokemons();
    this.createRangeForm();
    this.createSearchForm();
    this.createUserFilters(this.user.filters);
    this.updateUserInfos();
  }

  createPokemons() {
    const FILTERS = [
      this.generationFilter$,
      this.sortFilter$,
      this.selectedTypeFilter$,
      this.selectedWeightFilter$,
      this.selectedHeightFilter$,
      this.userSearchFilter$,
      this.selectedWeaknessFilter$,
    ];
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

      const sortPredicated = this.sortFunction(selectedSort);
      const GENERATION_SELECTED =
        GENERATIONS[selectedGeneration] ?? this.user.generation;

      const { from, to } = GENERATION_SELECTED;

      this.pokemons = this.pokeAPI.pokemons.slice(from - 1, to);

      const typeOptions = this.typesOptions(this.pokemons);
      this.weaknessFilterOptions$.next(typeOptions);
      this.typeFilterOptions$.next(typeOptions);
      this.pokemons.sort(sortPredicated);
      this.filteredPokemons = this.pokemons;

      if (this.firstLoading) {
        this.scrollAfterLoading(0, this.user.scroll);
        this.firstLoading = false;
      }

      if (selectedWeakness) {
        this.disabledFilter(this.filtersGroup.controls.type);
        const weakness = DAMAGE_RELATIONS.find(
          (relation) => relation.name === selectedWeakness
        )!;
        const weaknessTypes = weakness.damage_relations.double_damage_to;
        const pokemons = weaknessTypes!
          .map((type) => this.pokemonsTypeFilter(this.pokemons, type))
          .flatMap((pokemons) => pokemons);
        this.pokemons = pokemons;
        this.filteredPokemons = this.pokemons;
      } else {
        this.enableFilter(this.filtersGroup.controls.type);
      }

      if (selectedType) {
        this.pokemons = this.pokemonsTypeFilter(this.pokemons, selectedType);
        this.filteredPokemons = this.pokemons;
        this.disabledFilter(this.filtersGroup.controls.weakness);
      } else {
        this.enableFilter(this.filtersGroup.controls.weakness);
      }

      if (userSearch) {
        this.pokemons = this.pokemons.filter((pokemon) => {
          const userSearchLowerCase = userSearch.toLowerCase();
          const pokemonName = pokemon.name.toLowerCase();
          return pokemonName.includes(userSearchLowerCase);
        });
        this.filteredPokemons = this.pokemons;
      }

      const pokemonsWeightsOptions = this.createWeightsOptions(this.pokemons);
      const hasWeightOption = pokemonsWeightsOptions.includes(selectedWeight);

      const pokemonsHeightOptions = this.createHeightsOptions(this.pokemons);
      const hasHeightOption = pokemonsHeightOptions.includes(selectedHeight);

      if (!hasHeightOption && selectedHeight) {
        this.filtersGroup.controls.height.setValue(null);
        return;
      }

      if (!hasWeightOption && selectedWeight) {
        this.filtersGroup.controls.weight.setValue(null);
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
        this.filteredPokemons,
        selectedWeight
      );

      const pokemonsHeights = this.pokemonsHeightFilter(
        this.filteredPokemons,
        selectedHeight
      );

      const heightsOptions = this.createHeightsOptions(pokemonsWeights);
      const weightsOptions = this.createWeightsOptions(pokemonsHeights);

      this.heightFilterOptions$.next(heightsOptions);
      this.weightFilterOptions$.next(weightsOptions);

      this.filteredPokemons$.next(this.pokemons);
      this.pokemons$.next(this.pokemons);
    });
  }
  enableFilter(control: AbstractControl) {
    if (control.enabled) return;
    control.enable();
  }
  disabledFilter(control: AbstractControl) {
    if (control.disabled) return;
    control.disable();
  }

  pokemonsHeightFilter(pokemons: Pokemon[], selectedHeight: number): Pokemon[] {
    return pokemons.filter((pokemon) => {
      if (!selectedHeight) return pokemon;
      return pokemon.height === selectedHeight;
    });
  }
  createHeightsOptions(pokemons: Pokemon[]): number[] {
    const heights = pokemons
      .map((pokemon) => pokemon.height)
      .sort((a, b) => a - b);

    const removeDuplicatedHeights = [...new Set(heights)];
    return removeDuplicatedHeights;
  }
  pokemonsWeightFilter(pokemons: Pokemon[], selectedWeight: number): Pokemon[] {
    return pokemons.filter((pokemon) => {
      if (!selectedWeight) return pokemon;
      return pokemon.weight === selectedWeight;
    });
  }

  sortFunction(
    selectedSort: string
  ): (firstPokemon: Pokemon, secondPokemon: Pokemon) => number {
    const sortDescendingPredicate = (
      firstPokemon: Pokemon,
      secondPokemon: Pokemon
    ) => secondPokemon.id - firstPokemon.id;

    const sortAscendingPredicate = (
      firstPokemon: Pokemon,
      secondPokemon: Pokemon
    ) => firstPokemon.id - secondPokemon.id;

    const sortPredicate =
      selectedSort === eSort.ASCENDING
        ? sortAscendingPredicate
        : sortDescendingPredicate;

    return sortPredicate;
  }

  typesOptions(pokemons: Pokemon[]): string[] {
    const types = pokemons
      .map((pokemon) => pokemon.types)
      .reduce((acc, curr) => acc.concat(curr), [])
      .map((type) => type.type.name);

    const removedDuplicatedTypes = [...new Set(types)];

    return removedDuplicatedTypes;
  }

  pokemonsTypeFilter(pokemons: Pokemon[], selectedType: string): Pokemon[] {
    return pokemons.filter((pokemon) => {
      if (!selectedType) return pokemon;
      const types = pokemon.types.map((type) => type.type.name);
      return types.some((type) => type === selectedType);
    });
  }

  createWeightsOptions(pokemons: Pokemon[]): number[] {
    const weights = pokemons
      .map((pokemon) => pokemon.weight)
      .sort((a, b) => a - b);

    const removeDuplicatedWeights = [...new Set(weights)];
    return removeDuplicatedWeights;
  }

  particlesLoaded(container: Container) {
    this.container = container;
    this.particlesEvent.emit(container);
  }

  updateUserInfos() {
    this.getUser().subscribe((user) => {
      this.updateUserFilters(user.filters ?? {});
      this.user = user;
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
      this.scrollAfterLoading(0, user.scroll);
      this.searchControl.setValue(user.search ?? '');
    });
  }
  createUserFilters({ sort, height, weight, type, weakness }: UsersFilters) {
    this.filtersGroup = new FormGroup({
      sort: new FormControl(sort),
      type: new FormControl(height),
      weight: new FormControl(weight),
      height: new FormControl(type),
      weakness: new FormControl(weakness),
    });

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

    this.filtersGroup.controls.weakness.valueChanges
      .pipe(
        untilDestroyed(this),
        startWith(this.filtersGroup.controls.weakness.value)
      )
      .subscribe(this.selectedWeaknessFilter$);
  }

  updateUserFilters({ sort, height, weight, type, weakness }: UsersFilters) {
    this.filtersGroup.controls.type.setValue(type);
    this.filtersGroup.controls.weight.setValue(weight);
    this.filtersGroup.controls.height.setValue(height);
    this.filtersGroup.controls.sort.setValue(sort);
    this.filtersGroup.controls.weakness.setValue(weakness);
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
      this.hasLoading = false;

      if (this.searchControl.invalid || this.rangeGroup.invalid) return;

      this.userSearchFilter$.next(search);
    };

    this.searchControl.valueChanges
      .pipe(
        startWith(this.searchControl.value),
        untilDestroyed(this),
        debounceTime(2000)
      )
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
    const { generation } = this.user;
    const { value: filterOptions } = this.filtersGroup;
    this.indexDB
      .update(eIndexDBKeys.USER, {
        uid: eIndexDBKeys.USER,
        search: this.searchControl.value,
        generation,
        scroll: scrollY,
        morePokemons: this.morePokemons,
        filters: {
          ...filterOptions,
        },
      })
      .subscribe();
  }
}
