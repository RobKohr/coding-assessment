import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as TodoActions from '../../state/todo.actions';
import { FILTER_MODES } from '../../constants/filter-modes';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-filters',
  styleUrls: ['./filters.component.scss'],
  templateUrl: './filters.component.html',
})
export class FiltersComponent {
  todos$: Observable<any>;
  newTodo: string = '';
  filterModes: ['All', 'Active', 'Completed'];
  filterMode: 'All';
  constructor(private store: Store<{ todos: any }>) {
    this.filterModes = ['All', 'Active', 'Completed'];
    this.todos$ = store.select('todos');
  }
  onSubmit() {
    this.store.dispatch(TodoActions.addTodo({ text: this.newTodo }));
    this.newTodo = '';
  }

  setFilterMode(mode: FILTER_MODES) {
    this.store.dispatch(TodoActions.changeFilterMode({ mode }));
  }
}
