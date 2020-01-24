import { RoomBook } from "./RoomBook";

export class RoomBookTrack {
    id: string;
    status: string;
    updatedBy: string;
    updatedOn:  Date;
    roomBook: RoomBook = new RoomBook();
}
