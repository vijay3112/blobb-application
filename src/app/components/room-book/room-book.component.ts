import { Component, OnInit, Input, Output, OnChanges, SimpleChange, SimpleChanges, EventEmitter } from "@angular/core";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";

import { Props } from "../../constants/props";
import { LoadService } from "../../constants/load.service";
import { RoomBook } from "../../entities/RoomBook";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";

@Component({
    selector: "app-room-book",
    templateUrl: "./room-book.component.html",
    styleUrls: ["./room-book.component.css"]
})
export class RoomBookComponent implements OnInit, OnChanges {
    datePickerConfig: Partial<BsDatepickerConfig>;
    minDate: Date;
    maxDate: Date;
    frTime: any;
    bsConfig: object;

    isDisabled: boolean = true;

    Props: Props = Props;
    propertiesForm: FormGroup;
    bookTypesForm: FormGroup;
    bookTypes: any;
    propertyList: any[] = [];
    nextDay: any;
    @Input()
    roomBook: RoomBook = null;
    @Input()
    personsSelectionObj: { selectedNoOFPersons: number; maximumNoOfPersonsAvailable: number; totalSelectedRoomPersons: number };

    @Input()
    type: string;

    @Output()
    outputEvent: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    outputPeriodOnChange: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    outputPerosnsOnChange: EventEmitter<any> = new EventEmitter<any>();

    constructor(private loadService: LoadService) {
        this.datePickerConfig = Object.assign({}, { showWeekNumbers: false, dateInputFormat: "DD/MM/YYYY" });
        this.minDate = new Date();
        this.minDate.setDate(this.minDate.getDate());
        let timeFrame = this.loadService.getApp().getSessionItem("timeFrame");
        this.frTime = timeFrame;
    }

    ngOnInit() {
        //this.loadProperties();
    }

    ngOnChanges(changes: SimpleChanges) {
        const roomBookValue: SimpleChange = changes["roomBook"];
        const seletecPersonsValue: SimpleChange = changes["selectedNoOFPersons"];
        if (roomBookValue && roomBookValue.currentValue && roomBookValue.previousValue != roomBookValue.currentValue) {
            //this.roomBook = changeValue.currentValue;
            //this.loadProperties();
        }
        if (seletecPersonsValue && seletecPersonsValue.currentValue && seletecPersonsValue.previousValue != seletecPersonsValue.currentValue) {
            //this.roomBook = changeValue.currentValue;
        }
    }
    loadProperties() {
        this.loadService.property().subscribe((data: any) => {
            if (!!data) {
                this.propertyList = data;
                this.roomBook.room.property.id = data[0].val;
            } else {
                this.propertyList = [];
            }
        });
    }
    onPersonsSelected() {
        setTimeout(() => {
            this.outputPerosnsOnChange.emit(this.personsSelectionObj.selectedNoOFPersons);
            this.loadService.getApp().setSessionItem("persons", this.personsSelectionObj.selectedNoOFPersons);
        }, 100);
    }
    onChangeHour(event) {
        setTimeout(() => {
            if (event) {
                this.frTime = event;
                this.loadService.getApp().setSessionItem("timeFrame", this.frTime);
                this.onChangeFilter(null);
            }
        });
    }

    onChangeFilter(event: any) {
        setTimeout(() => {
            // this.roomBook.fromDate.setHours(0, 0, 0, 0);
            // this.roomBook.toDate.setHours(0, 0, 0, 0);
            // this.outputPeriodOnChange.emit(this.roomBook);
            // if (Util.DaysDiff(this.roomBook.fromDate, this.roomBook.toDate) > 0) {

            if (this.frTime) {
                this.roomBook.fromDate.setHours(this.frTime.split(":")[0]);
                this.roomBook.fromDate.setMinutes(this.frTime.split(":")[1]);
                this.roomBook.fromDate.setSeconds(0);
                this.roomBook.toDate.setHours(this.frTime.split(":")[0]);
                this.roomBook.toDate.setMinutes(this.frTime.split(":")[1]);
                this.roomBook.toDate.setSeconds(0);
                this.outputPeriodOnChange.emit(this.roomBook);
                this.loadService.getApp().setSessionItem("fromDate", this.roomBook.fromDate.toISOString());
                this.loadService.getApp().setSessionItem("toDate", this.roomBook.fromDate.toISOString());
            }

            // } else {
            //     this.loadService.getApp().showMessage("To Date should be greater then From Date!");
            //     //this.roomBook.toDate = Util.DaysBack(this.roomBook.fromDate, -1);
            // }
        }, 100);
    }

    callRate($event: any) {
        this.personsSelectionObj.selectedNoOFPersons =
            $event == "+" ? this.personsSelectionObj.selectedNoOFPersons + 1 : this.personsSelectionObj.selectedNoOFPersons - 1;
    }
}
