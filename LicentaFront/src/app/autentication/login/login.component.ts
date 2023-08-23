import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of, tap, delay } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({});
  submitted = false;
  error = '';
  loading = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    if (this.userService.userValue) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.userService.user.subscribe((user) => {
      if (user) {
        alert('Log in successful !');
        this.router.navigate(['/home']);
      }
      this.loading = false;
    });
  }

  get username() {
    return this.loginForm.value.username;
  }
  get password() {
    return this.loginForm.value.password;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.error = '';
    this.loading = true;
    this.userService.login(this.username, this.password);
    this.router.navigate(['/home']);
  }
}
