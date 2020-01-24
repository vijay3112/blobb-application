import { Injectable } from "@angular/core";
import { AppService } from "../shared/service/app.service";
import { HttpService } from "../shared/service/http.service";
import { Storage } from "../shared/utils/storage";
import { MENU } from "./menu";

@Injectable()
export class NavService {
    constructor(private appService: AppService) {}

    param(key: string) {
        return this.appService.getParam(key);
    }
    navigate(link, params) {
        this.appService.navigate(link, params);
    }
    navParam(key: string) {
        return this.appService.getParam(key);
    }

    /**
     * navigate
     */
    welcome(params: any) {
        this.appService.navigate(MENU.WELCOME.link, params);
    }
    dashBoard(params: any) {
        this.appService.navigate(MENU.DASHBOARD.link, params);
    }
    home(params: any) {
        this.appService.navigate(MENU.HOME.link, params);
    }
    signin(params: any) {
        this.appService.navigate(MENU.SIGN_IN.link, params);
    }
    signup(params: any) {
        this.appService.navigate(MENU.SIGN_UP.link, params);
    }
    forgotPassword(params: any) {
        this.appService.navigate(MENU.FORGOT_PASSWORD.link, params);
    }
    resetPassword(params: any) {
        this.appService.navigate(MENU.RESET_PASSWORD.link, params);
    }
    profileEdit(params: any) {
        this.appService.navigate(MENU.PROFILE_EDIT.link, params);
    }
    profileSearch(params: any) {
        this.appService.navigate(MENU.PROFILE_SEARCH.link, params);
    }
    myProfile(params: any) {
        this.appService.navigate(MENU.MY_PROFILE.link, params);
    }
    changePassword(params: any) {
        this.appService.navigate(MENU.CHANGE_PASSWORD.link, params);
    }
    propertyEdit(params: any) {
        this.appService.navigate(MENU.PROPERTY_EDIT.link, params);
    }

    bookingEdit(params: any) {
        this.appService.navigate(MENU.BOOKING_EDIT.link, params);
    }
    propertySearch(params: any) {
        this.appService.navigate(MENU.PROPERTY_SEARCH.link, params);
    }

    booking(params: any) {
        this.appService.navigate(MENU.BOOKING.link, params);
    }

    bookingSearch(params: any) {
        this.appService.navigate(MENU.BOOKING_SEARCH.link, params);
    }
    invoiceGenerate(params: any) {
        this.appService.navigate(MENU.INVOICE.link, params);
    }
    /**
     * load
     */
}
