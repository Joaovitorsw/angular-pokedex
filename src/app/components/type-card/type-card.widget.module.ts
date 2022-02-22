import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TypeIconPathPipe } from '@pokedex/pipes';
import { TypeCardComponent } from '.';

@NgModule({
  declarations: [TypeCardComponent, TypeIconPathPipe],
  exports: [TypeCardComponent, TypeIconPathPipe],
  imports: [CommonModule],
})
export class TypeCardWidgetModule {}
