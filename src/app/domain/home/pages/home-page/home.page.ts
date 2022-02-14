import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SHORT_POKEMONS } from 'app/database/short-pokemons';
import { BehaviorSubject } from 'rxjs';

@Component({
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  pokemons = SHORT_POKEMONS;
  pokemons$$ = new BehaviorSubject(SHORT_POKEMONS);
  constructor() {}

  ngOnInit(): void {}
}
