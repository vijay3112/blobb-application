import { Injectable } from "@angular/core";
import { HttpService } from "../shared/service/http.service";
import { AppService } from "../shared/service/app.service";
import { NavService } from "../constants/nav.service";
import { MENU } from "../constants/menu";

@Injectable({
    providedIn: "root"
})
export class BookingsService {
    private profile_url = "/profile";
    private room_book_url = "/roombook";
    private available_rooms_url = "/roombook/avaliblerooms";
    private room_persons_url = "/roompersons";
    private room_orders_url = "/roomorders";
    private property_url = "/property";
    private lockRoom_cache_url = "/cache/lockroom";
    private unLockRoom_cache_url = "/cache/unlockroom";

    constructor(private http: HttpService, private navService: NavService, private appService: AppService) {}

    getNav(): NavService {
        return this.navService;
    }
    getApp(): AppService {
        return this.appService;
    }
    getParam(key: string): string {
        return this.navService.param(key);
    }
    showMessage(message: string) {
        this.appService.showMessage(message);
    }
    storeData(property: string, fromDate: string, toDate: string, timeFrame: string, persons: string) {
        this.appService.setSessionItem("property", property);
        this.appService.setSessionItem("fromDate", fromDate);
        this.appService.setSessionItem("toDate", toDate);
        this.appService.setSessionItem("timeFrame", timeFrame);
        this.appService.setSessionItem("persons", persons);
    }
    searchProfile(filter: any) {
        return this.http.get(this.profile_url, { data: filter });
    }
    saveProfileData(data: any) {
        return this.http.put(this.profile_url, { data: data });
    }
    saveBookRoom(data: any) {
        return this.http.put(this.room_book_url, { data: data }, true);
    }
    saveBookRooms(data: any) {
        return this.http.put(this.room_book_url + "/bookrooms", { data: data }, true);
    }
    propertyEntity(id: any) {
        return this.http.get(this.property_url + "/" + id, {});
    }
    bookingEdit(params: any) {
        this.appService.navigate(MENU.BOOKING_EDIT.link, params);
    }
    getRoomBookList(filter: any) {
        return this.http.get(this.room_book_url, { data: filter });
    }
    getAvailableRoomsList(filter: any) {
        return this.http.get(this.available_rooms_url, { data: filter });
    }
    roomBookEntityData(id: any) {
        return this.http.get(this.room_book_url + "/" + id, {});
    }
    // showMessage(message: string) {
    //     this.appService.showMessage(message);
    // }
    getRoomPersons(data) {
        return this.http.get(this.room_persons_url, { data: data });
    }
    saveRoomPerson(data) {
        return this.http.put(this.room_persons_url, { data: data }, true);
    }
    deleteRoomPerson(id) {
        return this.http.delete(this.room_persons_url + "/" + id, {});
    }
    getRoomOrders(data) {
        return this.http.get(this.room_orders_url, { data: data });
    }
    saveRoomOrders(data) {
        return this.http.put(this.room_orders_url, { data: data }, true);
    }
    deleteRoomOrders(id) {
        return this.http.delete(this.room_orders_url + "/" + id, {});
    }
    lockRoom(data: any) {
        return this.http.get(this.lockRoom_cache_url, { data: data });
    }
    unLockRoom(data: any) {
        return this.http.get(this.unLockRoom_cache_url, { data: data });
    }
    bookingSearch(params: any) {
        this.appService.navigate(MENU.BOOKING_SEARCH.link, params);
    }
    invoiceRooms(data: any) {
        return this.http.get(this.room_book_url + "/invoiceRooms", { data: data }, true);
    }
}
