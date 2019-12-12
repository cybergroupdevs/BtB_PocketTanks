import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  text: String,
  postNow: Boolean,
  date: String,
  hour: Number,
  minute: Number,
  format: String
}

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss']
})
export class ProfileDialogComponent {

  userInfo;

  constructor(
    public dialogRef: MatDialogRef<ProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ){
    data.text = ""
    data.date = ""
    data.hour = Number(8)
    data.minute = Number(30)
    data.format = "PM"
    data.postNow = true
  }

  ngOnInit(){
    this.userInfo = {
      "profile_image": "http://pbs.twimg.com/profile_images/919586418174783489/usRQmm1H_normal.jpg",
      "background_image": "http://abs.twimg.com/images/themes/theme1/bg.png",
      "followers_count": 2292338,
      "following_count": 24,
      "location": "India",
      "screen_name": "ZeeNewsHindi",
      "name": "Zee News Hindi",
      "description": "ज़ी न्‍यूज हिंदी भाषाभाषी पाठकों के लिए पेश करता है बेहद सटीक, ताजा एवं विश्‍वसनीय खबरें। For English @Zeenews",
      "statuses_count": 209718,
      "created_at": "Thu Jan 12 07:52:31 +0000 2012"
    }
  }

  onNoClick(): void {
    console.log(this.data);
    
    this.dialogRef.close()
  }


}
