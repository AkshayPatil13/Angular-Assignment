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
      const loggedInUser = this.userService.getLoggedInUserInfo();
      if (!loggedInUser) {
        this.router.navigate(['/login']);
      }
      this.imageUrl = loggedInUser.image;

      this.editProfile = new FormGroup({
        'firstName': new FormControl(loggedInUser.firstName, Validators.required),
        'lastName': new FormControl(loggedInUser.lastName, Validators.required),
        'gender': new FormControl(loggedInUser.gender, Validators.required),
        'address': new FormControl(loggedInUser.address, Validators.required),
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

    validateProfileData() {
      if ((this.editProfile.value.firstName).trim() == "" ||
        (this.editProfile.value.lastName).trim() == "" ||
        (this.editProfile.value.address).trim() == "" ||
        this.editProfile.value.gender == null) {
        alert('Please fill out all the Fields..!!');
        return false;
      }
      return true;
    }

    onEditProfile() {
      let allowEdit = this.validateProfileData();
      if (allowEdit == true) {
        this.isFetching = true;
        this.editProfile.value.profileImage = this.imageUrl;
        this.userService.updateUser(this.editProfile.value).subscribe((users) => {
          this.userService.usersChanged.next(users);
          this.isFetching = false;
          return this.router.navigate(['/todos/todo-list']);
        });
      }
    }
}
