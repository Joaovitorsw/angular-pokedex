import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeIconPath',
})
export class TypeIconPathPipe implements PipeTransform {
  transform(value: string): string {
    const imagePath = `assets/images/type-icons/${value}.png`;
    return imagePath;
  }
}
