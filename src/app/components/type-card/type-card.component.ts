import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'px-type-card',
  template: `
    <div class="icon {{ pokemonType }}">
      <img [src]="pokemonType | typeIconPath" [alt]="pokemonType" />
    </div>
    <p>{{ pokemonType }}</p>
  `,
  styleUrls: ['./type-card.component.scss'],
})
export class TypeCardComponent {
  @HostBinding('attr.data-testid') testid = 'type-card';
  @HostBinding('class')
  pokemonType: string;
  @Input() set type(type: string) {
    this.pokemonType = type;
  }
}
