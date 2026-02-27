import { Component, computed, inject, signal } from '@angular/core';
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

const COLUMN_DEFS: ColumnNameWithKey[] = [
  { header: 'Name', key: 'name' },
  { header: 'Status', key: 'status' },
  { header: 'Due', key: 'due' },
];

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
  todoResource = inject(TodoService).todosResource(this.searchQuery);
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

  handleRowClicked(todoRowData: TodoRowData) {
    const id = todoRowData?.id;
    if (!id) return;
    this.#router.navigate(['/todos', id]);
  }

  onCreate() {
    this.#router.navigate(['/todos/create']);
  }
}
