import { Component, computed } from '@angular/core';
import { ColumnNameWithKey, TableComponent } from '../shared/table/table-component';

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
  dataSource = computed(
    () =>
      [
        {
          name: 'Clean the kitchen',
          status: 'In progress',
          due: '3 days',
        },
        {
          name: 'Buy groceries',
          status: 'Not started',
          due: '1 day',
        },
        {
          name: 'Finish project report',
          status: 'In progress',
          due: '5 days',
        },
        {
          name: 'Schedule dentist appointment',
          status: 'Completed',
          due: 'Overdue',
        },
        {
          name: 'Walk the dog',
          status: 'Not started',
          due: '2 hours',
        },
      ] as TodoRowData[],
  );
}
