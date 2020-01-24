import { Component, Input, Output, EventEmitter, OnChanges } from "@angular/core";
import { HttpService } from "../service/http.service";
import { Observable, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Props } from "../../constants/props";
@Component({
    selector: "secured-image",
    template: `
        <img [src]="dataUrl$" height="300" width="300" />
    `,
})
export class SecuredImageComponent implements OnChanges {
    // This code block just creates an rxjs stream from the src
    // this makes sure that we can handle source changes
    // or even when the component gets destroyed
    // So basically turn src into src$
    @Input() private src: string;
    dataUrl$;
    private src$ = new BehaviorSubject(this.src);
    ngOnChanges(): void {
        if (!!this.src) {
            //this.src$.next(this.src);
            this.dataUrl$ = Props.API_END_POINT + "/filedata/" + this.src;
        }
    }

    // this stream will contain the actual url that our img tag will load
    // everytime the src changes, the previous call would be canceled and the
    // new resource would be loaded
    //dataUrl$ = this.src$.subscribe((url) => this.loadImage(Props.API_END_POINT + "/filedata/" + url));

    // we need HttpClient to load the image
    constructor(private httpClient: HttpClient) {}

    private loadImage(url: string): Observable<any> {
        console.log(url);
        return this.httpClient.get(url, { responseType: "blob" }).pipe(
            map((e) => {
                URL.createObjectURL(e);
            })
        );
    }
}
