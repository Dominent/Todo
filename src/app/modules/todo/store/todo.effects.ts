import * as actions from '@todo/store/todo.actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TodoService } from '@todo/services/todo.service';
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
          tap(() =>
            this._snackBar.open('Successfully added todo!', 'Close', {
              duration: 5 * 1000,
            })
          ),
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
          tap(() =>
            this._snackBar.open('Successfully changed todo name!', 'Close', {
              duration: 5 * 1000,
            })
          ),
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
          tap(() =>
            this._snackBar.open('Successfully changed todo status!', 'Close', {
              duration: 5 * 1000,
            })
          ),
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
          tap(() =>
            this._snackBar.open('Successfully removed todo!', 'Close', {
              duration: 5 * 1000,
            })
          ),
          catchError((error) => of(actions.removeTodoFailure({ error })))
        )
      )
    )
  );

  //INFO(PPavlov): Refetch, because this is the easiest and less time consuming at the moment
  //INFO(PPavlov): There are other alternatives, but other features of the application I think are more important
  public refetchTodosEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        actions.addTodoSuccess,
        actions.changeTodoNameSuccess,
        actions.changeTodoStatusSuccess,
        actions.removeTodoSuccess
      ),
      map(() => actions.getTodos())
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly todoService: TodoService,
    private _snackBar: MatSnackBar
  ) {}
}
