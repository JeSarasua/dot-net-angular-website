import { Component } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'table-paginator-component',
  imports: [MatPaginatorModule],
  template: `<mat-paginator
    length="500"
    pageSize="20"
    [showFirstLastButtons]="true"
    [pageSizeOptions]="[5, 10, 20]"
    [pageIndex]="currentPage"
    (page)="handlePageEvent($event)"
  /> `,
})
export class TablePaginatorComponent {
  currentPage = 0;

  handlePageEvent(pageEvent: PageEvent) {
    console.log('Handle Page event', pageEvent);
  }
}
