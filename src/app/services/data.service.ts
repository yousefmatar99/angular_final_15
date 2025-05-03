import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Customer } from '../models/customer.model';
import { Partner } from '../models/partner.model';
import { Reservation } from '../models/reservation.model';
import { Package } from '../models/package.model';
import { Statistics } from '../models/statistics.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl: string = "/api/administrator"

  //packagesSubject = new BehaviorSubject<Package[]>([]);

  constructor(protected http: HttpClient) { }

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  updateSuspensionStatus(id: string, suspended: boolean): Observable<any> {
    //const url = `${this.baseUrl}/suspendUser?userId=${customerId}&isSuspended=${suspend}`;
    const url = `${this.baseUrl}/suspendUser`;
    //console.log(url);
    const params = new HttpParams().set('userId', id).set('isSuspended', suspended.toString());
    return this.http.post<any>(url, {}, {headers: this.getAuthHeaders(), params: params});
  }

  approveUser(id: string, approved: boolean): Observable<any> {
    const url = `${this.baseUrl}/approveUser`;
    const params = new HttpParams().set('userId', id).set('isApproved', approved.toString());
    return this.http.post<any>(url, {}, {headers: this.getAuthHeaders(), params: params});
  }
   
}
