import { MatTableDataSource } from '@angular/material/table';
import { SHORT_POKEMONS } from '@pokedex/database';
import { render, screen } from '@testing-library/angular';
import { TableWidgetModule } from './table-widget.module';
import { TableComponent } from './table.component';

const DEFAULT_IMPORTS = [TableWidgetModule];

const DEFAULT_PROPERTY_VALUES = {
  hasCellClass: false,
  displayedColumns: ['name', 'weight', 'height', 'types'],
  data: SHORT_POKEMONS,
  tablePointer: false,
  hasSort: false,
  tableData: new MatTableDataSource(SHORT_POKEMONS),
};

describe('TableComponent', () => {
  it('should render table', async () => {
    await render(TableComponent, {
      imports: DEFAULT_IMPORTS,
      componentProperties: DEFAULT_PROPERTY_VALUES,
    });
    const $table = screen.getByTestId('table');
    expect($table).toBeTruthy();
  });

  it('should table with paginator', async () => {
    await render(TableComponent, {
      imports: DEFAULT_IMPORTS,
      componentProperties: {
        ...DEFAULT_PROPERTY_VALUES,
        paginatorOptions: [10, 20, 50, 100],
      },
    });
    const $paginator = screen.getByTestId('paginator');
    expect($paginator).toBeTruthy();
  });

  it('should table with sort filter option', async () => {
    await render(TableComponent, {
      imports: DEFAULT_IMPORTS,
      componentProperties: {
        ...DEFAULT_PROPERTY_VALUES,
        hasSort: true,
        paginatorOptions: [10, 20, 50, 100],
      },
    });

    const $sort = screen.getAllByTestId('sort-header');
    expect($sort).toBeTruthy();
  });
});
