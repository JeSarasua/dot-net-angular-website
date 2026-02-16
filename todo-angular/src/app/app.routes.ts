import { Routes } from '@angular/router';
import { TodosComponent } from './todos/todos-component';

export const routes: Routes = [
  {
    title: 'Todos',
    path: '',
    component: TodosComponent,
  },
];
