import { Injectable } from "@angular/core";
import { AppService } from "../shared/service/app.service";
import { HttpService } from "../shared/service/http.service";

@Injectable()
export class LoadService {
    private access_service_url = "/accessdata";
    private service_url = "/load";

    constructor(private http: HttpService, private appService: AppService) { }
    accessData(code: String) {
        return this.http.post(this.access_service_url, { data: { code: code } });
    }

    loadData(code: String, key?: String, param?: String) {
        let reqData = {
            key: key,
            param: param
        };
        return this.http.get(this.service_url + "/" + code, { data: reqData });
    }
    getApp() {
        return this.appService;
    }

    codes() {
        return this.loadData("codes");
    }

    countryCodes() {
        return this.loadData("country_codes");
    }

    roles() {
        return this.loadData("roles");
    }

    branches() {
        return this.loadData("branches");
    }
    expensesTypes() {
        return this.loadData("expenses_types");
    }
    users() {
        return this.loadData("users");
    }

    profiles() {
        return this.loadData("profiles");
    }
    servicesTypes() {
        return this.loadData("services_types");
    }
    services() {
        return this.loadData("services");
    }
    verficationStatus() {
        return this.loadData("verification_status");
    }
    propertyAll() {
        return this.loadData("property_all");
    }
    property() {
        return this.loadData("property");
    }
    supervisors() {
        return this.loadData("supervisors");
    }
    roomTypes() {
        return this.loadData("room_types");
    }
    // roomGuests() {
    //     return this.loadData("room_guests");
    // }
}
