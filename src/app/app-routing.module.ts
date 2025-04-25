import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CustomerComponent } from './components/customer/customer.component';
import { PartnerComponent } from './components/partner/partner.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { AuthguardService } from './services/authguard.service';
import { HomeContentComponent } from './components/home-content/home-content.component';
import { PartnerDetailsComponent } from './components/partner-details/partner-details.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { 
      path: 'dashboard',
      canActivate: [AuthguardService],
      component: DashboardComponent,
      children: [
        { path: '', redirectTo: 'homecontent', pathMatch: 'full' },
        { path: 'customers', component: CustomerComponent },
        { path: 'partners', component: PartnerComponent },
        { path: 'reservations', component: ReservationComponent },
        { path: 'homecontent', component: HomeContentComponent },
        { path: 'partners/:id', component: PartnerDetailsComponent }
      ]
     }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
