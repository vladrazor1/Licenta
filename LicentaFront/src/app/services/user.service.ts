import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, map, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../modules/user';
import { API_URL_LOG } from '../constants';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  private jwtHelper: JwtHelperService;
  constructor(private http: HttpClient, private router: Router) {
    this.jwtHelper = new JwtHelperService();
    this.userSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('user')!)
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${API_URL_LOG}/login`, {
        username,
        password,
      })
      .subscribe((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        this.router.navigateByUrl('/home');
        of(1, 2, 3, 4, 5)
        .pipe(
          tap(val => console.log("Before " + val)),
          delay(1000)
        )
        location.reload();
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.userSubject.next(null);

    if (!localStorage.getItem('user')) {
      alert('Disconected!');
    }
    
    of(1, 2, 3, 4, 5)
    .pipe(
      tap(val => console.log("Before " + val)),
      delay(1000)
    )
    this.router.navigateByUrl('/home');
  }

  private getUserData(): any {
    return JSON.parse(localStorage.getItem('user')!);
  }

  private decodeToken(token: string): any {
    return this.jwtHelper.decodeToken(token);
  }

  getUsername(): string | undefined {
    const user = this.userValue;
    if (user) {
      return this.decodeToken(this.getUserData().token).Username;
    }
    return undefined;
  }

  getEmail(): string | undefined {
    const user = this.userValue;
    if (user) {
      return this.decodeToken(this.getUserData().token).Email;
    }
    return undefined;
  }

  getUserId() :number | undefined {
    const user = this.userValue;
    if (user) {
      return this.decodeToken(this.getUserData().token).UserId;
    }
    return undefined;
  }

  isLoggedIn(): boolean {
    const user = this.userValue;
    if (user) {
      return !this.jwtHelper.isTokenExpired(this.getUserData().token);
    }
    return false;
  }

  register(username: string, password: string, email: string) {
    return this.http
      .post<any>(`${API_URL_LOG}/register`, {
        username,
        password,
        email,
      })
      .subscribe((user) => {
        this.router.navigateByUrl('/home');
      });
  }


}
