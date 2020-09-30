import { initialState, ITodosState, todosReducer } from './todos.reducer';
import { ITodo } from './../interfaces';
import * as TodoActions from './todo.actions';

import { clone } from '@app/lib/utils';

describe('Todos Reducer', () => {
  let state: ITodosState;

  beforeEach(() => {
    state = clone(initialState);
    expect(state).toEqual(initialState);
  });

  describe('Add Todo', () => {
    it('Should add a new Todo', () => {
      const text = 'New todo';
      const newState = todosReducer(state, TodoActions.addTodo({ text }));
      expect(newState.todos[0].text).toEqual(text);
    });
  });

  describe('Remove Todo', () => {
    it('should remove a Todo', () => {
      const text = 'Todo 1';
      let newState: ITodosState;
      newState = todosReducer(state, TodoActions.addTodo({ text }));
      newState = todosReducer(
        newState,
        TodoActions.addTodo({ text: 'Todo 2' })
      );
      expect(newState.todos[0].text).toEqual('Todo 2');
      newState = todosReducer(
        newState,
        TodoActions.removeTodo({ id: newState.todos[0].id })
      );
      expect(newState.todos[0].text).toEqual('Todo 1');
      expect(newState.todos[1]).not.toBeDefined();
    });
  });

  describe('Update Todo', () => {
    it('should update a Todo', () => {
      const text = 'Todo 1';
      let newState: ITodosState;
      newState = todosReducer(state, TodoActions.addTodo({ text }));
      newState.todos[0].id;
      newState = todosReducer(
        newState,
        TodoActions.updateTodo({ id: newState.todos[0].id, text: 'Excellent!' })
      );
      expect(newState.todos[0].text).toEqual('Excellent!');
    });
  });

  describe('Complete task, and clear completed', () => {
    it('should should complete and clear completed', () => {
      const text = 'Todo 1';
      let newState: ITodosState;
      newState = todosReducer(state, TodoActions.addTodo({ text }));
      newState.todos[0].id;
      newState = todosReducer(
        newState,
        TodoActions.toggleComplete({ id: newState.todos[0].id })
      );
      expect(newState.todos[0].completed).toEqual(true);
      newState = todosReducer(
        newState,
        TodoActions.addTodo({ text: 'something else' })
      );
      expect(newState.todos.length).toEqual(2);

      newState = todosReducer(newState, TodoActions.clearCompleted());
      expect(newState.todos.length).toEqual(1);

      expect(newState.todos[0].text).toEqual('something else');
    });
  });
});
