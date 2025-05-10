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
  services: ServiceModel[] = [];
  selectedServiceId: string = '';

  showAllRegions = false;
  showAddForm = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private partnerService: PartnerService,
    private packageService: PackageService
  ) {}

  ngOnInit() {
    this.partnerId = this.route.snapshot.paramMap.get('id') || '';

    this.partnerService.partnersSubject.subscribe(partners => {
      this.partner = partners.find(p => p.id === this.partnerId) ?? null;
    });

    this.partnerService.fetchExtraDetails(this.partnerId);
    this.partnerService.currPartnerEDSubject.subscribe(data => {
      if (data) {
        this.extraDetails = ExtraDetails.fromJson(data);
      }
      this.packageService.fetchPackages(this.partnerId);
      this.packageService.packagesSubject.subscribe(pkgs => {
        this.packages = pkgs.map(Package.fromJson);
      });
      this.packageService.servicesSubject.subscribe(svcs => {
        this.services = svcs.map(ServiceModel.fromJson);
      });
    });
  }

  toggleShowAllRegions(): void {
    this.showAllRegions = !this.showAllRegions;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const v = form.value;
    const regions = Array.isArray(this.extraDetails.regionData)
      ? this.extraDetails.regionData
      : [];

    const newPackage = new Package(
      '',
      parseFloat(v.vat) || 0,
      v.country || '',
      v.countryCode || '',
      v.city || '',
      v.packageName || '',
      v.currency || '',
      v.active || false,
      v.duration || '',
      v.packageDescription || '',
      v.privateCars || '',
      v.vansOrSimilar || '',
      v.suvs || '',
      v.caravans || '',
      [],
      [],
      regions,
      {},
      []
    );

    this.packageService.addPackage(this.partnerId, newPackage);
    this.showAddForm = false;
    form.reset();
  }

  goBack(): void {
    this.router.navigate(['/dashboard/partners']);
  }

  deletePackage(pkgId: string): void {
    this.packageService.deletePkg(pkgId, this.partnerId);
  }

  defaultPhoto: string = 'assets/default_pic.png';

  setDefaultImage(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.defaultPhoto;
  }
}
