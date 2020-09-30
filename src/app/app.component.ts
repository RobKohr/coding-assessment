import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FILTER_MODES } from './todos/constants/filter-modes';
import * as TodoActions from './todos/state/todo.actions';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  todos$: Observable<any>;
  newTodo: string = '';
  filterModes: ['All', 'Active', 'Completed'];
  filterMode: 'All';
  todoCount: number = 0;
  constructor(private store: Store<{ todos: any }>) {
    this.filterModes = ['All', 'Active', 'Completed'];
    this.todos$ = store.select('todos');
    const component = this;
    this.todos$.subscribe({
      next(state) {
        component.filterMode = state.filterMode ? state.filterMode : 'All';
        component.todoCount = state?.todos?.length ? state.todos.length : 0;
      },
    });
  }
  setFilterMode(mode: FILTER_MODES) {
    this.store.dispatch(TodoActions.changeFilterMode({ mode }));
  }
  clearCompleted() {
    this.store.dispatch(TodoActions.clearCompleted());
  }
  onSubmit() {
    this.store.dispatch(TodoActions.addTodo({ text: this.newTodo }));
    this.newTodo = '';
  }
}
