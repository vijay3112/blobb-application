import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
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