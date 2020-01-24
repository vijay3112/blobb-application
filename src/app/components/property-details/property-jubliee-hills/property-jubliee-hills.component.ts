import { Component, OnInit, Input } from "@angular/core";
import { NgxGalleryAnimation, NgxGalleryOptions, NgxGalleryImage } from "ngx-gallery";
import { Property } from "../../../entities/Property";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Props } from "../../../constants/props";
import { AppContactUs } from "../../..//entities/AppContactUs";
import { LoadService } from "../../../constants/load.service";
import { WelcomeService } from "../../../pages/welcome-page/welcome.service";
@Component({
    selector: "app-property-jubliee-hills",
    templateUrl: "./property-jubliee-hills.component.html",
    styleUrls: ["./property-jubliee-hills.component.css"]
})
export class PropertyJublieeHillsComponent implements OnInit {
    UserDetailsForm: FormGroup;
    emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
    mobilePattern = "^[6-9][0-9]{9}$";
    namePattern = "[a-zA-Z ]+$";
    msgPattern = "[a-zA-Z ]+$";
    Props: any = Props;
    @Input()
    property: Property;
    contact: AppContactUs;
    @Input()
    type: string;
    startLoading: boolean = false;

    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];
    displayedColumns: string[] = ["name", "email", "mobile", "message"];
    isShow1 = [];
    show1(index) {
        this.clearView(index);
        this.isShow1[index] = true;
    }

    clearView(index) {
        this.isShow1[index] = false;
    }
    constructor(private formBuilder: FormBuilder, private loadService: LoadService, private service: WelcomeService) {
        this.contact = new AppContactUs;
        this.UserDetailsForm = this.formBuilder.group({
            name: ["", Validators.compose([Validators.required, Validators.pattern(this.namePattern)])],
            email: ["", [Validators.required, Validators.pattern(this.emailPattern)]],
            mobile: ["", Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern(this.mobilePattern)])],
            message: ["", Validators.compose([Validators.required, Validators.maxLength(250), Validators.pattern(this.msgPattern)])]
        });
    }

    ngOnInit() {
        this.galleryOptions = [
            {
                width: "100%",
                height: "500px",
                thumbnailsColumns: 4,
                imageAnimation: NgxGalleryAnimation.Slide
            },
            // max-width 800
            {
                breakpoint: 800,
                width: "100%",
                height: "300px",
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
                small: "assets/jubileehills/jublicr008.jpg",
                medium: "assets/jubileehills/jublicr008.jpg",
                big: "assets/jubileehills/jublicr008.jpg"
            },
            {
                small: "assets/jubileehills/jublicr006.jpg",
                medium: "assets/jubileehills/jublicr006.jpg",
                big: "assets/jubileehills/jublicr006.jpg"
            },
            {
                small: "assets/jubileehills/jublicr009.jpg",
                medium: "assets/jubileehills/jublicr009.jpg",
                big: "assets/jubileehills/jublicr009.jpg"
            },
            {
                small: "assets/jubileehills/jubli004.jpg",
                medium: "assets/jubileehills/jubli004.jpg",
                big: "assets/jubileehills/jubli004.jpg"
            },
            {
                small: "assets/jubileehills/jubli002.jpg",
                medium: "assets/jubileehills/jubli002.jpg",
                big: "assets/jubileehills/jubli002.jpg"
            },
            {
                small: "assets/jubileehills/jublicr010.jpg",
                medium: "assets/jubileehills/jublicr010.jpg",
                big: "assets/jubileehills/jublicr010.jpg"
            }
        ];
    }
    icons: any[] = [
        {
            img: "../../../assets/aminents/towel-1.svg",
            p: "Essentials"
        },
        {
            img: "../../../assets/aminents/computer-screen.svg",
            p: "TV"
        },

        {
            img: "../../../assets/aminents/air-conditioner-1.svg ",
            p: "Air Conditioning"
        },
        {
            img: "../../../assets/aminents/water-heater.svg",
            p: "Heating"
        },
        {
            img: "../../../assets/aminents/elevator.svg",
            p: "Elevator in Building"
        },
        {
            img: "../../../assets/aminents/intercom.svg",
            p: "Buzzer/Wireless Intercom"
        }
    ];
    icons1: any[] = [
        {
            img: "../../../assets/aminents/bellboy.svg",
            p: "Doorman"
        },
        {
            img: "../../../assets/aminents/wifi-connection-signal-symbol.svg",
            p: "Wireless Internet"
        },
        {
            img: "../../../assets/aminents/breakfast.svg",
            p: "Breakfast"
        },
        {
            img: "../../../assets/aminents/parked-car.svg",
            p: "Free Parking on Premises"
        },
        {
            img: "../../../assets/aminents/group-17.svg",
            p: "Family/Kid Friendly"
        },
        {
            img: "../../../assets/aminents/first-aid-kit.svg",
            p: "First Aid Kit"
        }
    ];
    icons2: any[] = [
        {
            img: "../../../assets/aminents/fire.svg",
            p: "Fire Extinguisher"
        }
    ];
    save() {
        this.startLoading = true;
        this.service.contactSave(this.contact).subscribe((data: any) => {
            if (data) {
                console.log(data);
                // this.search();
                this.service.showMessage(data.message);
                this.UserDetailsForm.reset();
            }
            this.startLoading = false;
        });
    }
}
