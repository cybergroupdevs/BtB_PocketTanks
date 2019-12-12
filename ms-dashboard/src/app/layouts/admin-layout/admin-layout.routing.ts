import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { AuthGuardService } from 'app/auth-guard.service';
import { NewpostComponent } from 'app/pages/newpost/newpost.component';
import { CalendarComponent } from 'app/pages/calendar/calendar.component';

export const AdminLayoutRoutes: Routes = [
    { 
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuardService] 
    },
    { 
        path: 'dashboard/:title',      
        component: DashboardComponent,    
        canActivate: [AuthGuardService] 
    },
    {
        path: 'newPost',
        component: NewpostComponent,    
        canActivate: [AuthGuardService]
    },
    {
        path: 'editPost/:_id',
        component: NewpostComponent,    
        canActivate: [AuthGuardService]
    },
    {
        path: 'calendar',
        component: CalendarComponent,    
        canActivate: [AuthGuardService]
    }
];
