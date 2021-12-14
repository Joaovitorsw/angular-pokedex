import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weight',
})
export class WeightPipe implements PipeTransform {
  transform(value: number): string {
    if (value <= 0) return '0.0 Kg';

    const arr = [...value.toString()];

    const index = arr.length - 1;
    const gram = arr[index];

    if (index === 0) return `0.${gram} Kg`;

    const kilo = arr.slice(0, index).join('');
    return `${kilo}.${gram}Kg`;
  }
}
