import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from "ngx-gallery";

@Component({
    selector: "app-room-details",
    templateUrl: "./room-details.component.html",
    styleUrls: ["./room-details.component.css"]
})
export class RoomDetailsComponent implements OnInit {
    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];

    @Output()
    toggleDetailsEvent: EventEmitter<any> = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {
        this.galleryOptions = [
            {
                width: "600px",
                height: "210px",
                thumbnailsColumns: 4,
                imageAnimation: NgxGalleryAnimation.Slide
            },
            // max-width 800
            {
                breakpoint: 800,
                width: "100%",
                height: "310px",
                imagePercent: 80,
                thumbnailsPercent: 20,
                thumbnailsMargin: 20,
                thumbnailMargin: 20
            },
            // max-width 400
            {
                breakpoint: 400,
                preview: false
            }
        ];

        this.galleryImages = [
            {
                small: "assets/banjarahills/banjara5.jpg",
                medium: "assets/banjarahills/banjara5.jpg",
                big: "assets/banjarahills/banjara5.jpg"
            },
            {
                small: "assets/jubileehills/jublicr009.jpg",
                medium: "assets/jubileehills/jublicr009.jpg",
                big: "assets/jubileehills/jublicr009.jpg",
            },
            {
                small: "assets/gachibowli/gachibowli28.jpg",
                medium: "assets/gachibowli/gachibowli28.jpg",
                big: "assets/gachibowli/gachibowli28.jpg"
            },
            {
                small: "assets/gachibowli/gachibowli29.jpg",
                medium: "assets/gachibowli/gachibowli29.jpg",
                big: "assets/gachibowli/gachibowli29.jpg",
            }
        ];
    }

    toggleDetails(event: any) {
        this.toggleDetailsEvent.emit(event);
    }
}
