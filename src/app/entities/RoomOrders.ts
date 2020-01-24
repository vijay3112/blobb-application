import { Orders } from './Orders';import { Payment } from './Payment';import { RoomBook } from './RoomBook';  

export class RoomOrders { 
    id: string ; 
    transactionDate: any= new Date() ; 
    summary: string ; 
    orders: Orders = new Orders(); 
    payment: Payment = new Payment(); 
    roomBook: RoomBook = new RoomBook();   
}
