import { Component, computed, inject, signal } from '@angular/core';
import { ColumnNameWithKey, TableComponent } from '../shared/table/table-component';
import { TodoService } from '../shared/services/todo-service';
import { getRelativeTime } from '../utils/get-relative-time';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
  imports: [TableComponent, MatProgressSpinnerModule],
  template: `
    <div class="header">
      <h1>Todos</h1>
    </div>
    @if (todoResource.isLoading()) {
      <div class="spinner">
        <mat-spinner [diameter]="220" />
      </div>
    } @else {
      <table-component
        [dataSource]="dataSource()"
        [columnDefs]="columnDefs"
        (rowClicked)="handleRowClicked($event)"
      />
    }
  `,
  styles: `
    .header {
      padding: 10px 0px 0px 10px;
    }

    .spinner {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
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
}
