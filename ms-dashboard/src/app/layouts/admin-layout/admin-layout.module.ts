import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';
import { UserComponent }            from '../../pages/user/user.component';
import { WordCloudComponent } from '../../charts/word-cloud/word-cloud.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatTabsModule } from '@angular/material';
import { SocialAccountLoginComponent } from 'app/pages/social-account-login/social-account-login.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTabsModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    WordCloudComponent,
    SocialAccountLoginComponent
  ],
  entryComponents:[
    SocialAccountLoginComponent
  ]
})

export class AdminLayoutModule {}
