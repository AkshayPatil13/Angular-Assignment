import { Component, OnInit, DoCheck } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, DoCheck{
  todos: Todo[] = [];
  constructor(private todoService: TodoService) { }

  ngOnInit() { 
   
  }
  ngDoCheck(){
    this.todos = this.todoService.getTodos();
  }

}
