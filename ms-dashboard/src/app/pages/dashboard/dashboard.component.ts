import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { MatDialog } from '@angular/material';
import { SocialAccountLoginComponent } from '../social-account-login/social-account-login.component';

@Component({
  selector: 'dashboard-cmp',
  moduleId: module.id,
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
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

  constructor(public _dialog: MatDialog) {

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

    }

    //Check if twitter logged in
    var twitterAuthDate = new Date(localStorage.getItem('twitterAuth').toString());
    var todaysDate = new Date();

    // To calculate the no. of days between two dates 
    var Difference_In_Days = (todaysDate.getTime() - twitterAuthDate.getTime()) / (1000 * 3600 * 24);

    if (Difference_In_Days >= 1)
      this._dialog
        .open(SocialAccountLoginComponent, {
          width: "400px",
          maxHeight: "400px"
        });
  }
}
