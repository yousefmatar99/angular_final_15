import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HomeContentComponent } from './components/home-content/home-content.component';
import { PartnerComponent } from './components/partner/partner.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { CommonModule } from '@angular/common';

import { InterceptorService } from './services/interceptor.service';
import { CustomerComponent } from './components/customer/customer.component';
import { PartnerDetailsComponent } from './components/partner-details/partner-details.component';
import { PackageComponent } from './components/package/package.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SideBarComponent,
    HomeContentComponent,
    PartnerComponent,
    ReservationComponent,
    CustomerComponent,
    PartnerDetailsComponent,
    PackageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
