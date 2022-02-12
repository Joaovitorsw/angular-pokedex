import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'height',
})
export class HeightPipe implements PipeTransform {
  transform(value: number): string {
    if (value <= 0) return '0.0 cm';

    const string = value.toString();
    const arr = [...string];
    const index = arr.length - 1;

    if (index === 0) return `${arr[index]}0 cm`;

    const metros = string.slice(0, index);
    const cm = arr[index];
    return `${metros}.${cm}0 m`;
  }
}
