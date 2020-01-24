import { Injectable } from "@angular/core";
import { AppService } from "../../shared/service/app.service";
import { HttpService } from "../../shared/service/http.service";
import { NavService } from "../../constants/nav.service";
import { LoadService } from "../../constants/load.service";
import { MENU } from "../../constants/menu";

@Injectable({
    providedIn: "root"
})
export class WelcomeService {
    getApp() {
        throw new Error("Method not implemented.");
    }
    private service_url = "/property";
    private feedback_url = "/feedback";
    private available_rooms_url = "/roombook/avaliblerooms";
    private corporatebooking_url = "/corporatebooking";
    private contact_us_url = "/webcontactus";
    private subscribe_url = "/webcontactus";

    constructor(private http: HttpService, private appservice: AppService, private navservice: NavService, private loadservice: LoadService) {}

    getNav(): NavService {
        return this.navservice;
    }
    save(data: any) {
        return this.http.put(this.feedback_url, { data: data }, true);
    }
    showMessage(message: string) {
        this.appservice.showMessage(message);
    }
    bookingEdit(params: any) {
        this.appservice.navigate(MENU.BOOKING_EDIT.link, params);
    }
    getFeedback(filter: any) {
        return this.http.get(this.feedback_url, { data: filter });
    }

    entityData(id: any) {
        return this.http.get(this.feedback_url + "/" + id, {});
    }
    getAvailableRoomsList(filter: any) {
        return this.http.get(this.available_rooms_url, { data: filter });
    }
    corporateEntityData(id: any) {
        return this.http.get(this.corporatebooking_url + "/" + id, {});
    }
    corporateSave(data: any) {
        return this.http.put(this.corporatebooking_url, { data: data }, true);
    }
    contactEntityData(id: any) {
        return this.http.get(this.contact_us_url + "/" + id, {});
    }
    contactSave(data: any) {
        data.subscribe = false;
        data.active = true;
        return this.http.put(this.contact_us_url, { data: data }, true);
    }
    subscribeSave(data: any) {
        data.subscribe = true;
        data.active = true;
        if (data.email) {
            data.name = data.email.substring(0, data.email.indexOf("@"));
        }
        data.mobile = "000000000";
        return this.http.put(this.subscribe_url, { data: data }, true);
    }
}
