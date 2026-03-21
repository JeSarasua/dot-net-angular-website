import { Component, computed, effect, inject, untracked, linkedSignal } from '@angular/core';
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

  selectedStatuses = linkedSignal<Set<TodoStatus>>(() => {
    const statusesParam = this.#activatedRoute.snapshot.queryParamMap.get('statuses');
    if (!statusesParam) {
      return new Set([]);
    }
    const parsed = statusesParam
      .split(',')
      .filter((s): s is TodoStatus => this.statuses.includes(s as TodoStatus));
    return new Set(parsed);
  });

  allSelected = computed(() => this.selectedStatuses().size === this.statuses.length);
  noneSelected = computed(() => this.selectedStatuses().size === 0);
  someSelected = computed(() => !this.allSelected() && !this.noneSelected());

  constructor() {
    effect(() => {
      const statusString = Array.from(this.selectedStatuses()).join(',');

      untracked(() => {
        this.#router.navigate([], {
          relativeTo: this.#activatedRoute,
          queryParams: {
            statuses: this.allSelected() || this.noneSelected() ? undefined : statusString,
            pageNumber: 1,
          },
          queryParamsHandling: 'merge',
          replaceUrl: true,
        });
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
