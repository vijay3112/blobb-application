import { Component, OnInit, Input } from "@angular/core";
import { NgxGalleryAnimation, NgxGalleryOptions, NgxGalleryImage } from "ngx-gallery";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Props } from "../../../constants/props";
import { AppContactUs } from "../../../entities/AppContactUs";
import { LoadService } from "../../../constants/load.service";
import { WelcomeService } from "../../../pages/welcome-page/welcome.service";

@Component({
    selector: "app-property-banjara-hills",
    templateUrl: "./property-banjara-hills.component.html",
    styleUrls: ["./property-banjara-hills.component.css"]
})
export class PropertyBanjaraHillsComponent implements OnInit {
    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];
    UserDetailsForm: FormGroup;
    emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
    mobilePattern = "^[6-9][0-9]{9}$";
    namePattern = "[a-zA-Z ]+$";
    msgPattern = "[a-zA-Z ]+$";
    Props: any = Props;
    isShow1 = [];
    @Input()
    contact: AppContactUs;
    @Input()
    type: string;
    startLoading: boolean = false;
    displayedColumns: string[] = ["name", "email", "mobile", "message"];
    show1(index) {
        this.clearView(index);
        this.isShow1[index] = true;
    }

    clearView(index) {
        this.isShow1[index] = false;
    }
    constructor(private formBuilder: FormBuilder, private loadService: LoadService, private service: WelcomeService) {
        this.contact = new AppContactUs();
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
                small: "assets/banjarahills/banjara9.jpg",
                medium: "assets/banjarahills/banjara9.jpg",
                big: "assets/banjarahills/banjara9.jpg"
            },
            {
                small: "assets/banjarahills/banjara3.jpg",
                medium: "assets/banjarahills/banjara3.jpg",
                big: "assets/banjarahills/banjara3.jpg"
            },
            {
                small: "assets/banjarahills/Kitchenette.jpg",
                medium: "assets/banjarahills/Kitchenette.jpg",
                big: "assets/banjarahills/Kitchenette.jpg"
            },
            {
                small: "assets/banjarahills/banjara1.jpg",
                medium: "assets/banjarahills/banjara1.jpg",
                big: "assets/banjarahills/banjara1.jpg"
            },

            {
                small: "assets/banjarahills/banjara5.jpg",
                medium: "assets/banjarahills/banjara5.jpg",
                big: "assets/banjarahills/banjara5.jpg"
            },

            {
                small: "assets/banjarahills/banjara7.jpg",
                medium: "assets/banjarahills/banjara7.jpg",
                big: "assets/banjarahills/banjara7.jpg"
            },
            {
                small: "assets/banjarahills/banjara2.jpg",
                medium: "assets/banjarahills/banjara2.jpg",
                big: "assets/banjarahills/banjara2.jpg"
            },
            {
                small: "assets/banjarahills/banjara14.jpg",
                medium: "assets/banjarahills/banjara14.jpg",
                big: "assets/banjarahills/banjara14.jpg"
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
