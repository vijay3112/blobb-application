import { RoomBook } from './RoomBook';import { FileData } from './FileData';import { Img } from './Img';  

export class RoomPersons { 
    id: string ; 
    name: string ; 
    email: string ; 
    mobile: string ; 
    doc: string ; 
    roomBook: RoomBook = new RoomBook(); 
    fileData: FileData = new FileData(); 
    img: Img = new Img();   
}
