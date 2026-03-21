import { Component, computed, inject, signal, Signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CenteredSpinnerComponent } from '../../shared/centered-spinner/centered-spinner.component';
import { Router } from '@angular/router';
import { TodoFormComponent } from '../../shared/todo-form-component/todo-form-component';
import { TodoService } from '../../shared/services/todo-service';
import { StrictHttpResponse } from '../../api/strict-http-response';
import { TodoDto } from '../../api/models';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, Subject, switchMap, tap } from 'rxjs';
import { ApiTodoPost$Params } from '../../api/functions';
import { ErrorStateComponent } from '../../shared/error-state/error-state.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'todo-create-component',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CenteredSpinnerComponent,
    TodoFormComponent,
    ErrorStateComponent,
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

  isLoading = signal(false);
  error = signal<HttpErrorResponse | Error | undefined>(undefined);

  formValid = computed(() => this.todoForm()?.todoForm().valid() ?? false);

  createTodoSignal = toSignal(
    this.trigger$.pipe(
      tap(() => {
        this.isLoading.set(true);
        this.error.set(undefined);
      }),
      switchMap((data) =>
        this.#todoService.createTodo(data).pipe(
          tap(() => {
            this.isLoading.set(false);
            this.#router.navigate([`/todos`]);
          }),
          catchError((err) => {
            console.error('POST FAILED', err);
            this.isLoading.set(false);
            this.error.set(err);
            return of(undefined);
          }),
        ),
      ),
    ),
    { initialValue: undefined },
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
