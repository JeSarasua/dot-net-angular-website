import { Directive, inject } from '@angular/core';
import { TableComponent } from './table-component';
import { ActivatedRoute, Router } from '@angular/router';
import { Sort } from '@angular/material/sort';

function isSortEvent(event: unknown): event is Sort {
  return (
    typeof event === 'object' &&
    event !== null &&
    'active' in event &&
    'direction' in event &&
    typeof event.active === 'string' &&
    typeof event.direction === 'string'
  );
}

@Directive({
  selector: '[sortViaUrl]',
  host: {
    '(matSortChange)': 'onSort($event)',
  },
})
export class SortViaUrl {
  #router = inject(Router);
  #activatedRoute = inject(ActivatedRoute);

  onSort(sortEvent: Event) {
    if (!isSortEvent(sortEvent)) return;

    this.#router.navigate([], {
      relativeTo: this.#activatedRoute,
      queryParams: {
        sortBy: sortEvent.active,
        sortOrder: sortEvent.direction,
        pageNumber: 1,
      },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}
