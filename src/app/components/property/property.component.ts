import { Component, OnInit } from "@angular/core";
import { LoadService } from "../../constants/load.service";

@Component({
    selector: "app-property",
    templateUrl: "./property.component.html",
    styleUrls: ["./property.component.css"]
})
export class PropertyComponent implements OnInit {
    propertyList: any[] = [];
    selectedProperty: string = null;

    constructor(private loadService: LoadService) { }
    cards: any[] = [
        {

            name: "Banjara Hills",
            imageUrl: "../../../assets/banjarahills/Executive Suite View.jpg",
            altImg: "Banjara Hills",
            routerLink: "../BanjaraHills"
        },
        {

            name: "Jubilee Hills",
            imageUrl: "../../../assets/jubileehills/jublicr007.jpg",
            altImg: "Jubliee Hills",
            routerLink: "../JublieeHills"
        },
        {

            name: " Gachibowli",
            imageUrl: "../../../assets/gachibowli/gachibowli32.jpg",
            altImg: "Gachibowli",
            routerLink: "../Gachibowli"
        }
    ];

    ngOnInit() {
        // this.getProperties();
    }
    // getProperties() {
    //     this.loadService.propertyAll().subscribe((data: any) => {
    //         if (!!data && data.length) {
    //             this.propertyList = data;
    //             console.log(this.propertyList);
    //         }
    //     });
    // }
    // edit(id: any) {
    //     this.propertyService.getNav().propertyEdit({ id: id });
    // }
}
