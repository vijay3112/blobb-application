import { Component, OnChanges, SimpleChanges, Input } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { ReportService } from "../service/report.service";
import { Props } from "../../constants/props";

@Component({
  selector: "img-load",
  template: `
    <div class="img-box" [style.height]="height">
      <img [src]="placeholder" [style.height]="height" [style.borderRadius]="radius" [alt]="alt" [style.fill]="fill" />
    </div>
  `,
  styles: [
    `
      .img-box {
        width: 100%;
        height: auto;
        margin: 0 auto;
        overflow: hidden;
        background: transparent;
      }
      .img-box img {
        position: relative;
        height: auto;
        left: 50%;
        -moz-transform: translate(-50%);
        -ms-transform: translate(-50%);
        -webkit-transform: translate(-50%);
        transform: translate(-50%);
      }
    `,
  ],
})
export class ImgLoadComponent implements OnChanges {
  @Input()
  img: any = null;

  @Input()
  id: any = null;

  innerValue: string = null;

  @Input()
  height: string = "auto";

  @Input()
  radius: string = "5%";

  @Input()
  alt: string = "";

  @Input()
  fill: string = "gray";

  _placeHolderSafe: SafeUrl;

  constructor(private sanitizer: DomSanitizer, private reportService: ReportService) {
    this.imgChange();
  }

  get placeholder() {
    return this._placeHolderSafe;
  }

  ngOnChanges(changes: SimpleChanges) {
    if ((changes["img"] && changes["img"].currentValue != null) || (changes["id"] && changes["id"].currentValue != null)) {
      this.imgChange();
    }
  }

  imgChange() {
    // console.log("-----------------------------");
    // console.log(this.img);
    // console.log(this.id);
    // console.log("-----------------------------");
    if ((!this.img || this.img == "") && !this.id) {
      this.innerValue = `data:image/svg+xml;base64,PCEtLSBCeSBTYW0gSGVyYmVydCAoQHNoZXJiKSwgZm9yIGV2ZXJ5b25lLiBNb3JlIEAgaHR0cDovL2dvby5nbC83QUp6YkwgLS0+Cjxzdmcgd2lkdGg9IjM4IiBoZWlnaHQ9IjM4IiB2aWV3Qm94PSIwIDAgMzggMzgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjZmY2ZDAwIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMSAxKSIgc3Ryb2tlLXdpZHRoPSIyIj4KICAgICAgICAgICAgPGNpcmNsZSBzdHJva2Utb3BhY2l0eT0iLjUiIGN4PSIxOCIgY3k9IjE4IiByPSIxOCIvPgogICAgICAgICAgICA8cGF0aCBkPSJNMzYgMThjMC05Ljk0LTguMDYtMTgtMTgtMTgiPgogICAgICAgICAgICAgICAgPGFuaW1hdGVUcmFuc2Zvcm0KICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iCiAgICAgICAgICAgICAgICAgICAgdHlwZT0icm90YXRlIgogICAgICAgICAgICAgICAgICAgIGZyb209IjAgMTggMTgiCiAgICAgICAgICAgICAgICAgICAgdG89IjM2MCAxOCAxOCIKICAgICAgICAgICAgICAgICAgICBkdXI9IjFzIgogICAgICAgICAgICAgICAgICAgIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiAgICAgICAgICAgIDwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==`;
      this._placeHolderSafe = this.sanitizer.bypassSecurityTrustUrl(this.innerValue);
    } else {
      //this._placeHolderSafe = this.sanitizer.bypassSecurityTrustUrl(this.img);
      if (this.img && this.img != "") {
        this.innerValue = this.img;
        this._placeHolderSafe = this.sanitizer.bypassSecurityTrustUrl(this.innerValue);
      } else {
        this.imgload(this.id).then((imgData: any) => {
          this._placeHolderSafe = this.sanitizer.bypassSecurityTrustUrl(imgData);
        });
      }
      // console.log(this.img.length)
      // if (this.id) {
      //   this.imgload(this.id).then((imgData: any) => {
      //     this._placeHolderSafe = this.sanitizer.bypassSecurityTrustUrl(
      //       imgData
      //     );
      //   });
      //   //this._placeHolderSafe = this.sanitizer.bypassSecurityTrustUrl(this.img);
      // } else {
      //   this.innerValue = this.img;
      //   this._placeHolderSafe = this.sanitizer.bypassSecurityTrustUrl(
      //     this.innerValue
      //   );
      // }
    }
  }

  imgload(id) {
    let url = Props.API_END_POINT + "/img/" + id;
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 0 || xhr.readyState == 4) {
          var data = xhr.response;
          resolve(data);
          //   if (data.status == 1) {
          //     resolve(data.data);
          //   } else {
          //     this.errorMessage(data.error);
          //     reject(data);
          //   }
        }
      };
      xhr.send();
    });
  }
}
