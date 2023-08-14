import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../modules/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent {
  user: string | undefined;
  email: string | undefined;

  constructor(private userService: UserService, private route: Router) {}

  ngOnInit(): void {
    this.user = this.userService.getUsername();

    console.log(this.userService.getEmail());
    this.email = this.userService.getEmail();
  }

  getUsername() {
    return this.userService.getUsername();
  }

  isLoggedIn() {
    return this.userService.isLoggedIn();
  }
}
