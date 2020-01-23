import { Component,DoCheck, OnDestroy} from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/models/todo.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements DoCheck, OnDestroy{
  todos: Todo[] = [];
  selectedTodos: string[] = [];
  filterStatus: string = '';
  filterCategory: string = '';
  startDate: string = '';
  dueDate: string = '';
  filterString: string = '';
  todoSubscription: Subscription;
  optionValue: any;

  constructor(private todoService: TodoService,
              private router: Router) {
               }

  ngDoCheck() {
    this.todoSubscription = this.todoService.todosChanged.subscribe((todos: Todo[]) => {
      this.todos = todos;
    });
    this.todos = this.todoService.getTodos();
  }

  navigateToAddTodo(){
    this.router.navigate(['/todos/new']);
  }

  todoSelected(todoId: string) {
    let flag: boolean = false;
    for (let i = 0; i < this.selectedTodos.length; i++) {
      if (this.selectedTodos[i] === todoId) {
        flag = true;
        this.selectedTodos.splice(i, 1);
        break;
      }
    }
    if (flag === false) {
      this.selectedTodos.push(todoId);
    }
  }

  onDeleteTodo() {
    if(confirm("Are you sure you want to delete this item?")){
      this.todoService.deleteTodos(this.selectedTodos);
    }
    this.selectedTodos = [];
  }

  onStatusChange() {
    this.todoService.updateToDoStatus(this.selectedTodos);
    this.selectedTodos = [];
    this.RemoveChecks();
  }

  showAllTodos(value){
    if(value == 'selectAll'){
      this.router.navigate(['../']);
    }
  }

  checkConditions(){
    if(this.selectedTodos.length == 0){
      return true;
    }
    else{
      for(let selectedTodo of this.selectedTodos){
        for(let todo of this.todos){
          if((selectedTodo == todo.id) && (todo.status === 'Done'))
            return true;
        }
      }
    }
     return false;
  }

  RemoveChecks() {
    let checkbox: any = document.querySelectorAll('input[type=checkbox]');
    for (let i = 0; i < checkbox.length; i++) {
      checkbox[i].checked = false;
    }
  }

  ngOnDestroy(){
    this.todoSubscription.unsubscribe();
  }
}

