import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Partner } from '../models/partner.model';
import { ExtraDetails } from '../models/extra-details.model';

@Injectable({
  providedIn: 'root'
})
export class PartnerService extends DataService {

  partnersSubject = new BehaviorSubject<Partner[]>([]);
  currPartnerEDSubject = new BehaviorSubject<ExtraDetails | null>(null);
  regions =  new BehaviorSubject<any | null>(null);

  constructor(protected override http: HttpClient) {
      super(http);
  }

  fetchPartners(): void {
    this.http.post<any[]>(`${this.baseUrl}/getAllPartners`,{}).subscribe(
      (data) => {
        this.partnersSubject.next(data);
      }
    )
  }

  fetchExtraDetails(partnerId: string): void {
    this.http.post<any>(`${this.baseUrl}/getPartnerExtraDetails?partnerId=${partnerId}`,{}).subscribe(
      (data) => {
        this.currPartnerEDSubject.next(data);
      }
    )
  }

  fetchRegions(countryCode: string): void {
    console.log("countryCode: " + countryCode);
    this.http.post<any>(`${this.baseUrl}/regions/get?countryCode=${countryCode}`, {}).subscribe(
      (data) => {
        this.regions.next(data);
      }
    )
  }

}
