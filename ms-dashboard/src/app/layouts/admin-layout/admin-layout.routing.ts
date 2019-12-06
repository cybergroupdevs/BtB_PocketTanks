import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { AuthGuardService } from 'app/auth-guard.service';
import { NewpostComponent } from 'app/pages/newpost/newpost.component';

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
        path: 'user',           
        component: UserComponent,     
        canActivate: [AuthGuardService]
    },
    {
        path: 'new',
        component: NewpostComponent
    }
];
