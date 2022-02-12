import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SHORT_POKEMONS } from 'app/database/short-pokemons';

@Component({
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  pokemon = SHORT_POKEMONS[3];
  constructor() {}

  ngOnInit(): void {}
}
