import { Component, DestroyRef, inject, input } from '@angular/core';
import { TodoService } from '../shared/services/todo-service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
import { STATUS_ICONS } from '../shared/icons/status-icons';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApiTodoIdDelete$Params } from '../api/functions';

@Component({
  selector: 'todo-component',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, DatePipe],
  templateUrl: 'todo-component.html',
  styles: `
    .header {
      padding: 10px 0px 0px 10px;
    }

    .mat-mdc-card {
      align-items: center;
    }
  `,
})
export class TodoComponent {
  id = input.required<string>();
  #todoService = inject(TodoService);
  #router = inject(Router);
  #destroyRef = inject(DestroyRef);

  todoResource = this.#todoService.todoResource(this.id);

  statusIcons = STATUS_ICONS;
  todoInfo = this.todoResource.value;

  onBack() {
    this.#router.navigate([`/todos`]);
  }

  onEdit() {
    this.#router.navigate([`/todos/${this.id()}/edit`]);
  }

  onDelete() {
    const params: ApiTodoIdDelete$Params = { id: Number(this.id()) };

    this.#todoService
      .deleteTodo(params)
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        tap(() => {
          this.#router.navigate([`/todos`]);
        }),
        catchError((err) => {
          console.error('DELETE FAILED', err);
          return of(null);
        }),
      )
      .subscribe();
  }
}
