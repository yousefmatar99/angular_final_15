import { Component, OnInit } from '@angular/core';
import { Statistics } from 'src/app/models/statistics.model';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent implements OnInit {
  stat_data!: Statistics;

  primaryLabels = ['Customers', 'Partners', 'Cars'];
  reservationLabels = ['Total Reservations', 'Closed', 'Problematic'];

  primaryData = [0, 0];
  reservationData = [0, 0, 0];

  primaryPct = [0, 0];
  reservationPct = [0, 0, 0];

  constructor(private dataService: StatisticsService) {}

  ngOnInit(): void {
    this.dataService.fetchStatistics();
    this.dataService.statisticsSubject.subscribe(raw => {
      this.stat_data = Statistics.fromJson(raw);

      const c = this.stat_data.customersNum    || 0;
      const p = this.stat_data.partnersNum     || 0;
      const cars = this.stat_data.carsNum      || 0;
      const sumUsers = c + p || 1;

      this.primaryData = [c, p];
      this.primaryPct = [
        Math.round((c    / sumUsers) * 100),
        Math.round((p    / sumUsers) * 100)
      ];

      const tot    = this.stat_data.totalReservationsNum      || 0;
      const closed = this.stat_data.closedReservationsNum     || 0;
      const prob   = this.stat_data.problematicReservationsNum|| 0;
      const sumRes = tot + closed + prob || 1;

      this.reservationData = [tot, closed, prob];
      this.reservationPct = [
        Math.round((tot    / sumRes) * 100),
        Math.round((closed / sumRes) * 100),
        Math.round((prob   / sumRes) * 100)
      ];
    });
  }
}
