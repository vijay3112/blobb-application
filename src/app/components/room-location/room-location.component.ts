import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "app-room-location",
    templateUrl: "./room-location.component.html",
    styleUrls: ["./room-location.component.css"]
})
export class RoomLocationComponent implements OnInit {
    @Output()
    toggleDetailsEvent: EventEmitter<any> = new EventEmitter<any>();


    constructor() { }

    ngOnInit() { }

    toggleDetails(index) {
        this.toggleDetailsEvent.emit(event);
    }
}
