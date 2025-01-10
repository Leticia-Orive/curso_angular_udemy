import { Routes } from '@angular/router';
import { AddBookingComponent } from './components/add-booking/add-booking.component';
import { EventsCalendarComponent } from './components/events-calendar/events-calendar.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: 'add-booking', component: AddBookingComponent},
    {path:'login', component: LoginComponent},
    {path:'logout', component: LogoutComponent},
    {path:'events-calendar', component: EventsCalendarComponent, canActivate: [authGuard]},
    {path: '**', redirectTo: 'add-booking'}
];
