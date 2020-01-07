import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: Todo[] = [];
  todosChanged = new Subject<Todo[]>();

  generateId(){
    return '_' + Math.random().toString(36).substr(2, 9)
  }

  addTodo(newTodo: Todo){
    this.todos.push({...newTodo,status:'pending',id: this.generateId()});
    this.todosChanged.next(this.todos.slice());
  }

  getTodos(){
    return this.todos.slice();
  }
  constructor() { }
}
