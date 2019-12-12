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
    
  }
}
