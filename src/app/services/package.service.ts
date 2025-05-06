import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Package } from '../models/package.model';
import { ServiceModel } from '../models/service-model.model';

@Injectable({
  providedIn: 'root'
})
export class PackageService extends DataService {

  packagesSubject = new BehaviorSubject<Package[]>([]);
  servicesSubject = new BehaviorSubject<ServiceModel[]>([]);

  constructor(protected override http: HttpClient) {
      super(http);
  }

  fetchPackages(partnerId: string): void {
    this.http.post<any>(`${this.baseUrl}/getPartnerPackages?partnerId=${partnerId}`, {}).subscribe(
      (data) => {
        this.packagesSubject.next(data);
      }
    )
  }

  addPackage(partnerId: string, pkg: Package): void {
    const body_data = pkg.toJson();
    this.http.post<any>(`${this.baseUrl}/addPartnerPackage?partnerId=${partnerId}`, body_data).subscribe(
      (data) => {
        this.packagesSubject.next(data);
        this.fetchPackages(partnerId);
      }
    )
  }

  getServicesByRegion(region: any): void {
    this.http.post<any>(`${this.baseUrl}/store/services/get`, region).subscribe(
      (data) => {
        this.servicesSubject.next(data);
      }
    )
  }

  deletePkg(pkgId: string, partnerId: string): void {
    const url = `${this.baseUrl}/removePartnerPackage`;
    const params = new HttpParams()
      .set('partnerId', partnerId)
      .set('packageId', pkgId);
  
    this.http.post<any>(url, {}, { headers: this.getAuthHeaders(), params }).subscribe({
      next: () => {
        // Ideally, backend would return success, but we handle it anyway
        this.fetchPackages(partnerId);
      },
      error: (err) => {
        const knownError =
          err.status === 400 &&
          typeof err.error?.message === 'string' &&
          err.error.message.includes('Map1 cannot be cast to class com.r_labs.wosh.entities.Partner');
  
        if (knownError) {
          console.warn('Package deletion succeeded but backend threw a known error. Proceeding.');
          this.fetchPackages(partnerId);
        } else {
          console.error('Unexpected error while deleting package:', err);
          alert('Failed to delete package. Please try again later.');
        }
      }
    });
  }
  
  

}
