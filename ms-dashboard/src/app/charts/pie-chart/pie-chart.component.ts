import { Component, OnInit, Input } from '@angular/core';
import Chart from 'chart.js';
import { ChartsService } from 'app/shared/Services/charts/charts.service';
import { UserService } from 'app/shared/Services/user/user.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  @Input() pieChartResponseData;

  canvas: any;
  ctx;
  chartEmail;

  constructor(private _chartService: UserService) { }

  ngOnInit() {
    if (this.pieChartResponseData.data["countsData"].positive == 0)
      this.pieChartResponseData.data["countsData"].positive = 60;

    if (this.pieChartResponseData.data["countsData"].negative == 0)
      this.pieChartResponseData.data["countsData"].negative = 40;

    this.createChart(this.pieChartResponseData.data["countsData"].positive, this.pieChartResponseData.data["countsData"].negative);
  }

  createChart(positiveData, negativeData) {

    this.canvas = document.getElementById("chartEmail");
    this.ctx = this.canvas.getContext("2d");
    this.chartEmail = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: ["Positive", "Negative"],
        datasets: [{
          label: "Comments",
          pointRadius: 0,
          pointHoverRadius: 0,
          backgroundColor: [
            '#4acccd',//Positive
            '#ef8157' //Negative
          ],
          borderWidth: 0,
          data: [positiveData
            , negativeData
          ]
        }]
      },

      options: {

        legend: {
          display: false
        },

        pieceLabel: {
          render: 'percentage',
          fontColor: ['white'],
          precision: 2
        },

        tooltips: {
          enabled: true
        },

        scales: {
          yAxes: [{

            ticks: {
              display: false
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: "transparent",
              color: 'rgba(255,255,255,0.05)'
            }

          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(255,255,255,0.1)',
              zeroLineColor: "transparent"
            },
            ticks: {
              display: false,
            }
          }]
        },
      }
    });
  }
}
