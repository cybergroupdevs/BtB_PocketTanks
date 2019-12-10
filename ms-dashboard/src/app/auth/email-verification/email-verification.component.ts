import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {

  constructor(private _activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // router call to navigate
    // this.router.navigate(['/twittercallback', "123ABC", "456DEF"]);
    this._activatedRoute.params.forEach((urlParams) => {
      debugger;
      console.log(urlParams);
      this.router.navigateByUrl('/login');
    });
  }
}
