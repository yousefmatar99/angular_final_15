import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer',
  imports: [],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  customers: Array<Customer> = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.fetchCustomers();
  }

}
