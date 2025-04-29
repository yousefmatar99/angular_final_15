import { Component } from '@angular/core';
import { Partner } from 'src/app/models/partner.model';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
  selector: 'app-partner-details',
  templateUrl: './partner-details.component.html',
  styleUrls: ['./partner-details.component.css']
})
export class PartnerDetailsComponent {

  partnerId: string = '';
  partner: Partner | null = null;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private dataService: PartnerService){}

  ngOnInit() {
    this.partnerId = this.route.snapshot.paramMap.get('id') || '';
    //this.dataService.fetchPartners();
    this.dataService.partnersSubject.subscribe(partners => {
      const match = partners.find(p => p.id === this.partnerId);
      this.partner = match ?? null;
    });
    console.log(this.partner);
  }
  
  goToExtraDetails(): void {
    this.router.navigate(['/partner-extra-details', this.partnerId]);
  }

  goBack(): void {
    this.router.navigate(['/dashboard/partners']);
  }

  defaultPhoto: string = 'assets/default_pic.png';

  setDefaultImage(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.defaultPhoto;
  }



}
