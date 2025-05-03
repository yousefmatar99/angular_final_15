import { Component } from '@angular/core';
import { Partner } from 'src/app/models/partner.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PartnerService } from 'src/app/services/partner.service';
import { ExtraDetails } from 'src/app/models/extra-details.model';

@Component({
  selector: 'app-partner-details',
  templateUrl: './partner-details.component.html',
  styleUrls: ['./partner-details.component.css']
})
export class PartnerDetailsComponent {

  partnerId: string = '';
  partner: Partner | null = null;
  extraDetails: ExtraDetails = new ExtraDetails();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private dataService: PartnerService){}

  ngOnInit() {
    this.partnerId = this.route.snapshot.paramMap.get('id') || '';
    this.dataService.partnersSubject.subscribe(partners => {
      const match = partners.find(p => p.id === this.partnerId);
      this.partner = match ?? null;
    });
    this.dataService.fetchExtraDetails(this.partnerId);
    this.dataService.currPartnerEDSubject.subscribe(data => {
      if (data) {
        this.extraDetails = ExtraDetails.fromJson(data);
        // const countryCode = this.extraDetails?.regionData?.[0]?.countryCode;
        // if (countryCode) {
        //   this.dataService.fetchRegions(countryCode);
        //   console.log(this.dataService.regions);
        // }
        //this.dataService.fetchPackages(this.partnerId);
        //this.packages = data()
      }
    });
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
