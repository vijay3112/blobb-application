import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"]
})
export class FooterComponent implements OnInit {
  @Input()
  inputData: any;

  @Input()
  color: any = "#778899";

  @Output()
  outputEmitter: EventEmitter<any> = new EventEmitter();
  constructor() {
    if (!this.inputData) {
      this.inputData = {};
    }
  }

  ngOnInit() {}

  clickOnSubmit() {
    this.outputEmitter.emit(this.inputData);
  }
}