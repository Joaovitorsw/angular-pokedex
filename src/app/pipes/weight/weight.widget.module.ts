import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WeightPipe } from '.';

@NgModule({
  declarations: [WeightPipe],
  exports: [WeightPipe],
  imports: [CommonModule],
})
export class WeightWidgetModule {}
