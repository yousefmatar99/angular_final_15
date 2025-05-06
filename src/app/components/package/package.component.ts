import { Component, Input } from '@angular/core';
import { Package } from 'src/app/models/package.model';
import { PackageService } from 'src/app/services/package.service';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent {
  @Input() packages: Package[] = [];
  @Input() partnerId: string = "";

  constructor(private dataService: PackageService){}

  deletePackage(pkgId: string, partnerId: string): void {
    this.dataService.deletePkg(pkgId, partnerId);
  }
}
