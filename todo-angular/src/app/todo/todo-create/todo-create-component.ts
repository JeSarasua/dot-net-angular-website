import { Component, inject, Signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { TodoFormComponent } from '../../shared/todo-form-component/todo-form-component';
import { TodoService } from '../../shared/services/todo-service';
import { StrictHttpResponse } from '../../api/strict-http-response';
import { TodoDto } from '../../api/models';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, Subject, switchMap, tap } from 'rxjs';
import { ApiTodoPost$Params } from '../../api/functions';

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
  #todoService = inject(TodoService);
  todoForm = viewChild(TodoFormComponent);

  newTodo: Signal<StrictHttpResponse<TodoDto> | undefined> | undefined;

  trigger$ = new Subject<ApiTodoPost$Params>();

  createTodoSignal = toSignal(
    this.trigger$.pipe(
      switchMap((data) =>
        this.#todoService.createTodo(data).pipe(
          tap(() => {
            this.#router.navigate([`/todos`]);
          }),
          catchError((err) => {
            console.error('POST FAILED', err);
            return of(null);
          }),
        ),
      ),
    ),
    { initialValue: null },
  );

  createTodo() {
    this.trigger$.next({
      body: this.todoForm()?.dtoValue(),
    });
  }

  onBack() {
    this.#router.navigate([`/todos`]);
  }
}
