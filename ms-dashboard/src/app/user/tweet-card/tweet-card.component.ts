import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tweet-card',
  templateUrl: './tweet-card.component.html',
  styleUrls: ['./tweet-card.component.scss']
})
export class TweetCardComponent implements OnInit {

  @Input() tweetObj;

  constructor() { }

  ngOnInit() {
    this.tweetObj.screen_name = localStorage.getItem('screenName');
    this.tweetObj.name = localStorage.getItem('name');
    this.tweetObj.profile_image = localStorage.getItem('profileImage');
    this.tweetObj.background_image = localStorage.getItem('background_image');
  }
}
