import { Component, computed, input, linkedSignal, signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { TODO_STATUS } from '../../api/models/todo-status-array';
import { TodoDto, TodoForCreationDto, TodoForUpdateDto, TodoStatus } from '../../api/models';
import { form, FormField, maxLength, required } from '@angular/forms/signals';

interface TodoForm {
  description: string;
  date: string;
  time: string;
  name: string;
  status: TodoStatus;
}

@Component({
  selector: 'todo-form-component',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTimepickerModule,
    FormField,
  ],
  templateUrl: 'todo-form-component.html',
  styles: `
    .form-content {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }
    .error {
      color: #d32f2f;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }
  `,
})
export class TodoFormComponent {
  readonly todoStatus = TODO_STATUS;

  initialTodo = input<TodoDto>();

  todoModel = linkedSignal(() => {
    const initialTodo = this.initialTodo();

    return initialTodo
      ? this.convertTodoDtoToFormModel(initialTodo)
      : ({
          description: '',
          date: '',
          time: '',
          name: '',
          status: 'ToDo',
        } as TodoForm);
  });

  // TODO: Add more validators for date, time, status
  todoForm = form(this.todoModel, (todo) => {
    // Name
    required(todo.name, {
      message: 'Name is required.',
    });
    maxLength(todo.name, 50, { message: 'Name must be less than 50 characters.' });

    // Description
    maxLength(todo.description, 200, { message: 'Description must be less than 200 characters.' });

    // Status
    required(todo.status, {
      message: 'Status is required',
    });
  });

  dtoValue = computed(() => {
    const { description, date, time, name, status } = this.todoForm()?.value();

    const dueDate = date && time ? this.combineDateAndTime(date, time) : '';

    return {
      description,
      dueDate,
      name,
      status,
    } as TodoForUpdateDto | TodoForCreationDto;
  });

  combineDateAndTime(date: string, time: string) {
    const rawDate = new Date(date);
    rawDate.setHours(new Date(time).getHours(), new Date(time).getMinutes());

    return rawDate.toISOString();
  }

  convertTodoDtoToFormModel(todo: TodoDto): TodoForm {
    const { name, description, status, dueDate } = todo;

    return {
      name,
      description: description ?? '',
      status: status,
      time: dueDate ?? '',
      date: dueDate ?? '',
    };
  }
}
