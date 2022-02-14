import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SHORT_POKEMONS } from 'app/database/short-pokemons';
import { BehaviorSubject, combineLatest, ReplaySubject, startWith } from 'rxjs';

@Component({
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  searchFilter$ = new ReplaySubject<string>(1);
  rangeFilter$ = new ReplaySubject<string>(1);
  sortFilter$ = new ReplaySubject<string>(1);

  selectedTypeFilter$ = new ReplaySubject<string>(1);
  typeFilterOptions$ = new ReplaySubject<string[]>(1);

  selectedWeightFilter$ = new ReplaySubject<number | null>(1);
  weightFilterOptions$ = new ReplaySubject<number[]>(1);

  selectedHeightFilter$ = new ReplaySubject<number | null>(1);
  heightFilterOptions$ = new ReplaySubject<number[]>(1);

  weaknessFilterOptions$ = new ReplaySubject<string[]>(1);
  selectedWeaknessFilter$ = new ReplaySubject<string>(1);

  pokemons = SHORT_POKEMONS;
  pokemons$$ = new BehaviorSubject(SHORT_POKEMONS);
  filtersGroup = new FormGroup({
    search: new FormControl(null),
    range: new FormControl(null),
    sort: new FormControl(null),
    type: new FormControl(null),
    weight: new FormControl(null),
    height: new FormControl(null),
    weakness: new FormControl(null),
  });
  constructor() {}

  ngOnInit(): void {
    this.filtersValueChanges();
    const FILTERS = [
      this.rangeFilter$,
      this.sortFilter$,
      this.selectedTypeFilter$,
      this.selectedWeightFilter$,
      this.selectedHeightFilter$,
      this.searchFilter$,
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

      console.log(
        selectedGeneration,
        selectedSort,
        selectedType,
        selectedWeight,
        selectedHeight,
        userSearch,
        selectedWeakness
      );
    });
  }

  filtersValueChanges() {
    this.filtersGroup.controls['search'].valueChanges
      .pipe(startWith(this.filtersGroup.controls['search'].value))
      .subscribe(this.searchFilter$);

    this.filtersGroup.controls['range'].valueChanges
      .pipe(startWith(this.filtersGroup.controls['range'].value))
      .subscribe(this.rangeFilter$);

    this.filtersGroup.controls['sort'].valueChanges
      .pipe(startWith(this.filtersGroup.controls['sort'].value))
      .subscribe(this.sortFilter$);

    this.filtersGroup.controls['type'].valueChanges
      .pipe(startWith(this.filtersGroup.controls['type'].value))
      .subscribe(this.selectedTypeFilter$);

    this.filtersGroup.controls['weight'].valueChanges
      .pipe(startWith(this.filtersGroup.controls['weight'].value))
      .subscribe(this.selectedWeightFilter$);

    this.filtersGroup.controls['height'].valueChanges
      .pipe(startWith(this.filtersGroup.controls['height'].value))
      .subscribe(this.selectedHeightFilter$);

    this.filtersGroup.controls['weakness'].valueChanges
      .pipe(startWith(this.filtersGroup.controls['weakness'].value))
      .subscribe(this.selectedWeaknessFilter$);
  }
}
