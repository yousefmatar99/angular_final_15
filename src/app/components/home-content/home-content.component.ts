import { Component } from '@angular/core';
import { Statistics } from 'src/app/models/statistics.model';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent {
  data: Array<Statistics> = [];
  constructor(){
    this.data.push(new Statistics(1, 1, 1, 1, 1, 1));
    this.data.push(new Statistics(2, 2, 2, 2, 2, 2));
  }

}
