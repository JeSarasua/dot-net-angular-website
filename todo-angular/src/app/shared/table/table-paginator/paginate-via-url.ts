import { Directive, inject } from '@angular/core';
import { TablePaginatorComponent } from './table-paginator-component';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

function isPageEvent(event: unknown): event is PageEvent {
  return (
    typeof event === 'object' &&
    event !== null &&
    'pageIndex' in event &&
    'pageSize' in event &&
    'length' in event &&
    typeof event.pageIndex === 'number' &&
    typeof event.pageSize === 'number' &&
    typeof event.length === 'number'
  );
}

@Directive({
  selector: '[paginateViaUrl]',
  host: {
    '(page)': 'onPage($event)',
  },
})
export class PaginateViaUrl {
  #host: TablePaginatorComponent;
  #router = inject(Router);
  #activatedRoute = inject(ActivatedRoute);
  readonly PAGE_ONE = 1;

  constructor(host: TablePaginatorComponent) {
    this.#host = host;
  }

  onPage($event: unknown) {
    if (!isPageEvent($event)) return;

    // Index goes from 0, 1, 2... pageNumbers goes from 1, 2, 3...
    const hostPageIndex = this.#host.pageNumber() - 1;
    const diff = $event.pageIndex - hostPageIndex;

    this.#router.navigate([], {
      relativeTo: this.#activatedRoute,
      queryParams: {
        pageNumber:
          this.#host.pageSize() === $event.pageSize
            ? this.#host.pageNumber() + diff
            : this.PAGE_ONE, // Reset to first page if page size changed
        pageSize: $event.pageSize,
      },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}
