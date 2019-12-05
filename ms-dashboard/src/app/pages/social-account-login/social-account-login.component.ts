import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SocialAuthService } from 'app/shared/Services/social-auth/social-auth.service';
import  *  as  data  from  '../../../../../config.json';

@Component({
  selector: 'app-social-account-login',
  templateUrl: './social-account-login.component.html',
  styleUrls: ['./social-account-login.component.scss']
})
export class SocialAccountLoginComponent implements OnInit {
  
  private devAnalytics = data.DEV.ANALYTICS;

  envUrl=`http://${this.devAnalytics.MONGO_DB_IP}:${this.devAnalytics.PORT}${this.devAnalytics.PREFIX}${this.devAnalytics.VERSION}`;

  constructor(private _socialAuthservice: SocialAuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }
}
