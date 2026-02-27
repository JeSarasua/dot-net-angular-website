import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { TodoFormComponent } from '../../shared/todo-form-component/todo-form-component';

@Component({
  selector: 'todo-create-component',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    TodoFormComponent,
  ],
  templateUrl: './todo-create-component.html',
  styles: `
    .header {
      padding: 10px 0px 0px 10px;
    }

    .mat-mdc-card {
      align-items: center;
    }
  `,
})
export class TodoCreateComponent {
  #router = inject(Router);

  onBack() {
    this.#router.navigate([`/todos`]);
  }
}
