import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
 editMode: boolean = false;
 todoForm: FormGroup;
 todoId: string = '';
 constructor(private todoService: TodoService,
             private router: Router,
             private route: ActivatedRoute
            ) {
                this.route.params.subscribe((params: Params) => {
                this.todoId = params['id'];
                this.editMode =  params['id'] != null;
                this.initForm();
                });
              }

  ngOnInit() {}
 
  initForm(){
    let title = null;
    let startDate = null;
    let dueDate = null;
    let isPublic = null;
    let category = null;
    let description = null;

    if(this.editMode){
      let todo = this.todoService.getTodoItem(this.todoId);
      title = todo.title;
      startDate = todo.startDate;
      dueDate = todo.dueDate;
      isPublic = todo.isPublic;
      category = todo.category;
      description = todo.description;
    }

    this.todoForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'startDate': new FormControl(startDate, Validators.required),
      'dueDate': new FormControl(dueDate, Validators.required),
      'isPublic': new FormControl(isPublic),
      'category': new FormControl(category, Validators.required),
      'description': new FormControl(description)
    })

  }
  onSubmit() {
    let allowInsertion = this.validateTodoData();
    if (allowInsertion == true) {
      document.getElementById('formError').innerHTML = '';
      this.todoForm.value.isPublic = this.todoForm.value.isPublic === true ? 'Public' : 'Private';

      if(this.editMode){
        this.todoService.updateTodo(this.todoId, {...this.todoForm.value,isPublic: this.todoForm.value.isPublic});
      }
      else{
        this.todoService.addTodo({ ...this.todoForm.value, isPublic: this.todoForm.value.isPublic });
      }
      this.todoForm.reset();
      this.router.navigate(['/todos/todo-list']);
    }
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
    // if ((this.todoForm.value.description).trim() == "") {
    //   document.getElementById('formError').innerHTML = "Please enter the description for ToDo Item..!!";
    //   return false;
    // }
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

  disablePreviousDates(elementId) {
    let dateInput = document.getElementById(elementId);
    const cur_date = new Date();
    const cur_month = cur_date.getMonth() > 9 ? cur_date.getMonth() + 1 : '0' + (cur_date.getMonth() + 1);
    const cur_day = cur_date.getDate() > 9 ? cur_date.getDate() : '0' + cur_date.getDate();
    const dateStr = cur_date.getFullYear() + '-' + cur_month + '-' + cur_day;
    dateInput.setAttribute('min', dateStr);
  }
  
}
