import { Component,DoCheck} from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/models/todo.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements DoCheck {
  todos: Todo[] = [];
  selectedTodos: string[] = [];
  filterStatus: string = '';
  filterCategory: string = '';
  startDate: string = '';
  dueDate: string = '';
  filterString: string = '';

  constructor(private todoService: TodoService,
              private router: Router) { }

  ngDoCheck() {
    this.todoService.todosChanged.subscribe((todos: Todo[]) => {
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
    this.RemoveChecks();
  }

  onStatusChange() {
    this.todoService.updateToDoStatus(this.selectedTodos);
    this.selectedTodos = [];
    this.RemoveChecks();
  }

  showAllTodos(){
    document.getElementById('filterByStatus').style.display = "none";
    document.getElementById('filterByCategories').style.display = "none"; 
    document.getElementById('filterByDate').style.display = "none";
    this.router.navigate(['../']);
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

  showFurtherFilters(value) {
    switch(value){
      case 'select':
          this.showAllTodos();
          break;

      case 'Categories':
          this.setFilterValues("inline-block", "none", "none");
          break;

      case 'Status':
          this.setFilterValues("none", "inline-block", "none");
          break;
      
      case 'Date':
          this.setFilterValues("none", "none", "inline-block");
          break;
    }
  }

  setFilterValues(category, status, date) {
    document.getElementById('filterByCategories').style.display = category;
    document.getElementById('filterByStatus').style.display = status;
    document.getElementById('filterByDate').style.display = date;
  }
}
