import { Component, computed, effect, inject, input } from '@angular/core';
import { ColumnDef, TableComponent } from '../shared/table/table-component';
import { TodoService } from '../shared/services/todo-service';
import { getRelativeTime } from '../utils/get-relative-time';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { SearchComponent } from '../shared/table/search-component/search-component';
import { DEFAULT_PAGE_SIZE, DEFAULT_TOTAL_COUNT, FIRST_PAGE } from '../shared/consts/query-param';
import { StatusFilterComponent } from '../shared/table/status-filter/status-filter.component';

export type TodoRowData = {
  id: number;
  name: string;
  status: string;
  dueDate: string;
};

type PaginationHeaderInfo = {
  TotalItemCount: number;
  TotalPageCount: number;
  PageSize: number;
  CurrentPage: number;
};

const COLUMN_DEFS: ColumnDef[] = [
  { header: 'Name', key: 'name' },
  { header: 'Status', key: 'status', headerSlot: StatusFilterComponent },
  { header: 'Due', key: 'dueDate' },
];

const PAGINATION_RESPONSE_HEADER = 'X-Pagination';

@Component({
  selector: 'todos-component',
  imports: [TableComponent, MatProgressSpinnerModule, MatButton, MatIcon, SearchComponent],
  templateUrl: 'todos-component.html',
  styles: `
    :host {
      display: block;
      margin-left: 10px;
      margin-right: 10px;
    }

    .header {
      padding-top: 20px;
    }

    .action-items {
      display: flex;
      justify-content: space-between;
    }

    .spinner {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .create-btn {
      font-size: 18px;
      height: 48px;
    }

    .create-btn mat-icon {
      font-size: 24px;
      width: 24px;
    }
  `,
})
export class TodosComponent {
  pageNumber = input<string>();
  pageSize = input<string>();
  searchQuery = input<string>();
  sortBy = input<string>();
  sortOrder = input<string>();
  statuses = input<string>();

  #todoService = inject(TodoService);
  todoResource = this.#todoService.todosResource();
  #router = inject(Router);

  readonly columnDefs = COLUMN_DEFS;
  dataSource = computed(() =>
    this.todoResource.value().map(
      (todo) =>
        ({
          id: todo.id,
          name: todo.name,
          status: todo.status,
          dueDate: todo.dueDate ? getRelativeTime(todo.dueDate) : '',
        }) as TodoRowData,
    ),
  );

  _pageNumber = computed(() => Number(this.pageNumber()) || FIRST_PAGE);
  _pageSize = computed(() => Number(this.pageSize()) || DEFAULT_PAGE_SIZE);
  _searchQuery = computed(() => this.searchQuery() ?? '');
  _sortBy = computed(() => this.sortBy() ?? 'name');
  _sortOrder = computed(() => this.sortOrder() ?? 'asc');
  _statuses = computed(() => this.statuses() ?? '');

  totalCount = computed(() => {
    const header = this.todoResource.headers()?.get(PAGINATION_RESPONSE_HEADER);
    return header
      ? (JSON.parse(header) as PaginationHeaderInfo).TotalItemCount
      : DEFAULT_TOTAL_COUNT;
  });

  constructor() {
    effect(() => {
      let pageNumber = this._pageNumber();
      let pageSize = this._pageSize();
      let searchQuery = this._searchQuery();
      let sortBy = this._sortBy();
      let sortOrder = this._sortOrder();
      let statuses = this._statuses();

      if (!pageNumber) {
        pageNumber = FIRST_PAGE;
      }

      if (!pageSize) {
        pageSize = DEFAULT_PAGE_SIZE;
      }

      if (!searchQuery) {
        searchQuery = '';
      }

      this.#todoService.pageNumber.set(pageNumber);
      this.#todoService.pageSize.set(pageSize);
      this.#todoService.searchQuery.set(searchQuery);
      this.#todoService.sortBy.set(sortBy);
      this.#todoService.sortOrder.set(sortOrder);
      this.#todoService.statuses.set(statuses);
    });
  }

  handleRowClicked(todoRowData: TodoRowData) {
    const id = todoRowData?.id;
    if (!id) return;
    this.#router.navigate(['/todos', id]);
  }

  onCreate() {
    this.#router.navigate(['/todos/create']);
  }
}
