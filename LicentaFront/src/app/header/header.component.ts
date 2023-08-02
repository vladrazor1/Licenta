import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  
  constructor(
    private sharedService:UserService
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
}
