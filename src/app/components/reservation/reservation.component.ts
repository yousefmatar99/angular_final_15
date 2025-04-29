import { Component } from '@angular/core';
import { Reservation } from 'src/app/models/reservation.model';
import { DataService } from 'src/app/services/data.service';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
  reservations: Reservation[] = [];
  filteredReservations: Reservation[] = [];

  searchTerm: string = '';
  filterStatus: string = 'all';
  sortOrder: string = 'resNumAsc';

  constructor(private dataService: ReservationService) {}

  ngOnInit() {
    this.dataService.fetchReservations();
    this.dataService.reservationsSubject.subscribe(data => {
      this.reservations = data.map(Reservation.fromJson);
      this.applyFilters();
    });
  }

  applyFilters() {
    let result = [...this.reservations];

    // Search
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(r =>
        r.cName.toLowerCase().includes(term) ||
        r.pName.toLowerCase().includes(term) ||
        r.status.toLowerCase().includes(term) ||
        r.resNum.toString().includes(term)
      );
    }

    // Filter by status
    if (this.filterStatus !== 'all') {
      result = result.filter(r => r.status === this.filterStatus);
    }

    // Sort
    switch (this.sortOrder) {
      case 'resNumAsc':
        result.sort((a, b) => a.resNum - b.resNum);
        break;
      case 'resNumDesc':
        result.sort((a, b) => b.resNum - a.resNum);
        break;
      case 'cNameAsc':
        result.sort((a, b) => a.cName.localeCompare(b.cName));
        break;
      case 'cNameDesc':
        result.sort((a, b) => b.cName.localeCompare(a.cName));
        break;
      case 'pNameAsc':
        result.sort((a, b) => a.pName.localeCompare(b.pName));
        break;
      case 'pNameDesc':
        result.sort((a, b) => b.pName.localeCompare(a.pName));
        break;
    }

    this.filteredReservations = result;
  }
}
