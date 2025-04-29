import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Partner } from '../../models/partner.model';
import { Router } from '@angular/router';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class PartnerComponent {
  partners: Array<Partner> = [];

  searchTerm: string = '';
  filterStatus: string = 'all';
  sortOrder: string = 'nameAsc';
  filteredPartners: Partner[] = [];

  constructor(private dataService: PartnerService, private router: Router) {}

  ngOnInit() {
    this.dataService.fetchPartners();
    this.dataService.partnersSubject.subscribe(data => {
      this.partners = data.map(Partner.fromJson);
      this.applyFilters();
      console.log(this.partners);
    });
  }

  applyFilters() {
    let result = [...this.partners];

    // Search
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.email.toLowerCase().includes(term) ||
        p.phoneNumber.toLowerCase().includes(term)
      );
    }

    // Filter
    switch (this.filterStatus) {
      case 'waiting':
        result = result.filter(p => !p.isApproved);
        break;
      case 'suspended':
        result = result.filter(p => p.isApproved && p.isSuspended);
        break;
      case 'active':
        result = result.filter(p => p.isApproved && !p.isSuspended);
        break;
    }

    // Sort
    switch (this.sortOrder) {
      case 'nameAsc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameDesc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'emailAsc':
        result.sort((a, b) => a.email.localeCompare(b.email));
        break;
      case 'emailDesc':
        result.sort((a, b) => b.email.localeCompare(a.email));
        break;
    }

    this.filteredPartners = result;
  }

  toggleSuspension(partner: Partner) {
    const newStatus = !partner.isSuspended;

    this.dataService.updateSuspensionStatus(partner.id, newStatus).subscribe({
      next: () => {
        partner.isSuspended = newStatus;
        this.dataService.fetchPartners();
        this.applyFilters();
      },
      error: (err) => {
        console.error('Failed to update suspension status:', err);
        console.log('Backend error message:', err?.error);
        alert('Something went wrong while updating suspension status.');
      }
    });
  }

  approveUser(partner: Partner) {
    const newApprovedStatus = !partner.isApproved;
    this.dataService.approveUser(partner.id, newApprovedStatus).subscribe({
      next: () => {
        partner.isApproved = newApprovedStatus;
        this.dataService.fetchPartners;
        this.applyFilters();
      },
      error: (err) => {
        console.error('Failed to update approval status:', err);
        console.log('Backend error message:', err?.error);
        alert('Something went wrong while updating approval status.');
      }
    })
  }

  
  goToInfo(partnerId: string) {
    this.router.navigate(['dashboard', 'partners', partnerId]);
  }

  defaultPhoto: string = 'assets/default_pic.png';

  setDefaultImage(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.defaultPhoto;
  }

}
