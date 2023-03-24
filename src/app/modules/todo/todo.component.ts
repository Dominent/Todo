import { Component, OnInit } from '@angular/core';
import {
  ConfirmDialogModel,
  ConfirmationDialogComponent,
} from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { Observable, combineLatest, filter, map, tap } from 'rxjs';
import { Todo, TodoStatus } from '@todo/models/todo.models';

import { MatDialog } from '@angular/material/dialog';
import { TodoEditDialogComponent } from '@todo/components/todo-edit-dialog/todo-edit-dialog.component';
import { TodoStoreFacadeService } from '@todo/store/todo-store-facade.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  public readonly statusEnum = TodoStatus;

  public readonly todos$: Observable<Todo[]>;

  constructor(
    private todoStoreFacadeService: TodoStoreFacadeService,
    public dialog: MatDialog
  ) {
    this.todos$ = this.todoStoreFacadeService.selectors.todoList$;
  }

  public ngOnInit(): void {
    this.todoStoreFacadeService.actions.getTodos();
  }

  public addNewTodo(name: string): void {
    this.todoStoreFacadeService.actions.addTodo(name);
  }

  public changeTodoName({ todo }: { todo: Todo }) {
    this.dialog
      .open(TodoEditDialogComponent, {
        width: '400px',
        data: {
          todo,
        },
      })
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap(({ id, name }: { id: number; name: string }) =>
          this.todoStoreFacadeService.actions.changeTodoName(id, name)
        )
      ).subscribe();
  }

  public get loading$(): Observable<boolean> {
    return combineLatest([
      this.todoStoreFacadeService.selectors.changeTodoNameLoading$,
      this.todoStoreFacadeService.selectors.changeTodoStatusLoading$,
      this.todoStoreFacadeService.selectors.getTodosLoading$,
      this.todoStoreFacadeService.selectors.removeTodoLoading$,
      this.todoStoreFacadeService.selectors.addTodoLoading$,
    ]).pipe(map((loading) => loading.some(Boolean)));
  }

  public changeTodoStatus({
    todoId,
    status,
  }: {
    todoId: number;
    status: TodoStatus;
  }) {
    const newStatus =
      status === TodoStatus.Complete
        ? TodoStatus.InProgress
        : TodoStatus.Complete;

    this.todoStoreFacadeService.actions.changeTodoStatus(todoId, newStatus);
  }

  public filterTodosByStatus(status: TodoStatus): Observable<Todo[]> {
    return this.todos$.pipe(
      map((todos) => todos.filter((todo) => todo.status === status))
    );
  }

  public removeTodo({ todoId }: { todoId: number }) {
    this.dialog
      .open(ConfirmationDialogComponent, {
        maxWidth: '300px',
        data: new ConfirmDialogModel(
          'Delete todo',
          'Are you sure you want to delete this todo ?'
        ),
      })
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe(() => this.todoStoreFacadeService.actions.removeTodo(todoId));
  }
}
