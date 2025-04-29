import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Partner } from '../models/partner.model';

@Injectable({
  providedIn: 'root'
})
export class PartnerService extends DataService {

  partnersSubject = new BehaviorSubject<Partner[]>([]);

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

}
