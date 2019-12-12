import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

@Component({
  selector: 'histogram',
  templateUrl: './histogram.component.html',
  styleUrls: ['./histogram.component.css']
})
export class HistogramComponent implements OnInit {

  public canvas: any;
  public ctx;
  myBarChart;
  noGridLines= {}

  month = [];
  likes = [];
  comments = [];
  retweets = [];
  
  modifiedData;

  constructor() { }

  ngOnInit() {

    // api

    let data;
    let res =  {

      "success": true,
      "status": 200,
      "message": "OK",
      "data": [
          {
              "sumFavoriteCount": 20,
              "sumCommentCount": 0,
              "sumRetweetCount": 5,
              "month": "2017-05"
          },
          {
              "sumFavoriteCount": 30,
              "sumCommentCount": 4,
              "sumRetweetCount": 9,
              "month": "2019-04"
          },
          {
              "sumFavoriteCount": 5,
              "sumCommentCount": 41,
              "sumRetweetCount": 1,
              "month": "2018-02"
          },
          {
              "sumFavoriteCount": 7,
              "sumCommentCount": 56,
              "sumRetweetCount": 8,
              "month": "2017-09"
          },
          {
              "sumFavoriteCount": 2,
              "sumCommentCount": 32,
              "sumRetweetCount": 1,
              "month": "2017-11"
          }
        ]
    }


    if(res.success)
      data = res["data"];

    data.forEach(element => {
      this.likes.push(element.sumFavoriteCount)
      this.comments.push(element.sumCommentCount)
      this.retweets.push(element.sumRetweetCount)
      this.month.push(element.month)
    });

    this.modifiedData = {
      labels: this.month,
      datasets:[
        {
          label: "Likes",
          backgroundColor: "#6bd098",
          data: this.likes
        },
        {
            label: "Retweets",
            backgroundColor: "#f17e5d",
            data: this.retweets
        },
        {
            label: "Comments",
            backgroundColor: "#fcc468",
            data: this.comments
        }
      ]
    }

    this.noGridLines = {
      xAxes: [{
        gridLines: {
            color: "rgba(0, 0, 0, 0)",
          }
      }],
      yAxes: [{
        gridLines: {
          color: "rgba(0, 0, 0, 0)",
        },
        ticks: {
            min: 0,
        }
      }]
    }
    this.createChart()
  }

  createChart(){
    this.canvas = document.getElementById("histogram");
    this.ctx = this.canvas.getContext("2d");

    let options = {
      barValueSpacing: 20,
      scales: this.noGridLines,
      legend:{
        display: false
      },
      animation: false
    }

    this.myBarChart = new Chart(this.ctx, {
      type: 'bar',
      data: this.modifiedData,
      options: options
    });
  }

  mouseEnter(){
    this.noGridLines= {
      yAxes: [{
        ticks: {
            min: 0,
        }
      }]
    };

    this.myBarChart.destroy();
    this.createChart()
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
        },
        ticks: {
            min: 0,
        }
      }]
    }
    this.myBarChart.destroy();
    this.createChart()
  }

}
