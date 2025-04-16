import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private dataService: DataService){}
  ngOnInit(){
    console.log("dashboard shghal")
    //this.dataService.fetchStatistics();
  }
}
