import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../user/user-profile/user.component';
import { AuthGuardService } from 'app/auth-guard.service';
import { NewpostComponent } from 'app/pages/newpost/newpost.component';
import { CalendarComponent } from 'app/pages/calendar/calendar.component';

export const AdminLayoutRoutes: Routes = [
    { 
        path: 'dashboard',
        component: DashboardComponent,
        // canActivate: [AuthGuardService] 
    },
    { 
        path: 'dashboard/:title',      
        component: DashboardComponent,    
        // canActivate: [AuthGuardService] 
    },
    { 
        path: 'user',           
        component: UserComponent,     
        // canActivate: [AuthGuardService]
    },
    {
        path: 'newPost',
        component: NewpostComponent
    },
    {
        path: 'calendar',
        component: CalendarComponent
    }
];
