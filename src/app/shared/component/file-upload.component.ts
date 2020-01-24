import { Component, Input, Output, EventEmitter } from "@angular/core";
import { HttpService } from "../service/http.service";
import { FileData } from "../../entities/FileData";

@Component({
    selector: "file-upload",
    template: `
        <div class="file-upload">
            <label for="upload" class="file-upload__label">
                <span *ngIf="!isUploading"> <i class="fa fa-user"></i> UPLOAD </span>
                <span *ngIf="isUploading"> <apex-progress-bar type="loading"></apex-progress-bar> </span>
            </label>
            <input id="upload" class="file-upload__input" type="file" name="file-upload" (change)="upload($event)" [accept]="accept" />
        </div>
    `,
    styles: [
        `
            .file-upload {
                position: relative;
                display: inline-block;
            }

            .file-upload__label {
                cursor: pointer;
                display: block;
                padding: 2em 2em;
                color: #fff;
                background: #222;
                border-radius: 0.4em;
                transition: background 0.3s;
                min-height: 20px;
                min-width: 200px;
                text-align: center;
                &:hover {
                    cursor: pointer;
                    background: #000;
                }
            }

            .file-upload__input {
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                font-size: 1;
                width: 0;
                height: 100%;
                opacity: 0;
            }
        `,
    ],
})
export class FileUploadComponent {
    @Input()
    fileData: FileData;

    @Input()
    accept = "image/*";
    isUploading: boolean = false;

    @Output()
    outputEmitter: EventEmitter<any> = new EventEmitter<any>();

    constructor(private _service: HttpService) {}

    upload(event: any) {
        this.isUploading = true;
        let files = event.target.files;
        let fData: FormData = new FormData();
        for (var i = 0; i < files.length; i++) {
            fData.append("file", files[i]);
        }
        fData.append("fileData", JSON.stringify(this.fileData));
        this._service.formData("/filedata", fData).subscribe((response) => this.handleResponse(response), (error) => this.handleError(error));
    }
    handleResponse(response: any) {
        this.isUploading = false;
        this.outputEmitter.next(response);
    }
    handleError(error: string) {
        this.isUploading = false;
        console.log(error);
    }
}
