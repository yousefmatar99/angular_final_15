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
      //const headers = this.getAuthHeaders().set('Content-Type', 'text/plain');
  
    this.http.post<any>(
      url, null, { params: params }).subscribe({
        next: () => this.fetchPackages(partnerId),
        error: err => this.handleDeleteError(err, partnerId)
    });
  }

  private handleDeleteError(err: any, partnerId: string) {
    const raw = typeof err.error === 'string'
      ? err.error
      : err.error?.message;
  
    const knownError = err.status === 400
      && raw?.includes('Map1 cannot be cast to class com.r_labs.wosh.entities.Partner');
  
    if (knownError) {
      console.warn('Delete succeeded but back-end threw the known Map1→Partner error; refreshing list.');
      this.fetchPackages(partnerId);
    } else {
      console.error('Unexpected delete error:', err);
      alert('Failed to delete package. Please try again later.');
    }
  }
  
  
}
