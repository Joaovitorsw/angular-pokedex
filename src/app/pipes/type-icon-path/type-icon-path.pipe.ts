import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeIconPath',
})
export class TypeIconPathPipe implements PipeTransform {
  readonly BASE_URL = 'assets/images/type-icons/';
  readonly EXTENSION = '.png';
  transform(value: string): string {
    const imagePath = this.BASE_URL + value + this.EXTENSION;
    return imagePath;
  }
}
