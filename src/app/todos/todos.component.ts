import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  users: User[] = [];
  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.userService.getUsers();
    this.userService.usersChanged.subscribe((users) => {
        this.users = users;
      });
    const loggedInUser = this.userService.getLoggedInUserInfo();
  }
}
