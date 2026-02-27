import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTimepickerModule } from '@angular/material/timepicker';

import { TODO_STATUS } from '../../api/models/todo-status-array';

@Component({
  selector: 'todo-form-component',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTimepickerModule,
  ],
  templateUrl: 'todo-form-component.html',
  styles: `
    .form-content {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }
  `,
})
export class TodoFormComponent {
  readonly todoStatus = TODO_STATUS;
}
