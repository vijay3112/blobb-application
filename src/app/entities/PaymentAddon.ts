import { Payment } from './Payment';  

export class PaymentAddon { 
    id: string ; 
    type: string ; 
    amount: number ; 
    summary: string ; 
    payment: Payment = new Payment();   
}
