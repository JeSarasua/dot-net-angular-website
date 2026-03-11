import { Component, computed, input, output } from '@angular/core';
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
      <tr mat-row *matRowDef="let row; columns: columnKeys()" (click)="emitRowInfo(row)"></tr>
    </table>
    <table-paginator-component
      [pageSize]="pageSize()"
      [pageNumber]="pageNumber()"
      [length]="totalCount()"
    />`,
  styleUrl: './table-component.scss',
})
export class TableComponent<T> {
  dataSource = input.required<T[]>();
  columnDefs = input.required<ColumnNameWithKey[]>();
  pageNumber = input.required<number>();
  pageSize = input.required<number>();
  totalCount = input.required<number>();

  rowClicked = output<T>();

  columnKeys = computed(() => this.columnDefs().map((columnDef) => columnDef.key));

  emitRowInfo(row: T) {
    this.rowClicked.emit(row);
  }
}
