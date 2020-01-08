import { Component, OnInit, DoCheck } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/models/todo.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, DoCheck {
  todos: Todo[] = [];
  selectedTodos: string[] = [];
  filterStatus: string = '';
  filterCategory: string = '';
  startDate: string = '';
  dueDate: string = '';
  todosSubscription: Subscription;
  constructor(private todoService: TodoService) { }

  ngOnInit() {

  }
  ngDoCheck() {
    this.todoService.todosChanged.subscribe((todos: Todo[]) => {
      this.todos = todos;
    });
    this.todos = this.todoService.getTodos();
    // console.log(this.todos);
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

    console.log(this.selectedTodos);
  }

  onEditTodo() {

  }

  onDeleteTodo() {
    this.todoService.deleteTodos(this.selectedTodos);
    this.selectedTodos = [];

  }

  onStatusChange() {
    this.todoService.updateToDoStatus(this.selectedTodos);
    this.selectedTodos = [];
    this.RemoveChecks();
  }

  // showAllTodos(){
  //   document.getElementById('filterBy').selectedIndex = 0;
  //   document.getElementById('filterByStatus').selectedIndex = 0 ;
  //   document.getElementById('filterByCategories').selectedIndex = 0;
  //   document.getElementById('filterByStatus').style.display = "none";
  //   document.getElementById('filterByCategories').style.display = "none"; 
  //   document.getElementById('filterByDate').style.display = "none";
  // }

  RemoveChecks() {
    let checkbox: any = document.querySelectorAll('input[type=checkbox]');
    for (let i = 0; i < checkbox.length; i++) {
      checkbox[i].checked = false;
    }
    console.log(checkbox);
  }

  showFurtherFilters() {
    let filterType: any = document.getElementById('filterBy');
    let filterName: any = filterType.options[filterType.selectedIndex].value;

    if (filterName == "Categories") {
      this.setFilterValues("inline-block", "none", "none");
    }
    else if (filterName == "Status") {
      this.setFilterValues("none", "inline-block", "none");
    }
    else if (filterName == "Date") {
      this.setFilterValues("none", "none", "inline-block");
    }
  }

  setFilterValues(category, status, date) {
    document.getElementById('filterByCategories').style.display = category;
    document.getElementById('filterByStatus').style.display = status;
    document.getElementById('filterByDate').style.display = date;
  }
}
