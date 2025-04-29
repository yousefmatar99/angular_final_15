import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    let editedReq = req;
    if (token != undefined) {
      editedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    }
    return next.handle(editedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        let message: string = '';
        switch (error.status) {
          case 400:
            message = "Bad Request. Please check your input.";
            alert(message);
            break;
        
          case 401:
            message = "Unauthorized user, please log in.";
            alert(message);
            this.router.navigate(['/login']);
            break;
        
          case 403:
            message = "Access denied. You don't have permission to view this resource.";
            alert(message);
            break;
        
          case 404:
            message = "Resource not found. The requested item doesn't exist.";
            alert(message);
            this.router.navigate(['/login']);
            break;
        
          case 422:
            message = "Validation error. Please check the form for mistakes.";
            alert(message);
            break;
        
          case 429:
            message = "Too many requests. Please slow down.";
            alert(message);
            break;
        
          case 500:
            message = "Server error. Please try again later.";
            alert(message);
            break;
        
          case 502:
            message = "Bad Gateway. Please try again soon.";
            alert(message);
            break;
        
          case 503:
            message = "Service temporarily unavailable. Please try again later.";
            alert(message);
            break;
        
          case 504:
            message = "Server timeout. Please try again later.";
            alert(message);
            break;
        
          default:
            message = "An unexpected error occurred. Please try again.";
            alert(message);
            break;
        }
        
        return throwError(() => new Error(message));
      })
    );
  }
}
