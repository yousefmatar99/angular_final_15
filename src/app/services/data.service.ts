import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl: string = "/api/administrator"

  constructor(protected http: HttpClient) { }

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  updateSuspensionStatus(id: string, suspended: boolean): Observable<any> {
    const url = `${this.baseUrl}/suspendUser`;
    const params = new HttpParams().set('userId', id).set('isSuspended', suspended.toString());
    return this.http.post<any>(url, {}, {headers: this.getAuthHeaders(), params: params});
  }

  approveUser(id: string, approved: boolean): Observable<any> {
    const url = `${this.baseUrl}/approveUser`;
    const params = new HttpParams().set('userId', id).set('isApproved', approved.toString());
    return this.http.post<any>(url, {}, {headers: this.getAuthHeaders(), params: params});
  }
   
}
