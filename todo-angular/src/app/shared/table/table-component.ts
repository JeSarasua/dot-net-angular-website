import { Component, computed, input, output, Type } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { TablePaginatorComponent } from './table-paginator/table-paginator-component';
import { SortViaUrl } from './sort-via-url';
import { NoResultsComponent } from './no-results/no-results-component';
import { NgClass, NgComponentOutlet } from '@angular/common';
import { CenteredSpinnerComponent } from '../centered-spinner/centered-spinner.component';
import { ErrorStateComponent } from '../error-state/error-state.component';

export type ColumnDef = {
  header: string;
  key: string;
  headerSlot?: Type<any>;
};

@Component({
  selector: 'table-component',
  imports: [
    MatTableModule,
    TablePaginatorComponent,
    MatSortModule,
    SortViaUrl,
    NoResultsComponent,
    NgComponentOutlet,
    NgClass,
    CenteredSpinnerComponent,
    ErrorStateComponent,
  ],
  template: `
    @if (!!error()) {
      <error-state [problem]="error()" />
    } @else {
      <table mat-table [dataSource]="dataSource()" matSort matSortDisableClear sortViaUrl>
        @for (columnDef of columnDefs(); track columnDef) {
          <ng-container [matColumnDef]="columnDef.key">
            <th mat-header-cell *matHeaderCellDef mat-sort-header i18n>
              {{ columnDef.header }}
              @if (columnDef.headerSlot) {
                <ng-container *ngComponentOutlet="columnDef.headerSlot" />
              }
            </th>
            <td mat-cell *matCellDef="let element" i18n>{{ element[columnDef.key] }}</td>
          </ng-container>
        }
        <tr mat-header-row *matHeaderRowDef="columnKeys()"></tr>
        <tr
          mat-row
          *matRowDef="let row; columns: columnKeys()"
          [ngClass]="rowClassFn()?.(row)"
          (click)="emitRowInfo(row)"
        ></tr>
      </table>
      @if (isLoading()) {
        <centered-spinner [diameter]="220" />
      } @else if (dataSource().length === 0) {
        <no-results-component />
      } @else {
        <table-paginator-component
          [pageSize]="pageSize()"
          [pageNumber]="pageNumber()"
          [length]="totalCount()"
        />
      }
    }
  `,
  styleUrl: './table-component.scss',
})
export class TableComponent<T> {
  dataSource = input.required<T[]>();
  columnDefs = input.required<ColumnDef[]>();
  pageNumber = input.required<number>();
  pageSize = input.required<number>();
  totalCount = input.required<number>();
  isLoading = input<boolean>(false);
  error = input<Error | undefined>(undefined);
  rowClassFn = input<(row: T) => string | string[] | Record<string, boolean>>();

  rowClicked = output<T>();

  columnKeys = computed(() => this.columnDefs().map((columnDef) => columnDef.key));

  emitRowInfo(row: T) {
    this.rowClicked.emit(row);
  }
}
