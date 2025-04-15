import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(private loggerService: LoggerService, private router: Router) {}

  canActivate(): boolean {
    if (!this.loggerService.isLoggedIn()) {
      this.router.navigate(['/login']); 
      return false;
    }
    return true; 
  }
}
