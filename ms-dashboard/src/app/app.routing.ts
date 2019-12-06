import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { TwitterAuthComponent } from './auth/twitter-auth/twitter-auth.component';
// import { NewpostComponent } from './pages/newpost/newpost.component';

export const AppRoutes: Routes = [
  {
    path: 'twittercallback/:oauth_token/:oauth_verifier',
    component: TwitterAuthComponent
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
