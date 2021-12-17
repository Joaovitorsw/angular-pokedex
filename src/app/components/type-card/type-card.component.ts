import { Component, HostBinding, Input, OnInit } from '@angular/core';

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
export class TypeCardComponent implements OnInit {
  @Input() type: string;
  @HostBinding('class') typeValue: string;
  constructor() {}
  ngOnInit(): void {
    this.typeValue = this.type;
  }
}
