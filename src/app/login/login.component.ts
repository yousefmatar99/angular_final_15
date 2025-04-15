import { Component } from '@angular/core';
import { LoggerService } from '../services/logger.service';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
