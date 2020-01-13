import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: '[app-todo-item]',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() todoSelected = new EventEmitter<any>();
  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  multiTodoSelected(todoId: string){
    this.todoSelected.emit(todoId);
  }

  deleteTodo(todoId:string){
    this.todoService.deleteTodo(todoId);
  }
}
