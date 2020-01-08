import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  isEditMode: boolean = false;
  todoForm: FormGroup;
  constructor(private todoService: TodoService,
    private router: Router) { }

  ngOnInit() {
    this.todoForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'startDate': new FormControl(null, Validators.required),
      'dueDate': new FormControl(null, Validators.required),
      'isPublic': new FormControl(null),
      'categories': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required)
    })
  }

  validateTodoData() {
    let tempStartDate = new Date(this.todoForm.value.startDate);
    let tempDueDate = new Date(this.todoForm.value.dueDate);
    if (tempStartDate.getTime() > tempDueDate.getTime()) {
      document.getElementById('formError').innerHTML = "Due date should come after the start date..!!";
      return false;
    }
    if ((this.todoForm.value.title).trim() == "") {
      document.getElementById('formError').innerHTML = "Please enter Title for ToDo Item..!!";
      return false;
    }
    if ((this.todoForm.value.description).trim() == "") {
      document.getElementById('formError').innerHTML = "Please enter the description for ToDo Item..!!";
      return false;
    }
    if (this.todoForm.value.startDate == "") {
      document.getElementById('formError').innerHTML = "Please set the start date..!!";
      return false;
    }
    if (this.todoForm.value.dueDate == "") {
      document.getElementById('formError').innerHTML = "Please set the due date..!!";
      return false;
    }
    return true;
  }
  onSubmit() {
    let allowInsertion = this.validateTodoData();
    if (allowInsertion == true) {
      document.getElementById('formError').innerHTML = '';
      this.todoForm.value.isPublic = this.todoForm.value.isPublic === true ? 'Yes' : 'No';
      this.todoService.addTodo({ ...this.todoForm.value, isPublic: this.todoForm.value.isPublic });
      let todolist = this.todoService.getTodos();
      console.log(todolist);
      this.todoForm.reset();
    }
    // this.router.navigate(['/todo-list']);
  }



}
