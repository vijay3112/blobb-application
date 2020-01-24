import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-contact-form",
  templateUrl: "./contact-form.component.html",
  styleUrls: ["./contact-form.component.css"]
})
export class ContactFormComponent implements OnInit {
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