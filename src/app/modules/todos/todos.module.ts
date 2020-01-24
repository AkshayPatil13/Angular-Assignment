import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoItemComponent } from './components/todo-list/todo-item/todo-item.component';
import { StatusPipePipe } from './filters/status-pipe.pipe';
import { DateFilterPipe } from './filters/date-filter.pipe';
import { CategoriesFilterPipe } from './filters/categories-filter.pipe';
import { TitleFilterPipe } from './filters/title-filter.pipe';
import { TodosComponent } from './todos.component';
import { RouterModule } from '@angular/router';
import { TodoRoutingModule } from './todo-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TodosComponent,
    AddTodoComponent,
    TodoListComponent,
    TodoItemComponent,
    StatusPipePipe,
    DateFilterPipe,
    CategoriesFilterPipe,
    TitleFilterPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TodoRoutingModule
  ]
})
export class TodosModule { }
