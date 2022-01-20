import { BooleanInput } from '@angular/cdk/coercion';
import {
  Component,
  EventEmitter,
  HostBinding,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSelectChange } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  eIndexDBKeys,
  IndexedDbService,
  PokeAPIService,
} from '@pokedex/services';
import { particles, particlesAnimations } from '@pokedex/shared';
import { Container, IOptions, RecursivePartial } from 'ng-particles';
import { Pokemon } from 'poke-api-models';
import { of, Subscription } from 'rxjs';
import { debounceTime, map, switchMap, tap } from 'rxjs/operators';
import { CustomValidators } from '../../../../validators';

const GENERATIONS = {
  'generation-1': { from: 1, to: 151 },
  'generation-2': { from: 152, to: 251 },
  'generation-3': { from: 252, to: 386 },
  'generation-4': { from: 387, to: 494 },
  'generation-5': { from: 495, to: 649 },
  'generation-6': { from: 650, to: 721 },
  'generation-7': { from: 722, to: 809 },
  'generation-8': { from: 810, to: 898 },
};

interface DefaultUser {
  generation: {
    selected: string;
    from: number;
    to: number;
  };
  scroll: number;
  infinityScroll: boolean;
}

const userGeneration: DefaultUser = {
  generation: {
    selected: 'generation-1',
    from: 1,
    to: 151,
  },
  scroll: 0,
  infinityScroll: false,
};
@Component({
  selector: 'px-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
@UntilDestroy()
export class HomePage implements OnInit, OnDestroy {
  @HostBinding('class.loading') hasLoading = true;
  particlesOptions: RecursivePartial<IOptions>;
  container: Container;
  id = 'home-page';
  InfinityScroll: BooleanInput = false;
  matcher = new ErrorStateMatcher();
  InfinityScrollOption: Boolean = false;
  lazyLoadingSubscription: Subscription;
  searchControl: FormControl;
  user: DefaultUser = userGeneration;
  rangeControl: FormGroup;
  particlesEvent: EventEmitter<Container> = new EventEmitter();
  constructor(
    public pokeAPI: PokeAPIService,
    private indexDB: IndexedDbService
  ) {}

  ngOnInit(): void {
    this.hasLoading = true;
    particlesAnimations.homePage();
    this.particlesOptions = particles;
    this.createRangeForm();
    this.createSearchForm();
    this.createPokemons().subscribe();
  }

  createPokemons() {
    return of<DefaultUser>(this.user).pipe(
      switchMap((defaultUser) => {
        return this.indexDB.getAll(eIndexDBKeys.USER).pipe(
          switchMap(([user]) => {
            if (user) {
              return of(user).pipe(
                map((user) => {
                  this.user = user;
                  const { generation, scroll, infinityScroll } = this.user;
                  const { selected, from, to } = generation;
                  this.InfinityScroll = infinityScroll;

                  if (selected === 'custom') {
                    this.InfinityScrollOption = true;
                  }

                  this.pokeAPI
                    .nextPokemonsRange(from, to)
                    .subscribe((pokemons) => {
                      this.pokeAPI.pokemons$$.next(pokemons);
                      this.updateFormValueNoEmit(from, to);
                      this.scrollAfterLoading(0, scroll);
                      this.hasLoading = false;
                    });
                })
              );
            }
            const { generation, scroll } = defaultUser;
            const { from, to } = generation;
            return this.pokeAPI.nextPokemonsRange(from, to).pipe(
              tap((pokemons: Pokemon[]) => {
                this.pokeAPI.pokemons$$.next(pokemons.slice(from - 1, to));
                this.updateFormValueNoEmit(from, to);

                this.scrollAfterLoading(0, scroll);
                this.hasLoading = false;
              })
            );
          })
        );
      })
    );
  }

  scrollAfterLoading(scrollX: number, scrollY: number) {
    setTimeout(() => {
      scrollTo(scrollX, scrollY);
    }, 500);
  }

  createRangeForm() {
    this.rangeControl = new FormGroup(
      {
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

    this.rangeControl.valueChanges
      .pipe(debounceTime(1500), untilDestroyed(this))
      .subscribe((value) => {
        if (this.rangeControl.invalid) return;
        this.pokeAPI
          .nextPokemonsRange(value.from, value.to)
          .subscribe((pokemons) => {
            if (this.user.generation.selected === 'custom') {
              this.user.generation.from = value.from;
              this.user.generation.to = value.to;
            }
            this.pokeAPI.pokemons$$.next(pokemons);
          });
      });
  }

  createSearchForm() {
    this.searchControl = new FormControl(null, [Validators.required]);

    this.searchControl.valueChanges
      .pipe(untilDestroyed(this), debounceTime(3000))
      .subscribe((value) => {
        if (this.searchControl.invalid) return;

        const lowerCaseValue = value.toLowerCase();
        const pokemons$ = this.pokeAPI.searchPokemons(lowerCaseValue);
        pokemons$.subscribe((pokemons) => {
          this.pokeAPI.pokemons$$.next(pokemons);
          const index = pokemons?.length - 1;
          this.updateFormValueNoEmit(pokemons[0]?.id, pokemons[index]?.id);
          this.InfinityScroll = false;
          this.InfinityScrollOption = false;
        });
      });
  }

  updateFormValueNoEmit(from: number, to: number) {
    this.rangeControl.controls.from.setValue(from, {
      emitEvent: false,
    });
    this.rangeControl.controls.to.setValue(to, {
      emitEvent: false,
    });
  }

  pokemonRange(event: MatSelectChange) {
    if (event.value === 'custom') {
      this.user.generation.selected = 'custom';
      this.InfinityScrollOption = true;
      return;
    }

    const generationSelected = event.value as keyof typeof GENERATIONS;
    const { from, to } = GENERATIONS[generationSelected];
    this.updateFormValueNoEmit(from, to);
    this.InfinityScroll = false;
    this.InfinityScrollOption = false;
    this.pokeAPI.pokemons$$.next([]);
    this.pokeAPI.request$$.next(false);
    this.updateForm(from, to);
  }

  updateInfinityScroll(event: MatSlideToggleChange) {
    if (!this.InfinityScrollOption) return;

    this.InfinityScroll = event.checked;

    if (event.checked) this.endScroll();
  }

  updateForm(from: number, to: number) {
    this.rangeControl.controls.from.setValue(from);
    this.rangeControl.controls.to.setValue(to);
  }

  endScroll() {
    if (!this.InfinityScroll || this.pokeAPI.pokemons$$.value.length >= 898)
      return;

    const pokemonsLength = this.pokeAPI.pokemons$$.value.length;
    const previous = 1;
    let next = pokemonsLength + 24;

    if (next >= 898) next = 898;

    this.pokeAPI.request$$.next(false);
    this.updateForm(previous, next);
  }

  particlesLoaded(container: Container) {
    this.container = container;
    this.particlesEvent.emit(container);
  }

  trackByFn(index: number, item: any) {
    return item.id || index;
  }

  createUser() {
    const { generation } = this.user;
    return this.indexDB.update(eIndexDBKeys.USER, {
      uid: eIndexDBKeys.USER,
      generation,
      scroll: scrollY,
      infinityScroll: this.InfinityScroll,
    });
  }
  ngOnDestroy(): void {
    this.createUser().subscribe();
  }
}
