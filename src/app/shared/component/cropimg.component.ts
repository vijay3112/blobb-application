//our root app component
import { Component, Input, Output, EventEmitter, AfterViewInit } from "@angular/core";

@Component({
  selector: "img-crop",
  template: `
    <section class="inline-block">
      <label class="custom-file-upload" style="background-color:#ffa000;color:white">
        <input type="file" accept="image/x-png,image/jpeg,image/jpg" class="hide" (change)="fileChangeEvent($event)" hidden (click)="clickDom($event.target)" />
        <i class="fa fa-cloud-upload"></i> Select {{ name }} Image
      </label>
    </section>
    <section class="crop-container" *ngIf="isShow === true">
      <div class="crop-box">
        <div class="crop-box-header" style="text-align:center">
          <button (click)="onApply()" class="apply">apply</button>
          <button (click)="onCancel()" class="cancel">cancel</button>
        </div>
        <div class="crop-box-body">
          <figure>
            <image-cropper
              id="cropper-image"
              class="full-width"
              [imageChangedEvent]="imageChangedEvent"
              [maintainAspectRatio]="true"
              [aspectRatio]="9 / 9"
              [resizeToWidth]="320"
              format="png"
              (imageCropped)="imageCropped($event)"
            ></image-cropper>
          </figure>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .hide {
        display: none;
      }
      img {
        height: auto;
      }
      .crop-container {
        background-color: rgba(0, 0, 0, 0.8);
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1111;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding-top: 25px;
      }

      .crop-box {
        background-color: #fff;
        border-radius: 10px;
        min-width: 40%;
        max-width: 80%;
        margin: auto;
      }

      .crop-box .crop-box-header {
        border-bottom: 1px solid #ddd;
        padding: 12px;
        position: relative;
      }

      .crop-box .crop-box-header h3 {
        margin: 0;
        font-size: 18px;
        font-weight: bold;
        line-height: 24px;
        text-align: center;
      }

      .crop-box .crop-box-body {
        padding: 10px;
      }

      .inline-block {
        display: flex;
        justify-content: center;
        margin: 24px auto;
        cursor: pointer;
      }
      a {
        -moz-border-radius: 20px;
        -webkit-border-radius: 20px;
        border-radius: 20px;
        border: 1px solid #18ab29;
        display: inline-block;
        cursor: pointer;
        color: #ffffff;
        font-family: Arial;
        font-size: 11px;
        padding: 2px 10px;
        text-decoration: none;
      }
      button {
        -moz-border-radius: 20px;
        -webkit-border-radius: 20px;
        border-radius: 20px;
        border: 1px solid #18ab29;
        display: inline-block;
        cursor: pointer;
        color: #ffffff;
        font-family: Arial;
        font-size: 17px;
        padding: 4px 15px;
        text-decoration: none;
        margin: 4px;
      }
      button:focus {
        outline: none;
      }
      button:active {
        position: relative;
        top: 1px;
      }
      .apply {
        background-color: #44c767;
      }
      .cancel {
        background-color: #ffaa22;
      }
      input[type="file"] {
        display: none;
      }
      .custom-file-upload {
        display: inline-block;
        padding: 6px 12px;
        cursor: pointer;
        background-color: #ffa000;
        border-radius: 3px;
        color: white !important;
      }
    `
  ]
})
export class CropImgComponent implements AfterViewInit {
  imageChangedEvent: any = "";
  croppedImage: any = "";
  private fileName: string;
  private fileType: string;
  private dom: HTMLInputElement;
  public isShow: boolean = false;
  //private cropper: Cropper;
  @Input()
  aspectRatio: string = "3";

  @Input()
  name: string;

  @Output()
  outputEmitter: EventEmitter<any> = new EventEmitter<any>();

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    setTimeout(() => {
      const files = this.dom.files;
      if (files && files.length > 0) {
        this.isShow = true;
      }
    }, 10);
  }
  clickDom($dom) {
    this.dom = $dom as HTMLInputElement;
    this.dom.value = "";
  }
  imageCropped(image: string) {
    this.croppedImage = image;
  }
  public ngAfterViewInit() {
    //  init upload btn, after dom content loaded init down.
    setTimeout(() => {
      const dom = (this.dom = document.getElementById("inputImage") as HTMLInputElement);
      if (this.dom) {
        this.dom.onchange = () => {
          const files = dom.files;
          if (files && files.length > 0) {
            this.isShow = true;
          }
        };
      }
    }, 100);
  }
  public onCancel() {
    this.isShow = false;
  }
  public onApply() {
    this.isShow = false;
    this.outputEmitter.next(this.croppedImage.base64);
  }
}
