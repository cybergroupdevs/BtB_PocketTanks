import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-twitter-auth',
  templateUrl: './twitter-auth.component.html',
  styleUrls: ['./twitter-auth.component.scss']
})
export class TwitterAuthComponent implements OnInit {

  constructor(private _activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // router call to navigate
    // this.router.navigate(['/twittercallback', "123ABC", "456DEF"]);
    this._activatedRoute.params.forEach((urlParams) => {
      console.log(urlParams);
      this.router.navigateByUrl('/login');
    });    
  }
}