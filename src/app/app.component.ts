import { Component, OnInit, HostListener } from "@angular/core";
import { Router } from "@angular/router";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  isShowHeadActive: boolean;
  ngOnInit() {}
  constructor(private router: Router) {}
  title = "Tour of Heroes";

  onDeactivate() {
    // document.body.scrollTop = 0;
    // Alternatively, you can scroll to top by using this other call:
    window.scrollTo(0, 0);
  }
}
