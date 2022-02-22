import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { StatElement } from 'poke-api-models';

@Component({
  selector: 'px-stats-content',
  templateUrl: './stats-content.component.html',
  styleUrls: ['./stats-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsContainerComponent {
  stats_conversion = 0.393;
  @Input() pokemonStatus: StatElement[];
}
