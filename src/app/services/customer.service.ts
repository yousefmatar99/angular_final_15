import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends DataService {

  customersSubject = new BehaviorSubject<Customer[]>([]);

  constructor(protected override http: HttpClient) {
    super(http);
  }

  fetchCustomers(): void {
    this.http.post<any[]>(`${this.baseUrl}/getAllCustomers`,{}).subscribe(
      (data) => {
        this.customersSubject.next(data);
      }
    )
  }
}
