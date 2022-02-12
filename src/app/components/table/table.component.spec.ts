import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { PokemonTitleCasePipe } from '@pokedex/pipes';
import { render, screen } from '@testing-library/angular';
import { TableComponent } from '.';
const DEFAULT_IMPORTS = [MatTableModule, MatPaginatorModule, MatSortModule];
const DEFAULT_DECLARATIONS = [PokemonTitleCasePipe];
const DEFAULT_DATA = [
  { name: 'John', age: 30, address: 'New York No. 1 Lake Park' },
  { name: 'Joe', age: 20, address: 'London No. 1 Lake Park' },
  { name: 'Jane', age: 25, address: 'Sidney No. 1 Lake Park' },
];
const DISPLAY_COLUMNS = ['name', 'age', 'address'];
const PAGINATOR_OPTIONS = [1, 2, 3];
describe('TableComponent', () => {
  it('should create ', async () => {
    await render(TableComponent, {
      declarations: DEFAULT_DECLARATIONS,
      imports: DEFAULT_IMPORTS,
      componentProperties: {
        hasCellClass: true,
        displayedColumns: DISPLAY_COLUMNS,
        data: DEFAULT_DATA,
        tablePointer: true,
        hasSort: true,
        paginatorOptions: PAGINATOR_OPTIONS,
      },
    });

    const $table = screen.getByTestId('table');

    expect($table).toBeTruthy();
  });
});
