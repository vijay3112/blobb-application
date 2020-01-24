import { Component, OnInit, ElementRef, forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

@Component({
  selector: "img-upload",

  template: `
    <div class="imgupload">
      <input type="file" class="upload" [accept]="accept" (change)="changeListener($event)" />
    </div>
    <img alt="placeholder" class="padding-height" [src]="placeholder" height="auto" width="62%" />
  `,
  styles: [""],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: ImgUploadComponent, multi: true }],
})
export class ImgUploadComponent implements ControlValueAccessor {
  innerValue: any;

  _placeHolderSafe: SafeUrl;

  @Input()
  accept = "image/*";

  constructor(private sanitizer: DomSanitizer) {}

  get placeholder() {
    return this._placeHolderSafe;
  }

  imgChange() {
    if (!this.innerValue) {
      this.innerValue = `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIwLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MCA1MCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTAgNTA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGxpbmUgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6IzI4MzUzRDtzdHJva2Utd2lkdGg6MztzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDsiIHgxPSIyNSIgeTE9IjIiIHgyPSI0MyIgeTI9IjIwIi8+CjxwYXRoIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiMyODM1M0Q7c3Ryb2tlLXdpZHRoOjM7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MTA7IiBkPSJNNDMsMjB2MjQuNQoJYzAsMS45LTEuNiwzLjUtMy41LDMuNWgtMjlDOC42LDQ4LDcsNDYuNCw3LDQ0LjV2LTM5QzcsMy42LDguNiwyLDEwLjUsMkgyNSIvPgo8cGF0aCBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojMjgzNTNEO3N0cm9rZS13aWR0aDozO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEwOyIgZD0iTTQzLDIwSDI4LjUKCWMtMS45LDAtMy41LTEuNi0zLjUtMy41VjIiLz4KPGxpbmUgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6IzI4MzUzRDtzdHJva2Utd2lkdGg6MjtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDsiIHgxPSIyNSIgeTE9IjM1LjMiIHgyPSIyNSIgeTI9IjI3LjMiLz4KPGxpbmUgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6IzI4MzUzRDtzdHJva2Utd2lkdGg6MjtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDsiIHgxPSIyMC45IiB5MT0iMzAuMyIgeDI9IjI1LjEiIHkyPSIyNi4xIi8+CjxsaW5lIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiMyODM1M0Q7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MTA7IiB4MT0iMjkuMyIgeTE9IjMwLjMiIHgyPSIyNS4xIiB5Mj0iMjYuMSIvPgo8bGluZSBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojMjgzNTNEO3N0cm9rZS13aWR0aDoyO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEwOyIgeDE9IjE2LjkiIHkxPSIzNS4zIiB4Mj0iMTYuOSIgeTI9IjQwIi8+CjxsaW5lIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiMyODM1M0Q7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MTA7IiB4MT0iMzMuMSIgeTE9IjM1LjMiIHgyPSIzMy4xIiB5Mj0iNDAiLz4KPGxpbmUgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6IzI4MzUzRDtzdHJva2Utd2lkdGg6MjtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDsiIHgxPSIxNi45IiB5MT0iNDAiIHgyPSIzMy4xIiB5Mj0iNDAiLz4KPC9zdmc+Cg==`;
    }
    this._placeHolderSafe = this.sanitizer.bypassSecurityTrustUrl(this.innerValue);
  }
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
      this.imgChange();
    }
  }
  propagateChange = (_: any) => {};
  registerOnChange(fn) {
    this.propagateChange = fn;
  }
  registerOnTouched() {}

  changeListener($event): void {
    this.readThis($event.target);
  }
  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.propagateChange(myReader.result);
      this.innerValue = myReader.result;
      this.imgChange();
    };
    myReader.readAsDataURL(file);
  }
}
