import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'no-results-component',
  imports: [MatIconModule],
  template: `
    <div class="empty-state">
      <mat-icon class="empty-icon">search_off</mat-icon>
      <p>No results found</p>
    </div>
  `,
  styles: `
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 120px 32px;
      text-align: center;
      min-height: 300px;
    }
    .empty-icon {
      font-size: 96px;
      width: 96px;
      height: 96px;
      opacity: 0.5;
      margin-bottom: 24px;
    }
    .empty-state p {
      margin: 0;
      font-size: 20px;
      color: var(--mat-sys-on-surface-variant);
    }
  `,
})
export class NoResultsComponent {}
