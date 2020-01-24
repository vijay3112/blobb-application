import { PaymentTax } from "./PaymentTax";
import { PaymentAddon } from "./PaymentAddon";
export class Payment {
    id: string;
    type: string = "ONLINE";
    cost: number;
    units: number = 1;
    price: number;
    cgst: number;
    sgst: number;
    igst: number;
    discount: number;
    cgstPrice: number;
    sgstPrice: number;
    igstPrice: number;
    discountPrice: number;
    amount: number;
    isIgst: boolean = false;
    paymentId: string;
    ref: string;
    refType: string;
    status: string;
    paymentAddonList: PaymentAddon[] = [];

    setData(tax: PaymentTax) {
        this.cost = tax.cost;
        this.cgst = tax.cgst;
        this.sgst = tax.sgst;
        this.igst = tax.igst;
    }
}
