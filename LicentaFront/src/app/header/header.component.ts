import { Component, Output, EventEmitter } from '@angular/core';
import { UserService } from '../services/user.service';
import { HomeComponent } from '../home/home.component';
import { FormBuilder } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  searchValue = '';
  searchForm = this.fb.nonNullable.group({
    searchValue: '',
  });

  @Output() search = new EventEmitter<string>();
  
  constructor(
    private sharedService:UserService,
    private fb: FormBuilder,
    private route: Router,
    ) {}
  
    ngOnInit(): void {
    }


    getUsername2(){
      return this.sharedService.getUsername();
    }

    isLoggedIn2(){
      return this.sharedService.isLoggedIn();
    }

    logOut2(){
      this.sharedService.logout();
    }

    onSearchSubmit(): void{
      localStorage.setItem('searchValue',this.searchValue);
      window.location.reload();
      this.route.navigate(['/home']);
    }
}
