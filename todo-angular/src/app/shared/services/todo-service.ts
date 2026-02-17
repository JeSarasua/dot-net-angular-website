import { httpResource } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { apiTodoGet } from '../../api/functions';
import { ApiConfiguration, provideApiConfiguration } from '../../api/api-configuration';
import { TodoDto } from '../../api/models';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  rootUrl = inject(ApiConfiguration).rootUrl;

  todoResource = (searchQuery: Signal<string>) =>
    httpResource<TodoDto[]>(
      () => ({
        url: `${this.rootUrl}${apiTodoGet.PATH}`,
        method: 'GET',
        params: { searchQuery: searchQuery() },
      }),
      {
        defaultValue: [],
      },
    );
}
