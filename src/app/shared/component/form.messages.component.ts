// import { Component, Input } from "@angular/core";
// import { FormGroup, FormControl } from "@angular/forms";
// import { ValidationService } from "../service/validation.service";

// @Component({
//   selector: "form-messages",
//   template: `
//     <mat-error *ngIf="errorMessage !== null">{{ errorMessage }}</mat-error>
//   `,
//   styles: [
//     ".error-message { margin-top: 0px; color: red; font-size: 14px !important}"
//   ]
// })
// export class FormMessagesComponent {
//   @Input()
//   control: FormControl;
//   @Input()
//   errMessage: string;
//   constructor() {}

//   get errorMessage() {
//     for (let propertyName in this.control.errors) {
//       if (
//         this.control.errors.hasOwnProperty(propertyName) &&
//         this.control.touched
//       ) {
//         return ValidationService.getValidatorErrorMessage(
//           propertyName,
//           this.control.errors[propertyName],
//           this.errMessage
//         );
//       }
//     }

//     return null;
//   }
// }
