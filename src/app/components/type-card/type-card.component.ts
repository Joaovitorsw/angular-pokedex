import { Component, Input } from '@angular/core';

@Component({
  selector: 'px-type-card',
  template: `
    <div class="icon {{ type }}">
      <img [src]="type | typeIconPath" [alt]="type" />
    </div>
    <p>{{ type }}</p>
  `,
  styleUrls: ['./type-card.component.scss'],
})
export class TypeCardComponent {
  @Input() type: string;
  constructor() {}
}
