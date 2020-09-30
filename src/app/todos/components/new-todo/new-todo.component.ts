import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as TodoActions from '../../state/todo.actions';
import { FormsModule } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-new-todo',
  styleUrls: ['./new-todo.component.scss'],
  templateUrl: './new-todo.component.html',
})
export class NewTodoComponent {
  todos$: Observable<any>;
  newTodo: string = '';
  constructor(private store: Store<{ todos: any }>) {
    this.todos$ = store.select('todos');
  }
  onSubmit() {
    this.store.dispatch(TodoActions.addTodo({ text: this.newTodo }));
    this.newTodo = '';
  }
}
