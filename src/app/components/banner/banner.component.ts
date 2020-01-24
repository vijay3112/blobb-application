import { Component, OnInit, Input, SimpleChange, SimpleChanges, ViewChild, ElementRef } from "@angular/core";
import { LoadService } from "../../constants/load.service";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import { RoomBook } from "../../entities/RoomBook";
import { Room } from "../../entities/Room";
import { BookingsService } from "../../services/bookings.service";

import { Util } from "../../shared/utils/util";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { NgxMaterialTimepickerTheme } from "ngx-material-timepicker";

@Component({
    selector: "app-banner",
    templateUrl: "./banner.component.html",
    styleUrls: ["./banner.component.css"]
})
export class BannerComponent implements OnInit {
    propertyList: any[] = [];
    roomList: any[] = [];
    selectedProperty: string = "";
    seletcedPersons: string = null;
    bookTypes: any;
    datePickerConfig: Partial<BsDatepickerConfig>;
    searchObj: any;
    maxDate: Date;
    frTime: any = { format: 24 };
    UserDetailsForm: FormGroup;
    @Input()
    roomBook: RoomBook = null;

    minDate: Date;
    bsConfig: object;
    // @Input()
    // room: Room = null;

    @Input()
    type: string;

    @Input()
    room: Room;

    // mytime: Date | undefined = new Date();
    // isValid: boolean;

    // update(): void {
    //     const time = new Date();
    //     time.setHours(14);
    //     time.setMinutes(0);

    //     this.mytime = time;
    // }

    // changed(): void {
    //     console.log(`Time changed to: ${this.mytime}`);
    // }

    // clear(): void {
    //     this.mytime = void 0;
    // }

    // currentDate = new Date();
    // form = new FormGroup({
    //     dateFull: new FormControl(new Date())
    // });

    @ViewChild("roomBook_fromDate") fromDate: ElementRef;
    constructor(private loadService: LoadService, private el: ElementRef, private bookingsService: BookingsService, private formBuilder: FormBuilder) {
        this.roomBook = new RoomBook();
        this.room = new Room();
        this.datePickerConfig = Object.assign({}, { showWeekNumbers: false, dateInputFormat: "DD/MM/YYYY" });
        this.minDate = this.roomBook.fromDate = new Date();
        this.minDate.setDate(this.minDate.getDate());
        this.frTime = new Date().getHours() + ":" + new Date().getMinutes();
        // this.frTime.hour = new Date().getHours();
        // this.frTime.minute = new Date().getMinutes();
        this.UserDetailsForm = this.formBuilder.group({
            date: ["", [Validators.required]],
            date1: ["", [Validators.required]],
            time1: ["", [Validators.required]],
            selectedProperty: [Validators.required]
        });
    }
    // minDate: new Date(2018, 0, 1), maxDate: new Date(2018, 11, 31)

    ngOnInit() {
        // this.roomBook.fromDate = Util.CurrentDate();
        // this.roomBook.toDate = Util.CurrentDate();
        this.getProperties();
        // this.getRoom();
        // this.loadRoomTypes();
    }
    ngOnChanges(changes: SimpleChanges) {
        const changeValue: SimpleChange = changes["roomBook"];
        if (changeValue && changeValue.previousValue != changeValue.currentValue) {
            this.roomBook = changeValue.currentValue;
        }
    }
    // loadRoomTypes() {
    //     this.loadService.roomTypes().subscribe(data => {
    //         if (data) {
    //             this.bookTypes = data;
    //             console.log(this.bookTypes);
    //         } else {
    //             this.bookTypes = [];
    //         }
    //     });
    // }
    // items: any[] = [
    //     {
    //         para1: "1 Persons",
    //         para2: "2 Persons",
    //         para3: "3 Persons"
    //     }
    // ];

    // getRoom() {
    //     this.loadService.roomGuests().subscribe((data: any) => {
    //         if (!!data && data.length) {
    //             this.roomList = data;
    //             console.log(this.roomList);
    //             this.seletcedPersons = data[0].val;
    //         } else {
    //             this.seletcedPersons = "";
    //             this.roomList = [];
    //         }
    //     });
    // }

    getProperties() {
        this.loadService.propertyAll().subscribe((data: any) => {
            if (!!data && data.length) {
                this.propertyList = data;
                console.log(this.propertyList);
                // this.selectedProperty = "Select a Property";
            } else {
                this.selectedProperty = "";
                this.propertyList = [];
            }
        });
    }
    callRate($event: any) {
        this.room.persons = $event == "+" ? this.room.persons + 1 : this.room.persons - 1;
    }

    search() {
        console.log(this.roomBook.fromDate);
        if (this.frTime) {
            this.roomBook.fromDate.setHours(this.frTime.split(":")[0]);
            this.roomBook.fromDate.setMinutes(this.frTime.split(":")[1]);
            this.roomBook.fromDate.setSeconds(0);
            // this.roomBook.fromDate.setHours(0, 0, 0, 0);
            this.roomBook.toDate.setHours(this.frTime.split(":")[0]);
            this.roomBook.toDate.setMinutes(this.frTime.split(":")[1]);
            this.roomBook.toDate.setSeconds(0);
        }

        console.log(this.roomBook.fromDate);
        // alert(this.frTime.hour);
        // alert(this.roomBook.fromDate);

        this.searchObj = {
            property: this.selectedProperty,
            fromDate: this.roomBook.fromDate.toISOString(),
            toDate: this.roomBook.toDate.toISOString(),
            noOfPersons: this.room.persons
        };
        this.bookingsService.storeData(this.searchObj.property, this.searchObj.fromDate, this.searchObj.toDate, this.frTime, this.searchObj.noOfPersons);
        this.bookingsService.getNav().booking({});
        console.log(this.searchObj);
    }
}
