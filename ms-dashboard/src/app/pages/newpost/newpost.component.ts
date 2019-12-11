import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css']
})
export class NewpostComponent implements OnInit {


  twitterSelected = true;
  instaSelected = false;
  facebookSelected = false;
  imageUploaded = false;
  
  newPostFormGroup: FormGroup;
  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    this.newPostFormGroup = this._fb.group({
      text: [
        "",
        [
          <any>Validators.required
        ]
      ],
      scheduleIt: [
        "",
        [
          <any>Validators.required
        ]
      ],
      dateTime: [
        "",
        [
          <any>Validators.required
        ]
      ]
    });
  }

  submitForm(){
    this.markFormGroupTouched(this.newPostFormGroup)

    if(this.newPostFormGroup.valid){
      let newPost = {
        text: this.newPostFormGroup.get('text').value,
        scheduleIt: this.newPostFormGroup.get('scheduleIt').value,
        // dateTime: this.newPostFormGroup.get('dateTime').value
      }
      console.log(newPost);
    }
  }

  //#region drag N drop
  // afuConfig = {
  //   uploadAPI: {
  //     url:"http://localhost:3000/upload"
  //   }
  // };

  // afuConfig = {
  //   multiple: false,
  //   formatsAllowed: ".jpg,.png",
  //   maxSize: "10",
  //   uploadAPI:  {
  //     url:"undefined",
  //   //   headers: {
  //   //  "Content-Type" : "text/plain;charset=UTF-8",
  //   //  "Authorization" : `Bearer`
  //   //   }
  //   },
  //   theme: "dragNDrop",
  //   hideProgressBar: false,
  //   hideResetBtn: true,
  //   hideSelectBtn: false,
  //   replaceTexts: {
  //     selectFileBtn: 'Select Files',
  //     resetBtn: 'Reset',
  //     uploadBtn: 'Upload',
  //     dragNDropBox: 'Drag N Drop',
  //     attachPinBtn: 'Attach Files...',
  //     afterUploadMsg_success: 'Successfully Uploaded !',
  //     afterUploadMsg_error: 'Upload Failed !'
  //   }
  // };
  // DocUpload(e){
  //   console.log(e);
  // }
  //#endregion
  


  markFormGroupTouched(FormGroup: FormGroup){
    (<any>Object).values(FormGroup.controls).forEach(control => {
      try{
        control.markAsTouched();
        if(control.controls){
          this.markFormGroupTouched(control);
        }
      }
      catch(e){ }
    });
  }

}
