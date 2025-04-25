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

  // baseUrl: string = "https://api.wosh.co.il/api/administrator"
  baseUrl: string = "/api/administrator"

  // Behavioral Subjects
  customersSubject = new BehaviorSubject<Customer[]>([]);
  partnersSubject = new BehaviorSubject<Partner[]>([]);
  reservationsSubject = new BehaviorSubject<Reservation[]>([]);
  packagesSubject = new BehaviorSubject<Package[]>([]);
  statisticsSubject = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) { }

  fetchCustomers(): void {
    this.http.post<any[]>(`${this.baseUrl}/getAllCustomers`,{}).subscribe(
      (data) => {
        this.customersSubject.next(data);
      }
    )
  }

  fetchReservations(): void {
    this.http.post<any[]>(`${this.baseUrl}/getAllReservations`,{}).subscribe(
      (data) => {
        this.reservationsSubject.next(data);
      }
    )
  }

  fetchStatistics(): void {
    console.log(localStorage.getItem('token'));
    this.http.post<any[]>(`${this.baseUrl}/statistics/systemStatistics`, {}).subscribe(
      (data) => {
        this.statisticsSubject.next(data);
      }
    )
  }

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  updateSuspensionStatus(customerId: string, suspend: boolean): Observable<any> {
    //const url = `${this.baseUrl}/suspendUser?userId=${customerId}&isSuspended=${suspend}`;
    const url = `${this.baseUrl}/suspendUser`;
    console.log(url);
    const params = new HttpParams().set('userId', customerId).set('isSuspended', suspend.toString());
    return this.http.post<any>(url, {}, {headers: this.getAuthHeaders(), params: params});
  }
   
}
