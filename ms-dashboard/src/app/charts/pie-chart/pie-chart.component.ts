import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { ChartsService } from 'app/shared/Services/charts/charts.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  public canvas: any;
  public ctx;
  public chartEmail;

  constructor(private _chartService: ChartsService) { }

  ngOnInit() {
    this._chartService.getPieChartData().subscribe(
      response => {
        if (response.success && response.data.type == "average") {

          if (response.data["countsData"].positive == 0)
            response.data["countsData"].positive = 60;

          if (response.data["countsData"].negative == 0)
            response.data["countsData"].negative = 40;

          this.createChart(response.data["countsData"].positive, response.data["countsData"].negative);
        }
      },
      error => {
        this.createChart(60, 40);
      });
  }

  createChart(positiveData, negativeData) {

    this.canvas = document.getElementById("chartEmail");
    this.ctx = this.canvas.getContext("2d");
    this.chartEmail = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: ["Positive", "Negative"],
        datasets: [{
          label: "Emails",
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
