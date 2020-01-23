import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit, OnDestroy{
  signupForm: FormGroup;
  imageUrl: any = '../../assets/images/Profile.png';
  formError: any = false;
  userCreated: boolean = false;
  isFetching: boolean = false;
  buttonText: string = 'Sign Up';
  userServiceSubscription: Subscription;

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.userService.checkLoggedInUser();
    this.userServiceSubscription = this.userService.userAuth.subscribe((userData) => {
      if (userData) {
        this.router.navigate(['/todos/todo-list']);
      }
    })

    this.signupForm = new FormGroup({
      'firstName': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'lastName': new FormControl(null, [Validators.required,Validators.minLength(3)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'gender': new FormControl(null, Validators.required),
      'address': new FormControl(null),
      'profileImage': new FormControl(null)
    })
  }

  UploadProfilePicture(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.imageUrl = reader.result;
      }
    }
  }

  onSignup() {
    this.buttonText = 'Please wait...';
    if (!this.signupForm.valid) {
      this.formError = true;
      return false;
    }
    this.isFetching = true;
    const newUser = new User(
      this.signupForm.value.email,
      this.signupForm.value.password,
      this.signupForm.value.firstName,
      this.signupForm.value.lastName,
      this.signupForm.value.address,
      this.signupForm.value.gender,
      this.imageUrl
    );

    let newUserSubscription = this.userService.addUser(newUser).subscribe((responseData) => {
        this.formError = false;
        this.userCreated = true;
        this.userService.userRegistered = this.userCreated;
        this.signupForm.reset();
        this.isFetching = false;
        this.router.navigate(['/login']);
      }, (error) => {
        this.buttonText = 'Sign Up';
        this.formError = error;
        this.isFetching = false;
        window.scroll({ 
          top: 0, 
          left: 0, 
          behavior: 'smooth' 
        });
      }
    );
    this.userServiceSubscription.add(newUserSubscription)
  }

  ngOnDestroy(){
    this.userServiceSubscription.unsubscribe();
  }

}
