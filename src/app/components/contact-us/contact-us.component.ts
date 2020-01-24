import { Component, OnInit, Input } from "@angular/core";
import { AppContactUs } from "../../entities/AppContactUs";
import { LoadService } from "../../constants/load.service";
import { FormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { WelcomeService } from "../../pages/welcome-page/welcome.service";
import { Props } from "../../constants/props";
import { AppSubscribe } from "../../entities/AppSubscribe";

@Component({
    selector: "app-contact-us",
    templateUrl: "./contact-us.component.html",
    styleUrls: ["./contact-us.component.css"]
})
export class ContactUsComponent implements OnInit {
    UserDetailsForm: FormGroup;
    DetailsForm: FormGroup;

    emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
    mobilePattern = "^[6-9][0-9]{9}$";
    namePattern = "[a-zA-Z ]+$";
    msgPattern = "[a-zA-Z ]+$";
    Props: any = Props;
    @Input()
    contact: AppContactUs;
    contactSubscribe: AppSubscribe;


    @Input()
    type: string;
    startLoading: boolean = false;
    displayedColumns: string[] = ["name", "email", "mobile", "message"];
    constructor(private formBuilder: FormBuilder, private loadService: LoadService, private service: WelcomeService) {
        this.contact = new AppContactUs();
        this.contactSubscribe = new AppSubscribe();
        this.DetailsForm = this.formBuilder.group({
            email: ["", [Validators.required, Validators.pattern(this.emailPattern)]],

        });
        this.UserDetailsForm = this.formBuilder.group({
            name: ["", Validators.compose([Validators.required, Validators.pattern(this.namePattern)])],
            email: ["", [Validators.required, Validators.pattern(this.emailPattern)]],
            mobile: ["", Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern(this.mobilePattern)])],
            message: ["", Validators.compose([Validators.required, Validators.maxLength(250), Validators.pattern(this.msgPattern)])]
        });
    }

    ngOnInit() { }

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
    submit() {
        this.startLoading = true;
        this.service.subscribeSave(this.contactSubscribe).subscribe((data: any) => {
            if (data) {
                console.log(data);
                // this.search();
                this.service.showMessage(data.message);
                this.DetailsForm.reset();
                // this.close1(true);
            }
            this.startLoading = false;
        });
    }
}
