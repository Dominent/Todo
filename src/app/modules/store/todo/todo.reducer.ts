import * as actions from './todo.actions';

import { Action, createReducer, on } from '@ngrx/store';

import { HttpErrorResponse } from '@angular/common/http';

export const TODO_FEATURE_KEY = 'todo-store';

export enum TodoStatus {
  Complete = 'COMPLETE',
  InProgress = 'IN_PROGRESS',
}

export interface Todo {
  id: number;
  name?: string;
  status: TodoStatus;
}

export interface TodoState {
  todoList: Todo[];
  loading: {
    getTodos: boolean;
    addTodo: boolean;
    changeTodoName: boolean;
    changeTodoStatus: boolean;
    removeTodo: boolean;
  };
  error: {
    getTodos: HttpErrorResponse | null;
    addTodo: HttpErrorResponse | null;
    changeTodoName: HttpErrorResponse | null;
    changeTodoStatus: HttpErrorResponse | null;
    removeTodo: HttpErrorResponse | null;
  };
}

export const initialState: TodoState = {
  todoList: [],
  loading: {
    getTodos: false,
    addTodo: false,
    changeTodoName: false,
    changeTodoStatus: false,
    removeTodo: false,
  },
  error: {
    getTodos: null,
    addTodo: null,
    changeTodoName: null,
    changeTodoStatus: null,
    removeTodo: null,
  },
};

const todoReducer = createReducer(
  initialState,
  on(actions.getTodosSuccess, (state, { todoList }) => ({
    ...state,
    todoList,
    loading: {
      ...state.loading,
      getTodos: false,
    },
    error: {
      ...state.error,
      getTodos: null,
    },
  })),
  on(actions.getTodos, (state) => ({
    ...state,
    todoList: [],
    loading: {
      ...state.loading,
      getTodos: true,
    },
    error: {
      ...state.error,
      getTodos: null,
    },
  })),
  on(actions.getTodosFailure, (state, { error }) => ({
    ...state,
    todoList: [],
    loading: {
      ...state.loading,
      getTodos: false,
    },
    error: {
      ...state.error,
      getTodos: error,
    },
  })),

  on(actions.addTodoSuccess, (state,) => ({
    ...state,
    loading: {
      ...state.loading,
      addTodo: false,
    },
    error: {
      ...state.error,
      addTodo: null,
    },
  })),
  on(actions.addTodo, (state) => ({
    ...state,
    loading: {
      ...state.loading,
      addTodo: true,
    },
    error: {
      ...state.error,
      addTodo: null,
    },
  })),
  on(actions.addTodoFailure, (state, { error }) => ({
    ...state,
    loading: {
      ...state.loading,
      addTodo: false,
    },
    error: {
      ...state.error,
      addTodo: error,
    },
  })),

  on(actions.addTodoSuccess, (state,) => ({
    ...state,
    loading: {
      ...state.loading,
      addTodo: false,
    },
    error: {
      ...state.error,
      addTodo: null,
    },
  })),
  on(actions.addTodo, (state) => ({
    ...state,
    loading: {
      ...state.loading,
      addTodo: true,
    },
    error: {
      ...state.error,
      addTodo: null,
    },
  })),
  on(actions.addTodoFailure, (state, { error }) => ({
    ...state,
    loading: {
      ...state.loading,
      addTodo: false,
    },
    error: {
      ...state.error,
      addTodo: error,
    },
  })),


  on(actions.changeTodoNameSuccess, (state,) => ({
    ...state,
    loading: {
      ...state.loading,
      changeTodoName: false,
    },
    error: {
      ...state.error,
      changeTodoName: null,
    },
  })),
  on(actions.changeTodoName, (state) => ({
    ...state,
    loading: {
      ...state.loading,
      changeTodoName: true,
    },
    error: {
      ...state.error,
      changeTodoName: null,
    },
  })),
  on(actions.changeTodoNameFailure, (state, { error }) => ({
    ...state,
    loading: {
      ...state.loading,
      changeTodoName: false,
    },
    error: {
      ...state.error,
      changeTodoName: error,
    },
  })),

  on(actions.changeTodoStatusSuccess, (state,) => ({
    ...state,
    loading: {
      ...state.loading,
      changeTodoStatus: false,
    },
    error: {
      ...state.error,
      changeTodoStatus: null,
    },
  })),
  on(actions.changeTodoStatus, (state) => ({
    ...state,
    loading: {
      ...state.loading,
      changeTodoStatus: true,
    },
    error: {
      ...state.error,
      changeTodoStatus: null,
    },
  })),
  on(actions.changeTodoStatusFailure, (state, { error }) => ({
    ...state,
    loading: {
      ...state.loading,
      changeTodoStatus: false,
    },
    error: {
      ...state.error,
      changeTodoStatus: error,
    },
  })),

  on(actions.removeTodoSuccess, (state,) => ({
    ...state,
    loading: {
      ...state.loading,
      removeTodo: false,
    },
    error: {
      ...state.error,
      removeTodo: null,
    },
  })),
  on(actions.removeTodo, (state) => ({
    ...state,
    loading: {
      ...state.loading,
      removeTodo: true,
    },
    error: {
      ...state.error,
      removeTodo: null,
    },
  })),
  on(actions.removeTodoFailure, (state, { error }) => ({
    ...state,
    loading: {
      ...state.loading,
      removeTodo: false,
    },
    error: {
      ...state.error,
      removeTodo: error,
    },
  }))
);

export function reducer(state: TodoState | undefined, action: Action) {
  return todoReducer(state, action);
}
