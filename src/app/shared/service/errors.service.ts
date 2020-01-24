import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { ApexService } from "./apex.service";
@Injectable()
export class ErrorsService implements ErrorHandler {
  constructor(private apexService: ApexService) { }
  handleError(error: Error | HttpErrorResponse) {
    // const notificationService = this.injector.get(NotificationService);
    if (error instanceof HttpErrorResponse) {
      this.apexService.showLoader(false);
      // Server or connection error happened
      if (!navigator.onLine) {
        // Handle offline error
        // return notificationService.notify('No Internet Connection');
        // this.apexService.showMessage("No Internet Connection");
      } else {
        // Handle Http Error (error.status === 403, 404...)
        //return notificationService.notify(`${error.status} - ${error.message}`);
        if (error.statusText) {
          // this.apexService.showMessage(error.statusText);
        } else {
          // this.apexService.showMessage(error.message);
        }
      }
    } else {
      console.log(error);
    }
    // Log the error anyway
    console.error("It happens: ", error);
  }
}
