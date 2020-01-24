import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from 'src/app/shared/auth.guard';


const todoRoutes: Routes = [
    {path: 'new', canActivate: [AuthGuard], component: AddTodoComponent},
    {path: 'todo-list', canActivate: [AuthGuard], component: TodoListComponent},
    {path: 'todo/:id/edit', canActivate: [AuthGuard], component: AddTodoComponent}
]
@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      RouterModule.forChild(todoRoutes)
    ],
    exports: [RouterModule]
})


export class TodoRoutingModule{}