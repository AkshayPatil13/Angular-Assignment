import { Component, OnInit } from '@angular/core';
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
      'isPublic': new FormControl(null, Validators.required),
      'categories': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required)
    })
  }

  onSubmit(){
    this.todoService.addTodo(this.todoForm.value);
    let todolist = this.todoService.getTodos();
    console.log(todolist);
    this.todoForm.reset();
    // this.router.navigate(['/todo-list']);
    
  }

  

}
