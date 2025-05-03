import { Component, Input } from '@angular/core';
//import { ActivatedRoute } from '@angular/router';
import { Package } from 'src/app/models/package.model';
import { PackageService } from 'src/app/services/package.service';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent {
  @Input() partnerId: string = "";
  packages: Package[] = [];

  constructor(private dataService: PackageService) {}

  ngOnInit() {
    console.log('Partner ID received:', this.partnerId);
    this.dataService.fetchPackages(this.partnerId);
    this.dataService.packagesSubject.subscribe(
      (data) => {
        this.packages = data.map(Package.fromJson);
        console.log(this.packages);
      }
    );
  }

}
