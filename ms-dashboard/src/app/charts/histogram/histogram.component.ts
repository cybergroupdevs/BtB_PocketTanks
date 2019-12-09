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
  data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "June"],
    datasets: [
        {
            label: "Likes",
            backgroundColor: "#6bd098",
            data: [3,7,4,5,8,15]
        },
        {
            label: "Retweets",
            backgroundColor: "#f17e5d",
            data: [4,3,5,4,3,5]
        },
        {
            label: "Comments",
            backgroundColor: "#fcc468",
            data: [7,2,6,4,3,5]
        }
    ]
  };
  
  options = {
    barValueSpacing: 20,
    scales: {
        yAxes: [{
            ticks: {
                min: 0,
            }
        }]
    },
    legend:{
      display: false
    }
  }
  constructor() { }

  ngOnInit() {
    
    this.canvas = document.getElementById("histogram");
    this.ctx = this.canvas.getContext("2d");

    var myBarChart = new Chart(this.ctx, {
      type: 'bar',
      data: this.data,
      options: this.options
    });
  }


}
