import { Routes } from '@angular/router';
import { TodosComponent } from './todos/todos-component';
import { TodoComponent } from './todo/todo-component';
import { TodoEditComponent } from './todo/todo-edit/todo-edit-component';
import { TodoCreateComponent } from './todo/todo-create/todo-create-component';
import { ErrorStateComponent } from './shared/error-state/error-state.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'todos',
    pathMatch: 'full',
  },
  {
    title: 'Todos',
    path: 'todos',
    component: TodosComponent,
  },
  {
    title: 'Create Todo',
    path: 'todos/create',
    component: TodoCreateComponent,
  },
  {
    title: 'Todo',
    path: 'todos/:id',
    component: TodoComponent,
  },
  {
    title: 'Edit Todo',
    path: 'todos/:id/edit',
    component: TodoEditComponent,
  },
  {
    title: 'Page Not Found',
    path: '**',
    component: ErrorStateComponent,
  },
];
