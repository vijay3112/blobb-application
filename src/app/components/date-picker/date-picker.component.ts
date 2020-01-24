import { Component, OnInit } from "@angular/core";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import { LoadService } from "../../constants/load.service";

@Component({
    selector: "app-date-picker",
    templateUrl: "./date-picker.component.html",
    styleUrls: ["./date-picker.component.css"]
})
export class DatePickerComponent implements OnInit {
    datePickerConfig: Partial<BsDatepickerConfig>;
    bookTypes: any;

    constructor(private loadService: LoadService) {
        // this.datePickerConfig = Object.assign(
        //     {},
        //     { showWeekNumbers: false, dateInputFormat: "DD/MM/YYYY", minDate: new Date(2018, 0, 1), maxDate: new Date(2018, 11, 31) }
        // );
    }

    ngOnInit() {}
}
