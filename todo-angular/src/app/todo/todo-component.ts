import { Component, effect, inject, input } from '@angular/core';
import { TodoService } from '../shared/services/todo-service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
import { STATUS_ICONS } from '../shared/icons/status-icons';
import { Router } from '@angular/router';
import { catchError, of, Subject, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
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

  todoResource = this.#todoService.todoResource(this.id);

  statusIcons = STATUS_ICONS;
  todoInfo = this.todoResource.value;

  trigger$ = new Subject<ApiTodoIdDelete$Params>();

  deleteTodoSignal = toSignal(
    this.trigger$.pipe(
      switchMap((params) =>
        this.#todoService.deleteTodo(params).pipe(
          catchError((err) => {
            console.error('DELETE FAILED', err);
            return of(null);
          }),
        ),
      ),
    ),
  );

  constructor() {
    effect(() => {
      if (this.deleteTodoSignal()?.ok) this.#router.navigate([`/todos`]);
    });
  }

  onBack() {
    this.#router.navigate([`/todos`]);
  }

  onEdit() {
    this.#router.navigate([`/todos/${this.id()}/edit`]);
  }

  onDelete() {
    this.trigger$.next({ id: Number(this.id()) });
  }
}
