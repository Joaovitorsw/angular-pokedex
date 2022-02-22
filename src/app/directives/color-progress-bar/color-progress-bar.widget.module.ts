import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatProgressBar,
  MatProgressBarModule,
} from '@angular/material/progress-bar';
import { ColorProgressBarDirective } from './color-progress-bar.directive';

@NgModule({
  declarations: [ColorProgressBarDirective],
  exports: [ColorProgressBarDirective, MatProgressBar],
  imports: [MatProgressBarModule, CommonModule],
})
export class ColorProgressBarWidgetModule {}
