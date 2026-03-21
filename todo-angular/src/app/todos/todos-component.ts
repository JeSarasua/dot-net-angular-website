import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { ColumnNameWithKey, TableComponent } from '../shared/table/table-component';
import { TodoService } from '../shared/services/todo-service';
import { getRelativeTime } from '../utils/get-relative-time';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { SearchComponent } from '../shared/table/search-component/search-component';
import { DEFAULT_PAGE_SIZE, DEFAULT_TOTAL_COUNT, FIRST_PAGE } from '../shared/consts/query-param';

export type TodoRowData = {
  id: number;
  name: string;
  status: string;
  due: string;
};

type PaginationHeaderInfo = {
  TotalItemCount: number;
  TotalPageCount: number;
  PageSize: number;
  CurrentPage: number;
};

const COLUMN_DEFS: ColumnNameWithKey[] = [
  { header: 'Name', key: 'name' },
  { header: 'Status', key: 'status' },
  { header: 'Due', key: 'due' },
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
          due: todo.dueDate ? getRelativeTime(todo.dueDate) : '',
        }) as TodoRowData,
    ),
  );

  pNumber = computed(() => (this.pageNumber() ? Number(this.pageNumber()) : FIRST_PAGE));
  pSize = computed(() => (this.pageSize() ? Number(this.pageSize()) : DEFAULT_PAGE_SIZE));
  sQuery = computed(() => (this.searchQuery() ? this.searchQuery() : ''));

  totalCount = computed(() => {
    const header = this.todoResource.headers()?.get(PAGINATION_RESPONSE_HEADER);
    return header
      ? (JSON.parse(header) as PaginationHeaderInfo).TotalItemCount
      : DEFAULT_TOTAL_COUNT;
  });

  constructor() {
    effect(() => {
      let pageNumber = this.pNumber();
      let pageSize = this.pSize();
      let searchQuery = this.sQuery();

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
