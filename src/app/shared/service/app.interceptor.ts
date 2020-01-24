import { Injectable } from "@angular/core";
import { HttpRequest, HttpResponse, HttpErrorResponse, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Storage } from "../utils/storage";
import { ApexService } from "./apex.service";
import { Props } from "../../constants/props";

@Injectable()
export class AppInterceptor implements HttpInterceptor {
    CONTENT_TYPE: string = "application/x-www-form-urlencoded";
    constructor(private apexService: ApexService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url == Props.API_END_POINT + "/filedata") {
            request = request.clone({
                setHeaders: { Authorization: `JWT ${this.getToken()}` }
            });
        } else {
            request = request.clone({
                setHeaders: {
                    "Content-Type": this.CONTENT_TYPE,
                    Authorization: `JWT ${this.getToken()}`
                }
            });
        }

        return next.handle(request).pipe(
            map((resp: HttpResponse<any>) => {
                if (resp && resp.type == 4) {
                    setTimeout(() => {
                        this.apexService.showLoader(false);
                    }, Props.TIME_OUT);

                    if (resp.body) {
                        if (resp.body.status == 1) {
                            return resp.clone({
                                body: resp.body.data
                            });
                        } else {
                            return resp;
                        }
                    } else {
                        return resp;
                    }
                } else {
                }
            })
        );
    }

    public getToken(): string {
        //return Storage.getJWT();'
        return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6eyJpZCI6IkFETUlOIiwicm9sZSI6IkFETUlOIiwibmFtZSI6IlN1cHBvcnQgVXNlciIsImVtYWlsIjoiYWRtaW5AZGZmdGVjaC5jb20iLCJtb2JpbGUiOiIxMjM0NTY3ODkiLCJhY3RpdmUiOnRydWUsInN0YXR1cyI6Ik5BIn0sImlhdCI6MTU1NDIxODc3OX0.dnaXBH6T0dhkMhPrNpPY38IsXLlLZ3ZrYiHf2pJJl28";
    }
    // errorMessage(err: any) {
    //   let message = err.message ? err.message : err;
    //   this.apexService.showMessage(message);
    // }
}
