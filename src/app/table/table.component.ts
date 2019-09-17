import { Component, OnInit, Input } from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [DatePipe]
})
export class TableComponent implements OnInit {
@Input() response;
attr:string='temperature';
toggle='More'

chart = false;

  constructor( ) { }

  ngOnInit() { }

  toggleChart(index) {
    this.chart = !this.chart;
    this.toggle = this.toggle === 'More'?'Less':'More';
  }

  temp()
  {
    this.attr= 'temperature';
    
  }

  wind()
  {
    this.attr = 'windspeed';
  }

  humidity()
  {
    this.attr = 'humidity';
  }

}
