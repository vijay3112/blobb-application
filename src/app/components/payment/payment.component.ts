import { Component, OnInit, Input, Output, OnChanges, SimpleChange, SimpleChanges, EventEmitter } from "@angular/core";
import { ControlContainer, NgForm } from "@angular/forms";
import { Props } from "../../constants/props";
import { LoadService } from "../../constants/load.service";

import { Payment } from "../../entities/Payment";
@Component({
    selector: "app-payment",
    templateUrl: "./payment.component.html",
    styleUrls: ["./payment.component.css"],
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class PaymentComponent implements OnInit {
    Props: Props = Props;

    @Input()
    payment: Payment = null;

    @Input()
    type: string = "view";

    @Output()
    outputEvent: EventEmitter<any> = new EventEmitter<any>();

    constructor(private loadService: LoadService) {
        this.payment = new Payment();
    }

    ngOnInit() {
        this.payment.amount = 0;
        this.calculate();
    }

    ngOnChanges(changes: SimpleChanges) {
        const changeValue: SimpleChange = changes["payment"];
        if (changeValue && changeValue.previousValue != changeValue.currentValue) {
            // TO-DO
            this.payment = changeValue.currentValue;
        }
    }
    calculate() {
        // this.taxAmount = ((Number(this.payment.cost) * (Number(this.payment.cgst) + Number(this.payment.sgst)) / 100));
        // this.totalAmount = this.room.cost + this.taxAmount
        if (this.payment) {
            this.payment.price = this.payment.cost * this.payment.units;
            this.payment.cgstPrice = (Number(this.payment.price) * Number(this.payment.cgst)) / 100;
            this.payment.sgstPrice = (Number(this.payment.price) * Number(this.payment.sgst)) / 100;
            this.payment.igstPrice = (Number(this.payment.price) * Number(this.payment.igst)) / 100;
            if (this.payment.isIgst) {
                this.payment.amount = this.payment.price + this.payment.igstPrice;
            } else {
                this.payment.amount = this.payment.price + this.payment.cgstPrice + this.payment.sgstPrice;
            }
            if (this.payment.price == 0) {
                this.payment.amount = 0;
            }
        }
    }
}
