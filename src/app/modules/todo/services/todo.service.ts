import { Observable, delay, of } from 'rxjs';
import { Todo, TodoStatus } from '@todo/models/todo.models';

import { Injectable } from '@angular/core';

const TODOS_DATABASE_INITAL = [
  {
    id: 1,
    name: 'My first todo',
    status: TodoStatus.Complete
  },
  {
    id: 2,
    name: 'My second todo',
    status: TodoStatus.InProgress
  }
]

function clone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosDatabase: Todo[] = TODOS_DATABASE_INITAL;

  public getTodos(): Observable<Todo[]> {
    return of(this.todosDatabase);
  }

  public addTodo(name: string): Observable<Todo> {
    let todos = clone(this.todosDatabase);

    let todo: Todo = {
      id: Date.now(),
      status: TodoStatus.InProgress,
      name
    };

    todos.push(todo);

    this.todosDatabase = todos;

    return of(todo).pipe(delay(1 * 1000));
  }

  public changeTodoName(todoId: number, name: string): Observable<Todo> {
    let todos = clone(this.todosDatabase);

    const index = todos.findIndex(({id}) => id === todoId );

    if(index === -1) {
      throw new Error(`Todo with index ${index}, not found!`);
    }

    let todoToUpdate = todos[index];

    todoToUpdate.name = name;

    this.todosDatabase = todos;

    return of(todoToUpdate).pipe(delay(1 * 1000));
  }

  public changeTodoStatus(todoId: number, status: TodoStatus): Observable<Todo> {
    let todos = clone(this.todosDatabase);

    const index = todos.findIndex(({id}) => id === todoId);

    if(index === -1) {
      throw new Error(`Todo with index ${index}, not found!`);
    }

    let todoToUpdate = todos[index];

    todoToUpdate.status = status;

    this.todosDatabase = todos;

    return of(todoToUpdate).pipe(delay(1 * 1000));
  }

  public removeTodo(todoId: number): Observable<Todo> {
    let todos = clone(this.todosDatabase);

    const index = todos.findIndex(({id}) => id === todoId);

    if(index === -1) {
      throw new Error(`Todo with index ${index}, not found!`);
    }

    this.todosDatabase = todos.filter(({id}) => id != todoId);

    return of(todos[index]).pipe(delay(1 * 1000));
  }
}
