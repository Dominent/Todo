import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo, TodoStatus } from '@todo/models/todo.models';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  @Input()
  public todos: Todo[];

  public TodoStatus = TodoStatus;

  @Output()
  public changeTodoStatus: EventEmitter<{
    todoId: number;
    status: TodoStatus;
  }> = new EventEmitter<{ todoId: number; status: TodoStatus }>();

  @Output()
  public changeTodoName: EventEmitter<{ todo: Todo }> = new EventEmitter<{
    todo: Todo;
  }>();

  @Output()
  public removeTodo: EventEmitter<{
    todoId: number;
  }> = new EventEmitter<{ todoId: number }>();
}
