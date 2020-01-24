import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { APP_BASE_HREF, CommonModule } from "@angular/common";
import { LayoutModule } from "@angular/cdk/layout";
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared/shared.module";
// import { Module as StripeModule } from "stripe-angular";
import { FlatsComponent } from "./components/flats/flats.component";
import { AppComponent } from "./app.component";
import { PLATFORM_ID, APP_ID, Inject } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { ContactFormComponent } from "./components/common/contact-form/contact-form.component";
import { HeaderComponent } from "./components/common/header/header.component";
import { FooterComponent } from "./components/common/footer/footer.component";
import { PUCComponent } from "./components/common/puc/puc.component";
import { PaymentComponent } from "./components/payment/payment.component";
import { WelcomePageComponent } from "./pages/welcome-page/welcome-page.component";
import { NavComponent } from "./components/nav/nav.component";
import { AboutServicesComponent } from "./components/about-services/about-services.component";
import { BlobbFeaturesComponent } from "./components/blobb-features/blobb-features.component";
import { BannerComponent } from "./components/banner/banner.component";
import { NewsLetterComponent } from "./components/news-letter/news-letter.component";
import { RoomComponent } from "./components/room/room.component";
import { FilterComponent } from "./components/filters/filter.component";
import { ReviewComponent } from "./components/review/review.component";
import { NgxGalleryModule } from "ngx-gallery";
import { PropertyComponent } from "./components/property/property.component";
import { DatePickerComponent } from "./components/date-picker/date-picker.component";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { LoadService } from "./constants/load.service";
import { NavService } from "./constants/nav.service";
import { RoomBookComponent } from "./components/room-book/room-book.component";
import { PropertyJublieeHillsComponent } from "./components/property-details/property-jubliee-hills/property-jubliee-hills.component";
import { FeedbackComponent } from "./components/feedback/feedback.component";
import { PropertyDetailsPageComponent } from "./pages/property-details-page/property-details-page.component";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { PropertyBanjaraHillsComponent } from "./components/property-details/property-banjara-hills/property-banjara-hills.component";
import { PropertyGachibowliComponent } from "./components/property-details/property-gachibowli/property-gachibowli.component";
import { BookingsPageComponent } from "./pages/bookings-page/bookings-page.component";
import { BookingsService } from "./services/bookings.service";
import { BlogComponent } from "./components/blog/blog.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { PaymentAddonComponent } from "./components/payment-addon/payment-addon.component";
import { PaymentTaxComponent } from "./components/payment-tax/payment-tax.component";
import { RoomDetailsComponent } from "./components/room-details/room-details.component";
import { RoomLocationComponent } from "./components/room-location/room-location.component";
import { LogoComponent } from "./components/common/logo/logo.component";
import { CorporateBookingComponent } from "./components/corporate-booking/corporate-booking.component";
import { AboutUsComponent } from "./components/about-us/about-us.component";
import { TermsComponent } from "./components/terms/terms.component";
import { from } from "rxjs";
import { PrivacyComponent } from "./components/privacy/privacy.component";
import { SecuredImageComponent } from "./shared/component/secured-image.component";
import { NgxStripeModule } from "ngx-stripe";
import { CountdownModule } from "ngx-countdown";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ContactUsComponent } from "./components/contact-us/contact-us.component";
import { ReviewPageComponent } from "./pages/review-page/review-page.component";
import { TimepickerModule } from 'ngx-bootstrap/timepicker'
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
@NgModule({
    imports: [
        BrowserModule.withServerTransition({ appId: "dff" }),
        AppRoutingModule,
        BrowserAnimationsModule,
        LayoutModule,
        NgxGalleryModule,
        SharedModule.forRoot(),
        BsDatepickerModule.forRoot(),
        TimepickerModule.forRoot(),
        NgxStripeModule,
        CountdownModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMaterialTimepickerModule
    ],
    declarations: [
        AppComponent,
        ContactFormComponent,
        PUCComponent,
        HeaderComponent,
        FooterComponent,
        WelcomePageComponent,
        NavComponent,
        AboutServicesComponent,
        BlobbFeaturesComponent,
        BannerComponent,
        FlatsComponent,
        NewsLetterComponent,
        PropertyComponent,
        PaymentComponent,
        FilterComponent,
        ReviewComponent,
        RoomComponent,
        DatePickerComponent,
        RoomBookComponent,
        PropertyJublieeHillsComponent,
        FeedbackComponent,
        PropertyDetailsPageComponent,
        SignInComponent,
        PropertyBanjaraHillsComponent,
        PropertyGachibowliComponent,
        BookingsPageComponent,
        BlogComponent,
        ProfileComponent,
        PaymentAddonComponent,
        PaymentTaxComponent,
        RoomDetailsComponent,
        RoomLocationComponent,
        LogoComponent,
        CorporateBookingComponent,
        AboutUsComponent,
        TermsComponent,
        PrivacyComponent,
        SecuredImageComponent,
        ContactUsComponent,
        ReviewPageComponent
    ],
    providers: [{ provide: APP_BASE_HREF, useValue: "/" }, LoadService, NavService, BookingsService],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(@Inject(PLATFORM_ID) private platformId: Object, @Inject(APP_ID) private appId: string) {
        const platform = isPlatformBrowser(platformId) ? "in the browser" : "on the server";
        console.log(`Running ${platform} with appId=${appId}`);
    }
}
