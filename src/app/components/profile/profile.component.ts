import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChanges } from "@angular/core";
import { ControlContainer, NgForm, FormGroup, FormBuilder, Validators, FormsModule } from "@angular/forms";
import { Props } from "../../constants/props";
import { Profile } from "../../entities/Profile";
import { LoadService } from "../../constants/load.service";
@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.css"],
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class ProfileComponent implements OnInit {
    UserDetailsForm: FormGroup;
    Props: any = Props;
    roles: any;
    profiles: any;
    emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
    mobilePattern = "^([\+][0-9]{1,3}([ \.\-])?)?([\(]{1}[0-9]{3}[\)])?([0-9A-Z \.\-]{1,32})((x|ext|extension)?[0-9]{1,4}?)$";
    @Input()
    profile: Profile;
    @Input()
    type: string;

    @Output()
    outputEvent: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(NgForm) myForm: NgForm;

    constructor(private loadService: LoadService, private formBuilder: FormBuilder) {
        this.UserDetailsForm = this.formBuilder.group({
            name: ["", Validators.compose([Validators.required])],
            email: ["", [Validators.required, Validators.pattern(this.emailPattern)]],
            mobile: ["", Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern(this.mobilePattern)])]
        });
    }

    ngOnInit() { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes["type"]) {
            this.type = changes["type"].currentValue;
            if (this.type == "edit") {
                this.loadRoles();
            }
            if (this.type == "quick") {
                this.loadProfiles();
            }
        }
    }

    loadProfiles(): any {
        this.loadService.profiles().subscribe(data => {
            this.profiles = data;
        });
    }
    onClose() {
        this.outputEvent.emit();
        this.myForm.form.reset();
    }

    onStatus() {
        if (this.profile.active) {
            if (!confirm(Props.PROFILE_STATUS_ACTIVE)) {
                this.profile.active = !this.profile.active;
            }
        }
    }

    loadRoles() {
        this.loadService.roles().subscribe(data => {
            if (data) {
                this.roles = data;
            } else {
                this.roles = [];
            }
        });
    }

    quickAdd($event) {
        let profileList = null;

        if ($event == "mobile") {
            this.profile.id = null;
            this.profile.email = null;
            profileList = this.profiles.filter(x => x.mobile == this.profile.mobile);
        } else if ($event == "email") {
            this.profile.id = null;
            profileList = this.profiles.filter(x => x.email == this.profile.email);
        }
        if (profileList && profileList.length > 0) {
            this.profile.id = profileList[0].id;
            this.profile.mobile = profileList[0].mobile;
            this.profile.email = profileList[0].email;
            this.profile.name = profileList[0].name;
        }

        if (this.profile.id == null) {
            if (this.profile.name && this.profile.mobile && this.profile.email) {
                console.log(this.profile);
                this.outputEvent.emit(this.profile);
            }
        }
        setTimeout(() => {
            this.loadProfiles()
        }, 5000);

    }
}
