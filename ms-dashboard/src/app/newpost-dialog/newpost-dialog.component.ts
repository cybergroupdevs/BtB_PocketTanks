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
  selector: 'app-newpost-dialog',
  templateUrl: './newpost-dialog.component.html',
  styleUrls: ['./newpost-dialog.component.css']
})
export class NewpostDialogComponent {

  // hour = Number(8);
  // minute = Number(30);
  // format = "PM";
  // hours = [...Array(12).keys()].map(x => ++x);
  // minutes = [...Array(59).keys()];
  // formats = ["AM","PM"]
  // postNow = true;

  hours = [...Array(12).keys()].map(x => ++x);
  minutes = [...Array(59).keys()];
  formats = ["AM","PM"]
  
  constructor(
    public dialogRef: MatDialogRef<NewpostDialogComponent>,
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
  }

  onNoClick(): void {
    console.log(this.data);
    
    this.dialogRef.close()
  }


}
