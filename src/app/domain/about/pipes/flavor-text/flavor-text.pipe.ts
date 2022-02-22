import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flavorText',
})
export class FlavorTextPipe implements PipeTransform {
  transform(value: string): string {
    const replacedValue = value
      .replace('', '')
      .replace(/-*.-{2} */gm, '')
      .replace(': |', ':')
      .replace('$effect_chance%', 'effect');
    return replacedValue;
  }
}
