import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import Chart from 'chart.js';

@Component({
  selector: 'histogram',
  templateUrl: './histogram.component.html',
  styleUrls: ['./histogram.component.css']
})
export class HistogramComponent implements OnInit {

  @Input() histogramResponseData;
  public canvas: any;
  public ctx;
  myBarChart;
  noGridLines = {}
  public data;

  month = [];
  likes = [];
  comments = [];
  retweets = [];



  modifiedData;
  // modifiedData = {
  //   labels: ["Jan", "Feb", "Mar", "Apr", "May", "June"],
  //   datasets: [
  //       {
  //           label: "Likes",
  //           backgroundColor: "#6bd098",
  //           data: [3,7,4,5,8,15]
  //       },
  //       {
  //           label: "Retweets",
  //           backgroundColor: "#f17e5d",
  //           data: [4,3,5,4,3,5]
  //       },
  //       {
  //           label: "Comments",
  //           backgroundColor: "#fcc468",
  //           data: [7,2,6,4,3,5]
  //       }
  //   ]
  // };



  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    

    if (!changes["histogramResponseData"].firstChange) {
      console.log(changes);
      if (this.histogramResponseData.success)
        this.data = this.histogramResponseData["data"];
      else
        return;

      this.data.forEach(element => {
        this.likes.push(element.sumFavoriteCount)
        this.comments.push(element.sumCommentCount)
        this.retweets.push(element.sumRetweetCount)
        this.month.push(element.month)
      });
      
      this.modifiedData = {
        labels: this.month,
        datasets: [
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

  }

  ngOnInit() {

  }

  createChart() {
    this.canvas = document.getElementById("histogram");
    this.ctx = this.canvas.getContext("2d");

    let options = {
      barValueSpacing: 20,
      scales: this.noGridLines,
      legend: {
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

  mouseEnter() {
    this.noGridLines = {
      yAxes: [{
        ticks: {
          min: 0,
        }
      }]
    };

    this.myBarChart.destroy();
    this.createChart()
  }

  mouseLeave() {
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
