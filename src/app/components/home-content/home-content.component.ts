import { Component } from '@angular/core';
import { Statistics } from 'src/app/models/statistics.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent {
  stat_data: any;
  constructor(private dataService: DataService){}
  ngOnInit(){
    this.dataService.fetchStatistics();
    this.dataService.statisticsSubject.subscribe((data) => {
      console.log(data)
      this.stat_data = Statistics.fromJson(data);
    })
  }
}
