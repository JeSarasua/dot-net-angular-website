import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

export interface ProblemDetails {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  traceId?: string;
}

const ERROR_ICONS: Record<number, string> = {
  400: 'report_problem',
  404: 'search_off',
  500: 'cloud_off',
};

const DEFAULT_ICON = 'error_outline';

@Component({
  selector: 'error-state',
  imports: [MatIconModule, MatButtonModule, RouterLink],
  template: `
    <div class="error-state">
      <mat-icon class="icon" [class]="iconClass()">{{ icon() }}</mat-icon>
      <h2>{{ displayTitle() }}</h2>
      @if (displayDetail()) {
        <p class="detail">{{ displayDetail() }}</p>
      }
      @if (traceId()) {
        <p class="trace-id">Trace ID: {{ traceId() }}</p>
      }
      @if (actionLabel() && actionLink()) {
        <a mat-flat-button [routerLink]="actionLink()">
          {{ actionLabel() }}
        </a>
      }
    </div>
  `,
  styles: `
    .error-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 80px 32px;
      text-align: center;
      min-height: 400px;
    }
    .icon {
      font-size: 120px;
      width: 120px;
      height: 120px;
      margin-bottom: 24px;
    }
    .icon-400 {
      color: var(--mat-sys-tertiary);
    }
    .icon-404 {
      color: var(--mat-sys-secondary);
    }
    .icon-500 {
      color: var(--mat-sys-error);
    }
    .icon-unknown {
      color: var(--mat-sys-outline);
    }
    h2 {
      margin: 0 0 12px;
      font-weight: 500;
      font-size: 28px;
    }
    .detail {
      margin: 0 0 24px;
      font-size: 16px;
      color: var(--mat-sys-on-surface-variant);
    }
    .trace-id {
      margin: 0 0 32px;
      font-size: 13px;
      color: var(--mat-sys-outline);
      font-family: monospace;
    }
  `,
})
export class ErrorStateComponent {
  problem = input<Error | ProblemDetails>();
  actionLabel = input<string>();
  actionLink = input<string>();

  #problemDetails = computed<ProblemDetails | undefined>(() => {
    const err = this.problem();
    if (!err) return undefined;
    if (err instanceof HttpErrorResponse) {
      return err.error as ProblemDetails;
    }
    if (err instanceof Error) {
      return { title: err.name, detail: err.message };
    }
    return err as ProblemDetails;
  });

  status = computed(() => this.#problemDetails()?.status);
  traceId = computed(() => this.#problemDetails()?.traceId);

  icon = computed(() => {
    const status = this.status();
    if (status && ERROR_ICONS[status]) {
      return ERROR_ICONS[status];
    }
    return DEFAULT_ICON;
  });

  iconClass = computed(() => {
    const status = this.status();
    if (status === 400) return 'icon-400';
    if (status === 404) return 'icon-404';
    if (status === 500) return 'icon-500';
    return 'icon-unknown';
  });

  displayTitle = computed(() => {
    const problem = this.#problemDetails();
    if (problem?.title) return problem.title;

    const status = this.status();
    switch (status) {
      case 400:
        return 'Bad Request';
      case 404:
        return 'Not Found';
      case 500:
        return 'Server Error';
      default:
        return 'An Error Occurred';
    }
  });

  displayDetail = computed(() => this.#problemDetails()?.detail);
}
