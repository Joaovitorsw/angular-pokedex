import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'padStart',
})
export class PadStartPipe implements PipeTransform {
  transform(value: number, maxLength: number, fillString?: string): string {
    const str = value.toString();
    return str.padStart(maxLength, fillString);
  }
}
