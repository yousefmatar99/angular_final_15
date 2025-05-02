import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { BehaviorSubject } from 'rxjs';
import { Statistics } from '../models/statistics.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService extends DataService {

  statisticsSubject = new BehaviorSubject<Statistics[]>([]);
  
  constructor(protected override http: HttpClient) {
      super(http);
  }

  fetchStatistics(): void {
    //console.log(localStorage.getItem('token'));
    this.http.post<any[]>(`${this.baseUrl}/statistics/systemStatistics`, {}).subscribe(
      (data) => {
        this.statisticsSubject.next(data);
      }
    )
  }
}
