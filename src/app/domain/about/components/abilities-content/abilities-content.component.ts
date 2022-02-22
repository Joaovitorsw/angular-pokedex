import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Ability } from 'poke-api-models';

@Component({
  selector: 'px-abilities-content',
  templateUrl: './abilities-content.component.html',
  styleUrls: ['./abilities-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbilitiesContentComponent implements OnInit {
  @Input() abilities: Array<Ability>;

  ngOnInit(): void {
    this.abilities?.map((ability) => {
      const flavor_text_entries = ability.flavor_text_entries.filter(
        (entry) => entry.language.name === 'en'
      );

      const effect_entries = ability.effect_entries.filter(
        (entry) => entry.language.name === 'en'
      );
      ability.effect_entries = effect_entries;
      const flavor_text_index = flavor_text_entries.length - 1;
      ability.flavor_text_entries = [flavor_text_entries[flavor_text_index]];
      return ability;
    });
  }
}
