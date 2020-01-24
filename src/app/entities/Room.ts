import { Flat } from "./Flat";
import { Property } from "./Property";
import { PaymentTax } from "./PaymentTax";

export class Room {
    id: string;
    name: string;
    type: string;
    extPhone: string;
    channelMangerActive: boolean;
    persons: number = 2;
    addonPersons: number;
    addonPersonsCost: number;
    paymentTax: PaymentTax = new PaymentTax();
    summary: string;
    active: boolean = true;
    flat: Flat = new Flat();
    property: Property = new Property();
    isLock: boolean = false;
}
