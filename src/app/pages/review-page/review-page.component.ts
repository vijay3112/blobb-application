import { Component, OnInit } from "@angular/core";
import { BookingsService } from "../../services/bookings.service";
import { Util } from "../../shared/utils/util";

@Component({
    selector: "app-review-page",
    templateUrl: "./review-page.component.html",
    styleUrls: ["./review-page.component.css"]
})
export class ReviewPageComponent implements OnInit {
    item: any = {};
    items: any = [];
    constructor(private servie: BookingsService) {
        let ref = this.servie.getParam("refs");
        this.getBookingDetails(ref);
    }

    getBookingDetails(ref: string) {
        this.servie.invoiceRooms({ ids: ref }).subscribe(data => {
            if (data) {
                if (data[0]) {
                    this.item.name = data[0].profile.name;
                    this.item.mobile = data[0].profile.mobile;
                    this.item.email = data[0].profile.email;
                    this.item.bookingDate = data[0].updatedOn;
                    this.item.fromDate = data[0].fromDate;
                    this.item.toDate = data[0].toDate;
                    this.item.invoice = data[0].invoice;
                    this.item.units = Util.DaysDiff(new Date(data[0].fromDate), new Date(data[0].toDate));
                }
                this.items = data;
            }
        });
    }
    ngOnInit() {}
}
