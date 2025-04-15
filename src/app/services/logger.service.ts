import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private isAuthenticated = false;
  url = "https://api.wosh.co.il/api/authorization/administrator/login"

  constructor(private router: Router, private http: HttpClient){} // , 
  login(email: string, password: string) {
    console.log("shghal")

    this.http.post(this.url, {username: email, password: password}).subscribe(
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
