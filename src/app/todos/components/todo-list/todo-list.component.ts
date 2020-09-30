import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ITodo } from '@app/todos/interfaces';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as TodoActions from '../../state/todo.actions';
@Component({
  selector: 'app-todos-list',
  styleUrls: ['./todo-list.component.scss'],
  templateUrl: './todo-list.component.html',
})
export class TodosListComponent {
  todos$: Observable<any>;
  displayedTodos: any[] = [1, 2, 3];
  c: any = 0;
  constructor(private store: Store<{ todos: any }>) {
    this.todos$ = store.select('todos');
    const component = this;
    this.todos$.subscribe({
      next(state) {
        const filterMode = state.filterMode ? state.filterMode : 'All';
        // do a stringify and parse (Basically a deep clone) so that we can make the model not read-only
        component.displayedTodos = JSON.parse(
          JSON.stringify([
            ...(state.todos ? state.todos : []).filter((todo: ITodo) => {
              if (filterMode === 'All') {
                return true;
              }
              return filterMode === 'Active' ? !todo.completed : todo.completed;
            }),
          ])
        );
      },
    });
  }

  toggleComplete(id: string) {
    this.store.dispatch(TodoActions.toggleComplete({ id }));
  }

  remove(id: string) {
    this.store.dispatch(TodoActions.removeTodo({ id }));
  }
  change(id: string, text: string) {
    this.store.dispatch(TodoActions.updateTodo({ id, text }));
  }
}
