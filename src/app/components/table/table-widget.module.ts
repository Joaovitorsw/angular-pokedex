import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { PokemonTextTitleCaseWidgetModule } from 'app/pipes/pokemon-text-title-case/pokemon-text-title-case.widget.module';
import { TableComponent } from './table.component';

@NgModule({
  declarations: [TableComponent],
  exports: [TableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    PokemonTextTitleCaseWidgetModule,
    MatPaginatorModule,
    MatSortModule,
  ],
})
export class TableWidgetModule {}
