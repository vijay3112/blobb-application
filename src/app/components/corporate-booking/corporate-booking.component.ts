import { Component, OnInit, Input } from "@angular/core";
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from "ngx-gallery";
import { FormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Props } from "../../constants/props";
import { CorporateBooking } from "../../entities/CorporateBooking";
import { LoadService } from "../../constants/load.service";
import { WelcomeService } from "../../pages/welcome-page/welcome.service";

@Component({
    selector: "app-corporate-booking",
    templateUrl: "./corporate-booking.component.html",
    styleUrls: ["./corporate-booking.component.css"]
})
export class CorporateBookingComponent implements OnInit {
    UserDetailsForm: FormGroup;
    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];
    Props: any = Props;
    emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
    mobilePattern = "^[1-9][0-9]{9}$";
    namePattern = "[a-zA-Z ]+$";
    companyNamePattern = "[a-zA-Z ]+$";
    @Input()
    corporateBooking: CorporateBooking;
    @Input()
    type: string;
    displayedColumns: string[] = ["name", "email", "mobile"];
    startLoading: boolean = false;
    constructor(private formBuilder: FormBuilder, private loadService: LoadService, private service: WelcomeService) {
        this.corporateBooking = new CorporateBooking();
        this.UserDetailsForm = this.formBuilder.group({
            name: ["", Validators.compose([Validators.required, Validators.pattern(this.namePattern)])],
            email: ["", [Validators.required, Validators.pattern(this.emailPattern)]],
            mobile: ["", Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern(this.mobilePattern)])],
            companyName: ["", Validators.compose([Validators.required, Validators.pattern(this.companyNamePattern)])]
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
                small: "assets/img/blobb-gacchi1.png",
                medium: "assets/img/blobb-gacchi1.png",
                big: "assets/img/blobb-gacchi1.png"
            },
            {
                small: "assets/img/blobb-gachi2.jpg",
                medium: "assets/img/blobb-gachi2.jpg",
                big: "assets/img/blobb-gachi2.jpg"
            },
            {
                small: "assets/img/blobb-gachi3.jpg",
                medium: "assets/img/blobb-gachi3.jpg",
                big: "assets/img/blobb-gachi3.jpg"
            },
            {
                small: "assets/img/blobb-gachi4.jpg",
                medium: "assets/img/blobb-gachi4.jpg",
                big: "assets/img/blobb-gachi4.jpg"
            }
        ];
    }

    save() {
        this.startLoading = true;
        this.service.corporateSave(this.corporateBooking).subscribe((data: any) => {
            if (data) {
                console.log(data);
                this.service.showMessage(data.message);
                this.UserDetailsForm.reset();
            }
            this.startLoading = false;
        });
    }
}
