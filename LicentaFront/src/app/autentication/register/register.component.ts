import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({});
  submitted = false;
  error = '';
  loading = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    if (this.userService.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(3)]],
    });

    // this.userService.user.subscribe((user) => {
    //   if (user) {
    //     alert('Account registration was successful !');
    //     this.router.navigate(['/home']);
    //   }
    //   this.loading = false;
    // });
  }

  get username() {
    return this.registerForm.value.username;
  }
  get password() {
    return this.registerForm.value.password;
  }
  get email() {
    return this.registerForm.value.email;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.error = '';
    this.loading = true;
    this.userService.register(this.username, this.password, this.email);
    alert('Account registration was successful !');
    this.router.navigate(['/home']);
  }
}
