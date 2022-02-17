import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeightPipe } from '.';

@NgModule({
  declarations: [HeightPipe],
  exports: [HeightPipe],
  imports: [CommonModule],
})
export class HeightWidgetModule {}
