import { Component, OnInit } from "@angular/core";
import { WelcomeService } from "./welcome.service";
import { LoadService } from "../../constants/load.service";
import { HttpService } from "../../shared/service/http.service";

@Component({
  selector: "app-welcome-page",
  templateUrl: "./welcome-page.component.html",
  styleUrls: ["./welcome-page.component.css"]
})
export class WelcomePageComponent implements OnInit {
  propertyList: any;
  selectedProperty: string = null;

  constructor(private welcomeService: WelcomeService,
    private loadService: LoadService, private http: HttpService) {
  }

  ngOnInit() { }

}