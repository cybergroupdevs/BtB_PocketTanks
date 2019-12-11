import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialAuthService } from 'app/shared/Services/social-auth/social-auth.service';

@Component({
  selector: 'app-twitter-auth',
  templateUrl: './twitter-auth.component.html',
  styleUrls: ['./twitter-auth.component.scss']
})
export class TwitterAuthComponent implements OnInit {

  constructor(private _activatedRoute: ActivatedRoute,
    private router: Router,
    private _socialAuthService: SocialAuthService,
  ) { }

  ngOnInit() {
    // router call to navigate
    this._activatedRoute.queryParams.forEach((urlParams) => {
      console.log(urlParams);

      var twitterAccountRequest = {
        "oauth_token": urlParams.oauth_token,
        "oauth_verifier": urlParams.oauth_verifier,
        "jwt_token": localStorage.getItem("authToken")
      }

      this._socialAuthService.verifyTwitterAccount(twitterAccountRequest).subscribe(
        response => {
          debugger;
          if (response.success) {
          }
        });
    });
  }
}