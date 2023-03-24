import * as fromActions from '@todo/store/todo.actions';
import * as fromSelectors from '@todo/store/todo.selectors';

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoStatus } from '@todo/models/todo.models';

@Injectable({
  providedIn: 'root',
})
export class TodoStoreFacadeService {
  constructor(private readonly store: Store<{}>) {}

  public get actions() {
    return {
      getTodos: () => this.store.dispatch(fromActions.getTodos()),
      changeTodoName: (todoId: number, name: string) =>
        this.store.dispatch(fromActions.changeTodoName({ todoId, name })),
      changeTodoStatus: (todoId: number, status: TodoStatus) =>
        this.store.dispatch(fromActions.changeTodoStatus({ todoId, status })),
      addTodo: (name: string) =>
        this.store.dispatch(fromActions.addTodo({ name })),
      removeTodo: (todoId: number) =>
        this.store.dispatch(fromActions.removeTodo({ todoId })),
    };
  }

  public get selectors() {
    return {
      todoList$: this.store.select(fromSelectors.getAllTodos),

      getTodosLoading$: this.store.select(fromSelectors.getTodosLoading),
      addTodoLoading$: this.store.select(fromSelectors.addTodoLoading),
      changeTodoNameLoading$: this.store.select(fromSelectors.changeTodoNameLoading),
      changeTodoStatusLoading$: this.store.select(fromSelectors.changeTodoStatusLoading),
      removeTodoLoading$: this.store.select(fromSelectors.removeTodoLoading)
    }
  }
}
