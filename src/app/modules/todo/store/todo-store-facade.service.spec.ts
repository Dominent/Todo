/* tslint:disable:no-unused-variable */

import * as fromActions from '@todo/store/todo.actions';
import * as fromSelectors from '@todo/store/todo.selectors';
import * as fromStubs from '@todo/stubs/todo.stubs';

import { TODO_FEATURE_KEY, TodoState, todosInitialState } from './todo.reducer';
import { TestBed, inject } from '@angular/core/testing';

import { Store } from '@ngrx/store';
import { TodoStoreFacadeService } from './todo-store-facade.service';
import { provideMockStore } from '@ngrx/store/testing';

describe('Service: TodoStoreFacade', () => {
  let service: TodoStoreFacadeService;
  let store: Store<TodoState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoStoreFacadeService,
        provideMockStore<{}>({
          initialState: {
            [TODO_FEATURE_KEY]: todosInitialState,
          },
        }),
      ],
      imports: [],
    });
  });

  it('should ...', inject(
    [TodoStoreFacadeService],
    (service: TodoStoreFacadeService) => {
      expect(service).toBeTruthy();
    }
  ));

  beforeEach(() => {
    service = TestBed.inject(TodoStoreFacadeService);
    store = TestBed.inject<Store<TodoState>>(Store);
  });

  describe('actions', () => {
    it('getTodos should dispatch a new getTodos action', () => {
      spyOn(store, 'dispatch').and.callThrough();

      service.actions.getTodos();

      expect(store.dispatch).toHaveBeenCalledWith(fromActions.getTodos());
    });

    it('changeTodoName should dispatch a new changeTodoName action', () => {
      spyOn(store, 'dispatch').and.callThrough();

      service.actions.changeTodoName(fromStubs.todos[0].id, fromStubs.todos[0].name);

      expect(store.dispatch).toHaveBeenCalledWith(fromActions.changeTodoName({ todoId: fromStubs.todos[0].id, name: fromStubs.todos[0].name}));
    });

    it('changeTodoStatus should dispatch a new changeTodoStatus action', () => {
      spyOn(store, 'dispatch').and.callThrough();

      service.actions.changeTodoStatus(fromStubs.todos[0].id, fromStubs.todos[0].status);

      expect(store.dispatch).toHaveBeenCalledWith(fromActions.changeTodoStatus({ todoId: fromStubs.todos[0].id, status: fromStubs.todos[0].status}));
    });
    
    it('addTodo should dispatch a new addTodo action', () => {
      spyOn(store, 'dispatch').and.callThrough();

      service.actions.addTodo(fromStubs.todos[0].name);

      expect(store.dispatch).toHaveBeenCalledWith(fromActions.addTodo({ name: fromStubs.todos[0].name}));
    });

    it('removeTodo should dispatch a new removeTodo action', () => {
      spyOn(store, 'dispatch').and.callThrough();

      service.actions.removeTodo(fromStubs.todos[0].id);

      expect(store.dispatch).toHaveBeenCalledWith(fromActions.removeTodo({ todoId: fromStubs.todos[0].id}));
    });
  });
});
