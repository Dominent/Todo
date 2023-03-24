import * as fromActions from '@todo/store/todo.actions';
import * as fromStubs from '@todo/stubs/todo.stubs';

import { reducer, todosInitialState } from './todo.reducer';

import { HttpErrorResponse } from '@angular/common/http';
import { TodoStatus } from '@todo/models/todo.models';

describe('Todos reducer', () => {
  beforeEach(() => {});

  describe('getTodos', () => {
    it('should switch on the `loading` flag', () => {
      expect(todosInitialState.loading.getTodos).toEqual(false);

      const action = fromActions.getTodos();
      const result = reducer(todosInitialState, action);

      expect(result).toEqual({
        ...todosInitialState,
        loading: {
          ...todosInitialState.loading,
          getTodos: true,
        },
      });
    });

    it('should set error when getTodos fails', () => {
      expect(todosInitialState.error.getTodos).toEqual(null);

      const error = new HttpErrorResponse({ error: 'mock error' });

      const action = fromActions.getTodosFailure({ error });
      const result = reducer(todosInitialState, action);

      expect(result).toEqual({
        ...todosInitialState,
        error: { ...todosInitialState.error, getTodos: error },
      });
    });

    it('should set response data when getTodos is successful', () => {
      expect(todosInitialState.todoList).toEqual([]);

      const action = fromActions.getTodosSuccess({ todoList: fromStubs.todos });
      const result = reducer(todosInitialState, action);

      expect(result).toEqual({
        ...todosInitialState,
        todoList: fromStubs.todos,
      });
    });
  });

  describe('addTodo', () => {
    it('should switch on the `loading` flag', () => {
      expect(todosInitialState.loading.addTodo).toEqual(false);

      const action = fromActions.addTodo({ name: 'Name' });
      const result = reducer(todosInitialState, action);

      expect(result).toEqual({
        ...todosInitialState,
        loading: {
          ...todosInitialState.loading,
          addTodo: true,
        },
      });
    });

    it('should set error when getTodos fails', () => {
      expect(todosInitialState.error.addTodo).toEqual(null);

      const error = new HttpErrorResponse({ error: 'mock error' });

      const action = fromActions.addTodoFailure({ error });
      const result = reducer(todosInitialState, action);

      expect(result).toEqual({
        ...todosInitialState,
        error: { ...todosInitialState.error, addTodo: error },
      });
    });
  });

  describe('changeTodoName', () => {
    it('should switch on the `loading` flag', () => {
      expect(todosInitialState.loading.changeTodoName).toEqual(false);

      const action = fromActions.changeTodoName({ todoId: fromStubs.todos[0].id, name: 'Name' });
      const result = reducer(todosInitialState, action);

      expect(result).toEqual({
        ...todosInitialState,
        loading: {
          ...todosInitialState.loading,
          changeTodoName: true,
        },
      });
    });

    it('should set error when changeTodoName fails', () => {
      expect(todosInitialState.error.addTodo).toEqual(null);

      const error = new HttpErrorResponse({ error: 'mock error' });

      const action = fromActions.changeTodoNameFailure({ error });
      const result = reducer(todosInitialState, action);

      expect(result).toEqual({
        ...todosInitialState,
        error: { ...todosInitialState.error, changeTodoName: error },
      });
    });
  });

  describe('changeTodoStatus', () => {
    it('should switch on the `loading` flag', () => {
      expect(todosInitialState.loading.changeTodoStatus).toEqual(false);

      const action = fromActions.changeTodoStatus({ todoId: fromStubs.todos[1].id, status: TodoStatus.Complete });
      const result = reducer(todosInitialState, action);

      expect(result).toEqual({
        ...todosInitialState,
        loading: {
          ...todosInitialState.loading,
          changeTodoStatus: true,
        },
      });
    });

    it('should set error when changeTodoStatus fails', () => {
      expect(todosInitialState.error.addTodo).toEqual(null);

      const error = new HttpErrorResponse({ error: 'mock error' });

      const action = fromActions.changeTodoStatusFailure({ error });
      const result = reducer(todosInitialState, action);

      expect(result).toEqual({
        ...todosInitialState,
        error: { ...todosInitialState.error, changeTodoStatus: error },
      });
    });
  });

  describe('removeTodo', () => {
    it('should switch on the `loading` flag', () => {
      expect(todosInitialState.loading.removeTodo).toEqual(false);

      const action = fromActions.removeTodo({ todoId: fromStubs.todos[1].id });
      const result = reducer(todosInitialState, action);

      expect(result).toEqual({
        ...todosInitialState,
        loading: {
          ...todosInitialState.loading,
          removeTodo: true,
        },
      });
    });

    it('should set error when removeTodo fails', () => {
      expect(todosInitialState.error.addTodo).toEqual(null);

      const error = new HttpErrorResponse({ error: 'mock error' });

      const action = fromActions.removeTodoFailure({ error });
      const result = reducer(todosInitialState, action);

      expect(result).toEqual({
        ...todosInitialState,
        error: { ...todosInitialState.error, removeTodo: error },
      });
    });
  });


  describe('unknown action', () => {
    it('should return the default state', () => {
      const action = { type: 'NOOP' } as any;
      const result = reducer(undefined, action);

      expect(result).toBe(todosInitialState);
    });
  });
});
