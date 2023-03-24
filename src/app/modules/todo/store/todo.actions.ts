import { Todo, TodoStatus } from '@todo/models/todo.models';
import { createAction, props } from '@ngrx/store';
import {
  createFailureAction,
  createSuccessAction,
} from '@shared/helpers/action-utils';

export const getTodos = createAction('[ToDo] Get ToDo List');
export const getTodosSuccess = createSuccessAction(
  getTodos,
  props<{ todoList: Todo[] }>()
);
export const getTodosFailure = createFailureAction(getTodos);

export const addTodo = createAction(
  '[ToDo] Add ToDo Item',
  props<{ name: string }>()
);
export const addTodoFailure = createFailureAction(addTodo);
export const addTodoSuccess = createSuccessAction(
  addTodo,
  props<{ todo: Todo }>()
);

export const changeTodoName = createAction(
  '[ToDo] Change ToDo Name',
  props<{ todoId: number; name: string }>()
);
export const changeTodoNameFailure = createFailureAction(changeTodoName);
export const changeTodoNameSuccess = createSuccessAction(
  changeTodoName,
  props<{ todo: Todo }>()
);

export const changeTodoStatus = createAction(
  '[ToDo] Change ToDo Status',
  props<{ todoId: number; status: TodoStatus }>()
);
export const changeTodoStatusFailure = createFailureAction(changeTodoStatus);
export const changeTodoStatusSuccess = createSuccessAction(
  changeTodoStatus,
  props<{ todo: Todo }>()
);

export const removeTodo = createAction(
  '[ToDo] Remove ToDo Item',
  props<{ todoId: number }>()
);
export const removeTodoFailure = createFailureAction(removeTodo);
export const removeTodoSuccess = createSuccessAction(
  removeTodo,
  props<{ todo: Todo }>()
);
