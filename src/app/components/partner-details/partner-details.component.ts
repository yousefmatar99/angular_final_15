import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Partner } from 'src/app/models/partner.model';
import { ExtraDetails } from 'src/app/models/extra-details.model';
import { Region } from 'src/app/models/region.model';
import { Package } from 'src/app/models/package.model';
import { ServiceModel } from 'src/app/models/service-model.model';
import { PartnerService } from 'src/app/services/partner.service';
import { PackageService } from 'src/app/services/package.service';

@Component({
  selector: 'app-partner-details',
  templateUrl: './partner-details.component.html',
  styleUrls: ['./partner-details.component.css']
})
export class PartnerDetailsComponent implements OnInit {
  partnerId: string = '';
  partner: Partner | null = null;
  extraDetails: ExtraDetails = new ExtraDetails('', []);
  packages: Package[] = [];

  selectedRegion: Region | null = null;
  services: ServiceModel[] = [];
  selectedService: ServiceModel | null = null;

  showAllRegions = false;
  showAddForm = false;
  defaultPhoto: string = 'assets/default_pic.png';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private partnerService: PartnerService,
    private packageService: PackageService
  ) {}

  ngOnInit(): void {
    this.partnerId = this.route.snapshot.paramMap.get('id') || '';
    this.partnerService.partnersSubject.subscribe(ps =>
      this.partner = ps.find(p => p.id === this.partnerId) ?? null
    );

    this.partnerService.fetchExtraDetails(this.partnerId);
    this.partnerService.currPartnerEDSubject.subscribe(ed => {
      if (ed) {
        this.extraDetails = ExtraDetails.fromJson(ed);
      }
      this.packageService.fetchPackages(this.partnerId);
    });

    this.packageService.packagesSubject.subscribe(pkgs =>
      this.packages = pkgs.map(Package.fromJson)
    );
    this.packageService.servicesSubject.subscribe(list =>
      (this.services = list)
    );
  }

  toggleShowAllRegions(): void {
    this.showAllRegions = !this.showAllRegions;
  }

  onRegionChange(region: Region): void {
    this.selectedRegion = region;
    this.selectedService = null;
    this.packageService.getServicesByRegion(region);
  }

  onSubmit(form: NgForm) {
    if (!form.valid || !this.selectedRegion || !this.selectedService) {
      return;
    }
    const v = form.value;

    const pkg = new Package(
      /*1*/  '', 
      /*2*/  +v.vat,
      /*3*/  this.selectedRegion.country,
      /*4*/  this.selectedRegion.countryCode,
      /*5*/  this.selectedRegion.city,
      /*6*/  v.packageName,
      /*7*/  v.currency,
      /*8*/  {
                duration:           v.duration,
                packageDescription: v.packageDescription,
                privateCars:        v.privateCars,
                vansOrSimilar:      v.vansOrSimilar,
                suvs:               v.suvs,
                caravans:           v.caravans,
                numberOfServices:   +v.numberOfServices
              },
      /*9*/  [ this.selectedService ],
      /*10*/ [],
      /*11*/ [],
      /*12*/ [ this.selectedRegion ],
      /*13*/ {},
      /*14*/ v.active ?? true
    );

    this.packageService.addPackage(this.partnerId, pkg);
    this.showAddForm = false;
    form.resetForm();
    this.selectedRegion = null;
    this.selectedService = null;
  }



  goBack(): void {
    this.router.navigate(['/dashboard/partners']);
  }

  deletePackage(pkgId: string): void {
    this.packageService.deletePkg(pkgId, this.partnerId);
  }

  setDefaultImage(event: Event): void {
    (event.target as HTMLImageElement).src = this.defaultPhoto;
  }
}
