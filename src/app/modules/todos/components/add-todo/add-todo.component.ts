import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoService } from 'src/app/modules/todos/services/todo.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit, OnDestroy{
 editMode: boolean = false;
 todoForm: FormGroup;
 todoId: string = '';
 routeSubscription: Subscription;

 constructor(private todoService: TodoService,
             private router: Router,
             private route: ActivatedRoute
            ) { }

  ngOnInit() {
    this.routeSubscription= this.route.params.subscribe((params: Params) => {
      this.todoId = params['id'];
      this.editMode =  params['id'] != null;
    });
    this.initForm();
  }
 
  initForm(){
    let title = null;
    let startDate = null;
    let dueDate = null;
    let isPublic = null;
    let category = null;
    let description = null;

    if(this.editMode){
      let todo = this.todoService.getTodoItem(this.todoId);
      if(todo != null){
        title = todo.title;
        startDate = todo.startDate;
        dueDate = todo.dueDate;
        isPublic = todo.isPublic;
        category = todo.category;
        description = todo.description;
      }
      else{
        this.editMode = false;
        this.router.navigate(['/todos/new']);
      }
      
    }

    this.todoForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'startDate': new FormControl(startDate, Validators.required),
      'dueDate': new FormControl(dueDate, Validators.required),
      'isPublic': new FormControl(isPublic),
      'category': new FormControl(category),
      'description': new FormControl(description)
    })

  }
  onSubmit() {
    let allowInsertion = this.validateTodoData();
    if (allowInsertion == true) {
      document.getElementById('formError').innerHTML = '';
      this.todoForm.value.isPublic = this.todoForm.value.isPublic === true ? 'Private' : 'Public';
      this.todoForm.value.description = this.todoForm.value.description == null ? 'NA' : this.todoForm.value.description;

      if(this.editMode){
        this.todoService.updateTodo(this.todoId, {...this.todoForm.value,isPublic: this.todoForm.value.isPublic,description: this.todoForm.value.description});
      }
      else{
        this.todoService.addTodo({ ...this.todoForm.value, isPublic: this.todoForm.value.isPublic,description: this.todoForm.value.description});
      }
      this.todoForm.reset();
      this.router.navigate(['/todos/todo-list']);
    }
  }

  validateTodoData() {
    let tempStartDate = new Date(this.todoForm.value.startDate);
    let tempDueDate = new Date(this.todoForm.value.dueDate);

    if (tempStartDate.getTime() > tempDueDate.getTime()) {
      document.getElementById('formError').innerHTML = "ERROR: Due date should come after the start date..!!";
      window.scroll({ 
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
      });
      return false;
    }
    else if ((this.todoForm.value.title).trim() == "") {
      document.getElementById('formError').innerHTML = "ERROR: Please enter Title for ToDo Item..!!";
      window.scroll({ 
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
      });
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
  
  ngOnDestroy(){
    this.routeSubscription.unsubscribe();
  }
}
