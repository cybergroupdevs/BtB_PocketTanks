import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

export interface DialogData {
  profile_image: String,
  screen_name: String,
  username: String,
  image: String,
  tweet: String,
  scheduled_at: String
}

@Component({
  selector: 'app-tweet-dialog',
  templateUrl: './tweet-dialog.component.html',
  styleUrls: ['./tweet-dialog.component.scss']
})
export class TweetDialogComponent {

  tweet;
  
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<TweetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ){
    this.tweet = data;
  }

  ngOnInit(){
  }

  goToEdit(){
    this.router.navigateByUrl("editPost/"+this.tweet._id) 
    this.dialogRef.close()

  }

  onNoClick(): void {    
    this.dialogRef.close()
  }


}
