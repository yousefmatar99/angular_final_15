import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Package } from '../models/package.model';
import { ServiceModel } from '../models/service-model.model';
import { Question } from '../models/question.model';
import { Region } from '../models/region.model';

@Injectable({
  providedIn: 'root'
})
export class PackageService extends DataService {
  packagesSubject = new BehaviorSubject<Package[]>([]);
  servicesSubject = new BehaviorSubject<ServiceModel[]>([]);

  constructor(protected override http: HttpClient) {
    super(http);
  }

  updateQuestions(partnerId: string, packageId: string, questions: Question[]): Observable<string> {
    const url = `${this.baseUrl}/package/questions/update`;
    const params = new HttpParams()
      .set('partnerId', partnerId)
      .set('packageId', packageId);

    return this.http.post<string>(url, questions, {
      headers: this.getAuthHeaders(),
      params
    }).pipe(
      tap(() => this.fetchPackages(partnerId))
    );
  }

  fetchPackages(partnerId: string): void {
    this.http.post<any>(`${this.baseUrl}/getPartnerPackages?partnerId=${partnerId}`, {})
      .subscribe(data => this.packagesSubject.next(data));
  }

  addPackage(partnerId: string, pkg: Package): void {
    this.http.post<any>(`${this.baseUrl}/addPartnerPackage?partnerId=${partnerId}`, pkg.toJson())
      .subscribe(() => this.fetchPackages(partnerId));
  }

  getServicesByRegion(region: Region): void {
    const payload = [ region.toJson() ];
    this.http
      .post<any[]>(`${this.baseUrl}/store/services/get`, payload)
      .subscribe({
        next: rawList => {
          const models = Array.isArray(rawList)
            ? rawList.map(item => ServiceModel.fromJson(item))
            : [];
          this.servicesSubject.next(models);
        }
      });
  }

  deletePkg(pkgId: string, partnerId: string): void {
    const url = `${this.baseUrl}/removePartnerPackage`;
    const params = new HttpParams()
      .set('partnerId', partnerId)
      .set('packageId', pkgId);

    this.http.post<any>(url, null, { params })
      .subscribe(() => this.fetchPackages(partnerId));
  }
}