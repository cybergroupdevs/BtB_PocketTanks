import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './user/login/login.component';
import { TwitterAuthComponent } from './auth/twitter-auth/twitter-auth.component';
import { EmailVerificationComponent } from './auth/email-verification/email-verification.component';

export const AppRoutes: Routes = [
  {
    path: 'twittercallback',
    component: TwitterAuthComponent
  },
  {
    path: 'emailverification/:token',
    component: EmailVerificationComponent
  },
  {
    path: 'signup',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'dashboard/twitter',
    pathMatch: 'full',  
  }, 
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]},
  {
    // for undefined routes
    path: '**',    
    redirectTo: 'dashboard/twitter'
    // redirectTo: 'login'
  }
]
