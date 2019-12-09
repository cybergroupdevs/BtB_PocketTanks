import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { MatDialog } from '@angular/material';
import { SocialAccountLoginComponent } from '../social-account-login/social-account-login.component';

@Component({
  selector: 'dashboard-cmp',
  moduleId: module.id,
  templateUrl: 'dashboard.component.html',
  styleUrls:['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  public KPIList: any[] = [];
  public canvas: any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;

  
  tweets = [
    {
      "profile_image": "http://pbs.twimg.com/profile_images/919586418174783489/usRQmm1H_normal.jpg",
      "screen_name": "ZeeNewsHindi",
      "name": "Zee News Hindi",
      "created_at": "12 Nov 2012",
      "tweet": "hi there, I am tweeting from Nodejs and angular."
    },
    {
      "profile_image": "http://pbs.twimg.com/profile_images/919586418174783489/usRQmm1H_normal.jpg",
      "screen_name": "ZeeNewsHindi",
      "name": "Zee News Hindi",
      "created_at": "12 Jan 2013",
      "tweet": "Hey, you still there?"
    },
    {
      "profile_image": "http://pbs.twimg.com/profile_images/919586418174783489/usRQmm1H_normal.jpg",
      "screen_name": "ZeeNewsHindi",
      "name": "Zee News Hindi",
      "created_at": "2 Nov 2012",
      "tweet": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos aliquid, itaque, dolor eius facilis alias quisquam odio ad debitis, quos consectetur velit sint distinctio similique neque sit cupiditate voluptates nostrum."
    },
    {
      "profile_image": "http://pbs.twimg.com/profile_images/919586418174783489/usRQmm1H_normal.jpg",
      "screen_name": "ZeeNewsHindi",
      "name": "Zee News Hindi",
      "created_at": "12 Nov 2012",
      "tweet": "hi there, I am tweeting from Nodejs and angular."
    },
    {
      "profile_image": "http://pbs.twimg.com/profile_images/919586418174783489/usRQmm1H_normal.jpg",
      "screen_name": "ZeeNewsHindi",
      "name": "Zee News Hindi",
      "created_at": "12 Jan 2013",
      "tweet": "Hey, you still there?"
    },
    {
      "profile_image": "http://pbs.twimg.com/profile_images/919586418174783489/usRQmm1H_normal.jpg",
      "screen_name": "ZeeNewsHindi",
      "name": "Zee News Hindi",
      "created_at": "2 Nov 2012",
      "tweet": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos aliquid, itaque, dolor eius facilis alias quisquam odio ad debitis, quos consectetur velit sint distinctio similique neque sit cupiditate voluptates nostrum."
    }
  ]

  constructor(public _dialog: MatDialog)
  {
    
  }

  ngOnInit() {
    {
    this.KPIList = [{
      iconClass: 'nc-icon nc-single-copy-04 text-warning',
      cardTitle: 'Posts',
      cardNumbers: '12',
      footerText: 'Last Updated Time',
      footerIconClass: 'fa fa-clock-o'
    }, {
      iconClass: 'fa fa-thumbs-up text-info',
      cardTitle: 'Likes',
      cardNumbers: '304',
      footerText: 'Last Updated Time',
      footerIconClass: 'fa fa-clock-o'
    }, {
      iconClass: 'fa fa-eye text-primary',
      cardTitle: 'Reach',
      cardNumbers: '4.5K',
      footerText: 'Last Updated Time',
      footerIconClass: 'fa fa-clock-o'
    }, {
      iconClass: 'fa fa-comment text-danger',
      cardTitle: 'Comments',
      cardNumbers: '56',
      footerText: 'Last Updated Time',
      footerIconClass: 'fa fa-clock-o'
    },];


    //Chart Data and Styling
    this.chartColor = "#FFFFFF";

    // #region chartHours 
    // this.canvas = document.getElementById("chartHours");
    // this.ctx = this.canvas.getContext("2d");

    // this.chartHours = new Chart(this.ctx, {
    //   type: 'line',

    //   data: {
    //     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    //     datasets: [{
    //       borderColor: "#6bd098",
    //       backgroundColor: "#6bd098",
    //       pointRadius: 0,
    //       pointHoverRadius: 0,
    //       borderWidth: 3,
    //       data: [300, 310, 316, 322, 330, 326, 333, 345, 338, 354]
    //     },
    //     {
    //       borderColor: "#f17e5d",
    //       backgroundColor: "#f17e5d",
    //       pointRadius: 0,
    //       pointHoverRadius: 0,
    //       borderWidth: 3,
    //       data: [320, 340, 365, 360, 370, 385, 390, 384, 408, 420]
    //     },
    //     {
    //       borderColor: "#fcc468",
    //       backgroundColor: "#fcc468",
    //       pointRadius: 0,
    //       pointHoverRadius: 0,
    //       borderWidth: 3,
    //       data: [370, 394, 415, 409, 425, 445, 460, 450, 478, 484]
    //     }
    //     ]
    //   },
    //   options: {
    //     legend: {
    //       display: false
    //     },

    //     tooltips: {
    //       enabled: false
    //     },

    //     scales: {
    //       yAxes: [{

    //         ticks: {
    //           fontColor: "#9f9f9f",
    //           beginAtZero: false,
    //           maxTicksLimit: 5,
    //           //padding: 20
    //         },
    //         gridLines: {
    //           drawBorder: false,
    //           zeroLineColor: "#ccc",
    //           color: 'rgba(255,255,255,0.05)'
    //         }

    //       }],

    //       xAxes: [{
    //         barPercentage: 1.6,
    //         gridLines: {
    //           drawBorder: false,
    //           color: 'rgba(255,255,255,0.1)',
    //           zeroLineColor: "transparent",
    //           display: false,
    //         },
    //         ticks: {
    //           padding: 20,
    //           fontColor: "#9f9f9f"
    //         }
    //       }]
    //     },
    //   }
    // });
    // #endregion

  }

  //Check if twitter logged in
    this._dialog
    .open(SocialAccountLoginComponent, {
      width: "400px",
      maxHeight: "400px"
    })
  }
}
