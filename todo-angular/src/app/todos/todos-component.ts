import { Component, computed, inject, signal } from '@angular/core';
import { ColumnNameWithKey, TableComponent } from '../shared/table/table-component';
import { TodoService } from '../shared/services/todo-service';
import { formatDate } from '@angular/common';
import { getRelativeTime } from '../utils/get-relative-time';

export type TodoRowData = {
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
  imports: [TableComponent],
  template: `<h1>Todo app</h1>
    <table-component [dataSource]="dataSource()" [columnDefs]="columnDefs" />`,
})
export class TodosComponent {
  readonly columnDefs = COLUMN_DEFS;
  searchQuery = signal('');
  todoResource = inject(TodoService).todosResource(this.searchQuery);

  dataSource = computed(() =>
    this.todoResource.value().map(
      (todo) =>
        ({
          name: todo.name,
          status: todo.status,
          due: todo.dueDate ? getRelativeTime(todo.dueDate) : '',
        }) as TodoRowData,
    ),
  );
}
