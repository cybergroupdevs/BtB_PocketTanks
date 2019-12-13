import { Component, OnInit, Input } from '@angular/core';
import Chart from 'chart.js';
import { MatDialog } from '@angular/material';
import { ChartsService } from 'app/shared/Services/charts/charts.service';


@Component({
  selector: 'sentiment-linechart',
  templateUrl: './sentiment-linechart.component.html',
  styleUrls: ['./sentiment-linechart.component.scss']
})
export class SentimentLinechartComponent implements OnInit {

  @Input() lineChartData;
  canvas: any;
  ctx;
  chartColor;
  lineChart;

  noGridLines:Object = {
    xAxes: [{
        gridLines: {
            color: "rgba(0, 0, 0, 0)",
        }
    }],
    yAxes: [{
        gridLines: {
            color: "rgba(0, 0, 0, 0)",
        }   
    }]
  }
  

  constructor(
    public _dialog: MatDialog,
    private _chartService: ChartsService
  )
  { }

  ngOnInit() {
    this.createChart(this.lineChartData)
  }


  createChart(data){      

    console.log(data);
    
    let modifiedData = {
      "positive":[],
      "negative":[],
      "total":[],
      "date":[]
    }

    data.forEach((element)=>{
      modifiedData.positive.push(element.positive)
      modifiedData.negative.push(element.negative)
      modifiedData.total.push(element.total)
      modifiedData.date.push(element.date)
    })
    
    console.log(modifiedData);
    
    //Chart Data and Styling
    this.chartColor = "#FFFFFF";

    let speedCanvas = document.getElementById("speedChart2");

    let dataFirst = {
      data: modifiedData.positive,
      fill: false,
      borderColor: '#6bd098',
      backgroundColor: 'transparent',
      pointBorderColor: '#6bd098',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8,
    };

    let dataSecond = {
      data: modifiedData.negative,
      fill: false,
      borderColor: '#f17e5d',
      backgroundColor: 'transparent',
      pointBorderColor: '#f17e5d',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8
    };

    let dataThird = {
      data: modifiedData.total,
      fill: false,
      borderColor: '#fcc468',
      backgroundColor: 'transparent',
      pointBorderColor: '#fcc468',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8
    };

    let speedData = {
      labels: modifiedData.date,
      datasets: [dataFirst, dataSecond, dataThird]
    };
    
    let chartOptions = {
      scales: this.noGridLines,
      legend: {
        display: false,
        position: 'top'
      },
      animation: false
    };

    this.lineChart = new Chart(speedCanvas, {
      type: 'line',
      hover: true,
      data: speedData,
      options: chartOptions
    });
  }

  mouseEnter(){
    this.noGridLines = {};
    this.lineChart.destroy();
    this.createChart(this.lineChartData)
  }

  mouseLeave(){
    this.noGridLines = {
      xAxes: [{
          gridLines: {
              color: "rgba(0, 0, 0, 0)",
          }
      }],
      yAxes: [{
          gridLines: {
              color: "rgba(0, 0, 0, 0)",
          }   
      }]
    }
    this.lineChart.destroy();
    this.createChart(this.lineChartData)
  }
}
