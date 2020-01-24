import { Component, OnInit, Input } from "@angular/core";
import { NgxGalleryAnimation, NgxGalleryOptions, NgxGalleryImage } from "ngx-gallery";
import { FormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { WelcomeService } from "../../../pages/welcome-page/welcome.service";
import { AppContactUs } from "../../../entities/AppContactUs";
import { LoadService } from "../../../constants/load.service";

@Component({
    selector: "app-property-gachibowli",
    templateUrl: "./property-gachibowli.component.html",
    styleUrls: ["./property-gachibowli.component.css"]
})
export class PropertyGachibowliComponent implements OnInit {
    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];
    UserDetailsForm: FormGroup;

    emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
    mobilePattern = "^[6-9][0-9]{9}$";
    namePattern = "[a-zA-Z ]+$";
    msgPattern = "[a-zA-Z ]+$";

    @Input()
    contact: AppContactUs;

    @Input()
    type: string;
    startLoading: boolean = false;
    displayedColumns: string[] = ["name", "email", "mobile", "message"];
    constructor(private formBuilder: FormBuilder, private loadService: LoadService, private service: WelcomeService) {
        this.contact = new AppContactUs();

        this.UserDetailsForm = this.formBuilder.group({
            name: ["", Validators.compose([Validators.required, Validators.pattern(this.namePattern)])],
            email: ["", [Validators.required, Validators.pattern(this.emailPattern)]],
            mobile: ["", Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern(this.mobilePattern)])],
            message: ["", Validators.compose([Validators.required, Validators.maxLength(250), Validators.pattern(this.msgPattern)])]
        });
    }

    isShow1 = [];
    show1(index) {
        this.clearView(index);
        this.isShow1[index] = true;
    }

    clearView(index) {
        this.isShow1[index] = false;
    }

    ngOnInit() {
        this.galleryOptions = [
            {
                width: "100%",
                height: "500px",
                thumbnailsColumns: 6,
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
                small: "assets/gachibowli/gachibowli8.jpg",
                medium: "assets/gachibowli/gachibowli8.jpg",
                big: "assets/gachibowli/gachibowli8.jpg"
            },
            {
                small: "assets/gachibowli/gachibowli1.jpg",
                medium: "assets/gachibowli/gachibowli1.jpg",
                big: "assets/gachibowli/gachibowli1.jpg"
            },
            {
                small: "assets/gachibowli/gachibowli7.jpg",
                medium: "assets/gachibowli/gachibowli7.jpg",
                big: "assets/gachibowli/gachibowli7.jpg"
            },
            {
                small: "assets/gachibowli/gachibowli20.jpg",
                medium: "assets/gachibowli/gachibowli20.jpg",
                big: "assets/gachibowli/gachibowli20.jpg"
            },
            {
                small: "assets/gachibowli/gachibowli2.jpg",
                medium: "assets/gachibowli/gachibowli2.jpg",
                big: "assets/gachibowli/gachibowli2.jpg"
            },
            {
                small: "assets/gachibowli/gachibowli4.jpg",
                medium: "assets/gachibowli/gachibowli4.jpg",
                big: "assets/gachibowli/gachibowli4.jpg"
            },
            {
                small: "assets/gachibowli/gachibowli17.jpg",
                medium: "assets/gachibowli/gachibowli17.jpg",
                big: "assets/gachibowli/gachibowli17.jpg"
            },
            {
                small: "assets/gachibowli/gachibowli16.jpg",
                medium: "assets/gachibowli/gachibowli16.jpg",
                big: "assets/gachibowli/gachibowli16.jpg"
            },
            {
                small: "assets/gachibowli/gachibowli13.jpg",
                medium: "assets/gachibowli/gachibowli13.jpg",
                big: "assets/gachibowli/gachibowli13.jpg"
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
