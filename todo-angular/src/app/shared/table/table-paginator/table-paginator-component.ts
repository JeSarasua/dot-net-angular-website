import { Component, input, signal } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PaginateViaUrl } from './paginate-via-url';

@Component({
  selector: 'table-paginator-component',
  imports: [MatPaginatorModule, PaginateViaUrl],
  template: `<mat-paginator
    paginateViaUrl
    [length]="length()"
    [pageSize]="pageSize()"
    [showFirstLastButtons]="true"
    [pageSizeOptions]="pageSizeOptions"
    [pageIndex]="pageNumber() - 1"
  /> `,
})
export class TablePaginatorComponent {
  pageNumber = input.required<number>();
  pageSize = input.required<number>();
  length = input.required<number>();

  pageSizeOptions = [5, 10, 20];
}
