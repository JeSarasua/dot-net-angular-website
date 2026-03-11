import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { ColumnNameWithKey, TableComponent } from '../shared/table/table-component';
import { TodoService } from '../shared/services/todo-service';
import { getRelativeTime } from '../utils/get-relative-time';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

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
  imports: [TableComponent, MatProgressSpinnerModule, MatButton, MatIcon],
  templateUrl: 'todos-component.html',
  styles: `
    .header {
      display: flex;
      justify-content: space-between;
      padding: 20px 30px 0px 10px;
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
  searchQuery = signal('');
  pageNumber = input<string>();
  pageSize = input<string>();

  #todoService = inject(TodoService);
  todoResource = this.#todoService.todosResource();
  #router = inject(Router);

  readonly FIRST_PAGE = 1;
  readonly DEFAULT_PAGE_SIZE = 20;
  readonly DEFAULT_TOTAL_COUNT = 100;

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

  pNumber = computed(() => (this.pageNumber() ? Number(this.pageNumber()) : this.FIRST_PAGE));
  pSize = computed(() => (this.pageSize() ? Number(this.pageSize()) : this.DEFAULT_PAGE_SIZE));

  totalCount = computed(() => {
    const header = this.todoResource.headers()?.get(PAGINATION_RESPONSE_HEADER);
    return header
      ? (JSON.parse(header) as PaginationHeaderInfo).TotalItemCount
      : this.DEFAULT_TOTAL_COUNT;
  });

  constructor() {
    effect(() => {
      let pageNumber = this.pNumber();
      let pageSize = this.pSize();

      if (!pageNumber) {
        pageNumber = 1;
      }

      if (!pageSize) {
        pageSize = 20;
      }

      this.#todoService.pageNumber.set(pageNumber);
      this.#todoService.pageSize.set(pageSize);
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
