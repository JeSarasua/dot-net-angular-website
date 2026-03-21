import { Component, computed, inject, input, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CenteredSpinnerComponent } from '../../shared/centered-spinner/centered-spinner.component';
import { Router } from '@angular/router';
import { TodoFormComponent } from '../../shared/todo-form-component/todo-form-component';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, Subject, switchMap, tap } from 'rxjs';
import { ApiTodoIdPut$Params } from '../../api/functions';
import { TodoService } from '../../shared/services/todo-service';
import { ErrorStateComponent } from '../../shared/error-state/error-state.component';

@Component({
  selector: 'todo-edit-component',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CenteredSpinnerComponent,
    TodoFormComponent,
    ErrorStateComponent,
  ],
  templateUrl: './todo-edit-component.html',
  styles: `
    .header {
      padding: 10px 0px 0px 10px;
    }

    .mat-mdc-card {
      align-items: center;
    }
  `,
})
export class TodoEditComponent {
  id = input.required<string>();
  #router = inject(Router);
  #todoService = inject(TodoService);
  todoResource = this.#todoService.todoResource(this.id);

  todoError = computed(() => this.todoResource.error());
  todoLoading = computed(() => this.todoResource.isLoading());
  todoInfo = computed(() => {
    if (this.todoResource.error()) return undefined;
    return this.todoResource.value();
  });

  todoForm = viewChild(TodoFormComponent);
  formValid = computed(() => this.todoForm()?.todoForm().valid() ?? false);

  trigger$ = new Subject<ApiTodoIdPut$Params>();

  updateTodoSignal = toSignal(
    this.trigger$.pipe(
      switchMap((params) =>
        this.#todoService.updateTodo(params).pipe(
          tap(() => {
            this.#router.navigate([`/todos`]);
          }),
          catchError((err) => {
            console.log('ERROR during update: ', err);
            return of(null);
          }),
        ),
      ),
    ),
  );

  onBack() {
    this.#router.navigate([`/todos/${this.id()}`]);
  }

  onUpdate() {
    this.trigger$.next({
      id: Number(this.id()),
      body: this.todoForm()?.dtoValue(),
    } satisfies ApiTodoIdPut$Params);
  }
}
