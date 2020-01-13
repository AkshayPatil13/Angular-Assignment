import { Component, OnInit, DoCheck, Output, EventEmitter } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/models/todo.model';
import { Router } from '@angular/router';

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
  filterString: string = '';
  @Output() passTodoId = new EventEmitter<string>();

  constructor(private todoService: TodoService,
              private route: Router) { }

  ngOnInit() { }

  ngDoCheck() {
    this.todoService.todosChanged.subscribe((todos: Todo[]) => {
      this.todos = todos;
    });
    this.todos = this.todoService.getTodos();
  }

  navigateToAddTodo(){
    this.route.navigate(['/todos/new']);
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

  onEditTodo() {
    
    if(this.selectedTodos.length == 0){
      alert("Please select a Todo Item to edit..!!");
    }
    else if (this.selectedTodos.length > 1){
      alert("Only one Todo item can be edited at once..!!");
    }
    else{
      this.passTodoId.emit(this.selectedTodos[0]);
      this.selectedTodos = [];
    }
  }

  onDeleteTodo() {
    if(this.selectedTodos.length == 0){
      alert("Please select a Todo Item to delete..!!");
    }
    this.todoService.deleteTodos(this.selectedTodos);
    this.selectedTodos = [];

  }

  onStatusChange() {
    if(this.selectedTodos.length == 0){
      alert("Please select a Todo Item to update its Status..!!");
    }
    this.todoService.updateToDoStatus(this.selectedTodos);
    this.selectedTodos = [];
    this.RemoveChecks();
  }

  showAllTodos(){
    document.getElementById('filterByStatus').style.display = "none";
    document.getElementById('filterByCategories').style.display = "none"; 
    document.getElementById('filterByDate').style.display = "none";
    this.route.navigate(['../']);


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
