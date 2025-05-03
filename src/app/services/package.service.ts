import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Package } from '../models/package.model';

@Injectable({
  providedIn: 'root'
})
export class PackageService extends DataService {

  packagesSubject = new BehaviorSubject<Package[]>([]);
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

}
