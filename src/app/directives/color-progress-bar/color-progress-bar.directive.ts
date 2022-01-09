import { Directive, HostBinding, OnInit } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';

@Directive({
  selector: 'mat-progress-bar.pxColorProgressBar',
})
export class ColorProgressBarDirective implements OnInit {
  constructor(private matProgressBar: MatProgressBar) {}
  @HostBinding('style.--color')
  color: string;
  private red: number;
  private green: number;
  private blue = 0;
  private hexadecimal: number | string;

  ngOnInit(): void {
    this.color = this.percentageToHexColor(this.matProgressBar.value);
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
