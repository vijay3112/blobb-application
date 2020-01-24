import { NgModule, ModuleWithProviders, ErrorHandler } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";
import { AppInterceptor } from "./service/app.interceptor";
import { CommonModule } from "@angular/common";
import { ConfirmDirective } from "./directives/confirm.directive";
import { ReportService } from "./service/report.service";
import { AppService } from "./service/app.service";
import { HttpService } from "./service/http.service";
import { LoadService } from "../constants/load.service";
import { NavService } from "../constants/nav.service";
import { ScrollDispatchModule } from "@angular/cdk/scrolling";
import { DffCardsModule } from "dff-cards";
// import { FormMessagesComponent } from "./component/form.messages.component";
import { ImageCropperModule } from "ngx-image-cropper";
import { CropImgComponent } from "./component/cropimg.component";
import { ImgLoadComponent } from "./component/img-load.component";
import {
    FilterPipe,
    KeyValuesPipe,
    DecodeURIPipe,
    DatePipe,
    DateTimePipe,
    FlagPipe,
    CurrencyPipe,
    AgePipe,
    DecodePipe,
    DateTimeISOPipe,
    PercentagePipe
} from "./utils/pipes";
import { ScrollDirective } from "./directives/scroll.directive";
import { DataScrollComponent } from "./component/data-scroll.component";
import { DataTableComponent } from "./component/data-table.component";

import { FlexLayoutModule } from "@angular/flex-layout";
import { ProgressBarComponent } from "./component/progress-bar.component";
import { ErrorsService } from "./service/errors.service";
import { AgmCoreModule } from "@agm/core";

import { NoRecordFoundComponent } from "./component/no-record-found.component";
import { ImgUploadComponent } from "./component/imgupload.component";
import { FileUploadComponent } from "./component/file-upload.component";
import { RazorPayComponent } from "./component/razor-pay/razor-pay.component";
import { ContactQuickLinksComponent } from "../components/common/contact-quick-links/contact-quick-links.component";

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        HttpClientModule,
        DffCardsModule,
        ScrollDispatchModule,
        ImageCropperModule,
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyDJpndR1PgCcaqAdZEnX4wR-wDTXIEAgpU"
        })
    ],
    declarations: [
        ConfirmDirective,
        FilterPipe,
        KeyValuesPipe,
        DecodeURIPipe,
        DecodePipe,
        DatePipe,
        DateTimePipe,
        FlagPipe,
        CurrencyPipe,
        AgePipe,
        DateTimeISOPipe,
        PercentagePipe,
        // FormMessagesComponent,
        ProgressBarComponent,
        CropImgComponent,
        ImgLoadComponent,
        ImgUploadComponent,
        ScrollDirective,
        DataScrollComponent,
        DataTableComponent,
        NoRecordFoundComponent,
        FileUploadComponent,
        RazorPayComponent,
        ContactQuickLinksComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        ConfirmDirective,
        FilterPipe,
        KeyValuesPipe,
        DecodeURIPipe,
        DecodePipe,
        DatePipe,
        DateTimePipe,
        FlagPipe,
        CurrencyPipe,
        AgePipe,
        DateTimeISOPipe,
        PercentagePipe,
        // FormMessagesComponent,
        ScrollDispatchModule,
        ProgressBarComponent,
        AgmCoreModule,
        DffCardsModule,
        CropImgComponent,
        ImgLoadComponent,
        ImgUploadComponent,
        ScrollDirective,
        DataScrollComponent,
        DataTableComponent,
        NoRecordFoundComponent,
        FileUploadComponent,
        RazorPayComponent,
        ContactQuickLinksComponent
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                ReportService,
                AppService,
                LoadService,
                NavService,
                HttpService,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AppInterceptor,
                    multi: true
                },
                {
                    provide: ErrorHandler,
                    useClass: ErrorsService
                }
            ]
        };
    }
}
