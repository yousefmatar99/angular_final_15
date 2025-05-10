import { Component } from '@angular/core';
import { LoggerService } from '../services/logger.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  password: string = "";
  username: string = "";
  constructor(private loggerService: LoggerService) {}
  onLogin(){
    this.loggerService.login(this.username, this.password);
  }
}
