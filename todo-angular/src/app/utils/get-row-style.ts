import { TodoRowData } from '../todos/todos-component';

export const getRowStyle = (row: TodoRowData): string => {
  switch (row.status) {
    case 'Completed':
      return 'status-completed';
    case 'Archived':
      return 'status-archived';
    case 'ToDo':
      return 'status-todo';
    case 'InProgress':
      return 'status-inprogress';
    default:
      return '';
  }
};
