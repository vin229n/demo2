import { Component, OnInit,ViewChild, Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import { OnChanges, SimpleChanges, DoCheck } from '@angular/core';

import { ChartType, } from 'chart.js';
import { SingleDataSet, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

// export class ChartComponent implements OnInit  {
//   @Input() chartData:any;
//  @Input() attr:any='temperature';
//   // Pie
//   public pieChartOptions: ChartOptions = {
//     responsive: true,
//   };
//   public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
//   public pieChartData: SingleDataSet = [300, 500, 100];
//   public pieChartType: ChartType = 'pie';
//   public pieChartLegend = true;
//   public pieChartPlugins = [];

//   constructor() {
//     monkeyPatchChartJsTooltip();
//     monkeyPatchChartJsLegend();
//   }

//   ngOnInit() {
//   }
// }


export class ChartComponent implements OnInit {
@Input() chartData:any;
@Input() attr:any='temperature';
tempArray = new Array();
timeArray=new Array();

constructor(private datepipe:DatePipe){

}

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'temperature in ℉' },
  ];

   public lineChartLabels: Label[] = [];
  
  

  public lineChartOptions: (ChartOptions & { responsive: boolean }) = {
    responsive: true,
  };
  
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  

  ngOnInit() {
    this.plotChart();
    

    
  }

  ngOnChanges(changes: SimpleChanges) {
    this.plotChart();
    
  }

  plotChart()
  {
    this.tempArray = new Array();
    this.timeArray = new Array();
    for(let i=0;i<24;i++)
    {
      if(this.attr === 'temperature'){
        this.tempArray.push( this.chartData.data[i].temperature);
        this.lineChartData = [
          { data: [], label: 'temperature in ℉' },
        ];

        this.lineChartColors = [
          {
            borderColor: 'black',
            backgroundColor: 'rgba(255,0,0,0.3)',
          }];
      }
      else if(this.attr === 'windspeed'){
        this.tempArray.push( this.chartData.data[i].windSpeed);
        this.lineChartData = [
          { data: [], label: 'WindSpeed in mph' },
        ];

        this.lineChartColors = [
          {
            borderColor: 'black',
            backgroundColor: 'rgba(0,0,255,0.3)',
          }];
      }
      else if(this.attr === 'humidity'){
        this.tempArray.push( this.chartData.data[i].humidity);
        this.lineChartData = [
          { data: [], label: 'Humidity in %(percentage)' },
        ];

        this.lineChartColors = [
          {
            borderColor: 'black',
            backgroundColor: 'rgba(0,255,0,0.3)',
          }];
      }
        
      this.timeArray.push(this.datepipe.transform(this.chartData.data[i].time*1000,'hh'));
    }
    this.lineChartData[0].data = this.tempArray;
    this.lineChartLabels = this.timeArray;

  }

}
