import { Component, Input } from '@angular/core';

@Component({
  selector: 'px-damage-relations-card',
  templateUrl: './damage-relations-card.component.html',
  styleUrls: ['./damage-relations-card.component.scss'],
})
export class DamageRelationsCardComponent {
  @Input() damagesRelations?: string[];
  @Input() damageText: string;
  @Input() typeSlot: string | undefined;
}
