import * as fromActions from '@todo/store/todo.actions';
import * as fromStub from '@todo/stubs/todo.stubs';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { TODO_FEATURE_KEY, todosInitialState } from './todo.reducer';
import { addMatchers, cold, hot, initTestScheduler } from 'jasmine-marbles';

import { HttpErrorResponse } from '@angular/common/http';
import { MockModule } from 'ng-mocks';
import { TestBed } from '@angular/core/testing';
import { TodoEffects } from './todo.effects';
import { TodoService } from '@todo/services/todo.service';
import { TodoStatus } from '@todo/models/todo.models';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

describe('Todo Effects', () => {
  let actions$: Observable<any>;
  let effects: TodoEffects;
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockModule(MatSnackBarModule)],
      providers: [
        TodoEffects,
        provideMockActions(() => actions$),
        provideMockStore<{}>({
          initialState: {
            [TODO_FEATURE_KEY]: todosInitialState,
          },
        }),
        {
          provide: MatSnackBar,
          useValue: {
            open: () => {},
          },
        },
        {
          provide: TodoService,
          useValue: {
            getTodos: () => {},
            changeTodoName: () => {},
            addTodo: () => {},
          },
        },
      ],
    });

    effects = TestBed.inject<TodoEffects>(TodoEffects);
    service = TestBed.inject<TodoService>(TodoService);

    initTestScheduler();
    addMatchers();
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('getTodoListEffect$', () => {
    it('should return a stream with get todos success action', () => {
      const action = fromActions.getTodos();
      const outcome = fromActions.getTodosSuccess({ todoList: fromStub.todos });

      actions$ = hot('-a', { a: action });

      const response = cold('-a|', { a: fromStub.todos });

      service.getTodos = jasmine.createSpy().and.returnValue(response);

      const expected = cold('--b', { b: outcome });

      expect(effects.getTodoListEffect$).toBeObservable(expected);
    });

    it('should return a stream with get todos failure action', () => {
      const action = fromActions.getTodos();
      const error = new HttpErrorResponse({ error: 'mock error' });
      const outcome = fromActions.getTodosFailure({ error });

      actions$ = hot('-a', { a: action });

      const response = cold('-#|', {}, error);

      service.getTodos = jasmine.createSpy().and.returnValue(response);

      const expected = cold('--b', { b: outcome });

      expect(effects.getTodoListEffect$).toBeObservable(expected);
    });
  });

  describe('addTodoEffect$', () => {
    it('should return a stream with add todos success action', () => {
      const action = fromActions.addTodo({ name: fromStub.todos[0].name });
      const outcome = fromActions.addTodoSuccess({ todo: fromStub.todos[0] });

      actions$ = hot('-a', { a: action });

      const response = cold('-a|', { a: fromStub.todos[0] });

      service.addTodo = jasmine.createSpy().and.returnValue(response);

      const expected = cold('--b', { b: outcome });

      expect(effects.addTodoEffect$).toBeObservable(expected);
    });

    it('should return a stream with add todos failure action', () => {
      const action = fromActions.addTodo({ name: fromStub.todos[0].name });
      const error = new HttpErrorResponse({ error: 'mock error' });
      const outcome = fromActions.addTodoFailure({ error });

      actions$ = hot('-a', { a: action });

      const response = cold('-#|', {}, error);

      service.addTodo = jasmine.createSpy().and.returnValue(response);

      const expected = cold('--b', { b: outcome });

      expect(effects.addTodoEffect$).toBeObservable(expected);
    });
  });

  describe('changeTodoNameEffect$', () => {
    it('should return a stream with change todo name success action', () => {
      const action = fromActions.changeTodoName({
        todoId: fromStub.todos[0].id,
        name: 'Name',
      });

      const outcome = fromActions.changeTodoNameSuccess({
        todo: {
          ...fromStub.todos[0],
          name: 'Name',
        },
      });

      actions$ = hot('-a', { a: action });

      const response = cold('-a|', {
        a: {
          ...fromStub.todos[0],
          name: 'Name',
        },
      });

      service.changeTodoName = jasmine.createSpy().and.returnValue(response);

      const expected = cold('--b', { b: outcome });

      expect(effects.changeTodoNameEffect$).toBeObservable(expected);
    });

    it('should return a stream with add todos failure action', () => {
      const action = fromActions.changeTodoName({
        todoId: fromStub.todos[0].id,
        name: 'Name',
      });

      const error = new HttpErrorResponse({ error: 'mock error' });
      const outcome = fromActions.changeTodoNameFailure({ error });

      actions$ = hot('-a', { a: action });

      const response = cold('-#|', {}, error);

      service.changeTodoName = jasmine.createSpy().and.returnValue(response);

      const expected = cold('--b', { b: outcome });

      expect(effects.changeTodoNameEffect$).toBeObservable(expected);
    });
  });


  describe('changeTodoStatusEffect$', () => {
    it('should return a stream with change todo name success action', () => {
      const action = fromActions.changeTodoStatus({
        todoId: fromStub.todos[1].id,
        status: TodoStatus.Complete,
      });

      const outcome = fromActions.changeTodoStatusSuccess({
        todo: {
          ...fromStub.todos[1],
          status: TodoStatus.Complete,
        },
      });

      actions$ = hot('-a', { a: action });

      const response = cold('-a|', {
        a: {
          ...fromStub.todos[1],
          status: TodoStatus.Complete
        },
      });

      service.changeTodoStatus = jasmine.createSpy().and.returnValue(response);

      const expected = cold('--b', { b: outcome });

      expect(effects.changeTodoStatusEffect$).toBeObservable(expected);
    });

    it('should return a stream with add todos failure action', () => {
      const action = fromActions.changeTodoStatus({
        todoId: fromStub.todos[1].id,
        status: TodoStatus.Complete
      });

      const error = new HttpErrorResponse({ error: 'mock error' });
      const outcome = fromActions.changeTodoStatusFailure({ error });

      actions$ = hot('-a', { a: action });

      const response = cold('-#|', {}, error);

      service.changeTodoStatus = jasmine.createSpy().and.returnValue(response);

      const expected = cold('--b', { b: outcome });

      expect(effects.changeTodoStatusEffect$).toBeObservable(expected);
    });
  });

  describe('removeTodoEffect$', () => {
    it('should return a stream with remove todo success action', () => {
      const action = fromActions.removeTodo({
        todoId: fromStub.todos[1].id,
      });

      const outcome = fromActions.removeTodoSuccess({
        todo: fromStub.todos[1],
      });

      actions$ = hot('-a', { a: action });

      const response = cold('-a|', {
        a: fromStub.todos[1],
      });

      service.removeTodo = jasmine.createSpy().and.returnValue(response);

      const expected = cold('--b', { b: outcome });

      expect(effects.removeTodoEffect$).toBeObservable(expected);
    });

    it('should return a stream with remove todo failure action', () => {
      const action = fromActions.removeTodo({
        todoId: fromStub.todos[1].id,
      });

      const error = new HttpErrorResponse({ error: 'mock error' });
      const outcome = fromActions.removeTodoFailure({ error });

      actions$ = hot('-a', { a: action });

      const response = cold('-#|', {}, error);

      service.removeTodo = jasmine.createSpy().and.returnValue(response);

      const expected = cold('--b', { b: outcome });

      expect(effects.removeTodoEffect$).toBeObservable(expected);
    });
  });
});
