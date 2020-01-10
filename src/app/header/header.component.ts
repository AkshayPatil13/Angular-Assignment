import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.userService.userAuth.subscribe(auth => {
      this.isAuthenticated = false;
      if (auth) {
        this.isAuthenticated = true;
      }
    })
  }

  onLogout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

}
