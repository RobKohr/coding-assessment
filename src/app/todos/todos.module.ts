import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { CompleteAllComponent } from './components/complete-all/complete-all.component';
import { TodosListComponent } from './components/todo-list/todo-list.component';
import { NewTodoComponent } from './components/new-todo/new-todo.component';
import { FiltersComponent } from './components/filters/filters.component';
import { TodosService } from './services/todos.service';
import { todosReducer } from './state/todos.reducer';

const DECLARATIONS = [
  CompleteAllComponent,
  TodosListComponent,
  NewTodoComponent,
  FiltersComponent,
];

@NgModule({
  declarations: [...DECLARATIONS],
  exports: [...DECLARATIONS],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('todos', todosReducer),
  ],
  providers: [TodosService],
})
export class TodosModule {}
