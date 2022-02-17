import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PadStartPipe } from '..';

@NgModule({
  declarations: [PadStartPipe],
  exports: [PadStartPipe],
  imports: [CommonModule],
})
export class PadStartWidgetModule {}
