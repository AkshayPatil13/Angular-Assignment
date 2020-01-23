import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  formError: any = false;
  isFetching: boolean = false;
  errorMessage: string = 'An error occurred!';
  buttonText: string = 'Log In';
  userCreated: boolean = false;
  userServiceSubscription: Subscription;

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.userCreated = this.userService.userRegistered;
    setTimeout(() => this.userCreated = false,3000);
    this.userService.checkLoggedInUser();
    this.userServiceSubscription = this.userService.userAuth.subscribe((userData) => {
      if (userData) {
        this.router.navigate(['/todos/todo-list']);
      }
    })
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    });
  }

  onLogin() {
    this.buttonText = 'Please wait..';
    this.isFetching = true;
    let loginUserSubscription = this.userService.loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe((responseData) => {
        this.formError = false;
        this.errorMessage = '';
        this.isFetching = false;
        this.router.navigate(['/todos/todo-list']);
      }, (errorMessage) => {
        this.buttonText = 'Log In';
        this.isFetching = false;
        this.formError = true;
        this.errorMessage = errorMessage
      });
    this.userServiceSubscription.add(loginUserSubscription);
  }

  ngOnDestroy(){
    this.userService.userRegistered = false;
    this.userServiceSubscription.unsubscribe();
  }
}
