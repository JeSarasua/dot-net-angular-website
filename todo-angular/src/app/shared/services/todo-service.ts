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
import { DEFAULT_PAGE_SIZE, FIRST_PAGE } from '../consts/query-param';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  #rootUrl = inject(ApiConfiguration).rootUrl;
  #httpClient = inject(HttpClient);

  pageNumber = signal(FIRST_PAGE);
  pageSize = signal(DEFAULT_PAGE_SIZE);
  searchQuery = signal('');

  // FIXME: Handle double fetch when initial page size is set
  todosResource = () =>
    httpResource<TodoDto[]>(
      () => ({
        url: `${this.#rootUrl}${apiTodoGet.PATH}`,
        method: 'GET',
        params: {
          ...(this.pageNumber() && { pageNumber: this.pageNumber() }),
          ...(this.pageSize() && { pageSize: this.pageSize() }),
          ...(this.searchQuery() && { searchQuery: this.searchQuery() }),
        },
      }),
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
