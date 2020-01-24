import { Profile } from "./Profile";
import { Payment } from "./Payment";
import { Room } from "./Room";
import { Props } from "../constants/props";

export class RoomBook {
    id: string;
    invoice: string;
    bookType: string = "BOOKING";
    fromDate: Date;
    toDate: Date;
    advance: number;
    balance: number;
    price: number;
    cgstPrice: number;
    sgstPrice: number;
    igstPrice: number;
    amount: number;
    profile: Profile = new Profile();
    payment: Payment = new Payment();
    room: Room = new Room();
    active: boolean = true;
    status: string = Props.TRACK_STATUS_BOOKING;
    isSelected: boolean = false;
    isRoomLockedInCache: Boolean = false;
    updatedOn: Date;
}
