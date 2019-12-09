import {
  Directive,
  HostListener,
  HostBinding,
  EventEmitter,
  Output
} from "@angular/core";

@Directive({
  selector: "[appDragAndDrop]"
})
export class DragAndDropDirective {
  @HostBinding("style.background") private background = "#eee";
  @Output() private filesChangeEmiter: EventEmitter<
    File[]
  > = new EventEmitter();
  // private allowedExtensions: Array<string> = ['doc','docx','rtf','pdf'];
  constructor() {}

  @HostListener("dragover", ["$event"]) public onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "rgb(0,0,102,0.2)";
  }
  @HostListener("dragleave", ["$event"]) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#eee";
  }
  @HostListener("drop", ["$event"]) public onDrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    const validFiles: Array<File> = [];
    const files = evt.dataTransfer.files;

    if (files.length > 0) {
      this.background = "#eee";
    }
    if (files.length > 0) {
      Array.from(files).forEach((file: File) => {
        const ext = file.name.split(".")[file.name.split(".").length - 1];
        // if (this.allowedExtensions.lastIndexOf(ext) !== -1) {
        validFiles.push(file);
        // }
      });
      this.filesChangeEmiter.emit(validFiles);
    }
  }
}
