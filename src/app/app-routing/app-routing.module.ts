import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';
import { ProfileComponent } from '../profile/profile.component';
import { TodosComponent } from '../todos/todos.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AuthGuard } from '../shared/auth.guard';
import { AddTodoComponent } from '../todos/add-todo/add-todo.component';
import { TodoListComponent } from '../todos/todo-list/todo-list.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent },
  { path: 'todos', canActivate: [AuthGuard], component: TodosComponent, children: [
    {path: 'new', component: AddTodoComponent},
    {path: 'todo-list', component: TodoListComponent},
    {path: 'todo/:id/edit', component: AddTodoComponent}
  ]},
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
