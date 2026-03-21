import { Component, output, signal, computed, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TodoStatus } from '../../../api/models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'status-filter',
  imports: [MatButtonModule, MatIconModule, MatMenuModule, MatCheckboxModule],
  template: `
    <button
      mat-icon-button
      [matMenuTriggerFor]="statusMenu"
      aria-label="Filter by status"
      (click)="$event.stopPropagation()"
    >
      <mat-icon>filter_list</mat-icon>
    </button>
    <mat-menu #statusMenu="matMenu">
      <div class="menu-item" (click)="$event.stopPropagation()">
        <mat-checkbox
          [checked]="allSelected()"
          [indeterminate]="someSelected()"
          (change)="toggleAll($event.checked)"
        >
          All
        </mat-checkbox>
      </div>
      @for (status of statuses; track status) {
        <div class="menu-item" (click)="$event.stopPropagation()">
          <mat-checkbox
            [checked]="isSelected(status)"
            (change)="toggleStatus(status, $event.checked)"
          >
            {{ status }}
          </mat-checkbox>
        </div>
      }
    </mat-menu>
  `,
  styles: `
    .menu-item {
      padding: 8px 16px;
    }
  `,
})
export class StatusFilterComponent {
  #router = inject(Router);
  #activatedRoute = inject(ActivatedRoute);

  statuses: TodoStatus[] = ['ToDo', 'InProgress', 'Completed', 'Archived'];
  selectedStatuses = signal<Set<TodoStatus>>(new Set(this.statuses));

  statusesChanged = output<TodoStatus[]>();

  allSelected = computed(() => this.selectedStatuses().size === this.statuses.length);
  someSelected = computed(() => {
    const size = this.selectedStatuses().size;
    return size > 0 && size < this.statuses.length;
  });

  constructor() {
    effect(() => {
      const statusString = Array.from(this.selectedStatuses()).join(',');

      this.#router.navigate([], {
        relativeTo: this.#activatedRoute,
        queryParams: {
          statuses: statusString,
          pageNumber: 1,
        },
        queryParamsHandling: 'merge',
        replaceUrl: true,
      });
    });
  }

  isSelected(status: TodoStatus): boolean {
    return this.selectedStatuses().has(status);
  }

  toggleStatus(status: TodoStatus, checked: boolean) {
    const current = new Set(this.selectedStatuses());
    if (checked) {
      current.add(status);
    } else {
      current.delete(status);
    }
    this.selectedStatuses.set(current);
  }

  toggleAll(checked: boolean) {
    if (checked) {
      this.selectedStatuses.set(new Set(this.statuses));
    } else {
      this.selectedStatuses.set(new Set());
    }
  }
}
