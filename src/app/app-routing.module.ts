import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { WelcomePageComponent } from "./pages/welcome-page/welcome-page.component";

import { ReviewComponent } from "./components/review/review.component";
import { PropertyDetailsPageComponent } from "./pages/property-details-page/property-details-page.component";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { PropertyBanjaraHillsComponent } from "./components/property-details/property-banjara-hills/property-banjara-hills.component";
import { PropertyGachibowliComponent } from "./components/property-details/property-gachibowli/property-gachibowli.component";
import { PropertyJublieeHillsComponent } from "./components/property-details/property-jubliee-hills/property-jubliee-hills.component";
import { BookingsPageComponent } from "./pages/bookings-page/bookings-page.component";
import { BlogComponent } from "./components/blog/blog.component";
import { AboutUsComponent } from "./components/about-us/about-us.component";
import { CorporateBookingComponent } from "./components/corporate-booking/corporate-booking.component";
import { TermsComponent } from "./components/terms/terms.component";

import { PrivacyComponent } from "./components/privacy/privacy.component";
import { ContactUsComponent } from "./components/contact-us/contact-us.component";
import { ReviewPageComponent } from "./pages/review-page/review-page.component";
const routes: Routes = [
    { path: "", component: WelcomePageComponent },
    { path: "booking", component: BookingsPageComponent },
    { path: "propertydetails", component: PropertyDetailsPageComponent },
    { path: "invoice", component: ReviewPageComponent },
    { path: "signin", component: SignInComponent },
    { path: "BanjaraHills", component: PropertyBanjaraHillsComponent },
    { path: "JublieeHills", component: PropertyJublieeHillsComponent },
    { path: "Gachibowli", component: PropertyGachibowliComponent },
    { path: "blog", component: BlogComponent },
    { path: "about-us", component: AboutUsComponent },
    { path: "corporate-booking", component: CorporateBookingComponent },
    { path: "terms", component: TermsComponent },
    { path: "privacy", component: PrivacyComponent },
    { path: "contact-us", component: ContactUsComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: false,
            preloadingStrategy: PreloadAllModules
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
