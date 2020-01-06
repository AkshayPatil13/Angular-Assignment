import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  users: User[] = [];
  isFetching: boolean = false;
  formError: any = false;
  editProfile: FormGroup;
  imageUrl: any = '../../assets/images/Profile.png';
  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.userService.getUsers();
    this.userService.usersChanged.subscribe((users) => {
      this.isFetching = false;
      this.users = users;
    });
    const loggedInUser = this.userService.getLoggedInUserInfo();
    if (!loggedInUser) {
      this.router.navigate(['/login']);
    }

    let fistName = loggedInUser.firstName;
    let lastName = loggedInUser.lastName;
    let gender = loggedInUser.gender;
    let address = loggedInUser.address;
    this.imageUrl = loggedInUser.image;

    this.editProfile = new FormGroup({
      'firstName': new FormControl(fistName, Validators.required),
      'lastName': new FormControl(lastName, Validators.required),
      'gender': new FormControl(gender, Validators.required),
      'address': new FormControl(address, Validators.required),
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

  onEditProfile() {
    if (!this.editProfile.valid) {
      this.formError = true;
      return false;
    }

    this.isFetching = true;
    this.editProfile.value.profileImage = this.imageUrl;
    this.userService.updateUser(this.editProfile.value).subscribe((users) => {
      this.userService.usersChanged.next(users);
      this.isFetching = false;
      return this.router.navigate(['/todo-list']);
    });
  }

}
