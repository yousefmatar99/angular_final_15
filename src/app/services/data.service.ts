import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Customer } from '../models/customer.model';
import { Partner } from '../models/partner.model';
import { Reservation } from '../models/reservation.model';
import { Package } from '../models/package.model';
import { Statistics } from '../models/statistics.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl: string = "https://api.wosh.co.il/api/administrator"

  // Behavioral Subjects
  private customersSubject = new BehaviorSubject<Customer[]>([]);
  private partnersSubject = new BehaviorSubject<Partner[]>([]);
  private reservationsSubject = new BehaviorSubject<Reservation[]>([]);
  private packagesSubject = new BehaviorSubject<Package[]>([]);
  private statisticsSubject = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) { }

  fetchCustomers(): void {
    this.http.get<any[]>(`${this.baseUrl}/customers`)
      .pipe(map(data => data.map(item => Customer.fromJson(item))))
      .subscribe(customers => this.customersSubject.next(customers));
  }

  fetchStatistics(): void {
    this.http.get<any[]>(`${this.baseUrl}/statistics/systemStatistics`)
    .pipe(map(data => data.map(item => Statistics.fromJson(item))))
    .subscribe(statistics => this.statisticsSubject.next(statistics));
  }

}
