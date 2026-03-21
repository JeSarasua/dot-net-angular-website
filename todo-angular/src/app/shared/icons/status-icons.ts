import { TodoStatus } from '../../api/models';

export const STATUS_ICONS: Record<TodoStatus, string> = {
  ToDo: 'radio_button_unchecked',
  InProgress: 'pending',
  Completed: 'check_circle',
  Archived: 'archive',
};
