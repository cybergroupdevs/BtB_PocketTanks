import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  profile_image: String,
  screen_name: String,
  username: String,
  image: String,
  tweet: String,
}

@Component({
  selector: 'app-tweet-dialog',
  templateUrl: './tweet-dialog.component.html',
  styleUrls: ['./tweet-dialog.component.scss']
})
export class TweetDialogComponent {

  tweet;
  // @Input() tweet;

  constructor(
    public dialogRef: MatDialogRef<TweetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ){
  }

  ngOnInit(){
    this.tweet = {
      "profile_image": "https://material.angular.io/assets/img/examples/shiba2.jpg",
      "screen_name": "@Screen_name",
      "username": "Username",
      "image": "https://material.angular.io/assets/img/examples/shiba2.jpg",
      "tweet":"Hiii, guys. All the best."
    }
  }

  onNoClick(): void {
    console.log(this.data);
    
    this.dialogRef.close()
  }


}
