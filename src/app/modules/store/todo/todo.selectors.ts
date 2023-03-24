import { TODO_FEATURE_KEY, TodoState, TodoStatus } from './todo.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getTodoState = createFeatureSelector<TodoState>(TODO_FEATURE_KEY);

export const getAllTodos = createSelector(getTodoState, (state) => state.todoList);

export const getTodosLoading = createSelector(getTodoState, (state) => state.loading.getTodos);
export const addTodoLoading = createSelector(getTodoState, (state) => state.loading.addTodo);
export const changeTodoNameLoading = createSelector(getTodoState, (state) => state.loading.changeTodoName);
export const changeTodoStatusLoading = createSelector(getTodoState, (state) => state.loading.changeTodoStatus);
export const removeTodoLoading = createSelector(getTodoState, (state) => state.loading.removeTodo);
