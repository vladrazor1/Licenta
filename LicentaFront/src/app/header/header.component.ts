import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { HomeComponent } from '../home/home.component';
import { FormBuilder } from '@angular/forms';

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
  
  constructor(
    private sharedService:UserService,
    // private sharedHomepageFunctions: HomeComponent,
    private fb: FormBuilder,
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

    // fatcheData(){
    //  this.sharedHomepageFunctions.fatcheData();
    // }

    // onSearchSubmit(): void{
    //   this.sharedHomepageFunctions.onSearchSubmit();
    // }
}
