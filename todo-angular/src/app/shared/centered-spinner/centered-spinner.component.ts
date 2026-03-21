import { Component, input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'centered-spinner',
  imports: [MatProgressSpinnerModule],
  template: `
    <div class="spinner-container">
      <mat-spinner [diameter]="diameter()" />
    </div>
  `,
  styles: `
    .spinner-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 300px;
    }
  `,
})
export class CenteredSpinnerComponent {
  diameter = input(140);
}
