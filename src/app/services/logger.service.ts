import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private isAuthenticated = false;
  url = "/api/authorization/administrator/login"

  constructor(private router: Router, private http: HttpClient){}
  
  login(email: string, password: string) {
    const params = {
      username: email, password: password
    }

    this.http.post(this.url+"?username=admin@wosh.co.il&password=admin@wosh", {}).subscribe(
      (data: any) => {
        this.isAuthenticated = true;
        localStorage.setItem("token", data.token);
        this.router.navigate(['/dashboard']);
      }
    )
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
