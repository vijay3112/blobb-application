import { Property } from "./Property";
import { Room } from "./Room";
import { RoomBook } from "./RoomBook";

export class Flat {
    id: string;
    name: string;
    //type: string ;
    floor: string;
    active: boolean;
    property: Property = new Property();
    rooms: Room[];
    roomBookList: RoomBook[] = [];
    isAllFlatsSelected: boolean = false;
    disabledFlatCheck: boolean = false;
}
