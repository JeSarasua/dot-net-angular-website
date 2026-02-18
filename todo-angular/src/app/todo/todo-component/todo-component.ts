import { Component, computed, effect, inject, signal, Signal } from '@angular/core';
import { TodoService } from '../../shared/services/todo-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-component',
  imports: [],
  template: `<h1>Todo component</h1>

    <div>NAME: {{ todoName() }}</div> `,
})
export class TodoComponent {
  todoResource = inject(TodoService).todoResource;
  route = inject(ActivatedRoute);
  routeId = signal<string | null>(null);
  todoName = signal<string>('');

  constructor() {
    this.todoName.set(
      this.todoResource(this.route.snapshot.paramMap.get('id') ?? '').value().name ?? '',
    );
  }
}
