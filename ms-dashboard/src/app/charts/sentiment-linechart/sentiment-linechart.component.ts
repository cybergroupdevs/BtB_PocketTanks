import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { MatDialog } from '@angular/material';
import { SocialAccountLoginComponent } from '../../pages/social-account-login/social-account-login.component';
import { ChartsService } from 'app/shared/Services/charts/charts.service';


@Component({
  selector: 'sentiment-linechart',
  templateUrl: './sentiment-linechart.component.html',
  styleUrls: ['./sentiment-linechart.component.css']
})
export class SentimentLinechartComponent implements OnInit {


  public KPIList: any[] = [];
  public canvas: any;
  public ctx;
  public chartColor;


  constructor(
    public _dialog: MatDialog,
    // private service: ChartsService
  )
  { }

  ngOnInit() {
    {
      
    let data=[
      {
        "positive":0,
        "negative":0,
        "total":0,
        "date":"JAN"
      },
      {
        "positive":19,
        "negative":5,
        "total":24,
        "date":"FEB"
      },
      {
        "positive":15,
        "negative":10,
        "total":25,
        "date":"MAR"
      },
      {
        "positive":20,
        "negative":12,
        "total":32,
        "date":"APR"
      }
    ];
    
    // this.service.getSentimentLine()
    // .subscribe(res=>{

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

    // console.log(modifiedData);
    
    //Chart Data and Styling
    this.chartColor = "#FFFFFF";

    var speedCanvas = document.getElementById("speedChart2");

    var dataFirst = {
      data: modifiedData.positive,
      fill: false,
      borderColor: '#6bd098',
      backgroundColor: 'transparent',
      pointBorderColor: '#6bd098',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8,
    };

    var dataSecond = {
      data: modifiedData.negative,
      fill: false,
      borderColor: '#f17e5d',
      backgroundColor: 'transparent',
      pointBorderColor: '#f17e5d',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8
    };

    var dataThird = {
      data: modifiedData.total,
      fill: false,
      borderColor: '#fcc468',
      backgroundColor: 'transparent',
      pointBorderColor: '#fcc468',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8
    };

    var speedData = {
      labels: modifiedData.date,
      datasets: [dataFirst, dataSecond, dataThird]
    };

    var chartOptions = {
      scales: {
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
      },
      legend: {
        display: false,
        position: 'top'
      }
    };

    var lineChart = new Chart(speedCanvas, {
      type: 'line',
      hover: false,
      data: speedData,
      options: chartOptions
    });
  }
  }
}
