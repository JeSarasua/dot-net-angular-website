import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal, Signal } from '@angular/core';
import {
  apiTodoGet,
  apiTodoIdDelete,
  ApiTodoIdDelete$Params,
  apiTodoIdPut,
  ApiTodoIdPut$Params,
  apiTodoPost,
  ApiTodoPost$Params,
  getTodo,
} from '../../api/functions';
import { ApiConfiguration } from '../../api/api-configuration';
import { TodoDto } from '../../api/models';
import { StrictHttpResponse } from '../../api/strict-http-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  #rootUrl = inject(ApiConfiguration).rootUrl;
  #httpClient = inject(HttpClient);

  pageNumber = signal<number | undefined>(undefined);
  pageSize = signal<number | undefined>(undefined);
  searchQuery = signal('');
  sortBy = signal('');
  sortOrder = signal('');
  statuses = signal('');

  todosResource = () =>
    httpResource<TodoDto[]>(
      () => {
        const pageNumber = this.pageNumber();
        const pageSize = this.pageSize();

        // Don't fetch until pageNumber and pageSize have been set
        if (!pageNumber || !pageSize) return undefined;
        return {
          url: `${this.#rootUrl}${apiTodoGet.PATH}`,
          method: 'GET',
          params: {
            pageNumber,
            pageSize,
            searchQuery: this.searchQuery() ?? undefined,
            sortBy: this.sortBy() ?? undefined,
            sortOrder: this.sortOrder() ?? undefined,
            statuses: this.statuses() ?? undefined,
          },
        };
      },
      {
        defaultValue: [],
      },
    );

  // RXJS Http Client Get Todos
  // getTodos(params: ApiTodoGet$Params): Observable<StrictHttpResponse<Array<TodoDto>>> {
  //   return apiTodoGet(this.#httpClient, `${this.#rootUrl}`, params);
  // }

  todoResource = (todoId: Signal<string>) =>
    httpResource<TodoDto>(
      () => ({
        url: `${this.#rootUrl}${getTodo.PATH.replace('{id}', todoId())}`,
        method: 'GET',
      }),
      {
        defaultValue: undefined,
      },
    );

  createTodo(params: ApiTodoPost$Params): Observable<StrictHttpResponse<TodoDto>> {
    return apiTodoPost(this.#httpClient, `${this.#rootUrl}`, params);
  }

  updateTodo(params: ApiTodoIdPut$Params): Observable<StrictHttpResponse<void>> {
    return apiTodoIdPut(this.#httpClient, `${this.#rootUrl}`, params);
  }

  deleteTodo(params: ApiTodoIdDelete$Params): Observable<StrictHttpResponse<void>> {
    return apiTodoIdDelete(this.#httpClient, `${this.#rootUrl}`, params);
  }
}
