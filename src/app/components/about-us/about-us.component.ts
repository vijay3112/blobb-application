import { Component, OnInit, Input } from "@angular/core";
import { Props } from "../../constants/props";
import { AppContactUs } from "../../entities/AppContactUs";
import { LoadService } from "../../constants/load.service";
import { WelcomeService } from "../../pages/welcome-page/welcome.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppSubscribe } from "../../entities/AppSubscribe";

@Component({
    selector: "about-us-root",
    templateUrl: "./about-us.component.html",
    styleUrls: ["./about-us.component.css"]
})
export class AboutUsComponent implements OnInit {
    UserDetailsForm: FormGroup;
    DetailsForm: FormGroup;
    emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
    mobilePattern = "^[6-9][0-9]{9}$";
    namePattern = "[a-zA-Z ]+$";
    msgPattern = "[a-zA-Z ]+$";
    title = "AboutUs";
    Props: any = Props;
    @Input()
    aboutus: AppContactUs;
    aboutSubscribe: AppSubscribe;
    @Input()
    type: string;
    displayedColumns: string[] = ["name", "email", "mobile", "message"];
    constructor(private formBuilder: FormBuilder, private loadService: LoadService, private service: WelcomeService) {
        this.aboutus = new AppContactUs();
        this.aboutSubscribe = new AppSubscribe();
        this.DetailsForm = this.formBuilder.group({
            email: ["", [Validators.required, Validators.pattern(this.emailPattern)]]
        });

        this.UserDetailsForm = this.formBuilder.group({
            name: ["", Validators.compose([Validators.required, Validators.pattern(this.namePattern)])],
            email: ["", [Validators.required, Validators.pattern(this.emailPattern)]],
            mobile: ["", Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern(this.mobilePattern)])],
            message: ["", Validators.compose([Validators.required, Validators.maxLength(250), Validators.pattern(this.msgPattern)])]
        });
    }
    ngOnInit() {}
    icons: any[] = [
        {
            img: "../../../assets/icons/balcony.svg",
            p: "BALCONY VIEW"
        },
        {
            img: "../../../assets/icons/parking-place.svg",
            p: "AMPLE PARKING SPACE"
        },

        {
            img: "../../../assets/icons/washing-machine.svg ",
            p: "LAUNDRY SERVICE"
        },
        {
            img: "../../../assets/icons/wardrobe.svg",
            p: "SPACIOUS WARDROBES"
        },
        {
            img: "../../../assets/icons/kitchen.svg",
            p: "PRIVATE FUNCTIONAL KITCHEN"
        },
        {
            img: "../../../assets/icons/breakfast-1.svg",
            p: "EVERYDAY BREAKFAST "
        },
        {
            img: "../../../assets/icons/air-conditioner.svg",
            p: "AIR CONDITIONERS"
        },
        {
            img: "../../../assets/icons/newspaper.svg",
            p: "NEWSPAPERS & MAGAGINES"
        },

        {
            img: "../../../assets/icons/wifi-1.svg ",
            p: "HIGHSPEED BROADBAND"
        },
        {
            img: "../../../assets/icons/cooking.svg",
            p: "IN-HOUSE CHEF"
        },
        {
            img: "../../../assets/icons/housekeeping.svg",
            p: "24/7 HOME SERVICE"
        },
        {
            img: "../../../assets/icons/doctor.svg",
            p: "DOCTOR ON CALL"
        }
    ];
    save() {
        this.service.contactSave(this.aboutus).subscribe((data: any) => {
            if (data) {
                console.log(data);
                // this.search();
                this.service.showMessage(data.message);
                // this.close1(true);
            }
        });
    }
    submit() {
        this.service.subscribeSave(this.aboutSubscribe).subscribe((data: any) => {
            if (data) {
                console.log(data);
                // this.search();
                this.service.showMessage(data.message);
                // this.close1(true);
            }
        });
    }
}
