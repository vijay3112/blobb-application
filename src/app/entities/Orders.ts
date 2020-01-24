import { Property } from './Property';
import {PaymentTax} from './PaymentTax'

export class Orders { 
    id: string ; 
    name: string ; 
    type: string ; 
    paymentTax: PaymentTax = new PaymentTax();
    active: boolean ; 
    property: Property = new Property();   
}
