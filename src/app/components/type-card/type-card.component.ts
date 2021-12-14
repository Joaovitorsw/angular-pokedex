import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'px-type-card',
  templateUrl: './type-card.component.html',
  styleUrls: ['./type-card.component.scss'],
})
export class TypeCardComponent implements OnInit {
  @Input() type: string;

  constructor() {}

  ngOnInit(): void {}
}
