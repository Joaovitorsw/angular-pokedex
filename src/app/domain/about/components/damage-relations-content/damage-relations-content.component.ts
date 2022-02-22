import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DamageRelations } from '.';

@Component({
  selector: 'px-damage-relations-content',
  templateUrl: './damage-relations-content.component.html',
  styleUrls: ['./damage-relations-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DamageRelationsContentComponent {
  @Input() damagesRelations: Array<DamageRelations>;
}
