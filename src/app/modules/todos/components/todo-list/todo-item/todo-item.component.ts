import { Component,Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/modules/todos/models/todo.model';
import { TodoService } from 'src/app/modules/todos/services/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: '[app-todo-item]',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent{
  @Input() todo: Todo;
  @Output() todoSelected = new EventEmitter<any>();
  constructor(private todoService: TodoService,
              private router: Router) { }

  multiTodoSelected(todoId: string){
    this.todoSelected.emit(todoId);
  }

  onEditTodo(todoId: string){
    this.router.navigate(['/todos/todo',todoId,'edit']);
  }

  onDeleteTodo(todoId:string){
    if(confirm("Are you sure you want to delete this item?")){
      this.todoService.deleteTodo(todoId);
    }
  }
}
