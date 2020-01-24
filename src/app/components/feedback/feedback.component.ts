import { Component, OnInit } from "@angular/core";
import { WelcomeService } from "../../pages/welcome-page/welcome.service";

@Component({
    selector: "app-feedback",
    templateUrl: "./feedback.component.html",
    styleUrls: ["./feedback.component.css"]
})
export class FeedbackComponent implements OnInit {
    selectedTab: any = "active";
    feedbackList: any = [];

    // items: any[] = [
    //     {
    //         img: "http://farm9.staticflickr.com/8504/8365873811_d32571df3d_z.jpg",

    //         description:
    //             " News that is published must be factual and error-free; only then will people subscribe to a newspaper. Newspapers may be delivered at our doorsteps or picked up at shops or from hawkers on the street. The general public depends on newspapers for authentic published news."
    //     }
    // ];
    constructor(private welcome: WelcomeService) {
        this.getFeedback(this.selectedTab);
    }

    ngOnInit() {}

    getFeedback(data: any) {
        data = { param: data };
        this.welcome.getFeedback(data).subscribe((data: any) => {
            this.feedbackList = data;
        });
    }
}
