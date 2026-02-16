import { Component, computed, effect, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TablePaginatorComponent } from './table-paginator/table-paginator-component';

export type ColumnNameWithKey = {
  header: string;
  key: string;
};

@Component({
  selector: 'table-component',
  imports: [MatTableModule, TablePaginatorComponent],
  template: ` <table mat-table [dataSource]="dataSource()">
      @for (columnDef of columnDefs(); track columnDef) {
        <ng-container [matColumnDef]="columnDef.key">
          <th mat-header-cell *matHeaderCellDef i18n>{{ columnDef.header }}</th>
          <td mat-cell *matCellDef="let element" i18n>{{ element[columnDef.key] }}</td>
        </ng-container>
      }
      <tr mat-header-row *matHeaderRowDef="columnKeys()"></tr>
      <tr mat-row *matRowDef="let row; columns: columnKeys()"></tr>
    </table>
    <table-paginator-component />`,
  styleUrl: './table-component.scss',
})
export class TableComponent {
  // FIXME: Switch any to generic type
  dataSource = input<any[]>([]);
  columnDefs = input<ColumnNameWithKey[]>([]);

  columnKeys = computed(() => this.columnDefs().map((columnDef) => columnDef.key));

  constructor() {
    effect(() => {
      console.log('DATASOURCE: ', this.dataSource());
    });
  }
}
