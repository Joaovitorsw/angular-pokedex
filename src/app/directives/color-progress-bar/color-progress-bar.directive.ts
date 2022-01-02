import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[pxColorProgressBar]',
})
export class ColorProgressBarDirective implements OnInit {
  @Input('pxColorProgressBar') value: number;
  @HostBinding('attr.color') color: string;

  constructor(private $hostElement: ElementRef) {}
  private red: number;
  private green: number;
  private blue = 0;
  private hexadecimal: number | string;

  ngOnInit(): void {
    const rounding = this.value.toPrecision(2);
    const value = parseInt(rounding);
    this.color = this.percentageToHexColor(value);
    const $style = document.createElement('style');
    $style.innerText = `
    mat-progress-bar[color="${this.color}"] .mat-progress-bar-fill::after {
      background-color: ${this.color} !important;
    }
    `;
    this.$hostElement.nativeElement.appendChild($style);
  }

  percentageToHexColor(value: number): string {
    if (value > 100) value = 100;
    const redConversion = Math.round(510 - 5.1 * value);
    const greenConversion = Math.round(4.5 * value);
    const maxValue = 255;

    this.green = maxValue;
    this.red = redConversion;

    if (value < 50) {
      this.red = maxValue;
      this.green = greenConversion;
    }
    this.hexadecimal =
      this.red * 0x10000 + this.green * 0x100 + this.blue * 0x1;
    this.hexadecimal = '000000' + this.hexadecimal.toString(16);
    this.hexadecimal = '#' + this.hexadecimal.slice(-6);

    return this.hexadecimal;
  }
}
