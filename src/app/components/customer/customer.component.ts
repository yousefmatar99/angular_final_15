import { Component } from '@angular/core';
import { Customer } from '../../models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {
  customers: Array<Customer> = [];

  sortAsc: boolean = true;

  constructor(private dataService: CustomerService) {}

  searchTerm: string = '';
  filterStatus: string = 'all';
  sortOrder: string = 'nameAsc';
  filteredCustomers: Customer[] = [];

ngOnInit() {
  this.dataService.fetchCustomers();
  this.dataService.customersSubject.subscribe(data => {
    this.customers = data.map(Customer.fromJson);
    this.applyFilters();
  });
}

applyFilters() {
  let result = [...this.customers];

    // Search
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(c =>
        c.displayName.toLowerCase().includes(term) ||
        c.email.toLowerCase().includes(term)
      );
    }

    // Filter
    if (this.filterStatus === 'suspended') {
      result = result.filter(c => c.isSuspended);
    } else if (this.filterStatus === 'active') {
      result = result.filter(c => !c.isSuspended);
    }

    // Sort
    switch (this.sortOrder) {
      case 'nameAsc':
        result.sort((a, b) => a.displayName.localeCompare(b.displayName));
        break;
      case 'nameDesc':
        result.sort((a, b) => b.displayName.localeCompare(a.displayName));
        break;
      case 'emailAsc':
        result.sort((a, b) => a.email.localeCompare(b.email));
        break;
      case 'emailDesc':
        result.sort((a, b) => b.email.localeCompare(a.email));
        break;
    }

    this.filteredCustomers = result;
  }

  toggleSuspension(customer: Customer) {
  const newStatus = !customer.isSuspended;

  this.dataService.updateSuspensionStatus(customer.id, newStatus).subscribe({
    next: () => {
      customer.isSuspended = newStatus;
      this.dataService.fetchCustomers();
      this.applyFilters();
    },
    error: (err) => {
      alert('Something went wrong while updating suspension status.');
    }
    
  });
}

}