import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Props } from "../../constants/props";
import { Util } from "../utils/util";
import { ApexService } from "./apex.service";

@Injectable()
export class HttpService {
    private host = Props.API_END_POINT;
    private altHost = Props.API_END_POINT;

    constructor(private http: HttpClient, private apexService: ApexService) {}

    get(url: string, data: any, loader?: boolean) {
        this.apexService.showLoader(loader ? true : false);
        let paramString = Util.GetParamString(data ? data.data : {});
        url = this.host + url + paramString;
        return this.http.get(url);
    }

    post(url: string, data: any, loader?: boolean) {
        this.apexService.showLoader(loader ? true : false);
        url = this.host + url;
        return this.http.post(url, data);
    }

    put(url: string, data: any, loader?: boolean) {
        this.apexService.showLoader(loader ? true : false);
        url = this.host + url;
        return this.http.put(url, data);
    }

    delete(url: string, data: any, loader?: boolean) {
        this.apexService.showLoader(loader ? true : false);
        let paramString = Util.GetParamString(data ? data : {});
        url = this.host + url + paramString;
        return this.http.delete(url);
    }

    formData(url: string, _formData: FormData, loader?: boolean) {
        this.apexService.showLoader(loader ? true : false);
        url = this.host + url;
        return this.http.post(url, _formData);
    }

    getAlt(url: string, data: any, loader?: boolean) {
        this.apexService.showLoader(loader ? true : false);
        let paramString = Util.GetParamString(data ? data.data : {});
        url = this.altHost + url + paramString;
        return this.http.get(url);
    }

    postAlt(url: string, data: any, loader?: boolean) {
        this.apexService.showLoader(loader ? true : false);
        url = this.altHost + url;
        return this.http.post(url, data);
    }

    putAlt(url: string, data: any, loader?: boolean) {
        this.apexService.showLoader(loader ? true : false);
        url = this.altHost + url;
        return this.http.put(url, data);
    }
}
