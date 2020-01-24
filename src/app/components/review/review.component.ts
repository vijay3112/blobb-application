import { Component, OnInit, Input } from "@angular/core";
import { AppService } from "./../../shared/service/app.service";

@Component({
    selector: "app-review",
    templateUrl: "./review.component.html",
    styleUrls: ["./review.component.css"]
})
export class ReviewComponent implements OnInit {
    @Input()
    item: any = {};

    @Input()
    items: any = [];
    constructor(private appService: AppService) {
        let ref = this.appService.getParam("refs");

        //this.items = this.appService.getSessionItem(ref);
    }

    ngOnInit() {}
}
