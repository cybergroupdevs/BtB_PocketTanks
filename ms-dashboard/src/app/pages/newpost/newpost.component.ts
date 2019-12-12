import { Component, OnInit, Inject, ViewChild, Optional } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

export class ImageFile {
  Name: string;
  Base64: any;
  ImageType: string;
  CommentText: string;
}

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css']
})
export class NewpostComponent implements OnInit {
  @ViewChild("file",{static:true}) file;
  private files: Array<File> = new Array();
  private fileImageError: boolean = false;
  private fileImageName: string[] = [];
  private fileImageBase64: any[] = [];
  listImageFile:ImageFile[]=[];

  twitterSelected = true;
  instaSelected = false;
  facebookSelected = false;
  imageUploaded = false;
  
  newPostFormGroup: FormGroup;
  constructor(
    private _fb: FormBuilder
  ) { }

  addFiles() {
    this.file.nativeElement.click();
  }

  onFilesAdded() {
    this.onDroppedFilesChange(this.file.nativeElement.files);
  }

  async onDroppedFilesChange(files: Array<File>) {
    if (this.files.length + Object.keys(files).length > 1) {

      Swal.fire({
        title: 'Oops!',
        text: "You can upload only one file with extension png, jpg and jpeg",
        icon: 'error'
      });

      return;
    }

    const allowedExtensions: Array<string> = [
      "png",
      "jpg",
      "jpeg"
    ];
    for (const key in files) {
      if (!isNaN(parseInt(key, 10))) {
        const ext = files[key].name
          .split(".")
          [files[key].name.split(".").length - 1].toLocaleLowerCase();

        if (
          allowedExtensions.lastIndexOf(ext) !== -1 &&
          files[key].name.length <= 100
        ) {
          this.fileImageError = false;
          //To do : need to check for duplicate images
          this.files.push(files[key]);
          this.fileImageBase64.push({name: files[key].name,Base64: await this.getBase64(files[key])});
        } else {
          
          return;
        }
      }
    }
  }
  
  prepareImageFile() {
    this.fileImageBase64.forEach(element=>{
      let imageFile = new ImageFile();
      imageFile.Name = element.name;
      imageFile.Base64 = element.Base64;
      this.listImageFile.push(imageFile);
    });
    
    return this.listImageFile;
  }

  remove(filename) {
    this.files.splice(this.files.findIndex(a => a.name == filename), 1);
  }

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = error => reject(error);
    });
  }

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
