import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Profile } from "../../../entities/Profile";
declare var Razorpay: any;

@Component({
    selector: "razor-pay",
    templateUrl: "./razor-pay.component.html",
    styleUrls: ["./razor-pay.component.css"]
})
export class RazorPayComponent {
    @Input() isValid: boolean;
    @Input() amount: number;
    @Input() profile: Profile;

    @Output() onPayment: EventEmitter<any> = new EventEmitter();

    constructor() { }
    openRazorpayCheckout() {
        console.log(this.isValid);
        let options = {
            key: "rzp_test_4Aa5HNWp8jRmkZ",
            amount: this.amount * 100,
            name: "DffTech",
            description: "Purchase Description",
            prefill: {
                name: this.profile.name,
                email: this.profile.email,
                contact: this.profile.mobile
            },
            theme: {
                color: "#f73f5b"
            },
            handler: this.paymentResponseHander.bind(this)
        };

        let rzp = new Razorpay(options);
        rzp.open();
    }

    paymentResponseHander(response) {
        this.onPayment.emit(response.razorpay_payment_id);
    }
}
