import { Routes } from '@angular/router';
import { TodosComponent } from './todos/todos-component';
import { TodoComponent } from './todo/todo-component/todo-component';

export const routes: Routes = [
  {
    title: 'Todos',
    path: 'todos',
    component: TodosComponent,
  },
  {
    title: 'Todo',
    path: 'todos/:id',
    component: TodoComponent,
  },
];
