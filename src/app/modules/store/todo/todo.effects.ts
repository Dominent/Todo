import * as actions from './todo.actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Todo, TodoStatus } from './todo.reducer';
import {
  catchError,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoService } from '../../todo/services/todo.service';
import { of } from 'rxjs';

@Injectable()
export class TodoEffects {
  public getTodoListEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getTodos),
      switchMap(() =>
        this.todoService.getTodos().pipe(
          map((todoList) => actions.getTodosSuccess({ todoList })),
          catchError((error) => of(actions.getTodosFailure({ error })))
        )
      )
    )
  );

  public addTodoEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.addTodo),
      switchMap(({ name }) =>
        this.todoService.addTodo(name).pipe(
          map((todo) => actions.addTodoSuccess({ todo })),
          catchError((error) => of(actions.addTodoFailure({ error })))
        )
      )
    )
  );

  public changeTodoNameEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.changeTodoName),
      switchMap(({ todoId, name }) =>
        this.todoService.changeTodoName(todoId, name).pipe(
          map((todo) => actions.changeTodoNameSuccess({ todo })),
          catchError((error) => of(actions.changeTodoNameFailure({ error })))
        )
      )
    )
  );

  public changeTodoStatusEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.changeTodoStatus),
      switchMap(({ todoId, status }) =>
        this.todoService.changeTodoStatus(todoId, status).pipe(
          map((todo) => actions.changeTodoStatusSuccess({ todo })),
          catchError((error) => of(actions.changeTodoStatusFailure({ error })))
        )
      )
    )
  );

  public removeTodoEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.removeTodo),
      switchMap(({ todoId }) =>
        this.todoService.removeTodo(todoId).pipe(
          map((todo) => actions.removeTodoSuccess({ todo })),
          catchError((error) => of(actions.removeTodoFailure({ error })))
        )
      )
    )
  );

  //INFO(PPavlov): Refetch, because this is the easiest and less time consuming at the moment
  //INFO(PPavlov): There are other alternatives, but other features of the application I think are more important
  public refetchTodosEffect$ = createEffect(() => this.actions$.pipe(
    ofType(
      actions.addTodoSuccess,
      actions.changeTodoNameSuccess,
      actions.changeTodoStatusSuccess,
      actions.removeTodoSuccess
    ),
    map(() => actions.getTodos())
  ));

  constructor(
    private readonly actions$: Actions,
    private readonly todoService: TodoService
  ) {}
}
