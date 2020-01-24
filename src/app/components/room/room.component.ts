import { Component, OnInit, Input, Output, OnChanges, SimpleChange, SimpleChanges, EventEmitter } from "@angular/core";
import { ControlContainer, NgForm } from "@angular/forms";
import { Props } from "../../constants/props";
import { LoadService } from "../../constants/load.service";

import { Room } from "../../entities/Room";
@Component({
    selector: "app-room",
    templateUrl: "./room.component.html",
    styleUrls: ["./room.component.css"],
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class RoomComponent implements OnInit {
    Props: Props = Props;
    @Input()
    room: Room = null;

    @Input()
    type: string = "view";

    @Output()
    outputEvent: EventEmitter<any> = new EventEmitter<any>();

    taxAmount: any = 0;
    totalAmount: any;

    @Output()
    toggleDetailsEvent: EventEmitter<any> = new EventEmitter<any>();
    constructor() {
        this.room = new Room();
    }

    ngOnInit() {
        this.calculate();
    }
    features: any[] = [
        {
            imgbalcony: "../../../assets/icons/group-19.svg",
            imgwifi: "../../../assets/icons/wifi-1.svg",
            imgcab: "../../../assets/icons/group-49.svg",
            imgcook: "../../../assets/icons/group-50.svg",
            imgac: "../../../assets/icons/group-51.svg",
            imgnews: "../../../assets/icons/group.svg"
        }
    ];

    toggleDetails(event: any) {
        console.log(event);
        let roomDetail = {
            roomId: this.room.id,
            roomDetailName: event
        };
        this.toggleDetailsEvent.emit(roomDetail);
    }

    ngOnChanges(changes: SimpleChanges) {
        const changeValue: SimpleChange = changes["room"];
        if (changeValue && changeValue.previousValue != changeValue.currentValue) {
            // TO-DO
            this.room = changeValue.currentValue;
        }
    }
    calculate() {
        this.taxAmount = Math.ceil((Number(this.room.paymentTax.cost) * (Number(this.room.paymentTax.cgst) + Number(this.room.paymentTax.sgst))) / 100);
        this.totalAmount = this.room.paymentTax.cost + this.taxAmount;
    }
}
