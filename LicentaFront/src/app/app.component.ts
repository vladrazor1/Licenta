import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  myScriptElement: HTMLScriptElement | undefined;
  title = 'LicentaFront';

  constructor(public userService: UserService) {}
}
