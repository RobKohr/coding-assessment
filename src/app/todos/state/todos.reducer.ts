import * as TodoActions from './todo.actions';
import generateUUID from 'smc-uuid-generator';

import { Action, createReducer, on } from '@ngrx/store';

import { FILTER_MODES } from './../constants/filter-modes';
import { ITodo } from '../interfaces/ITodo';

export interface ITodosState {
  filterMode?: FILTER_MODES;
  todos?: ITodo[];
}

export const initialState: ITodosState = {
  filterMode: 'All',
  todos: [],
};

export function todosReducer(state: ITodosState, action: Action) {
  return createReducer(
    initialState,

    on(TodoActions.addTodo, (existingState, { text }) => {
      return {
        ...existingState,
        todos: [
          {
            text,
            completed: false,
            id: generateUUID(),
            created: new Date().getTime(),
          },
          ...existingState.todos,
        ],
      };
    }),

    on(TodoActions.removeTodo, (existingState, { id }) => {
      return {
        ...existingState,
        todos: existingState.todos.filter(({ id: todoId }) => todoId !== id),
      };
    }),

    on(TodoActions.editTodo, (existingState, {}) => {
      return existingState;
      // Skipped. Not sure how this was supposed to be different than updateTodo
    }),

    on(TodoActions.updateTodo, (existingState, { id, text }) => {
      return {
        ...existingState,
        todos: existingState.todos.map(todo =>
          todo.id === id ? { ...todo, text } : todo
        ),
      };
    }),

    on(TodoActions.toggleComplete, (existingState, { id }) => {
      return {
        ...existingState,
        todos: existingState.todos.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    }),

    on(TodoActions.changeFilterMode, (existingState, { mode }) => ({
      ...existingState,
      filterMode: mode,
    })),

    on(TodoActions.clearCompleted, existingState => ({
      ...existingState,
      todos: [...existingState.todos.filter(todo => !todo.completed)],
    })),

    on(TodoActions.toggleAllCompleted, existingState => {
      const newCompletedValue = existingState.todos.some(({ completed }) => {
        return !completed;
      });
      return {
        ...existingState,
        todos: existingState.todos.map(todo => ({
          ...todo,
          completed: newCompletedValue,
        })),
      };
    })
  )(state, action);
}

export const filterMode = (state: ITodosState) => state.filterMode;
export const todos = (state: ITodosState) => state.todos;
