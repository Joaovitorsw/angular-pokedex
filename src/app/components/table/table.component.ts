import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'px-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator)
  private paginator: MatPaginator;
  @ViewChild(MatSort) private sort: MatSort;
  @Output() rowClick = new EventEmitter();
  @Input() hasCellClass: boolean;
  @Input() displayedColumns: string[];
  @Input() data: any[];
  @Input() tablePointer: boolean = false;
  @Input() hasSort: boolean = false;
  @Input() paginatorOptions: number[];
  tableData: MatTableDataSource<any>;

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  ngOnInit(): void {
    this.tableData = new MatTableDataSource(this.data);
  }
  ngOnChanges(changes: SimpleChanges): void {
    const hasChangeData = changes.data.currentValue;
    if (this.tableData && hasChangeData) {
      this.tableData.data = this.data;
    }
  }

  ngAfterViewInit(): void {
    this.tableData.paginator = this.paginator;
    this.tableData.sort = this.sort;
  }
  clickRow(row: Event): void {
    this.rowClick.emit(row);
  }
  announceSortChange(sortState: Sort): void {
    if (!sortState.direction) {
      this._liveAnnouncer.announce('Sorting cleared');
      return;
    }

    this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  }
}
