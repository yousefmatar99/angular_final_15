import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { BehaviorSubject } from 'rxjs';
import { Reservation } from '../models/reservation.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationService extends DataService {

  reservationsSubject = new BehaviorSubject<Reservation[]>([]);
  
  constructor(protected override http: HttpClient) {
    super(http);
  }

  fetchReservations(): void {
    this.http.post<any[]>(`${this.baseUrl}/getAllReservations`,{}).subscribe(
      (data) => {
        this.reservationsSubject.next(data);
      }
    )
  }
}
