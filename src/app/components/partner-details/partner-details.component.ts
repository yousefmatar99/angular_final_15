import { Component } from '@angular/core';
import { Partner } from 'src/app/models/partner.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PartnerService } from 'src/app/services/partner.service';
import { ExtraDetails } from 'src/app/models/extra-details.model';
import { PackageService } from 'src/app/services/package.service';
import { Package } from 'src/app/models/package.model';
import { ServiceModel } from 'src/app/models/service-model.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-partner-details',
  templateUrl: './partner-details.component.html',
  styleUrls: ['./partner-details.component.css']
})
export class PartnerDetailsComponent {
  partnerId: string = '';
  partner: Partner | null = null;
  extraDetails: ExtraDetails = new ExtraDetails();
  packages: Package[] = [];
  selectedRegion: any = null;
  services: ServiceModel[] = [];
  selectedServiceId: string = '';


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private partnerService: PartnerService,
    private packageService: PackageService
  ) {}

  ngOnInit() {
    this.partnerId = this.route.snapshot.paramMap.get('id') || '';

    this.partnerService.partnersSubject.subscribe(partners => {
      const match = partners.find(p => p.id === this.partnerId);
      this.partner = match ?? null;
    });

    this.partnerService.fetchExtraDetails(this.partnerId);
    this.partnerService.currPartnerEDSubject.subscribe(data => {
      if (data) {
        this.extraDetails = ExtraDetails.fromJson(data);
      }
      this.packageService.fetchPackages(this.partnerId);
      this.packageService.packagesSubject.subscribe(data => {
        this.packages = data.map(Package.fromJson);
      });
      this.packageService.servicesSubject.subscribe((data) => {
        this.services = data.map(ServiceModel.fromJson);
      });
    });

  }

    showAddForm = false;

    onSubmit(form: NgForm) {
      if (form.valid) {
        const value = form.value;

        const newPackage = new Package(
          this.generateUUID(), // generate ID
          parseFloat(value.vat) || 0,
          value.country || '',
          value.countryCode || '',
          value.city || '',
          value.packageName || '',
          value.currency || '',
          value.active || false,
          value.duration || '',
          value.packageDescription || '',
          value.privateCars || '',
          value.vansOrSimilar || '',
          value.suvs || '',
          value.caravans || '',
          [], // service
          [], // stock
          this.selectedRegion ? [this.selectedRegion] : [], // region
          {}, // price
          [] // questions
        );

        this.packageService.addPackage(this.partnerId, newPackage);
        this.showAddForm = false;
        form.reset();
      }
    }

  generateUUID(): string {
    // Basic UUID generator (for demo)
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  onRegionChange(region: any): void {
    this.selectedRegion = region;
    this.packageService.getServicesByRegion(region);
  }
  


  addPackage(pkg: Package) {
    this.packageService.addPackage(this.partnerId, pkg);
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
